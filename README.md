# Antigravity Modelo

Este proyecto sigue la arquitectura de 3 capas definida en [AGENTS.md](AGENTS.md).

## Estructura del Proyecto

- `directives/`: Contiene los Procedimientos Operativos Estándar (SOPs) en formato Markdown. Define el **qué hacer**.
- `execution/`: Contiene los scripts de Python deterministas. Define el **cómo hacer** el trabajo pesado (APIs, procesamiento de datos).
- `.tmp/`: Carpeta para archivos intermedios y temporales (ignorada por Git).
- `.agent/skills/`: Directorio para capacidades y habilidades extendidas del agente.
- `.env`: Variables de entorno y llaves de API (ignorado por Git).
- `credentials.json` / `token.json`: Credenciales de Google OAuth (ignorados por Git).

## Principios Operativos

1. **Revisar herramientas primero**: Antes de crear un script, revisa `execution/`.
2. **Auto-corrección**: Si algo falla, arregla el script, pruébalo y actualiza la directiva.
3. **Directivas vivas**: Las directivas deben actualizarse con los aprendizajes del sistema.
