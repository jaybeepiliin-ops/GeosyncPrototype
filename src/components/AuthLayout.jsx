import React from 'react'
import GeoSyncLogo from './GeoSyncLogo.jsx'
import './AuthLayout.css'

const FEATURES = [
  {
    icon: <CollaborationIcon />,
    title: 'Cross-Department Collaboration',
    desc: 'Seamless communication and coordination between teams, ensuring smooth workflow transitions.',
  },
  {
    icon: <PortalIcon />,
    title: 'Unified Operations Portal',
    desc: 'Access point for employees and administrators for managing tasks.',
  },
  {
    icon: <IntegrationIcon />,
    title: 'Business Process Integration',
    desc: 'Adapts organizational needs by incorporating additional modules and functionalities as required.',
  },
  {
    icon: <RbacIcon />,
    title: 'Role-based Access Control',
    desc: 'Employees are granted to appropriate permissions based on their responsibilities.',
    active: true,
  },
]

export default function AuthLayout({ children, panelTitle = 'WELCOME', panelSubtitle }) {
  <style>
    fontFamily: 'LEMON MILK Pro FTR, sans-serif',
        fontWeight: 700,
        fontSize: h * 1.60,
  </style>
  return (
    <div className="auth-layout">
      {/* ── Left sidebar panel ── */}
      <aside className="auth-layout__sidebar">
        <div className="auth-layout__sidebar-inner">  
          <div className="auth-layout__logo auth-layout__logo-center">
            <GeoSyncLogo size="md" theme="dark" />
          </div>

          <p className="auth-layout__tagline">
            Access range of powerful streamlined and integrated tools designed to simplify and
            automate organizational workflows, enhancing efficiency and collaboration across departments.
          </p>

          <ul className="auth-layout__features">
            {FEATURES.map((f) => (
              <li
                key={f.title}
                className={`auth-layout__feature-item ${f.active ? 'auth-layout__feature-item--active' : ''}`}
              >
                <div className="auth-layout__feature-icon">{f.icon}</div>
                <div className="auth-layout__feature-text">
                  <strong>{f.title}</strong>
                  <span>{f.desc}</span>
                </div>
              </li>
            ))}
          </ul>

          <p className="auth-layout__brand">GEOSPECTRUM</p>
        </div>

        {/* Divider strip with aerial photo */}
        <div className="auth-layout__divider">
          <div className="auth-layout__divider-label">DRAG RIGHT</div>
        </div>
      </aside>

      {/* ── Right form panel ── */}
      <main className="auth-layout__main">
        <div className="auth-layout__form-wrapper">
          <div className="auth-layout__form-header">
            <h1 className="auth-layout__form-title">{panelTitle}</h1>
            {panelSubtitle && (
              <p className="auth-layout__form-subtitle">{panelSubtitle}</p>
            )}
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}

/* ─── Icons ─── */
function CollaborationIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}

function PortalIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
      <path d="M6 8h12M6 11h8"/>
    </svg>
  )
}

function IntegrationIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  )
}

function RbacIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}
