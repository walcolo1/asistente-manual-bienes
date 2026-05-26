// parser.js
// Utilidades para formatear y limpiar marcas Markdown en texto de la interfaz académica.
// Utiliza React.createElement para garantizar la portabilidad y evitar errores de compilación de JSX.

import React from 'react';

/**
 * Convierte un texto con formato Markdown básico (negrillas, cursivas, listas)
 * en elementos React limpios y seguros, sin mostrar los caracteres crudos.
 * @param {string} text Texto con marcas Markdown
 * @returns {React.ReactNode}
 */
export function formatMarkdown(text) {
  if (!text) return '';
  
  const lines = text.split('\n');
  
  return lines.map((line, idx) => {
    let currentLine = line.trim();
    
    // Omitir líneas vacías
    if (!line) {
      return React.createElement('div', { key: idx, className: 'h-2' });
    }
    
    // Detectar encabezados y limpiarlos
    if (currentLine.startsWith('####')) {
      const title = currentLine.replace(/^####\s*/, '').replace(/\*\*+/g, '');
      return React.createElement('h5', { key: idx, className: 'academic-h5' }, title);
    }
    if (currentLine.startsWith('###')) {
      const title = currentLine.replace(/^###\s*/, '').replace(/\*\*+/g, '');
      return React.createElement('h4', { key: idx, className: 'academic-h4' }, title);
    }
    if (currentLine.startsWith('##')) {
      const title = currentLine.replace(/^##\s*/, '').replace(/\*\*+/g, '');
      return React.createElement('h3', { key: idx, className: 'academic-h3' }, title);
    }
    
    // Detectar listas y limpiarlas
    const isBulletList = currentLine.startsWith('- ') || currentLine.startsWith('* ');
    const isNumberedList = /^\d+\.\s+/.test(currentLine);
    
    if (isBulletList) {
      currentLine = currentLine.replace(/^[-*]\s+/, '');
      return React.createElement(
        'li',
        { key: idx, className: 'academic-li' },
        formatInlineMarkdown(currentLine)
      );
    }
    
    if (isNumberedList) {
      const numPrefix = currentLine.match(/^(\d+\.)\s+/)[1];
      currentLine = currentLine.replace(/^\d+\.\s+/, '');
      return React.createElement(
        'li',
        { key: idx, className: 'academic-li-numbered' },
        React.createElement('span', { className: 'font-bold text-accent mr-1' }, numPrefix),
        formatInlineMarkdown(currentLine)
      );
    }
    
    // Párrafo ordinario
    return React.createElement(
      'p',
      { key: idx, className: 'academic-paragraph' },
      formatInlineMarkdown(currentLine)
    );
  });
}

/**
 * Procesa formatos en línea (inline) como **negritas** y *cursivas*
 * @param {string} inlineText Texto de una línea
 * @returns {React.ReactNode}
 */
export function formatInlineMarkdown(inlineText) {
  if (!inlineText) return '';
  
  // Expresión regular para capturar negritas (**texto**), cursivas (*texto*) o texto plano
  const regex = /(\*\*.*?\*\*|\*.*?\*)/g;
  const matches = inlineText.split(regex);
  
  return matches.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const content = part.slice(2, -2);
      return React.createElement('strong', { key: i, className: 'academic-strong' }, content);
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      const content = part.slice(1, -1);
      return React.createElement('em', { key: i, className: 'academic-em' }, content);
    }
    return part;
  });
}
