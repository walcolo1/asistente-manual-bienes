import React from 'react';

/**
 * ChatMessage — Burbuja de chat.
 * Props:
 *   role          'user' | 'system'
 *   content       string
 *   sources       Array<{ chapter, section, source }>
 *   usedChunks    Array<{ id, metadata }>  — para hacer los chips clickeables
 *   isError       bool
 *   onSourceClick (chunkId: string) => void
 */
const ChatMessage = ({ role, content, sources, usedChunks = [], isError, onSourceClick }) => {
  const isUser = role === 'user';
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const bubbleStyle = isUser
    ? { background: '#1b365d', color: '#ffffff', borderRadius: '16px 16px 4px 16px' }
    : isError
    ? { background: '#ffdad6', color: '#93000a', border: '1px solid #f2b8b5', borderRadius: '16px 16px 16px 4px' }
    : { background: '#ffffff', color: '#191c1e', border: '1px solid #e0e3e5', borderRadius: '16px 16px 16px 4px' };

  /**
   * Encuentra el ID del chunk correspondiente a este source chip.
   */
  const findChunkId = (src) => {
    const match = usedChunks.find(
      (c) =>
        c.metadata?.chapter === src.chapter &&
        c.metadata?.section === src.section
    );
    return match?.id || null;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: isUser ? 'flex-end' : 'flex-start',
        animation: 'fadeIn 0.3s ease-out forwards',
        marginBottom: 4,
      }}
    >
      <div
        style={{
          maxWidth: '82%',
          padding: '12px 16px',
          fontSize: 14,
          lineHeight: 1.6,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          fontFamily: 'inherit',
          position: 'relative',
          ...bubbleStyle,
        }}
      >
        {content}

        {/* Copy button for system messages */}
        {!isUser && !isError && (
          <button
            onClick={handleCopy}
            title="Copiar respuesta"
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: copied ? '#1a7240' : '#74777f',
              padding: 4,
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s',
              opacity: 0.6,
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.background = '#f2f4f6'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '0.6'; e.currentTarget.style.background = 'transparent'; }}
          >
            {copied ? (
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        )}

        {/* Source chips — clickable */}
        {!isUser && sources && sources.length > 0 && (
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #e0e3e5' }}>
            <p style={{ margin: '0 0 6px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#74777f' }}>
              Fuentes:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {sources.map((src, idx) => {
                const chunkId = findChunkId(src);
                const isClickable = Boolean(chunkId);
                return (
                  <span
                    key={idx}
                    onClick={() => isClickable && onSourceClick?.(chunkId)}
                    role={isClickable ? 'button' : undefined}
                    tabIndex={isClickable ? 0 : undefined}
                    onKeyDown={(e) => { if (isClickable && (e.key === 'Enter' || e.key === ' ')) onSourceClick?.(chunkId); }}
                    title={isClickable ? 'Ver fragmento del manual' : undefined}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 11,
                      padding: '3px 10px',
                      borderRadius: 6,
                      background: isClickable ? '#dce8fa' : '#eceef0',
                      color: '#2e476f',
                      border: `1px solid ${isClickable ? '#aec7f7' : '#c4c6cf'}`,
                      cursor: isClickable ? 'pointer' : 'default',
                      transition: 'all 0.15s',
                      outline: 'none',
                      userSelect: 'none',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={(e) => { if (isClickable) { e.currentTarget.style.background = '#c5d9f5'; e.currentTarget.style.borderColor = '#1b365d'; } }}
                    onMouseLeave={(e) => { if (isClickable) { e.currentTarget.style.background = '#dce8fa'; e.currentTarget.style.borderColor = '#aec7f7'; } }}
                  >
                    <strong>{src.chapter}</strong>
                    {src.section && (
                      <span style={{ marginLeft: 4, fontWeight: 400, color: '#44474e' }}>
                        — {src.section}
                      </span>
                    )}
                    {isClickable && (
                      <svg width="10" height="10" fill="none" stroke="#2e476f" viewBox="0 0 24 24" style={{ flexShrink: 0, opacity: 0.7 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
