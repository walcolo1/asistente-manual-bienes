import React from 'react';

// ── Iconos ────────────────────────────────────────────────────────────────────
const IconChat = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const IconTOC = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M4 6h16M4 10h16M4 14h10M4 18h8" />
  </svg>
);

const IconBook = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const IconHistory = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconSettings = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconNew = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
  </svg>
);

// ── Componente ────────────────────────────────────────────────────────────────
/**
 * Sidebar
 * Props:
 *   activeView     'chat' | 'toc' | 'references' | 'history' | 'settings'
 *   onView         (view) => void
 *   onNewConsulta  () => void
 *   historyCount   number
 *   refCount       number
 */
const Sidebar = ({ activeView = 'chat', onView, onNewConsulta, historyCount = 0, refCount = 0 }) => {
  const navItems = [
    {
      id:    'chat',
      label: 'Consultas',
      icon:  <IconChat />,
      badge: null,
    },
    {
      id:    'toc',
      label: 'Tabla de Contenido',
      icon:  <IconTOC />,
      badge: null,
    },
    {
      id:    'references',
      label: 'Referencias',
      icon:  <IconBook />,
      badge: refCount > 0 ? refCount : null,
    },
    {
      id:    'history',
      label: 'Historial',
      icon:  <IconHistory />,
      badge: historyCount > 0 ? historyCount : null,
    },
    {
      id:    'settings',
      label: 'Configuración',
      icon:  <IconSettings />,
      badge: null,
    },
  ];

  return (
    <aside style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      background: '#ffffff',
      borderRight: '1px solid #c4c6cf',
    }}>
      {/* Brand */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #e0e3e5', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: '#1b365d',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="16" height="16" fill="none" stroke="#fff" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#191c1e', lineHeight: 1.2 }}>
              Manual de Bienes
            </p>
            <p style={{ margin: 0, fontSize: 10, fontWeight: 500, color: '#74777f', letterSpacing: '0.06em' }}>
              CONSULTORÍA TÉCNICA
            </p>
          </div>
        </div>
      </div>

      {/* Nueva Consulta button */}
      <div style={{ padding: '12px 16px', flexShrink: 0 }}>
        <button
          id="btn-nueva-consulta"
          onClick={onNewConsulta}
          style={{
            width: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '10px 16px',
            borderRadius: 8, border: 'none',
            background: '#1b365d', color: '#ffffff',
            fontSize: 13, fontWeight: 600,
            cursor: 'pointer', transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
        >
          <IconNew />
          Nueva Consulta
        </button>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, minHeight: 0, padding: '0 12px', overflowY: 'auto' }}>
        {navItems.map(item => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              id={`btn-nav-${item.id}`}
              onClick={() => onView(item.id)}
              style={{
                width: '100%',
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px',
                borderRadius: 8, border: 'none',
                background: isActive ? '#eceef0' : 'transparent',
                color: isActive ? '#1b365d' : '#44474e',
                fontSize: 13, fontWeight: 500,
                cursor: 'pointer', transition: 'background 0.15s',
                marginBottom: 2, textAlign: 'left',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#f2f4f6'; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={{ color: isActive ? '#1b365d' : '#74777f', flexShrink: 0 }}>
                {item.icon}
              </span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge !== null && (
                <span style={{
                  fontSize: 10, fontWeight: 700,
                  background: '#1b365d', color: '#fff',
                  borderRadius: 10, padding: '1px 6px',
                  minWidth: 18, textAlign: 'center',
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User block */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid #e0e3e5', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: '#2e476f',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 11, fontWeight: 700, flexShrink: 0,
          }}>
            AU
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{
              margin: 0, fontSize: 13, fontWeight: 600, color: '#191c1e',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              Admin User
            </p>
            <p style={{ margin: 0, fontSize: 10, color: '#74777f', fontFamily: 'monospace' }}>
              USR-0001
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
