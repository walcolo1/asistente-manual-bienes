import React, { useState } from 'react';

const ChatInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = input.trim();
    if (!value || disabled) return;
    onSend(value);
    setInput('');
  };

  const quickPrompts = [
    'Resumir el capitulo actual',
    'Listar requisitos',
    'Mostrar validaciones',
  ];

  const isDisabled = disabled || !input.trim();

  return (
    <div className="composer-shell">
      <div className="composer-prompts">
        {quickPrompts.map((prompt) => (
          <button
            type="button"
            key={prompt}
            disabled={disabled}
            onClick={() => setInput(prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="chat-composer">
        <div className="composer-input-wrap">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M7 16h10M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H8l-5 3V7a2 2 0 012-2z" />
          </svg>
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Pregunta al manual por procedimiento, responsable, soporte o excepcion..."
            disabled={disabled}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          disabled={isDisabled}
          className="send-button"
          title="Enviar consulta"
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
          </svg>
        </button>
      </form>

      <div className="composer-options">
        <span>Solo fuentes del manual</span>
        <span>Fuentes visibles</span>
        <span>Modo lectura rapida</span>
      </div>
    </div>
  );
};

export default ChatInput;
