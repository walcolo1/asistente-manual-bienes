const { GoogleGenerativeAI } = require('@google/generative-ai');

class InfographicService {
  async generate(question, answer) {
    const apiKey = process.env.GEMINI_API_KEY;
    const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    if (!apiKey) throw new Error('GEMINI_API_KEY no está configurada.');

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: modelName,
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    // Build the prompt
    const prompt = [
      'Eres un experto en diseño de infografías técnicas para manuales administrativos.',
      'A partir de la PREGUNTA y RESPUESTA proporcionadas, genera un JSON estructurado para renderizar una infografía visual.',
      '',
      'El JSON DEBE tener esta estructura exacta:',
      '{',
      '  "title": "Título conciso de la infografía (máximo 60 caracteres)",',
      '  "description": "Resumen de una línea del contenido",',
      '  "steps": [',
      '    { "number": 1, "title": "Título del paso", "description": "Descripción breve del paso" }',
      '  ],',
      '  "stats": [',
      '    { "label": "Etiqueta", "value": "Valor", "icon": "clock" }',
      '  ],',
      '  "highlights": [',
      '    { "type": "warning", "text": "Texto de alerta o dato importante" }',
      '  ]',
      '}',
      '',
      'Reglas:',
      '- "steps" debe contener entre 2 y 8 pasos del procedimiento o proceso descrito.',
      '- "stats" debe contener entre 1 y 5 datos clave (plazos, responsables, documentos requeridos). Los iconos permitidos son: clock, user, doc, check, alert.',
      '- "highlights" debe contener entre 1 y 4 alertas o datos críticos. Los tipos permitidos son: warning (restricciones/prohibiciones), info (datos informativos), success (validaciones/confirmaciones).',
      '- Si la respuesta no contiene suficientes pasos, genera los que sean posibles sin inventar.',
      '- Todo el contenido debe basarse estrictamente en la PREGUNTA y RESPUESTA proporcionadas.',
      '- Responde SOLO con el JSON válido, sin texto adicional.',
      '',
      'PREGUNTA:',
      question,
      '',
      'RESPUESTA:',
      answer,
    ].join('\n');

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      if (!text || !text.trim()) {
        throw new Error('Gemini devolvió una respuesta vacía para la infografía.');
      }

      // Parse and validate
      const data = JSON.parse(text);

      // Ensure required fields exist with defaults
      return {
        title: data.title || 'Infografía del Manual',
        description: data.description || '',
        steps: Array.isArray(data.steps) ? data.steps : [],
        stats: Array.isArray(data.stats) ? data.stats : [],
        highlights: Array.isArray(data.highlights) ? data.highlights : [],
      };
    } catch (error) {
      // Detect quota errors like the existing llm.service.js does
      if (error.status === 429 || error.code === 429 || /quota|rate.?limit|resource.?exhausted/i.test(error.message || '')) {
        const quotaErr = new Error('GEMINI_QUOTA_EXCEEDED');
        quotaErr.isQuotaError = true;
        throw quotaErr;
      }
      console.error('[Infographic Service] Error:', error.message);
      throw error;
    }
  }
}

module.exports = new InfographicService();
