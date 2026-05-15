import React, { useState, useRef, useEffect, useCallback } from 'react';
import ChatMessage       from './components/ChatMessage';
import ChatInput         from './components/ChatInput';
import Sidebar           from './components/Sidebar';
import SourcesPanel      from './components/SourcesPanel';
import SourceViewer      from './components/SourceViewer';
import TableOfContents   from './components/TableOfContents';
import SectionViewer     from './components/SectionViewer';
import HistoryPanel      from './components/HistoryPanel';
import API_BASE_URL      from './config/api';

const WELCOME_MSG = {
  role: 'system',
  content: 'Bienvenido al Consultor Técnico del Manual de Bienes. ¿En qué puedo ayudarle hoy?',
  sources: [],
  usedChunks: [],
};

// ── Panel de Configuración ────────────────────────────────────────────────────
const SettingsPanel = () => (
  <div style={{
    height: '100%', display: 'flex', flexDirection: 'column',
    overflow: 'hidden',
  }}>
    <div style={{
      padding: '16px 20px', borderBottom: '1px solid #e0e3e5',
      flexShrink: 0, background: '#f7f9fb',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="14" height="14" fill="none" stroke="#1b365d" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#191c1e' }}>Configuración</h3>
      </div>
    </div>
    <div className="scrollbar-thin" style={{ flex: '1 1 0', minHeight: 0, overflowY: 'auto', padding: 20 }}>
      {/* Modo IA */}
      <div style={{
        background: '#d6e3ff', border: '1px solid #aec7f7',
        borderRadius: 10, padding: 16, marginBottom: 14,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <span style={{
            width: 32, height: 32, borderRadius: 8,
            background: '#1b365d', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </span>
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#002046' }}>
              Modo Ahorro de IA Activo
            </p>
            <p style={{ margin: '4px 0 0', fontSize: 12, color: '#2e476f', lineHeight: 1.6 }}>
              Gemini solo se usa en consultas del chat cuando el usuario envía una pregunta.
            </p>
          </div>
        </div>
      </div>

      {/* Reglas */}
      {[
        {
          icon: '📋',
          title: 'Navegación del manual',
          desc: 'Tabla de contenido, apertura de capítulos y secciones — sin consumo de IA.',
          ok: true,
        },
        {
          icon: '🔍',
          title: 'Fuentes y referencias',
          desc: 'Apertura de fragmentos del manual — sin consumo de IA.',
          ok: true,
        },
        {
          icon: '⏱️',
          title: 'Historial de sesión',
          desc: 'Almacenado solo en memoria local del navegador — sin IA ni base de datos.',
          ok: true,
        },
        {
          icon: '💬',
          title: 'Chat con Gemini',
          desc: 'Solo cuando el usuario envía una pregunta explícitamente por el chat.',
          ok: null, // neutro
        },
        {
          icon: '⚡',
          title: 'Caché de respuestas',
          desc: 'Preguntas repetidas responden desde caché sin volver a llamar a Gemini.',
          ok: true,
        },
        {
          icon: '🚫',
          title: 'Sin vectores ni LangChain',
          desc: 'Motor de búsqueda local por relevancia léxica. Sin embeddings ni bases vectoriales.',
          ok: true,
        },
      ].map((rule, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'flex-start', gap: 12,
          padding: '12px 0',
          borderBottom: i < 5 ? '1px solid #eceef0' : 'none',
        }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>{rule.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#191c1e' }}>
                {rule.title}
              </p>
              {rule.ok === true && (
                <span style={{
                  fontSize: 9, fontWeight: 700,
                  background: '#d7f5e0', color: '#1a7240',
                  borderRadius: 4, padding: '1px 5px',
                }}>SIN IA</span>
              )}
              {rule.ok === null && (
                <span style={{
                  fontSize: 9, fontWeight: 700,
                  background: '#fff3cd', color: '#856404',
                  borderRadius: 4, padding: '1px 5px',
                }}>SOLO CHAT</span>
              )}
            </div>
            <p style={{ margin: '3px 0 0', fontSize: 11, color: '#74777f', lineHeight: 1.5 }}>
              {rule.desc}
            </p>
          </div>
        </div>
      ))}

      {/* Versión */}
      <div style={{
        marginTop: 16, padding: 12,
        background: '#f2f4f6', borderRadius: 8,
        fontSize: 10, color: '#74777f', fontFamily: 'monospace', lineHeight: 1.8,
      }}>
        <strong style={{ color: '#44474e' }}>Sistema</strong><br />
        Motor: búsqueda léxica local · Modelo: Gemini (solo /api/ask y /api/ask-section)<br />
        Fuente: manual.structured.md · Chunks: cargados en memoria<br />
        Rate limit: activo en /api/ask y /api/ask-section · Caché: en memoria de proceso
      </div>
    </div>
  </div>
);

// ── LocalStorage Helpers ────────────────────────────────────────────────────────
const loadLocal = (key, defaultVal) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch (e) {
    console.error('Error parsing localStorage key:', key, e);
    localStorage.removeItem(key);
    return defaultVal;
  }
};

const saveLocal = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Error saving localStorage key:', key, e);
  }
};

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  // ── Mobile Menu State ──
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ── Vista activa ──
  const [activeView, setActiveView] = useState('chat'); // 'chat' | 'toc' | 'references' | 'history' | 'settings'

  // ── Chat state ──
  const [messages, setMessages] = useState(() => loadLocal('manualBienes.activeMessages', [WELCOME_MSG]));
  const [loading, setLoading]   = useState(false);
  const [latestSources, setLatestSources] = useState(() => loadLocal('manualBienes.recentSources', { sources: [], usedChunks: [] }).sources || []);
  const [latestUsedChunks, setLatestUsedChunks] = useState(() => loadLocal('manualBienes.recentSources', { sources: [], usedChunks: [] }).usedChunks || []);
  const messagesEndRef          = useRef(null);

  // ── Historial de sesión ──
  const [history, setHistory]   = useState(() => loadLocal('manualBienes.sessionHistory', []));

  // ── Persistencia de estados ──
  useEffect(() => {
    saveLocal('manualBienes.activeMessages', messages);
  }, [messages]);

  useEffect(() => {
    saveLocal('manualBienes.recentSources', { sources: latestSources, usedChunks: latestUsedChunks });
  }, [latestSources, latestUsedChunks]);

  useEffect(() => {
    saveLocal('manualBienes.sessionHistory', history);
  }, [history]);

  // ── TOC + sección seleccionada ──
  const [activeSectionId, setActiveSectionId] = useState(null);

  // ── Source Viewer ──
  const [viewerChunkId, setViewerChunkId] = useState(null);
  const [viewerData, setViewerData]       = useState(null);
  const [viewerLoading, setViewerLoading] = useState(false);
  const [viewerError, setViewerError]     = useState(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  /** Nueva Consulta: limpia todo y vuelve al chat */
  const handleNewConsulta = useCallback(() => {
    setMessages([WELCOME_MSG]);
    setLatestSources([]);
    setLatestUsedChunks([]);
    setActiveSectionId(null);
    setViewerChunkId(null);
    setViewerData(null);
    setViewerError(null);
    setActiveView('chat');
    setIsMobileMenuOpen(false);
  }, []);

  /** Limpiar solo el chat */
  const handleClear = useCallback(() => {
    setMessages([WELCOME_MSG]);
    setLatestSources([]);
    setLatestUsedChunks([]);
  }, []);

  /** Limpiar historial */
  const handleClearHistory = useCallback(() => {
    if (window.confirm('¿Estás seguro de que deseas eliminar todo el historial de la sesión?')) {
      setHistory([]);
      localStorage.removeItem('manualBienes.sessionHistory');
    }
  }, []);

  /** Enviar pregunta a /api/ask → única llamada que usa Gemini */
  const handleSend = useCallback(async (question) => {
    if (!question.trim()) return;
    setActiveView('chat');
    setMessages(prev => [...prev, { role: 'user', content: question.trim(), sources: [], usedChunks: [] }]);
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question.trim() }),
      });

      // Intentar parsear JSON en todos los casos (incluso errores HTTP)
      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error('El servidor devolvió una respuesta no válida. Verifique que el backend esté activo.');
      }

      // Rate limit → 429 (el middleware devuelve { answer, sources, usedChunks, rateLimited: true })
      if (response.status === 429) {
        // El rate limiter usa data.answer (no data.error)
        const msg = data?.answer || data?.error || 'Has realizado muchas consultas seguidas. Intenta nuevamente en un minuto.';
        setMessages(prev => [...prev, { role: 'system', content: msg, isError: false, sources: [], usedChunks: [] }]);
        return;
      }

      if (!response.ok) {
        const msg = data?.error || data?.message || `Error del servidor (${response.status}). Verifique que el backend esté activo.`;
        throw new Error(msg);
      }

      // Si la IA responde que no encontró información, no mostramos fuentes para evitar confusión
      const NOT_FOUND_MSG = "No encontré esa información en los capítulos cargados del manual.";
      const isNotFound = data.answer && data.answer.includes(NOT_FOUND_MSG);
      
      const sources    = isNotFound ? [] : (data.sources || []);
      const usedChunks = isNotFound ? [] : (data.usedChunks || []);

      setLatestSources(sources);
      setLatestUsedChunks(usedChunks);
      
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: data.answer, 
        sources, 
        usedChunks 
      }]);

      // Guardar en historial de sesión
      setHistory(prev => {
        const newHist = [...prev, {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
          question: question.trim(),
          answer:   data.answer,
          sources,
          usedChunks,
          createdAt: new Date().toISOString(),
          fromCache: !!data.fromCache
        }];
        return newHist.length > 50 ? newHist.slice(newHist.length - 50) : newHist;
      });
    } catch (err) {
      // Clasificar el error para mensajes más claros
      let userMsg = err.message;
      if (!userMsg || userMsg === 'Failed to fetch') {
        userMsg = 'No se pudo obtener la respuesta. Verifique que el backend esté activo en el puerto 3000.';
      } else if (userMsg.toLowerCase().includes('quota') || userMsg.toLowerCase().includes('límite')) {
        userMsg = 'Se alcanzó el límite temporal de consultas de IA. Intenta más tarde.';
      } else if (userMsg.toLowerCase().includes('rate')) {
        userMsg = 'Has realizado muchas consultas seguidas. Intenta nuevamente en un minuto.';
      }
      setMessages(prev => [...prev, { role: 'system', content: userMsg, isError: true, sources: [], usedChunks: [] }]);
    } finally {
      setLoading(false);
    }
  }, []);

  /** Restaurar ítem de historial al chat */
  const handleRestoreHistory = useCallback((item) => {
    setLatestSources(item.sources || []);
    setLatestUsedChunks(item.usedChunks || []);
    setMessages([
      WELCOME_MSG,
      { role: 'user',   content: item.question, sources: [], usedChunks: [] },
      { role: 'system', content: item.answer, sources: item.sources, usedChunks: item.usedChunks },
    ]);
    setActiveView('chat');
    setIsMobileMenuOpen(false);
  }, []);

  /** Click en fuente → abre SourceViewer */
  const handleSourceClick = useCallback(async (chunkId) => {
    if (!chunkId) return;
    setViewerChunkId(chunkId);
    setViewerData(null);
    setViewerError(null);
    setViewerLoading(true);
    try {
      const res  = await fetch(`${API_BASE_URL}/api/source/${encodeURIComponent(chunkId)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Error al cargar la fuente');
      setViewerData(json);
    } catch (err) {
      setViewerError(err.message);
    } finally {
      setViewerLoading(false);
    }
  }, []);

  const handleCloseViewer = useCallback(() => {
    setViewerChunkId(null);
    setViewerData(null);
    setViewerError(null);
  }, []);

  /** Click en sección del TOC → sin Gemini */
  const handleSectionClick = useCallback((sectionId) => {
    setActiveSectionId(sectionId);
    // Si estábamos en TOC, nos quedamos; si venimos de otro panel, cambiamos a chat para ver el viewer
    // En realidad el viewer se muestra en la columna central cuando activeView === 'toc'
    setActiveView('toc');
    setIsMobileMenuOpen(false);
  }, []);

  /** "Preguntar sobre esta sección" → llama a /api/ask-section con sectionId directo */
  const handleAskAboutSection = useCallback(async (sectionId, question) => {
    if (!sectionId) return;

    const effectiveQuestion = question?.trim() || `Proporciona un resumen técnico de esta sección del manual (ID: ${sectionId}).`;

    // Cambiar a vista chat para mostrar la respuesta
    setActiveView('chat');
    setMessages(prev => [...prev, {
      role: 'user', content: effectiveQuestion, sources: [], usedChunks: [],
    }]);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/ask-section`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sectionId: sectionId.trim(), question: effectiveQuestion }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error('El servidor devolvió una respuesta no válida.');
      }

      // Rate limit 429
      if (response.status === 429) {
        const msg = data?.answer || data?.error || 'Has realizado muchas consultas seguidas. Intenta nuevamente en un minuto.';
        setMessages(prev => [...prev, { role: 'system', content: msg, isError: false, sources: [], usedChunks: [] }]);
        return;
      }

      if (!response.ok) {
        const msg = data?.error || `Error del servidor (${response.status}).`;
        throw new Error(msg);
      }

      // Si la IA responde que no encontró información, no mostramos fuentes para evitar confusión
      const NOT_FOUND_MSG = "No encontré esa información en los capítulos cargados del manual.";
      const isNotFound = data.answer && data.answer.includes(NOT_FOUND_MSG);

      const sources    = isNotFound ? [] : (data.sources || []);
      const usedChunks = isNotFound ? [] : (data.usedChunks || []);

      setLatestSources(sources);
      setLatestUsedChunks(usedChunks);
      
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: data.answer, 
        sources, 
        usedChunks 
      }]);

      setHistory(prev => {
        const newHist = [...prev, {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
          question: effectiveQuestion,
          answer:   data.answer,
          sources,
          usedChunks,
          createdAt: new Date().toISOString(),
          fromCache: !!data.fromCache
        }];
        return newHist.length > 50 ? newHist.slice(newHist.length - 50) : newHist;
      });
    } catch (err) {
      let userMsg = err.message;
      if (!userMsg || userMsg === 'Failed to fetch') {
        userMsg = 'No se pudo conectar al servidor. Verifique su conexión o intente nuevamente en unos segundos (el servidor podría estar despertando).';
      }
      setMessages(prev => [...prev, { role: 'system', content: userMsg, isError: true, sources: [], usedChunks: [] }]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Layout helpers ─────────────────────────────────────────────────────────

  /** Columna central según vista activa */
  const renderMainPanel = () => {
    switch (activeView) {
      case 'toc':
        return (
          <div className="toc-layout-container" style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
            {/* Árbol de contenido */}
            <div className={`toc-sidebar ${activeSectionId ? 'hidden-on-mobile' : ''}`} style={{
              flexShrink: 0,
              borderRight: '1px solid #e0e3e5',
              overflow: 'hidden',
            }}>
              <TableOfContents
                activeSectionId={activeSectionId}
                onSectionClick={handleSectionClick}
              />
            </div>
            {/* Detalle de sección */}
            <div className={`toc-main ${!activeSectionId ? 'hidden-on-mobile' : ''}`} style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
              <SectionViewer
                sectionId={activeSectionId}
                onAskAbout={handleAskAboutSection}
                onClose={() => setActiveSectionId(null)}
              />
            </div>
          </div>
        );

      case 'references':
        return (
          <div style={{ height: '100%', overflow: 'hidden' }}>
            <SourcesPanel
              sources={latestSources}
              usedChunks={latestUsedChunks}
              onSourceClick={handleSourceClick}
              embedded
            />
          </div>
        );

      case 'history':
        return (
          <div style={{ height: '100%', overflow: 'hidden' }}>
            <HistoryPanel
              history={history}
              onRestore={handleRestoreHistory}
              onClear={handleClearHistory}
            />
          </div>
        );

      case 'settings':
        return <SettingsPanel />;

      case 'chat':
      default:
        return (
          <>
            {/* Header chat desktop - kept inline but you can also refactor later */}
            <header className="hidden-mobile-header" style={{
              flexShrink: 0,
              display: 'none', // Overridden via media query if needed, but since we have mobile-header now, let's keep it visible on desktop only
              padding: '12px 20px',
              background: '#ffffff', borderBottom: '1px solid #c4c6cf',
            }}>
               {/* This is the inner content but we want a flex layout. We will use className instead of display none */}
            </header>
            <div style={{
              flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 20px',
              background: '#ffffff', borderBottom: '1px solid #c4c6cf',
            }} className="desktop-chat-header">
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#191c1e', lineHeight: 1.2 }}>
                  Manual de Bienes
                </p>
                <p style={{ margin: 0, fontSize: 11, color: '#74777f', lineHeight: 1.2 }}>
                  Consultor técnico documental
                </p>
              </div>
              <button
                id="btn-limpiar-chat"
                type="button"
                onClick={handleClear}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: 12, fontWeight: 500,
                  padding: '6px 12px', borderRadius: 8,
                  border: '1px solid #c4c6cf',
                  background: '#f2f4f6', color: '#44474e',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#c00'; e.currentTarget.style.borderColor = '#f2b8b5'; e.currentTarget.style.background = '#fff8f7'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#44474e'; e.currentTarget.style.borderColor = '#c4c6cf'; e.currentTarget.style.background = '#f2f4f6'; }}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Limpiar chat
              </button>
            </div>

            {/* Messages */}
            <div
              className="scrollbar-thin"
              style={{ flex: '1 1 0', minHeight: 0, overflowY: 'auto', padding: '20px 24px' }}
            >
              <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {messages.map((msg, idx) => (
                  <ChatMessage key={idx} {...msg} onSourceClick={handleSourceClick} />
                ))}

                {loading && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div style={{
                      background: '#fff', border: '1px solid #e0e3e5',
                      borderRadius: '16px 16px 16px 4px',
                      padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10,
                    }}>
                      {[0, 150, 300].map(d => (
                        <span key={d} style={{
                          width: 8, height: 8, borderRadius: '50%', background: '#74777f',
                          display: 'inline-block',
                          animation: 'bounce 1s infinite', animationDelay: `${d}ms`,
                        }} />
                      ))}
                      <span style={{ fontSize: 13, color: '#74777f' }}>Analizando manual...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <div style={{ flexShrink: 0, background: '#ffffff', borderTop: '1px solid #c4c6cf', padding: '16px 24px' }}>
              <div style={{ maxWidth: 720, margin: '0 auto' }}>
                <ChatInput onSend={handleSend} disabled={loading} />
              </div>
              <p style={{ textAlign: 'center', fontSize: 11, color: '#74777f', marginTop: 8, marginBottom: 0 }}>
                IA entrenada con normativa vigente del Manual de Bienes
              </p>
            </div>
          </>
        );
    }
  };

  // ── Columna derecha según vista ────────────────────────────────────────────
  const renderRightPanel = () => {
    // En vista TOC, la columna derecha muestra las fuentes del último chat
    // En vista chat, muestra el panel de fuentes clásico
    if (activeView === 'toc' || activeView === 'references' ||
        activeView === 'history' || activeView === 'settings') {
      // Panel derecho informativo
      return (
        <aside className="right-panel-container" style={{
          height: '100%', display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          background: '#ffffff', borderLeft: '1px solid #c4c6cf',
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e0e3e5', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="14" height="14" fill="none" stroke="#1b365d" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#191c1e' }}>
                Información
              </h3>
            </div>
          </div>
          <div style={{ flex: 1, padding: '16px 16px', overflow: 'auto' }}>
            <div style={{
              background: '#d7f5e0', border: '1px solid #a7d7b5',
              borderRadius: 8, padding: 12, marginBottom: 12,
            }}>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: '#1a7240' }}>
                ✓ Sin consumo de IA
              </p>
              <p style={{ margin: '3px 0 0', fontSize: 10, color: '#1a7240', lineHeight: 1.5 }}>
                Esta vista no llama a Gemini. La navegación del manual es completamente local.
              </p>
            </div>

            {latestSources.length > 0 && (
              <div>
                <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, color: '#74777f', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Últimas fuentes
                </p>
                {latestSources.map((src, i) => (
                  <div key={i} style={{
                    background: '#f2f4f6', borderRadius: 6,
                    padding: '8px 10px', marginBottom: 6,
                    fontSize: 11,
                  }}>
                    <p style={{ margin: 0, fontWeight: 600, color: '#1b365d', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {src.chapter}
                    </p>
                    <p style={{ margin: '2px 0 0', color: '#44474e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {src.section}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {latestSources.length === 0 && (
              <p style={{ fontSize: 12, color: '#74777f', lineHeight: 1.6 }}>
                Realice una consulta en el chat para ver las fuentes aquí.
              </p>
            )}
          </div>
        </aside>
      );
    }

    // Vista chat → panel de fuentes completo
    return (
      <div className="right-panel-container" style={{ height: '100%' }}>
        <SourcesPanel
          sources={latestSources}
          usedChunks={latestUsedChunks}
          onSourceClick={handleSourceClick}
        />
      </div>
    );
  };

  return (
    <>
      {/* Source Viewer modal */}
      <SourceViewer
        chunkId={viewerChunkId}
        data={viewerData}
        loading={viewerLoading}
        error={viewerError}
        onClose={handleCloseViewer}
      />

      {/* Mobile overlay */}
      <div 
        className={`sidebar-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Root layout */}
      <div className="app-container">
        
        {/* Mobile Header (only visible on mobile via CSS) */}
        <div className="mobile-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              style={{ background: 'transparent', border: 'none', color: '#1b365d', padding: 4, cursor: 'pointer' }}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#1b365d' }}>Manual de Bienes</h1>
          </div>
          
          <button
            onClick={handleNewConsulta}
            style={{
              background: '#1b365d', color: 'white', border: 'none', borderRadius: 8,
              padding: '6px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer'
            }}
          >
            Nueva Consulta
          </button>
        </div>

        {/* COL 1: SIDEBAR */}
        <div className={`sidebar-container ${isMobileMenuOpen ? 'open' : ''}`}>
          <Sidebar
            activeView={activeView}
            onView={(view) => {
              setActiveView(view);
              setIsMobileMenuOpen(false);
            }}
            onNewConsulta={handleNewConsulta}
            historyCount={history.length}
            refCount={latestSources.length}
          />
        </div>

        {/* COL 2: PANEL CENTRAL */}
        <main style={{
          display: 'flex', flexDirection: 'column',
          height: '100%', minHeight: 0, minWidth: 0, overflow: 'hidden',
        }}>
          {renderMainPanel()}
        </main>

        {/* COL 3: PANEL DERECHO */}
        {renderRightPanel()}
      </div>
    </>
  );
}

export default App;
