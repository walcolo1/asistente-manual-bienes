import React from 'react';

/**
 * SourcesPanel — Panel derecho de fuentes consultadas.
 * Props:
 *   sources       Array<{ chapter, section, source }>
 *   usedChunks    Array<{ id, score, metadata: { chapter, section, source } }>
 *   onSourceClick (chunkId: string) => void
 *   embedded      bool — si true, se muestra como vista principal (Referencias)
 */
const SourcesPanel = ({ sources, usedChunks = [], onSourceClick, embedded = false }) => {
  const hasSources = sources && sources.length > 0;

  /**
   * Para cada source (capítulo + sección), busca el ID correspondiente
   * en usedChunks haciendo matching por chapter + section.
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
    <aside
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: '#ffffff',
        borderLeft: '1px solid #c4c6cf',
      }}
    >
      {/* Header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #e0e3e5', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="16" height="16" fill="none" stroke="#1b365d" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#191c1e' }}>Fuentes Consultadas</h3>
        </div>
        {hasSources && (
          <p style={{ margin: '4px 0 0', fontSize: 11, color: '#74777f' }}>
            {sources.length} fuente{sources.length !== 1 ? 's' : ''} — <span style={{ color: '#1b365d', fontWeight: 500 }}>clic para ver fragmento</span>
          </p>
        )}
      </div>

      {/* Sources list */}
      <div
        className="scrollbar-thin"
        style={{
          flex: '1 1 0', minHeight: 0, overflowY: 'auto',
          padding: '16px', display: 'flex', flexDirection: 'column', gap: 10,
        }}
      >
        {hasSources ? (
          sources.map((src, idx) => {
            const chunkId = findChunkId(src);
            const isClickable = Boolean(chunkId);
            return (
              <div
                key={idx}
                onClick={() => isClickable && onSourceClick?.(chunkId)}
                role={isClickable ? 'button' : undefined}
                tabIndex={isClickable ? 0 : undefined}
                onKeyDown={(e) => { if (isClickable && (e.key === 'Enter' || e.key === ' ')) onSourceClick?.(chunkId); }}
                style={{
                  background: '#f2f4f6',
                  border: `1px solid ${isClickable ? '#1b365d30' : '#e0e3e5'}`,
                  borderRadius: 8,
                  padding: 12,
                  cursor: isClickable ? 'pointer' : 'default',
                  transition: 'all 0.15s',
                  outline: 'none',
                }}
                onMouseEnter={(e) => {
                  if (isClickable) {
                    e.currentTarget.style.background = '#e8eef7';
                    e.currentTarget.style.borderColor = '#1b365d';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f2f4f6';
                  e.currentTarget.style.borderColor = isClickable ? '#1b365d30' : '#e0e3e5';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: 6,
                    background: '#1b365d',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 1,
                  }}>
                    {idx + 1}
                  </span>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    {src.chapter && (
                      <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: '#1b365d', textTransform: 'uppercase', letterSpacing: '0.04em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {src.chapter}
                      </p>
                    )}
                    {src.section && (
                      <p style={{ margin: '3px 0 0', fontSize: 11, color: '#44474e', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {src.section}
                      </p>
                    )}
                    {src.source && (
                      <p style={{ margin: '4px 0 0', fontSize: 10, color: '#74777f', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {src.source}
                      </p>
                    )}
                  </div>
                  {isClickable && (
                    <svg width="12" height="12" fill="none" stroke="#1b365d" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 3, opacity: 0.6 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 16px', textAlign: 'center', color: '#74777f' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#eceef0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <svg width="20" height="20" fill="none" stroke="#74777f" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 500 }}>
              {embedded ? 'No hay referencias abiertas.' : 'Sin fuentes para esta respuesta.'}
            </p>
            <p style={{ margin: '4px 0 0', fontSize: 11, opacity: 0.7 }}>
              {embedded
                ? 'Realice una consulta en el chat para ver las fuentes aquí.'
                : 'Las fuentes aparecerán al realizar una consulta.'}
            </p>
          </div>
        )}
      </div>

      {/* Tip Pro */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid #e0e3e5', flexShrink: 0 }}>
        <div style={{ background: '#d6e3ff', border: '1px solid #aec7f7', borderRadius: 8, padding: 12 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <svg width="16" height="16" fill="none" stroke="#002046" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 1 }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <div>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: '#002046' }}>Tip Pro</p>
              <p style={{ margin: '3px 0 0', fontSize: 10, color: '#2e476f', lineHeight: 1.5 }}>
                Haz clic en cualquier fuente para ver el fragmento exacto del manual.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SourcesPanel;
