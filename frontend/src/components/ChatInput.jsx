import React, { useState } from 'react';

const ChatInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    setInput('');
  };

  const isDisabled = disabled || !input.trim();

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
      }}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escriba su consulta técnica aquí..."
        disabled={disabled}
        autoComplete="off"
        style={{
          flex: '1 1 0',
          minWidth: 0,
          fontSize: 14,
          padding: '10px 16px',
          borderRadius: 8,
          border: '1px solid #c4c6cf',
          background: '#f7f9fb',
          color: '#191c1e',
          outline: 'none',
          transition: 'border-color 0.15s, box-shadow 0.15s',
          fontFamily: 'inherit',
          opacity: disabled ? 0.6 : 1,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#1b365d';
          e.target.style.boxShadow = '0 0 0 3px rgba(27,54,93,0.12)';
          e.target.style.background = '#ffffff';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#c4c6cf';
          e.target.style.boxShadow = 'none';
          e.target.style.background = '#f7f9fb';
        }}
      />

      <button
        type="submit"
        disabled={isDisabled}
        style={{
          flexShrink: 0,
          width: 42,
          height: 42,
          borderRadius: 8,
          border: 'none',
          background: isDisabled ? '#c4c6cf' : '#1b365d',
          color: '#ffffff',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.15s, transform 0.1s',
          outline: 'none',
          pointerEvents: isDisabled ? 'none' : 'auto',
        }}
        onMouseEnter={(e) => { if (!isDisabled) e.currentTarget.style.background = '#162d50'; }}
        onMouseLeave={(e) => { if (!isDisabled) e.currentTarget.style.background = '#1b365d'; }}
        onMouseDown={(e) => { if (!isDisabled) e.currentTarget.style.transform = 'scale(0.95)'; }}
        onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        title="Enviar consulta (Enter)"
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>
    </form>
  );
};

export default ChatInput;
