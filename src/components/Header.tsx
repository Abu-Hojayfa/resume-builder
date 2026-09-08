import { useState } from 'react'
import { useResume } from '../contexts/ResumeContext'
import { useTheme } from '../contexts/ThemeContext'

export default function Header() {
  const { exportResume, importResume, resetResume } = useResume()
  const { theme, toggleTheme } = useTheme()
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string)
          importResume(data)
        } catch {
          alert('Invalid file format')
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  const handleClear = () => {
    setShowClearConfirm(true)
  }

  const confirmClear = () => {
    resetResume()
    setShowClearConfirm(false)
  }

  const cancelClear = () => {
    setShowClearConfirm(false)
  }

  return (
    <>
    <header className="app-header">
      <div className="header-inner">
        <div className="header-brand">
          <span className="header-title">ResumeKit</span>
          <span className="header-tagline">Build & Preview Professional Resumes</span>
        </div>
        <div className="header-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
            <span>{theme === 'dark' ? 'Light' : 'Night'}</span>
          </button>
          <button onClick={handleImport} className="btn-ghost btn-sm">Import</button>
          <button onClick={exportResume} className="btn-ghost btn-sm">Export JSON</button>
          <button onClick={handleClear} className="btn-ghost btn-sm" style={{ color: '#ef4444' }}>Clear Form</button>
        </div>
      </div>
    </header>

      {showClearConfirm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'var(--color-surface)', 
            padding: '24px', borderRadius: 'var(--radius-lg)', 
            maxWidth: '400px', width: '90%',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--color-border)'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '12px', color: 'var(--color-text)', fontSize: '18px', fontWeight: 600 }}>Clear Form Data</h3>
            <p style={{ marginBottom: '24px', color: 'var(--color-muted)', lineHeight: 1.5, fontSize: '14px' }}>
              Are you sure you want to clear all form data? This action cannot be undone and you will lose all unsaved progress.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button 
                onClick={cancelClear} 
                className="btn-ghost" 
                style={{ padding: '8px 16px', borderRadius: 'var(--radius-md)' }}
              >
                Cancel
              </button>
              <button 
                onClick={confirmClear} 
                style={{ 
                  padding: '8px 16px', backgroundColor: '#ef4444', color: '#fff', 
                  border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                  fontWeight: 500, transition: 'background-color 0.2s, opacity 0.2s',
                  fontSize: '14px'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}