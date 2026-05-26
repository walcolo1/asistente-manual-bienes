import React, { useEffect, useRef } from 'react';

const STAT_ICONS = {
  clock: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  user:  'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  doc:   'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  check: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  alert: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z',
};

const HIGHLIGHT_STYLES = {
  warning: { bg: '#fffbeb', border: '#fde68a', color: '#92400e', icon: '⚠️' },
  info:    { bg: '#eff6ff', border: '#bfdbfe', color: '#1e40af', icon: 'ℹ️' },
  success: { bg: '#ecfdf5', border: '#a7f3d0', color: '#065f46', icon: '✓' },
};

const InfographicModal = ({ data, loading, error, onClose, question }) => {
  const printRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!loading && !data && !error) return null;

  return (
    <div className="infographic-overlay" onClick={onClose}>
      <div
        className="infographic-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="infographic-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="infographic-modal-icon">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </span>
            <div>
              <h2 className="infographic-modal-title">Infografía Técnica</h2>
              <p className="infographic-modal-subtitle">Generada con IA a partir de la consulta</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {data && (
              <button
                className="infographic-print-btn"
                onClick={handlePrint}
                title="Imprimir / Guardar PDF"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Imprimir
              </button>
            )}
            <button className="infographic-close-btn" onClick={onClose} title="Cerrar">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="infographic-modal-body scrollbar-thin">
          {loading && (
            <div className="infographic-loading">
              <div className="infographic-loading-spinner" />
              <p>Generando infografía con IA...</p>
              <p style={{ fontSize: 12, color: '#9ca3af' }}>Esto puede tardar unos segundos</p>
            </div>
          )}

          {error && (
            <div className="infographic-error">
              <span style={{ fontSize: 28 }}>⚠️</span>
              <p style={{ fontWeight: 700 }}>No se pudo generar la infografía</p>
              <p style={{ fontSize: 13, color: '#6b7280' }}>{error}</p>
              <button className="infographic-retry-btn" onClick={onClose}>Cerrar</button>
            </div>
          )}

          {data && (
            <div className="infographic-content" ref={printRef} id="infographic-print-area">
              {/* Title Block */}
              <div className="infographic-title-block">
                <div className="infographic-title-badge">INFOGRAFÍA TÉCNICA</div>
                <h1 className="infographic-main-title">{data.title}</h1>
                {data.description && (
                  <p className="infographic-description">{data.description}</p>
                )}
                {question && (
                  <div className="infographic-query-tag">
                    <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01" />
                    </svg>
                    <span>{question}</span>
                  </div>
                )}
              </div>

              {/* Stats Row */}
              {data.stats && data.stats.length > 0 && (
                <div className="infographic-section">
                  <div className="infographic-section-label">
                    <span className="infographic-section-dot" style={{ background: '#2563eb' }} />
                    Datos Clave
                  </div>
                  <div className="infographic-stats-grid">
                    {data.stats.map((stat, i) => (
                      <div className="infographic-stat-card" key={i} style={{ animationDelay: `${i * 80}ms` }}>
                        <div className="infographic-stat-icon">
                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d={STAT_ICONS[stat.icon] || STAT_ICONS.doc} />
                          </svg>
                        </div>
                        <div className="infographic-stat-value">{stat.value}</div>
                        <div className="infographic-stat-label">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Timeline Steps */}
              {data.steps && data.steps.length > 0 && (
                <div className="infographic-section">
                  <div className="infographic-section-label">
                    <span className="infographic-section-dot" style={{ background: '#16a34a' }} />
                    Proceso Paso a Paso
                  </div>
                  <div className="infographic-timeline">
                    {data.steps.map((step, i) => (
                      <div className="infographic-timeline-item" key={i} style={{ animationDelay: `${i * 100}ms` }}>
                        <div className="infographic-timeline-rail">
                          <span className="infographic-timeline-number">{step.number || i + 1}</span>
                          {i < data.steps.length - 1 && <div className="infographic-timeline-line" />}
                        </div>
                        <div className="infographic-timeline-card">
                          <h4>{step.title}</h4>
                          <p>{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights */}
              {data.highlights && data.highlights.length > 0 && (
                <div className="infographic-section">
                  <div className="infographic-section-label">
                    <span className="infographic-section-dot" style={{ background: '#d97706' }} />
                    Puntos Importantes
                  </div>
                  <div className="infographic-highlights">
                    {data.highlights.map((h, i) => {
                      const style = HIGHLIGHT_STYLES[h.type] || HIGHLIGHT_STYLES.info;
                      return (
                        <div
                          className="infographic-highlight-card"
                          key={i}
                          style={{
                            background: style.bg,
                            borderColor: style.border,
                            color: style.color,
                            animationDelay: `${i * 80}ms`,
                          }}
                        >
                          <span className="infographic-highlight-icon">{style.icon}</span>
                          <p>{h.text}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="infographic-footer">
                <p>Manual de Bienes — Ministerio de Defensa Nacional</p>
                <p>Generada el {new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfographicModal;
