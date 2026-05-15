import React, { useEffect } from 'react';
import { cleanText } from './SectionViewer';

/**
 * SourceViewer — Modal para leer el fragmento exacto del manual.
 *
 * LAYOUT FIX: En lugar de flex-1 en el body (que requiere altura explícita del padre),
 * usamos maxHeight calculado directamente en el contenedor scrollable. Así el modal
 * crece con su contenido hasta el límite y el texto siempre es visible.
 *
 * Props:
 *   chunkId  string | null
 *   data     { id, metadata: { chapter, section, source }, content } | null
 *   loading  bool
 *   error    string | null
 *   onClose  () => void
 */
const SourceViewer = ({ chunkId, data, loading, error, onClose }) => {
  // Cerrar con Escape
  useEffect(() => {
    if (!chunkId) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [chunkId, onClose]);

  // Debug temporal — confirmar datos recibidos
  useEffect(() => {
    if (data) console.log('[SourceViewer] Fuente cargada:', { id: data.id, chapter: data.metadata?.chapter, hasContent: Boolean(data.content), contentLength: data.content?.length });
  }, [data]);

  if (!chunkId) return null;

  /* ── Contenido del body ─────────────────────────────────────────────────── */
  const renderContent = () => {
    if (loading) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '48px 0', color: '#74777f' }}>
          {[0, 160, 320].map((d) => (
            <span key={d} style={{
              width: 10, height: 10, borderRadius: '50%',
              background: '#1b365d', display: 'inline-block',
              animation: 'bounce 1s infinite', animationDelay: `${d}ms`,
            }} />
          ))}
          <span style={{ fontSize: 14, marginLeft: 4 }}>Cargando fuente...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div style={{
          background: '#ffdad6', border: '1px solid #f2b8b5',
          borderRadius: 10, padding: '16px 20px',
          color: '#93000a', fontSize: 14, lineHeight: 1.6,
          margin: '16px 0',
        }}>
          ⚠️ No se pudo abrir esta fuente. <br />
          <span style={{ opacity: 0.8 }}>{error}</span>
        </div>
      );
    }

    if (!data) {
      return (
        <p style={{ color: '#74777f', fontSize: 14, margin: '16px 0', fontStyle: 'italic' }}>
          No se pudo cargar el fragmento textual de esta fuente.
        </p>
      );
    }

    const { metadata = {}, content, id } = data;

    return (
      <>
        {/* ── Metadatos ─────────────────────────────────────────────────────── */}
        <div style={{
          background: '#f2f4f8',
          border: '1px solid #dce3ed',
          borderRadius: 10,
          padding: '14px 18px',
          marginBottom: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}>
          {/* Capítulo */}
          {metadata.chapter && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.06em', color: '#fff',
                background: '#1b365d', borderRadius: 5,
                padding: '3px 9px', flexShrink: 0,
              }}>Capítulo</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1b365d', lineHeight: 1.5, wordBreak: 'break-word' }}>
                {metadata.chapter}
              </span>
            </div>
          )}

          {/* Sección */}
          {metadata.section && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.06em', color: '#2e476f',
                background: '#d6e3ff', border: '1px solid #aec7f7',
                borderRadius: 5, padding: '3px 9px', flexShrink: 0,
              }}>Sección</span>
              <span style={{ fontSize: 13, color: '#44474e', lineHeight: 1.5, wordBreak: 'break-word' }}>
                {metadata.section}
              </span>
            </div>
          )}

          {/* Source + ID */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            {metadata.source && (
              <span style={{
                fontSize: 11, color: '#74777f', fontFamily: 'monospace',
                background: '#eceef0', border: '1px solid #c4c6cf',
                borderRadius: 5, padding: '2px 8px',
              }}>
                📄 {metadata.source}
              </span>
            )}
            {id && (
              <span style={{ fontSize: 10, color: '#9ea3ab', fontFamily: 'monospace' }}>
                id: {id}
              </span>
            )}
          </div>
        </div>

        {/* ── Fragmento textual ──────────────────────────────────────────────── */}
        <div>
          <p style={{
            margin: '0 0 8px',
            fontSize: 11, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.08em',
            color: '#74777f',
          }}>
            Fragmento textual
          </p>

          {/*
           * CLAVE: overflowY: auto + maxHeight explícito aquí.
           * No depende de ningún flex padre para hacer scroll.
           * El modal crece con este contenedor hasta el límite del backdrop.
           */}
          <div
            className="scrollbar-thin"
            style={{
              background: '#fcfdff',
              border: '1px solid #dce3ed',
              borderRadius: 10,
              padding: '20px 24px',
              overflowY: 'auto',
              overflowX: 'hidden',
              maxHeight: '45vh',
            }}
          >
                {content ? (
                  <p style={{
                    margin: 0,
                    fontSize: 14,
                    lineHeight: 1.85,
                    color: '#191c1e',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
                  }}>
                    {cleanText(content)}
                  </p>
            ) : (
              <p style={{ margin: 0, color: '#74777f', fontSize: 13, fontStyle: 'italic' }}>
                No se pudo cargar el fragmento textual de esta fuente.
              </p>
            )}
          </div>
        </div>
      </>
    );
  };

  /* ── JSX ────────────────────────────────────────────────────────────────── */
  return (
    /* Backdrop */
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.52)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 24px',
        animation: 'fadeIn 0.15s ease-out',
        /* backdrop scroll por si el modal excede viewport en pantallas muy pequeñas */
        overflowY: 'auto',
      }}
    >
      {/*
       * Modal card
       * SIN height fijo ni flex-1 en el body → crece con el contenido.
       * maxHeight en el backdrop limita el overflow.
       */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: 16,
          boxShadow: '0 28px 90px rgba(0, 0, 0, 0.30)',
          width: '90vw',
          maxWidth: 960,
          /* Limitar altura total del modal (el body interno tiene su propio maxHeight) */
          maxHeight: '88vh',
          overflowY: 'auto',    /* ← scroll del modal completo si todo junto supera 88vh */
          animation: 'slideUp 0.2s ease-out',
        }}
      >
        {/* ── Header ────────────────────────────────────────────────────────── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 24px',
          borderBottom: '1px solid #e0e3e5',
          background: '#f7f9fb',
          position: 'sticky', top: 0, zIndex: 1,  /* fijo al hacer scroll del modal */
          gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: '#1b365d',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="18" height="18" fill="none" stroke="#fff" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#191c1e' }}>Fuente Consultada</p>
              <p style={{ margin: 0, fontSize: 11, color: '#74777f', marginTop: 1 }}>Fragmento original del manual</p>
            </div>
          </div>

          {/* Botón X */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            style={{
              flexShrink: 0,
              width: 34, height: 34, borderRadius: 8,
              border: 'none', background: '#eceef0', color: '#44474e',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s, color 0.15s',
              fontSize: 18, lineHeight: 1,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#eceef0'; e.currentTarget.style.color = '#44474e'; }}
          >
            ✕
          </button>
        </div>

        {/* ── Body ────────────────────────────────────────────────────────────── */}
        <div style={{ padding: '24px 28px' }}>
          {renderContent()}
        </div>

        {/* ── Footer ──────────────────────────────────────────────────────────── */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid #e0e3e5',
          background: '#f7f9fb',
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'sticky', bottom: 0, zIndex: 1,
        }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              fontSize: 13, fontWeight: 600,
              padding: '8px 28px', borderRadius: 8,
              border: '1px solid #c4c6cf',
              background: '#fff', color: '#44474e',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#1b365d'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#1b365d'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#44474e'; e.currentTarget.style.borderColor = '#c4c6cf'; }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SourceViewer;
