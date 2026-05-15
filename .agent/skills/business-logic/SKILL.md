# Business Logic

## Cuándo usarla
Siempre que se implementen rutas, controladores o servicios en el backend, o interacciones principales en el frontend.

## Contexto del proyecto
Gestión del flujo de datos entre el usuario, el backend y el futuro sistema de recuperación de documentos (RAG).

## Instrucciones obligatorias
1. La lógica debe estar encapsulada en servicios independientes.
2. Validar siempre las entradas del usuario antes de procesarlas.
3. El manejo de errores debe ser uniforme en todo el sistema.

## Restricciones
- No implementar lógica compleja de fragmentación o integración de LLM en esta fase arquitectónica.
