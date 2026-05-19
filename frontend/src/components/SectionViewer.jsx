import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../config/api';

const API_BASE = API_BASE_URL;

// ── Función de limpieza visual de Markdown ────────────────────────────────────
/**
 * cleanText(text)
 * Limpia marcas Markdown crudas para presentación visual.
 * NO modifica chunks.json ni el texto almacenado — solo formatea para mostrar.
 *
 * Elimina:
 *   - Encabezados # ## ### #### ##### ###### ####### al inicio de línea
 *   - Espacios en blanco duplicados
 *   - Líneas con solo # (sin texto)
 * Conserva:
 *   - Saltos de párrafo
 *   - Contenido normativo completo
 *   - Signos de puntuación
 */
export function cleanText(text) {
  if (!text) return '';
  return text
    // 1. Quitar líneas que solo contienen # (sin texto)
    .replace(/^#{1,7}\s*$/gm, '')
    // 2. Quitar prefijos # al inicio de línea
    .replace(/^#{1,7}\s+/gm, '')
    // 3. Quitar secuencias de # al final de línea o aisladas en el texto (artefactos de conversión)
    .replace(/\s+#{1,7}\s*$/gm, '')
    .replace(/#{2,}/g, '') // Quitar cualquier secuencia de 2 o más # en cualquier posición
    // 4. Eliminar espacios en blanco múltiples en la misma línea
    .replace(/[ \t]{2,}/g, ' ')
    // 5. Quitar líneas en blanco triples o más
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// ── Íconos ───────────────────────────────────────────────────────────────────
const IconClose = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const IconCopy = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const IconAsk = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const IconLoading = () => (
  <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
    {[0, 150, 300].map(d => (
      <span key={d} style={{
        width: 5, height: 5, borderRadius: '50%', background: '#fff',
        display: 'inline-block', animation: 'bounce 1s infinite',
        animationDelay: `${d}ms`,
      }} />
    ))}
  </span>
);

// ── Componente ────────────────────────────────────────────────────────────────
/**
 * SectionViewer
 * Props:
 *   sectionId    string | null
 *   onAskAbout   (sectionId: string, question: string) => void
 *   onClose      () => void
 */
const SectionViewer = ({ sectionId, onAskAbout, onClose }) => {
  const [data, setData]         = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [copied, setCopied]     = useState(false);
  const [asking, setAsking]     = useState(false);
  const [showChunks, setShowChunks] = useState(false);

  useEffect(() => {
    if (!sectionId) { setData(null); setError(null); return; }

    let cancelled = false;
    setLoading(true);
    setError(null);
    setData(null);
    setCopied(false);
    setAsking(false);
    setShowChunks(false);

    fetch(`${API_BASE}/api/section/${encodeURIComponent(sectionId)}`)
      .then(r => {
        if (!r.ok) return r.json().then(j => { throw new Error(j.error || `HTTP ${r.status}`); });
        return r.json();
      })
      .then(json => { if (!cancelled) setData(json); })
      .catch(err => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [sectionId]);

  // Copiar texto limpio (sin ######)
  const handleCopy = () => {
    if (!data?.fullText) return;
    navigator.clipboard.writeText(cleanText(data.fullText)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Preguntar sobre sección → usa sectionId directamente (sin búsqueda textual)
  const handleAskAbout = () => {
    if (!data || asking) return;
    setAsking(true);
    // Mejora del prompt para ser más específico y técnico, reduciendo falsos negativos
    const question = `Resume el contenido técnico de la sección "${data.section}" del ${data.chapter}, detallando los requisitos, definiciones o procedimientos clave mencionados en el texto.`;
    onAskAbout?.(sectionId, question);
  };

  // ── Sin selección ──
  if (!sectionId) {
    return (
      <div style={{
        height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px', textAlign: 'center', color: '#74777f',
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: 14, background: '#f2f4f6',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
        }}>
          <svg width="28" height="28" fill="none" stroke="#b0b3bc" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#44474e' }}>
          Seleccione una sección
        </p>
        <p style={{ margin: '6px 0 0', fontSize: 12, opacity: 0.7, lineHeight: 1.5 }}>
          Haga clic en cualquier sección de la tabla de contenido para ver su contenido completo.
        </p>
      </div>
    );
  }

  // ── Cargando ──
  if (loading) {
    return (
      <div style={{
        height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', color: '#74777f', gap: 10,
      }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {[0, 150, 300].map(d => (
            <span key={d} style={{
              width: 7, height: 7, borderRadius: '50%', background: '#1b365d',
              display: 'inline-block', animation: 'bounce 1s infinite', animationDelay: `${d}ms`,
            }} />
          ))}
        </div>
        <span style={{ fontSize: 13 }}>Cargando sección...</span>
      </div>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <div style={{ padding: 24 }}>
        <div style={{
          padding: 16, background: '#fff0f0', border: '1px solid #fcc',
          borderRadius: 10, color: '#c00', fontSize: 13,
        }}>
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const chunkCount  = Array.isArray(data.chunks) ? data.chunks.length : 0;
  const displayText = cleanText(data.fullText);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* ── Header ── */}
      <div style={{
        flexShrink: 0, padding: '16px 20px',
        background: '#f7f9fb', borderBottom: '1px solid #e0e3e5',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <span style={{
            display: 'inline-block', fontSize: 10, fontWeight: 700,
            letterSpacing: '0.06em', color: '#1b365d', background: '#d6e3ff',
            borderRadius: 6, padding: '2px 8px', textTransform: 'uppercase',
          }}>
            {data.chapter}
          </span>
          <button
            onClick={onClose}
            title="Cerrar sección"
            style={{
              width: 26, height: 26, borderRadius: 6,
              border: '1px solid #e0e3e5', background: 'transparent',
              color: '#74777f', display: 'flex', alignItems: 'center',
              justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#f2f4f6'; e.currentTarget.style.color = '#c00'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#74777f'; }}
          >
            <IconClose />
          </button>
        </div>
        <h2 style={{ margin: '8px 0 4px', fontSize: 15, fontWeight: 700, color: '#191c1e', lineHeight: 1.3 }}>
          {data.section}
        </h2>
        <p style={{ margin: 0, fontSize: 10, color: '#74777f', fontFamily: 'monospace' }}>
          {data.source} · {chunkCount} fragmento{chunkCount !== 1 ? 's' : ''}
        </p>
      </div>

      {/* ── Content ── */}
      <div className="scrollbar-thin" style={{ flex: '1 1 0', minHeight: 0, overflowY: 'auto', padding: '20px 24px' }}>
        {/* Texto principal limpio */}
        <div style={{
          whiteSpace: 'pre-wrap', fontSize: 13, lineHeight: 1.85,
          color: '#2d3136', fontFamily: "'Inter', sans-serif",
          background: '#fdfdfe', border: '1px solid #e8eaed',
          borderRadius: 10, padding: '18px 20px',
        }}>
          {displayText || '(Sin contenido disponible)'}
        </div>

        {/* Fragmentos individuales si hay más de 1 */}
        {chunkCount > 1 && Array.isArray(data.chunks) && (
          <div style={{ marginTop: 20 }}>
            <button
              onClick={() => setShowChunks(!showChunks)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '6px 12px', background: 'transparent',
                border: '1px solid #c4c6cf', borderRadius: 6,
                color: '#44474e', fontSize: 11, fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.15s'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f2f4f6'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: showChunks ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              {showChunks ? 'Ocultar fragmentos técnicos' : 'Ver fragmentos técnicos'}
            </button>
            {showChunks && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                {data.chunks.map((chunk, i) => (
                  <div key={chunk.id} style={{
                    background: '#f2f4f6', border: '1px solid #e0e3e5',
                    borderRadius: 8, padding: '10px 14px',
                  }}>
                    <p style={{ margin: '0 0 4px', fontSize: 10, color: '#74777f', fontFamily: 'monospace' }}>
                      [{i + 1}] {(chunk.id || '').slice(0, 8)}…
                    </p>
                    <p style={{
                      margin: 0, fontSize: 12, color: '#44474e',
                      lineHeight: 1.6, whiteSpace: 'pre-wrap',
                    }}>
                      {cleanText(chunk.content)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Actions ── */}
      <div style={{
        flexShrink: 0, padding: '12px 20px',
        borderTop: '1px solid #e0e3e5', background: '#f7f9fb',
        display: 'flex', gap: 8,
      }}>
        {/* Copiar texto limpio */}
        <button
          onClick={handleCopy}
          title="Copiar el texto de la sección sin símbolos Markdown"
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            padding: '8px 12px', borderRadius: 8,
            border: '1px solid #c4c6cf',
            background: copied ? '#d6e3ff' : '#ffffff',
            color: copied ? '#1b365d' : '#44474e',
            fontSize: 12, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s',
          }}
        >
          <IconCopy />
          {copied ? '¡Copiado!' : 'Copiar texto'}
        </button>

        {/* Preguntar sobre la sección — llama Gemini solo si el usuario pulsa */}
        <button
          onClick={handleAskAbout}
          disabled={asking}
          title="Envía esta sección al chat como contexto para hacer preguntas — usa Gemini"
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            padding: '8px 12px', borderRadius: 8, border: 'none',
            background: asking ? '#4a6fa5' : '#1b365d',
            color: '#ffffff', fontSize: 12, fontWeight: 600,
            cursor: asking ? 'default' : 'pointer', transition: 'opacity 0.15s',
            opacity: asking ? 0.8 : 1,
          }}
          onMouseEnter={e => { if (!asking) e.currentTarget.style.opacity = '0.85'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
        >
          {asking ? <><IconLoading /> Consultando...</> : <><IconAsk /> Preguntar a la IA</>}
        </button>
      </div>
    </div>
  );
};

// ── Error Boundary ────────────────────────────────────────────────────────────
class SectionViewerBoundary extends React.Component {
  constructor(props) { super(props); this.state = { crashed: false }; }
  static getDerivedStateFromError() { return { crashed: true }; }
  render() {
    if (this.state.crashed) {
      return (
        <div style={{ padding: 24 }}>
          <div style={{
            padding: 16, background: '#fff0f0', border: '1px solid #fcc',
            borderRadius: 10, color: '#c00', fontSize: 13,
          }}>
            No se pudo cargar el detalle de esta sección.<br />
            <small>Seleccione otra sección o recargue la página.</small>
          </div>
        </div>
      );
    }
    return <SectionViewer {...this.props} />;
  }
}

export default SectionViewerBoundary;
