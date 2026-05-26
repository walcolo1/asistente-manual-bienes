import React, { useState, useEffect, useMemo, useCallback } from 'react';
import API_BASE_URL from '../config/api';

const API_BASE = API_BASE_URL;

// ── Íconos ───────────────────────────────────────────────────────────────────
const IconBook = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const IconChevron = ({ open }) => (
  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"
    style={{ transition: 'transform 0.2s', transform: open ? 'rotate(90deg)' : 'rotate(0deg)', flexShrink: 0 }}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const IconFolder = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
  </svg>
);

const IconFile = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const IconSearch = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

// ── Utilidades de Filtrado ────────────────────────────────────────────────────
const normalizeText = (text) => {
  if (typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Quitar tildes
    .replace(/[^a-z0-9\s]/g, ' ')    // Signos por espacio
    .trim();
};

const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const matchesQuery = (targetText, queryTokens) => {
  if (!queryTokens || queryTokens.length === 0) return true;
  const targetNormalized = normalizeText(targetText);
  if (!targetNormalized) return false;

  // Cada token debe estar presente como inicio de palabra (evita tangibles -> intangibles)
  return queryTokens.every(token => {
    try {
      const safeToken = escapeRegExp(token);
      const regex = new RegExp(`\\b${safeToken}`, 'i');
      return regex.test(targetNormalized);
    } catch (e) {
      console.warn('[TOC] Invalid regex token:', token);
      return targetNormalized.includes(token.toLowerCase());
    }
  });
};

// ── Estilos ───────────────────────────────────────────────────────────────────
const S = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    background: '#ffffff',
  },
  header: {
    padding: '16px 20px',
    borderBottom: '1px solid #e0e3e5',
    flexShrink: 0,
    background: '#f7f9fb',
  },
  headerRow: { display: 'flex', alignItems: 'center', gap: 8 },
  headerTitle: { margin: 0, fontSize: 13, fontWeight: 700, color: '#191c1e' },
  headerSub: { margin: '3px 0 0', fontSize: 11, color: '#74777f' },
  scrollArea: {
    flex: '1 1 0',
    minHeight: 0,
    overflowY: 'auto',
    padding: '12px 8px',
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    color: '#74777f',
    fontSize: 13,
    gap: 10,
  },
  error: {
    margin: 16,
    padding: 12,
    background: '#fff0f0',
    border: '1px solid #fcc',
    borderRadius: 8,
    color: '#c00',
    fontSize: 12,
  },
  chapterBtn: (isOpen) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '9px 12px',
    borderRadius: 8,
    border: 'none',
    background: isOpen ? '#eceef8' : 'transparent',
    color: isOpen ? '#1b365d' : '#191c1e',
    fontSize: 12,
    fontWeight: 700,
    cursor: 'pointer',
    textAlign: 'left',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    transition: 'background 0.15s',
    marginBottom: 1,
  }),
  sectionList: (isOpen) => ({
    overflow: 'hidden',
    maxHeight: isOpen ? '9999px' : 0,
    transition: 'max-height 0.25s ease',
    paddingLeft: 8,
    marginBottom: isOpen ? 6 : 0,
  }),
  sectionBtn: (isActive) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
    padding: '7px 10px',
    borderRadius: 6,
    border: 'none',
    background: isActive ? '#d6e3ff' : 'transparent',
    color: isActive ? '#002046' : '#44474e',
    fontSize: 11,
    fontWeight: isActive ? 600 : 400,
    cursor: 'pointer',
    textAlign: 'left',
    lineHeight: 1.4,
    transition: 'background 0.12s',
    marginBottom: 1,
  }),
  badge: {
    flexShrink: 0,
    marginTop: 1,
    color: '#74777f',
  },
  chunkCount: {
    flexShrink: 0,
    marginLeft: 'auto',
    fontSize: 10,
    color: '#aec7f7',
    background: '#1b365d',
    borderRadius: 10,
    padding: '1px 6px',
    fontWeight: 600,
  },
  searchBox: {
    padding: '0 16px 12px',
    background: '#f7f9fb',
    borderBottom: '1px solid #e0e3e5',
  },
  searchInputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    color: '#74777f',
  },
  searchInput: {
    width: '100%',
    padding: '7px 10px 7px 32px',
    borderRadius: 8,
    border: '1px solid #c4c6cf',
    background: '#ffffff',
    fontSize: 12,
    color: '#191c1e',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
};

