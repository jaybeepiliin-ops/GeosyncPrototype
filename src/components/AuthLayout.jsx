import React, { useState, useRef, useCallback, useEffect } from 'react'
import GeoSyncLogo from './GeoSyncLogo.jsx'
import './AuthLayout.css'
import blueBg from './assets/blue.jpg'
import greenBg from './assets/green.jpg'

const SIDEBAR_WIDTH = 550
const DIVIDER_MIN = 60

// 👇 Add or remove images here anytime
const DIVIDER_IMAGES = [blueBg, greenBg]

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

export default function AuthLayout({ children, panelTitle = 'WELCOME', panelSubtitle = 'Enter your details to continue' }) {
  const [dividerWidth, setDividerWidth] = useState(DIVIDER_MIN)
  const [isAutoExpanded, setIsAutoExpanded] = useState(false)
  const [formBgOpacity, setFormBgOpacity] = useState(0)
  const [currentBgIndex, setCurrentBgIndex] = useState(0)

  const isDragging = useRef(false)
  const formWrapperRef = useRef(null)

  // Auto-cycle background every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex(prev => (prev + 1) % DIVIDER_IMAGES.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const prevBgIndex = (currentBgIndex - 1 + DIVIDER_IMAGES.length) % DIVIDER_IMAGES.length

  const handleMouseDown = useCallback((e) => {
    if (isAutoExpanded) return
    e.preventDefault()
    isDragging.current = true

    const maxWidth = window.innerWidth - SIDEBAR_WIDTH

    const handleMouseMove = (e) => {
      if (!isDragging.current) return

      const newWidth = Math.max(DIVIDER_MIN, Math.min(maxWidth, e.clientX - SIDEBAR_WIDTH))

      if (newWidth >= maxWidth * 0.2) {
        setDividerWidth(maxWidth)
        setIsAutoExpanded(true)
        setFormBgOpacity(1)
        isDragging.current = false
      } else {
        setDividerWidth(newWidth)

        if (formWrapperRef.current) {
          const wrapperRect = formWrapperRef.current.getBoundingClientRect()
          const dividerRightEdge = SIDEBAR_WIDTH + newWidth
          const fadeStart = wrapperRect.left
          const fadeEnd = wrapperRect.left + wrapperRect.width * 0.5

          if (dividerRightEdge <= fadeStart) {
            setFormBgOpacity(0)
          } else if (dividerRightEdge >= fadeEnd) {
            setFormBgOpacity(1)
          } else {
            const progress = (dividerRightEdge - fadeStart) / (fadeEnd - fadeStart)
            setFormBgOpacity(progress)
          }
        }
      }
    }

    const handleMouseUp = () => {
      isDragging.current = false
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [isAutoExpanded])

  const handleClose = () => {
    setDividerWidth(DIVIDER_MIN)
    setIsAutoExpanded(false)
    setFormBgOpacity(0)
  }

  const interpolateToWhite = (r, g, b, opacity = 1) => {
    const ri = Math.round(r + (255 - r) * formBgOpacity)
    const gi = Math.round(g + (255 - g) * formBgOpacity)
    const bi = Math.round(b + (255 - b) * formBgOpacity)
    return `rgba(${ri}, ${gi}, ${bi}, ${opacity})`
  }

  const navyToWhite = (opacity = 1) => interpolateToWhite(15, 17, 64, opacity)

  const formWrapperBg = `rgba(255, 255, 255, ${1 - formBgOpacity})`
  const formWrapperShadow = formBgOpacity > 0.5
    ? '0 24px 64px rgba(0, 0, 0, 0.28)'
    : '0 8px 32px rgba(0, 0, 0, 0.10)'

  return (
    <div className="auth-layout">

      {/* ── Left sidebar ── */}
      <aside className="auth-layout__sidebar">
        <div className="auth-layout__sidebar-inner">
          <div className="auth-layout__logo">
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
      </aside>

      {/* ── Divider ── */}
      <div
        className="auth-layout__divider"
        onMouseDown={handleMouseDown}
        // style={{
        //   width: dividerWidth,
        //   cursor: isAutoExpanded ? 'default' : 'ew-resize',
        //   borderRadius: isAutoExpanded ? '0' : '0 25px 25px 0',
        //   transition: isAutoExpanded
        //     ? 'width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-radius 0.4s ease'
        //     : 'border-radius 0.4s ease',
        // }}

        style={{
        width: isAutoExpanded ? `calc(100vw - 530px)` : dividerWidth,
        cursor: isAutoExpanded ? 'default' : 'ew-resize',
        borderRadius: isAutoExpanded ? '0' : '0 25px 25px 0',
        transition: isAutoExpanded
          ? 'width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-radius 0.4s ease'
          : 'border-radius 0.4s ease',
      }}
      >
        {/* Base layer — previous image, stays put during crossfade */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${DIVIDER_IMAGES[prevBgIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 'inherit',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Top layer — current image, fades in via keyframe */}
        <div
          key={currentBgIndex}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${DIVIDER_IMAGES[currentBgIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 'inherit',
            pointerEvents: 'none',
            zIndex: 2,
            animation: 'bgFadeIn 0.8s ease forwards',
          }}
        />

        {!isAutoExpanded && (
          <div
            className="auth-layout__divider-label"
            style={{ position: 'relative', zIndex: 3 }}
          >
            {dividerWidth > DIVIDER_MIN ? 'DRAG LEFT' : 'DRAG RIGHT'}
          </div>
        )}

        {isAutoExpanded && (
          <div
            className="auth-layout__divider-close"
            style={{ position: 'relative', zIndex: 3 }}
            onClick={handleClose}
          >
            ✕
          </div>
        )}
      </div>

      {/* ── Right form panel ── */}
      <main className={`auth-layout__main ${isAutoExpanded ? 'auth-layout__main--expanded' : ''}`}>
        <div
          ref={formWrapperRef}
          className="auth-layout__form-wrapper"
          style={{
            background: formWrapperBg,
            boxShadow: formWrapperShadow,
            transform: formBgOpacity > 0 ? `translateY(-${formBgOpacity * 4}px)` : 'none',
            transition: isAutoExpanded
              ? 'background 0.4s ease, box-shadow 0.5s ease, transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)'
              : 'box-shadow 0.3s ease',
          }}
        >
          <div className="auth-layout__form-header">
            <h1
              className="auth-layout__form-title"
              style={{
                color: `rgb(
                  ${Math.round(15 + (255 - 15) * formBgOpacity)},
                  ${Math.round(17 + (255 - 17) * formBgOpacity)},
                  ${Math.round(64 + (255 - 64) * formBgOpacity)}
                )`,
                transition: 'color 0.4s ease',
              }}
            >
              {panelTitle}
            </h1>
            {panelSubtitle && (
              <p
                className="auth-layout__form-subtitle"
                style={{
                  color: `rgba(
                    ${Math.round(15 + (255 - 15) * formBgOpacity)},
                    ${Math.round(17 + (255 - 17) * formBgOpacity)},
                    ${Math.round(64 + (255 - 64) * formBgOpacity)},
                    ${0.6 + formBgOpacity * 0.4}
                  )`,
                  transition: 'color 0.4s ease',
                }}
              >
                {panelSubtitle}
              </p>
            )}
          </div>

          {React.cloneElement(children, { formBgOpacity })}
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