# QA Manual Rules

## Cuándo usarla
Siempre que se diseñen, modifiquen o ejecuten pruebas de control de calidad sobre el asistente documental.

## Contexto del proyecto
Asegurar que el sistema de RAG funciona con precisión y que nunca incurre en alucinaciones fuera del manual.

## Instrucciones obligatorias
1. Evaluar si la respuesta proviene estrictamente del manual.
2. Validar que la cita o referencia esté presente.
3. Verificar que ante una consulta sin respuesta en el texto, el bot responda con el mensaje por defecto acordado.

## Restricciones
- No utilizar herramientas de QA automatizadas que dependan de validaciones con internet.
