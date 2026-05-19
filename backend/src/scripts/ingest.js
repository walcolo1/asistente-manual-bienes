const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Rutas relativas al punto de ejecución (asumimos raíz de backend)
const MANUAL_PATH = path.join(__dirname, '../../knowledge/manual.structured.md');
const OUTPUT_PATH = path.join(__dirname, '../../processed/chunks.json');

// Límite razonable por fragmento para no perder contexto sin reventar tokens
const MAX_CHUNK_SIZE = 1200;

function chunkText(text, chapter, section) {
    const chunks = [];
    // Separamos por párrafos (doble salto de línea)
    const paragraphs = text.split(/\n\s*\n/);
    
    let currentContent = '';
    
    for (const p of paragraphs) {
        const paragraph = p.trim();
        if (!paragraph) continue;
        
        // Si al agregar el párrafo nos pasamos del límite y ya hay contenido, guardamos el chunk
        if (currentContent.length + paragraph.length > MAX_CHUNK_SIZE && currentContent.length > 0) {
            chunks.push({
                id: crypto.randomUUID(),
                metadata: {
                    chapter: chapter,
                    section: section,
                    source: "manual.structured.md"
                },
                content: currentContent.trim()
            });
            currentContent = '';
        }
        
        currentContent += (currentContent ? '\n\n' : '') + paragraph;
    }
    
    // Guardar el restante
    if (currentContent.trim().length > 0) {
        chunks.push({
            id: crypto.randomUUID(),
            metadata: {
                chapter: chapter,
                section: section,
                source: "manual.structured.md"
            },
            content: currentContent.trim()
        });
    }
    
    return chunks;
}

async function run() {
    console.log('Iniciando proceso de ingestión de manual.structured.md...');

    // 1. Validar existencia del archivo
    if (!fs.existsSync(MANUAL_PATH)) {
        console.error(`ERROR CRÍTICO: No se encontró el archivo en ${MANUAL_PATH}`);
        process.exit(1);
    }

    const fileContent = fs.readFileSync(MANUAL_PATH, 'utf-8');

    if (!fileContent.trim()) {
        console.error(`ERROR CRÍTICO: El archivo está vacío.`);
        process.exit(1);
    }

    // 2. Procesamiento y fragmentación
    const lines = fileContent.split('\n');
    let currentChapter = 'Sin capítulo detectado';
    let currentSection = 'Sin sección detectada';
    let currentText = [];
    const allChunks = [];

    const processAccumulatedText = () => {
        const text = currentText.join('\n').trim();
        if (text) {
            allChunks.push(...chunkText(text, currentChapter, currentSection));
        }
        currentText = [];
    };

    for (const line of lines) {
        // Ignorar frontmatter
        if (line.trim() === '---' || line.startsWith('title:') || line.startsWith('source:') || line.startsWith('normalized:')) {
            continue;
        }

        const h1Match = line.match(/^#\s+(.*)/);
        const hNxMatch = line.match(/^(#{2,7})\s+(.*)/);

        if (h1Match) {
            processAccumulatedText();
            currentChapter = h1Match[1].trim();
            currentSection = 'Sin sección detectada';
        } else if (hNxMatch) {
            processAccumulatedText();
            currentSection = hNxMatch[2].trim();
            // Include heading in the chunk text to give more context to LLM
            currentText.push(line);
        } else {
            currentText.push(line);
        }
    }

    // Procesar la última sección
    processAccumulatedText();

    // 3. Guardar el resultado en formato JSON
    const outputDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(allChunks, null, 2), 'utf-8');
    
    console.log(`✅ Ingestión completada. Se generaron ${allChunks.length} fragmentos.`);
    console.log(`📂 Guardado en: ${OUTPUT_PATH}`);
}

run().catch(err => {
    console.error('Error inesperado durante la ingestión:', err);
    process.exit(1);
});
