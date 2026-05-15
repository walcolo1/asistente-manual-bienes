import React from 'react';

/**
 * HistoryPanel
 * Muestra las preguntas realizadas durante la sesión y permite volver a ver la respuesta.
 * Todo en memoria local — NO llama Gemini.
 *
 * Props:
 *   history  Array<{ question, answer, sources, usedChunks }>
 *   onRestore  (item) => void  — restaura un ítem al chat principal
 */
const HistoryPanel = ({ history = [], onRestore, onClear }) => {
  if (history.length === 0) {
    return (
      <div style={{
        height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '40px 20px', textAlign: 'center', color: '#74777f',
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: '#f2f4f6',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 12,
        }}>
          <svg width="24" height="24" fill="none" stroke="#b0b3bc" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#44474e' }}>
          Sin historial de sesión
        </p>
        <p style={{ margin: '6px 0 0', fontSize: 11, opacity: 0.7, lineHeight: 1.5 }}>
          Las preguntas realizadas en esta sesión aparecerán aquí.
        </p>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        padding: '14px 20px', borderBottom: '1px solid #e0e3e5',
        flexShrink: 0, background: '#f7f9fb', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="14" height="14" fill="none" stroke="#1b365d" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#191c1e' }}>
              Historial de sesión
            </h3>
          </div>
          <p style={{ margin: '3px 0 0', fontSize: 11, color: '#74777f' }}>
            {history.length} consulta{history.length !== 1 ? 's' : ''} · guardado en memoria local
          </p>
        </div>
        <button
          onClick={onClear}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 11, fontWeight: 600,
            padding: '5px 10px', borderRadius: 6,
            border: '1px solid #c4c6cf',
            background: '#ffffff', color: '#c00',
            cursor: 'pointer', transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#fff8f7'; e.currentTarget.style.borderColor = '#f2b8b5'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = '#c4c6cf'; }}
        >
          <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Limpiar historial
        </button>
      </div>

      {/* List */}
      <div className="scrollbar-thin" style={{
        flex: '1 1 0', minHeight: 0, overflowY: 'auto',
        padding: '12px 12px',
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        {[...history].reverse().map((item, idx) => (
          <div
            key={idx}
            onClick={() => onRestore?.(item)}
            role="button"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onRestore?.(item); }}
            style={{
              background: '#f7f9fb',
              border: '1px solid #e0e3e5',
              borderRadius: 10,
              padding: '12px 14px',
              cursor: 'pointer',
              transition: 'all 0.15s',
              outline: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#e8eef7';
              e.currentTarget.style.borderColor = '#1b365d40';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#f7f9fb';
              e.currentTarget.style.borderColor = '#e0e3e5';
            }}
          >
            {/* Número + pregunta */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
              <span style={{
                flexShrink: 0,
                width: 18, height: 18, borderRadius: 5,
                background: '#1b365d', color: '#fff',
                fontSize: 9, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginTop: 1,
              }}>
                {history.length - idx}
              </span>
              <p style={{
                margin: 0, fontSize: 12, fontWeight: 600,
                color: '#191c1e', lineHeight: 1.4,
              }}>
                {item.question}
              </p>
            </div>

            {/* Preview respuesta */}
            {item.answer && (
              <p style={{
                margin: 0, fontSize: 11, color: '#74777f',
                lineHeight: 1.5,
                display: '-webkit-box', WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                {item.answer}
              </p>
            )}

            {/* Sources count */}
            {item.sources?.length > 0 && (
              <div style={{ marginTop: 6, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {item.sources.slice(0, 3).map((s, si) => (
                  <span key={si} style={{
                    fontSize: 9, fontWeight: 600,
                    color: '#2e476f', background: '#d6e3ff',
                    borderRadius: 4, padding: '1px 5px',
                    textTransform: 'uppercase', letterSpacing: '0.04em',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    maxWidth: 120,
                  }}>
                    {s.section || s.chapter || '—'}
                  </span>
                ))}
              </div>
            )}

            <p style={{ margin: '6px 0 0', fontSize: 10, color: '#b0b3bc' }}>
              Clic para restaurar al chat
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;