// ── Componente ────────────────────────────────────────────────────────────────
const TableOfContents = ({ activeSectionId, onSectionClick }) => {
  const [toc, setToc]         = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [openChapters, setOpenChapters] = useState({});
  const [searchTerm, setSearchTerm]     = useState('');
  const [favoriteSections, setFavoriteSections] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('manualBienes.favoriteSections') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    let cancelled = false;

    const fetchToc = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE}/api/toc`);
        if (!response.ok) {
          throw new Error(`Error HTTP ${response.status}`);
        }
        const data = await response.json();
        console.log('[TOC] respuesta cruda:', data);

        if (cancelled) return;

        const chapters = Array.isArray(data)
          ? data
          : Array.isArray(data.chapters)
            ? data.chapters
            : [];

        console.log('[TOC] capítulos detectados:', chapters.length);

        if (!Array.isArray(chapters) || chapters.length === 0) {
          throw new Error('TOC vacío o formato inválido');
        }

        setToc(data);
        if (chapters[0]?.id) {
          setOpenChapters({ [chapters[0].id]: true });
        }
      } catch (err) {
        if (cancelled) return;
        console.error('[TOC] Error fetching index:', err);
        setError(err.message || 'Error desconocido al cargar el índice.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchToc();

    return () => { cancelled = true; };
  }, []);

  const toggleChapter = useCallback((chapId) => {
    setOpenChapters(prev => ({ ...prev, [chapId]: !prev[chapId] }));
  }, []);

  const toggleFavorite = useCallback((sectionId) => {
    setFavoriteSections(prev => (
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    ));
  }, []);

  useEffect(() => {
    localStorage.setItem('manualBienes.favoriteSections', JSON.stringify(favoriteSections));
  }, [favoriteSections]);

  const chapters = Array.isArray(toc) 
    ? toc 
    : Array.isArray(toc?.chapters) 
      ? toc.chapters 
      : [];

  const favoriteItems = chapters.flatMap(chapter => {
    const sections = Array.isArray(chapter.sections) ? chapter.sections : [];
    return sections
      .filter(section => favoriteSections.includes(section.id))
      .map(section => ({ ...section, chapter: chapter.chapter }));
  });

  // ── Lógica de Filtrado ──
  const queryTokens = normalizeText(searchTerm).split(/\s+/).filter(Boolean);
  
  const filteredChapters = chapters.map(chap => {
    if (!chap) return null;
    if (queryTokens.length === 0) return chap;

    const chapSections = Array.isArray(chap.sections) ? chap.sections : [];

    // 1. Buscar en secciones
    const matchedSections = chapSections.filter(sec => 
      sec && matchesQuery(sec.section, queryTokens)
    );

    // 2. Buscar en título del capítulo
    const chapMatches = matchesQuery(chap.chapter, queryTokens);

    if (matchedSections.length > 0) {
      return { ...chap, sections: matchedSections };
    }
    
    if (chapMatches) {
      return chap; // Mostrar capítulo completo si el título coincide
    }

    return null;
  }).filter(Boolean);

  // Auto-expandir si hay búsqueda
  useEffect(() => {
    if (searchTerm.trim().length > 0 && filteredChapters.length > 0) {
      const newOpens = {};
      filteredChapters.forEach(c => { 
        if (c && c.id) newOpens[c.id] = true; 
      });
      setOpenChapters(prev => ({ ...prev, ...newOpens }));
    }
  }, [searchTerm, filteredChapters.length]);

  if (loading) {
    return (
      <div style={S.container}>
        <div style={S.loading}>
          <div style={{ display: 'flex', gap: 4 }}>
            {[0, 150, 300].map(d => (
              <span key={d} style={{
                width: 6, height: 6, borderRadius: '50%', background: '#1b365d',
                display: 'inline-block', animation: 'bounce 1s infinite',
                animationDelay: `${d}ms`,
              }} />
            ))}
          </div>
          <span>Cargando índice del manual...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={S.container}>
        <div style={S.error}>
          <strong>No se pudo cargar la tabla de contenido.</strong>
          <br /><br />
          <span>Detalle: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div style={S.container}>
      {/* Header */}
      <div style={S.header}>
        <div style={S.headerRow}>
          <span style={{ color: '#1b365d' }}><IconBook /></span>
          <h3 style={S.headerTitle}>Tabla de Contenido</h3>
        </div>
        <p style={S.headerSub}>
          {chapters.length} capítulo{chapters.length !== 1 ? 's' : ''} —{' '}
          <span style={{ color: '#1b365d', fontWeight: 500 }}>sin consumo de IA</span>
        </p>
      </div>

      {/* Search Input */}
      <div style={S.searchBox}>
        <div style={S.searchInputWrapper}>
          <span style={S.searchIcon}><IconSearch /></span>
          <input
            type="text"
            placeholder="Filtrar por sección o palabra..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={S.searchInput}
            onFocus={e => e.target.style.borderColor = '#1b365d'}
            onBlur={e => e.target.style.borderColor = '#c4c6cf'}
          />
        </div>
      </div>

      {/* Tree */}
      <div className="scrollbar-thin" style={S.scrollArea}>
        {favoriteItems.length > 0 && (
          <div className="toc-favorites">
            <p>Favoritos</p>
            {favoriteItems.slice(0, 6).map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSectionClick?.(item.id)}
                className={item.id === activeSectionId ? 'active' : ''}
                title={item.section}
              >
                <span>★</span>
                <strong>{item.section}</strong>
              </button>
            ))}
          </div>
        )}

        {filteredChapters.length === 0 && (
          <p style={{ color: '#74777f', fontSize: 13, padding: '32px 12px', textAlign: 'center' }}>
            {searchTerm ? 'No se encontraron coincidencias.' : 'No se encontró tabla de contenido.'}
          </p>
        )}

        {filteredChapters.map(chapter => {
          // Guard: sections puede ser undefined si el backend devuelve estructura inesperada
          const sections = Array.isArray(chapter.sections) ? chapter.sections : [];
          const isOpen = Boolean(openChapters[chapter.id]);
          return (
            <div key={chapter.id}>
              {/* Capítulo — con resumen y conteo de secciones */}
              <button
                style={{
                  ...S.chapterBtn(isOpen),
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 2,
                  padding: isOpen ? '10px 14px' : '10px 14px',
                }}
                onClick={() => toggleChapter(chapter.id)}
                onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = '#f2f4f6'; }}
                onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = 'transparent'; }}
                title={chapter.chapter}
              >
                {/* Fila superior: icono + nombre + count + chevron */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
                  <span style={{ color: isOpen ? '#1b365d' : '#74777f', flexShrink: 0 }}><IconFolder /></span>
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: isOpen ? 700 : 600 }}>
                    {chapter.chapter}
                  </span>
                  <span style={{ flexShrink: 0, fontSize: 10, color: isOpen ? '#1b365d' : '#74777f' }}>
                    {sections.length}
                  </span>
                  <IconChevron open={isOpen} />
                </div>

                {/* Resumen del capítulo — generado sin Gemini */}
                {chapter.summary && (
                  <p style={{
                    margin: '2px 0 0 24px',
                    fontSize: 10,
                    lineHeight: 1.4,
                    color: isOpen ? '#2e476f' : '#74777f',
                    fontWeight: 400,
                    textAlign: 'left',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    maxWidth: '100%',
                  }}>
                    {chapter.summary}
                  </p>
                )}
              </button>

              {/* Secciones */}
              <div style={S.sectionList(isOpen)}>
                {sections.map(sec => {
                  const isActive = sec.id === activeSectionId;
                  const isFavorite = favoriteSections.includes(sec.id);
                  // Guard: chunkIds puede ser undefined
                  const chunkCount = Array.isArray(sec.chunkIds) ? sec.chunkIds.length : 0;
                  return (
                    <div className="toc-section-row" key={sec.id}>
                    <button
                      key={sec.id}
                      style={S.sectionBtn(isActive)}
                      onClick={() => onSectionClick?.(sec.id)}
                      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#f2f4f6'; }}
                      onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = isActive ? '#d6e3ff' : 'transparent'; }}
                      title={sec.section}
                    >
                      <span style={S.badge}><IconFile /></span>
                      <span style={{ flex: 1 }}>{sec.section}</span>
                      {chunkCount > 1 && (
                        <span style={S.chunkCount}>{chunkCount}</span>
                      )}
                    </button>
                    <button
                      type="button"
                      className={`toc-favorite-button ${isFavorite ? 'active' : ''}`}
                      onClick={() => toggleFavorite(sec.id)}
                      title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                    >
                      ★
                    </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Safe wrapper - Previene pantalla en blanco si ocurre cualquier error inesperado de render
class TableOfContentsBoundary extends React.Component {
  constructor(props) { super(props); this.state = { crashed: false, errorInfo: null }; }
  static getDerivedStateFromError(error) { return { crashed: true, errorInfo: error.message }; }
  render() {
    if (this.state.crashed) {
      return (
        <div style={{
          padding: 20, background: '#fff0f0', border: '1px solid #fcc',
          borderRadius: 8, margin: 16, color: '#c00', fontSize: 13,
        }}>
          <strong>No se pudo cargar la tabla de contenido.</strong><br />
          Detalle: {this.state.errorInfo || 'Error interno de renderizado'}
        </div>
      );
    }
    return <TableOfContents {...this.props} />;
  }
}

export default TableOfContentsBoundary;
