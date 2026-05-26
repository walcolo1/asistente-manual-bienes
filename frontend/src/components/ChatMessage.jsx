import React from 'react';

const ACTIONS = [
  { id: 'more', label: 'Ver mas', icon: 'M12 5v14m7-7H5' },
  { id: 'source', label: 'Ir a fuente', icon: 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' },
  { id: 'copy', label: 'Copiar', icon: 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z' },
  { id: 'infographic', label: 'Infografía', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
];

const KEYWORD_PATTERN = /\b(requisito|procedimiento|validacion|responsable|aprobacion|documento|soporte|registro|control|inventario|baja|alta|traslado|obligatorio|debe|debera|acta|evidencia|sistema)\b/gi;

function cleanLine(line) {
  return String(line || '')
    .replace(/^#{1,6}\s*/, '')
    .replace(/\*\*/g, '')
    .replace(/\s+$/g, '')
    .trim();
}

function splitResponse(content) {
  const lines = String(content || '').split(/\r?\n/);
  const sections = [];
  let current = { title: 'Resumen', lines: [] };

  lines.forEach((rawLine) => {
    const line = cleanLine(rawLine);
    if (!line) {
      if (current.lines.length && current.lines[current.lines.length - 1] !== '') {
        current.lines.push('');
      }
      return;
    }

    const heading = rawLine.match(/^\s{0,3}#{1,4}\s+(.+)$/);
    const titledLine = line.match(/^([A-ZÁÉÍÓÚÑ][^:]{2,48}):\s*(.*)$/);

    if (heading || (titledLine && line.length < 90)) {
      if (current.lines.some(Boolean)) sections.push(current);
      current = {
        title: cleanLine(heading ? heading[1] : titledLine[1]),
        lines: titledLine?.[2] ? [cleanLine(titledLine[2])] : [],
      };
      return;
    }

    current.lines.push(line);
  });

  if (current.lines.some(Boolean)) sections.push(current);
  return sections.length ? sections : [{ title: 'Respuesta', lines: [String(content || '')] }];
}

function extractConcepts(content) {
  const found = new Map();
  String(content || '').replace(KEYWORD_PATTERN, (match) => {
    const key = match.toLowerCase();
    if (!found.has(key)) found.set(key, match);
    return match;
  });
  return Array.from(found.values()).slice(0, 6);
}

function renderHighlighted(text) {
  const parts = String(text || '').split(KEYWORD_PATTERN);
  return parts.map((part, index) => {
    if (part.match(KEYWORD_PATTERN)) {
      return <mark key={`${part}-${index}`} className="concept-highlight">{part}</mark>;
    }
    return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
  });
}

function renderLine(line, index) {
  if (!line) return <div key={index} className="answer-gap" />;

  const numbered = line.match(/^(\d+)[.)]\s+(.+)$/);
  const bullet = line.match(/^[-*•]\s+(.+)$/);

  if (numbered) {
    return (
      <div className="answer-step" key={index}>
        <span className="step-index">{numbered[1]}</span>
        <p>{renderHighlighted(numbered[2])}</p>
      </div>
    );
  }

  if (bullet) {
    return (
      <div className="answer-bullet" key={index}>
        <span />
        <p>{renderHighlighted(bullet[1])}</p>
      </div>
    );
  }

  return <p className="answer-paragraph" key={index}>{renderHighlighted(line)}</p>;
}

const SourceChip = ({ src, chunkId, onSourceClick }) => {
  const clickable = Boolean(chunkId);
  return (
    <button
      type="button"
      className="source-chip"
      disabled={!clickable}
      onClick={() => clickable && onSourceClick?.(chunkId)}
      title={clickable ? 'Ver fuente en contexto' : 'Fuente sin fragmento enlazado'}
    >
      <span>{src.section || src.chapter || 'Fuente'}</span>
      {clickable && (
        <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  );
};

const ChatMessage = ({ role, content, sources = [], usedChunks = [], isError, onSourceClick, onSuggestionClick, onGenerateInfographic, isLastAssistant }) => {
  const isUser = role === 'user';
  const [copied, setCopied] = React.useState(false);

  const sections = React.useMemo(() => splitResponse(content), [content]);
  const concepts = React.useMemo(() => extractConcepts(content), [content]);

  const findChunkId = (src) => {
    const match = usedChunks.find(
      (chunk) =>
        chunk.metadata?.chapter === src.chapter &&
        chunk.metadata?.section === src.section
    );
    return match?.id || null;
  };

  const copyAnswer = () => {
    navigator.clipboard.writeText(content || '').then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    });
  };

  const openFirstSource = () => {
    const first = sources.map(findChunkId).find(Boolean);
    if (first) onSourceClick?.(first);
  };

  if (isUser) {
    return (
      <article className="message-row user-message">
        <div className="message-label">Pregunta</div>
        <div className="user-card">{content}</div>
      </article>
    );
  }

  if (role === 'system' && content?.startsWith('Bienvenido')) {
    return (
      <article className="welcome-panel">
        <div className="welcome-icon">
          <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.5L19 8.5V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <p className="welcome-title">Copiloto tecnico del Manual de Bienes</p>
          <p className="welcome-copy">Pregunta por procedimientos, requisitos, responsables o validaciones. Las fuentes apareceran a la derecha con fragmentos verificables.</p>
        </div>
      </article>
    );
  }

  return (
    <article className={`message-row assistant-message ${isError ? 'is-error' : ''}`}>
      <div className="assistant-header">
        <div>
          <span className="message-label">{isError ? 'Aviso del sistema' : 'Respuesta'}</span>
          {!isError && <p>Respuesta estructurada con evidencia documental.</p>}
        </div>
        {!isError && (
          <button className="icon-action" type="button" onClick={copyAnswer} title="Copiar respuesta">
            {copied ? (
              <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ACTIONS[2].icon} />
              </svg>
            )}
          </button>
        )}
      </div>

      {!isError && concepts.length > 0 && (
        <div className="concept-row">
          {concepts.map((concept) => (
            <span key={concept}>{concept}</span>
          ))}
        </div>
      )}

      <div className="answer-card-stack">
        {sections.map((section, index) => (
          <section className="answer-card" key={`${section.title}-${index}`}>
            <div className="answer-card-title">
              <span className="section-glyph">{index + 1}</span>
              <h3>{section.title}</h3>
            </div>
            <div className="answer-body">
              {section.lines.map(renderLine)}
            </div>
          </section>
        ))}
      </div>

      {!isError && sources.length > 0 && (
        <div className="message-sources">
          <span>Fuentes usadas</span>
          <div>
            {sources.slice(0, 4).map((src, index) => (
              <SourceChip key={`${src.chapter}-${src.section}-${index}`} src={src} chunkId={findChunkId(src)} onSourceClick={onSourceClick} />
            ))}
          </div>
        </div>
      )}

      {!isError && (
        <div className="quick-actions">
          {ACTIONS
            .filter((action) => action.id !== 'infographic' || isLastAssistant)
            .map((action) => (
            <button
              type="button"
              key={action.id}
              className={action.id === 'infographic' ? 'infographic-action-btn' : undefined}
              onClick={
                action.id === 'copy' ? copyAnswer
                : action.id === 'source' ? openFirstSource
                : action.id === 'infographic' ? () => onGenerateInfographic?.()
                : undefined
              }
              disabled={action.id === 'source' && sources.length === 0}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
              </svg>
              {action.id === 'copy' && copied ? 'Copiado' : action.label}
            </button>
          ))}
        </div>
      )}

      {!isError && onSuggestionClick && (
        <div className="suggestion-strip">
          <span>Tambien puedes preguntar</span>
          {[
            'Que documentos son obligatorios?',
            'Quien aprueba este proceso?',
            'Que validaciones debo revisar?',
          ].map((suggestion) => (
            <button type="button" key={suggestion} onClick={() => onSuggestionClick(suggestion)}>
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </article>
  );
};

export default ChatMessage;
