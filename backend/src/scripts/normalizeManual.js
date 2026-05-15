const fs = require('fs');
const path = require('path');

const MANUAL_PATH = path.join(__dirname, '../../knowledge/manual.md');
const STRUCTURED_PATH = path.join(__dirname, '../../knowledge/manual.structured.md');
const REPORT_PATH = path.join(__dirname, '../../processed/normalization-report.json');

console.log('Iniciando normalización del manual...');

try {
  let text = fs.readFileSync(MANUAL_PATH, 'utf-8');

  // 1. Limpieza de encabezados de página y marcas de agua repetitivas
  const headerRegexes = [
    /MANUAL\s+P.*?gina\s+\d+\s+de\s+\d+/gi,
    /PROCEDIMIENTOS ADMINISTRATIVOS Y\s*FINANCIEROS PARA EL MANEJO DE BIENES\s*DEL MINISTERIO DE DEFENSA NACIONAL\.?/gi,
    /C.*?digo:\s*GF\s*-\s*M\s*-\s*00\s*1/gi,
    /Versi.*?n:\s*\d+/gi,
    /Vigente a partir de:\s*\d+\s+de\s+[a-zA-Z]+\s+de\s+\d+/gi,
    /Este documento es propiedad del Ministerio de Defensa\s*Nacional,\s*no est.*?\s+autorizado su reproducci.*?n total o parcial/gi
  ];

  let removedHeadersCount = 0;
  headerRegexes.forEach(r => {
    let matches = text.match(r);
    if (matches) removedHeadersCount += matches.length;
    text = text.replace(r, ' ');
  });

  // 2. Normalizar numerales espaciados (ej: "1 . 2" -> "1.2")
  text = text.replace(/(\d+)\s*\.\s*(\d+)/g, '$1.$2');
  text = text.replace(/(\d+)\s*\.\s*(\d+)/g, '$1.$2');
  text = text.replace(/(\d+)\s*\.\s*(\d+)/g, '$1.$2');

  // 3. Dividir el documento en frases/bloques lógicos basados en espacios dobles o saltos de línea múltiples
  const phrases = text.split(/\s{2,}/).map(p => p.trim()).filter(p => p && !p.match(/^\.{3,}$/));

  // 4. Ubicar Tabla de Contenido
  const tocStartIndex = phrases.findIndex((p, i) => p.includes('TABLA DE') && phrases[i+1] && phrases[i+1].includes('CONTENIDO'));
  const docStartIndex = phrases.findIndex((p, i) => i > tocStartIndex + 5 && p.match(/^CAP.*?TULO\s+I$/i));

  if (tocStartIndex === -1 || docStartIndex === -1) {
    console.error('No se pudo ubicar la tabla de contenido o el inicio del documento. Índices:', {tocStartIndex, docStartIndex});
    process.exit(1);
  }

  // 5. Construir nuevo documento Markdown
  let mdLines = [];
  
  // Frontmatter
  mdLines.push('---');
  mdLines.push('title: "Manual de Bienes Estructurado"');
  mdLines.push('source: "manual.md"');
  mdLines.push('normalized: true');
  mdLines.push('---\n');

  // Sección Preliminar (antes de TOC)
  const introPhrases = phrases.slice(0, tocStartIndex);
  let introText = introPhrases.join(' ');
  // Pequeños ajustes visuales a la intro
  introText = introText.replace(/Objetivo :/gi, '\n## Objetivo\n');
  introText = introText.replace(/Alcance:/gi, '\n## Alcance\n');
  mdLines.push(introText);
  mdLines.push('\n');

  // Procesar cuerpo del documento
  let docPhrases = phrases.slice(docStartIndex);
  let i = 0;
  let inBlockquote = false;
  
  let chapterCount = 0;
  let sectionCount = 0;

  while (i < docPhrases.length) {
    let p = docPhrases[i];

    // Ignorar números solitarios (usualmente números de página que quedaron sueltos)
    if (p.match(/^\d+$/)) {
      i++;
      continue;
    }

    // Títulos de Capítulos (Ej: CAPÍTULO I)
    if (p.match(/^CAP.*?TULO\s+[IVXLCDM]+$/i)) {
      mdLines.push(`\n\n# ${p.toUpperCase()}\n\n`);
      chapterCount++;
      i++;
      continue;
    }

    // Títulos Numerados divididos en dos partes (Ej: ["1.", "MARCO CONCEPTUAL"])
    if (p.match(/^\d+(\.\d+)*\.?$/) && docPhrases[i+1] && docPhrases[i+1].match(/^[A-ZÁÉÍÓÚÑ]/)) {
      let dotsCount = (p.match(/\./g) || []).length;
      if (p.endsWith('.')) dotsCount--; // "1." es nivel 1, "1.1." es nivel 2
      
      let headerLevel = '#'.repeat(dotsCount + 2);
      mdLines.push(`\n\n${headerLevel} ${p} ${docPhrases[i+1]}\n\n`);
      sectionCount++;
      i += 2;
      continue;
    }

    // Títulos Numerados unidos (Ej: "1.2.1 Bienes Tangibles")
    if (p.match(/^(\d+(?:\.\d+)*\.?)\s+(.*)/)) {
      let m = p.match(/^(\d+(?:\.\d+)*\.?)\s+(.*)/);
      let dotsCount = (m[1].match(/\./g) || []).length;
      if (m[1].endsWith('.')) dotsCount--;
      
      let headerLevel = '#'.repeat(dotsCount + 2);
      mdLines.push(`\n\n${headerLevel} ${m[1]} ${m[2]}\n\n`);
      sectionCount++;
      i++;
      continue;
    }

    // Notas -> Blockquotes
    if (p.match(/^Nota(:|\s)/i)) {
      mdLines.push(`\n> **${p}** `);
      inBlockquote = true;
      i++;
      continue;
    }

    // Párrafos y texto general
    if (inBlockquote) {
      // Si la frase termina en punto, cerramos blockquote
      mdLines.push(p + ' ');
      if (p.endsWith('.')) {
        inBlockquote = false;
        mdLines.push('\n\n');
      }
    } else {
      // Concatenar texto normal
      // Añadimos un salto si la frase anterior terminaba en punto
      let lastStr = mdLines[mdLines.length - 1] || '';
      if (lastStr.trim().endsWith('.')) {
        mdLines.push('\n\n' + p + ' ');
      } else {
        mdLines.push(p + ' ');
      }
    }

    i++;
  }

  const finalMd = mdLines.join('');
  
  // Pequeñas correcciones adicionales al markdown generado
  let cleanedMd = finalMd.replace(/\n{3,}/g, '\n\n');

  fs.writeFileSync(STRUCTURED_PATH, cleanedMd, 'utf-8');

  // 6. Generar Reporte
  const report = {
    timestamp: new Date().toISOString(),
    sourceFile: 'manual.md',
    outputFile: 'manual.structured.md',
    stats: {
      headersRemoved: removedHeadersCount,
      phrasesProcessed: phrases.length,
      chaptersDetected: chapterCount,
      sectionsDetected: sectionCount
    }
  };

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf-8');

  console.log(`Normalización completada. Reporte generado.`);
  console.log(`Capítulos detectados: ${chapterCount}`);
  console.log(`Secciones detectadas: ${sectionCount}`);
} catch (error) {
  console.error('Error durante la normalización:', error);
  process.exit(1);
}
