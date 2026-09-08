import { useResume } from '../contexts/ResumeContext'
import { useTheme } from '../contexts/ThemeContext'

export default function Header() {
  const { exportResume, importResume } = useResume()
  const { theme, toggleTheme } = useTheme()

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

  return (
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
        </div>
      </div>
    </header>
  )
}