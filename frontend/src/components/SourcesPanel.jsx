import React from 'react';

function getChunkForSource(source, usedChunks) {
  return usedChunks.find(
    (chunk) =>
      chunk.metadata?.chapter === source.chapter &&
      chunk.metadata?.section === source.section
  );
}

function relevanceLabel(score, index) {
  if (score >= 80 || index === 0) return 'Alta';
  if (score >= 20) return 'Media';
  return 'Contextual';
}

function highlightExcerpt(text) {
  if (!text) return 'El fragmento completo se abrira al ver la fuente en contexto.';
  const terms = /(debe|debera|validacion|procedimiento|responsable|registro|soporte|acta|baja|alta|control|inventario)/gi;
  const parts = String(text).split(terms);
  return parts.map((part, index) => {
    if (part.match(terms)) {
      return <mark key={`${part}-${index}`} className="source-highlight">{part}</mark>;
    }
    return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
  });
}

const SourcesPanel = ({ sources = [], usedChunks = [], onSourceClick, embedded = false }) => {
  const hasSources = sources.length > 0;

  return (
    <aside className={`sources-shell ${embedded ? 'embedded' : ''}`}>
      <header className="sources-header">
        <div>
          <p className="panel-kicker">Evidencia</p>
          <h2>Fuentes inteligentes</h2>
        </div>
        {hasSources && <span className="source-count">{sources.length}</span>}
      </header>

      <div className="scrollbar-thin sources-list">
        {hasSources ? (
          sources.map((source, index) => {
            const chunk = getChunkForSource(source, usedChunks);
            const clickable = Boolean(chunk?.id);
            const score = chunk?.score || 0;

            return (
              <article className="source-card" key={`${source.chapter}-${source.section}-${index}`}>
                <div className="source-card-top">
                  <span className="source-index">{index + 1}</span>
                  <div>
                    <p className="source-relevance">Relevancia {relevanceLabel(score, index)}</p>
                    <h3>{source.section || source.chapter || 'Fuente del manual'}</h3>
                  </div>
                </div>

                {source.chapter && <p className="source-chapter">{source.chapter}</p>}

                <blockquote className="source-excerpt">
                  {highlightExcerpt(chunk?.excerpt)}
                </blockquote>

                <div className="source-meta">
                  <span>{source.source || chunk?.metadata?.source || 'manual.structured.md'}</span>
                  {score > 0 && <span>score {Math.round(score)}</span>}
                </div>

                <div className="source-actions">
                  <button
                    type="button"
                    disabled={!clickable}
                    onClick={() => clickable && onSourceClick?.(chunk.id)}
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.5L19 8.5V19a2 2 0 01-2 2z" />
                    </svg>
                    Ver en contexto
                  </button>
                </div>
              </article>
            );
          })
        ) : (
          <div className="sources-empty">
            <div>
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3>{embedded ? 'No hay referencias abiertas' : 'Sin fuentes todavia'}</h3>
            <p>Haz una consulta para ver fragmentos relevantes y abrirlos en contexto.</p>
          </div>
        )}
      </div>

      <footer className="sources-footer">
        <span />
        <p>Las respuestas deben validarse contra estos fragmentos antes de tomar decisiones administrativas.</p>
      </footer>
    </aside>
  );
};

export default SourcesPanel;
