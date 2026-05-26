import React from 'react';

const icons = {
  chat: 'M8 10h.01M12 10h.01M16 10h.01M7 16h10M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H8l-5 3V7a2 2 0 012-2z',
  toc: 'M4 6h16M4 10h16M4 14h10M4 18h8',
  references: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  history: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  settings: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
  plus: 'M12 4v16m8-8H4',
  search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  star: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557L3.04 10.385a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z',
  cap: 'M12 14l9-5-9-5-9 5 9 5zm0 0v6m-4-3.5v3a1.5 1.5 0 003 0v-3',
};

const Icon = ({ path, size = 16 }) => (
  <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
  </svg>
);

const Sidebar = ({ activeView = 'chat', onView, onNewConsulta, historyCount = 0, refCount = 0 }) => {
  const navItems = [
    { id: 'chat', label: 'Chat', detail: 'Preguntas y respuestas', icon: icons.chat },
    { id: 'toc', label: 'Contenido', detail: 'Capitulos y secciones', icon: icons.toc },
    { id: 'references', label: 'Fuentes', detail: 'Evidencia consultada', icon: icons.references, badge: refCount },
    { id: 'history', label: 'Historial', detail: 'Consultas recientes', icon: icons.history, badge: historyCount },
    { id: 'settings', label: 'Sistema', detail: 'Reglas y consumo IA', icon: icons.settings },
    { id: 'academia', label: 'Academia', detail: 'Aula virtual y curso', icon: icons.cap },
  ];

  return (
    <aside className="product-sidebar">
      <header className="sidebar-brand">
        <div className="brand-mark">
          <Icon path="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.5L19 8.5V19a2 2 0 01-2 2z" />
        </div>
        <div>
          <h1>Manual de Bienes</h1>
          <p>Copiloto documental</p>
        </div>
      </header>

      <div className="sidebar-primary">
        <button type="button" className="new-query-button" onClick={onNewConsulta}>
          <Icon path={icons.plus} />
          Nueva consulta
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const active = activeView === item.id;
          return (
            <button
              type="button"
              key={item.id}
              className={`nav-item ${active ? 'active' : ''}`}
              onClick={() => onView?.(item.id)}
            >
              <span className="nav-icon"><Icon path={item.icon} /></span>
              <span className="nav-copy">
                <strong>{item.label}</strong>
                <small>{item.detail}</small>
              </span>
              {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
            </button>
          );
        })}
      </nav>

      <section className="favorites-panel">
        <div className="favorites-title">
          <Icon path={icons.star} size={14} />
          <span>Favoritos</span>
        </div>
        <button type="button" onClick={() => onView?.('toc')}>Procedimientos clave</button>
        <button type="button" onClick={() => onView?.('toc')}>Validaciones frecuentes</button>
      </section>

      <footer className="sidebar-status">
        <span />
        <div>
          <strong>Modo seguro</strong>
          <p>Responde con fuentes del manual.</p>
        </div>
      </footer>
    </aside>
  );
};

export default Sidebar;
