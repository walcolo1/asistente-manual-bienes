# Document Processing Directive

## Objetivo
Establecer el pipeline para la futura ingestión y procesamiento del archivo `manual.md`.

## Proceso de Fragmentación (Chunking) Lógica
1. **Lectura Semántica:** El script de ingestión lee `backend/knowledge/manual.md`.
2. **División por Títulos:** El texto es fragmentado cada vez que se detecta un encabezado Markdown de nivel 1 a 3 (`#`, `##`, `###`).
3. **Control de Longitud:** Si una sección bajo un mismo título es demasiado extensa (límite razonable aproximado de 1200 caracteres), se subdivide a través de los saltos de párrafo para no cortar el texto a mitad de una oración, conservando el nombre del título actual en sus metadatos.
4. **Metadatos y UUID:** A cada fragmento resultante se le asigna un UUID único y un objeto `metadata` que almacena el nombre de su sección (título) correspondiente.

## Pasos (Implementados en Fase 2)
1. Leer el archivo `manual.md` desde la carpeta `knowledge/`.
2. Estructurar el texto a través del script local.
3. El resultado es un listado JSON de fragmentos con ID, metadata (sección) y contenido (`content`).
4. El archivo final se guarda en `backend/processed/chunks.json`.

## Ejecución del Script
Para ejecutar este proceso:
1. Asegúrate de estar en el directorio `/backend`.
2. Ejecuta el comando:
   ```bash
   npm run ingest
   ```
3. Si el archivo `manual.md` no existe o está vacío, el script abortará controladamente con un mensaje claro en la consola de errores.

## Futuro Pipeline
- Generar embeddings para cada contenido estructurado.
- Almacenar el resultado en una base de datos vectorial (Pinecone, ChromaDB).
