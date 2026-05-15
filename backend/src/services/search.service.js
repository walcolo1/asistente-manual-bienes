const fs = require('fs');
const path = require('path');

const CHUNKS_PATH = path.join(__dirname, '../../processed/chunks.json');

const STOP_WORDS = new Set([
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas',
  'de', 'del', 'a', 'ante', 'bajo', 'cabe', 'con', 'contra', 'desde', 'en', 'entre', 'hacia', 'hasta', 'para', 'por', 'segun', 'sin', 'so', 'sobre', 'tras',
  'y', 'e', 'ni', 'que', 'o', 'u', 'pero', 'mas', 'sino',
  'es', 'son', 'fue', 'fueron', 'ser', 'estar', 'tiene', 'tienen',
  'este', 'esta', 'estos', 'estas', 'ese', 'esa', 'esos', 'esas', 'aquel', 'aquella', 'aquellos', 'aquellas',
  'su', 'sus', 'mi', 'mis', 'tu', 'tus',
  'como', 'cual', 'cuales', 'quien', 'quienes',
  'cuando', 'donde', 'porque', 'si', 'no', 'hacer'
]);

const GENERIC_WORDS = new Set([
  'bienes', 'control', 'manual', 'procedimiento', 'funciones', 'capitulo', 'capítulo'
]);

const SYNONYMS = {
  'responsabilidades': 'funciones',
  'obligaciones': 'funciones',
  'actividades': 'funciones',
  'tareas': 'funciones',
  'que hace': 'funciones',
  'hace': 'funciones',
  'rol': 'funciones',
  'papel': 'funciones'
};

function expandTerms(text) {
  let expanded = text;
  // Replace larger phrases first by sorting by length descending
  const sortedSynonyms = Object.keys(SYNONYMS).sort((a, b) => b.length - a.length);
  for (const synonym of sortedSynonyms) {
    const replacement = SYNONYMS[synonym];
    const regex = new RegExp(`\\b${synonym}\\b`, 'gi');
    expanded = expanded.replace(regex, replacement);
  }
  return expanded;
}

function normalizeText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remover tildes
    .replace(/[^\w\s]/g, ' ') // Remover puntuación y caracteres especiales
    .replace(/\s+/g, ' ') // Quitar espacios extra
    .trim();
}

function tokenize(text) {
  return normalizeText(text)
    .split(/\s+/)
    .filter(word => word.length > 2 && !STOP_WORDS.has(word));
}

class SearchService {
  constructor() {
    this.chunks = [];
    this.loadChunks();
  }

  loadChunks() {
    try {
      if (!fs.existsSync(CHUNKS_PATH)) {
        console.error(`[Search Service] ERROR: No se encontró el archivo de chunks en ${CHUNKS_PATH}`);
        return;
      }
      
      const fileContent = fs.readFileSync(CHUNKS_PATH, 'utf-8');
      
      if (!fileContent.trim()) {
        console.error(`[Search Service] ERROR: El archivo de chunks está vacío.`);
        return;
      }
      
      const rawChunks = JSON.parse(fileContent);

      // Enriquecer chunks en memoria con el contexto de los títulos ancestros
      let hierarchy = [];
      rawChunks.forEach(chunk => {
        const section = chunk.metadata.section || '';
        const match = section.match(/^(\d+(?:\.\d+)*)/);
        if (match) {
          const number = match[1];
          const depth = number.split('.').length;
          
          hierarchy = hierarchy.filter(h => h.depth < depth);
          hierarchy.push({ depth, title: section, number });
          
          const ancestorTitles = hierarchy.slice(0, -1).map(h => h.title).join(' | ');
          if (ancestorTitles) {
            chunk.metadata.ancestorTitles = ancestorTitles;
          }
        }
      });

      this.chunks = rawChunks;
      console.log(`✅ [Search Service] ${this.chunks.length} chunks cargados y enriquecidos correctamente para búsqueda local.`);
    } catch (error) {
      console.error(`[Search Service] ERROR al leer o parsear chunks.json:`, error.message);
      this.chunks = [];
    }
  }

  search(question, topK = 5) {
    if (!this.chunks || this.chunks.length === 0) {
      throw new Error('Los fragmentos no están disponibles o no se pudieron cargar.');
    }

    const expandedQuestion = expandTerms(question);
    const normalizedQuestion = normalizeText(expandedQuestion);
    const queryTokens = tokenize(expandedQuestion);
    
    if (queryTokens.length === 0) {
      return [];
    }

    const queryPhrase = queryTokens.join(' ');

    // Calcular la puntuación de cada fragmento
    const scoredChunks = this.chunks.map(chunk => {
      let score = 0;
      
      const contentTokens = tokenize(chunk.content);
      const sectionTokens = tokenize(chunk.metadata.section);
      const ancestorTokens = chunk.metadata.ancestorTitles ? tokenize(chunk.metadata.ancestorTitles) : [];
      
      // Combinar tokens de sección y ancestros
      const combinedSectionTokens = [...new Set([...sectionTokens, ...ancestorTokens])];

      const cleanContent = contentTokens.join(' ');
      const cleanSection = combinedSectionTokens.join(' ');

      // 1. Frase completa en metadata.section o sus ancestros (Máxima puntuación)
      if (cleanSection.includes(queryPhrase)) {
        score += 100;
      } else if (normalizedQuestion && normalizeText(chunk.metadata.section + ' ' + (chunk.metadata.ancestorTitles || '')).includes(normalizedQuestion)) {
        score += 80;
      }
      
      // 2. Frase completa en content (Alta puntuación)
      if (cleanContent.includes(queryPhrase)) {
        score += 50;
      } else if (normalizedQuestion && normalizeText(chunk.content).includes(normalizedQuestion)) {
        score += 40;
      }

      // 3. Todos los términos importantes aparecen en section (o ancestros)
      const allInSection = queryTokens.every(token => combinedSectionTokens.includes(token));
      if (allInSection && queryTokens.length > 1) {
        score += 30;
      }

      // 4. Todos los términos importantes aparecen en content
      const allInContent = queryTokens.every(token => contentTokens.includes(token));
      if (allInContent && queryTokens.length > 1) {
        score += 15;
      }

      // 5. Coincidencias individuales
      queryTokens.forEach(token => {
        const isGeneric = GENERIC_WORDS.has(token);
        
        if (combinedSectionTokens.includes(token)) {
          score += isGeneric ? 0.5 : 5;
        }
        
        const countInContent = contentTokens.filter(t => t === token).length;
        if (countInContent > 0) {
          // Penalizar si es palabra genérica
          score += isGeneric ? (countInContent * 0.1) : (countInContent * 2);
        } else {
          // Boost menor si hay coincidencia parcial
          const partialMatch = contentTokens.some(t => t.includes(token) || token.includes(t));
          if (partialMatch) score += isGeneric ? 0.1 : 0.5;
        }
      });

      return {
        ...chunk,
        score
      };
    });

    // 6. Filtrar, ordenar y limitar a los mejores resultados con umbral mínimo de 3
    return scoredChunks
      .filter(c => c.score >= 3)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }
}

module.exports = new SearchService();
