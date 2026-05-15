# Data Models

## Cuándo usarla
Siempre que se defina la estructura de datos para el procesamiento de los fragmentos del manual o las consultas del usuario.

## Contexto del proyecto
Representación de las partes del manual, metadatos y configuración de la consulta para el sistema RAG cerrado.

## Instrucciones obligatorias
1. Las interfaces o esquemas deben reflejar la estructura de los datos indexados (ej. título de sección, contenido, página).
2. Mantener la estructura estricta para garantizar que el LLM reciba exactamente la estructura que espera.

## Restricciones
- No incluir campos para datos en tiempo real de internet o fuentes externas.
