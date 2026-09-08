import { useResume } from '../contexts/ResumeContext'

export default function Header() {
  const { exportResume, importResume } = useResume()

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

  const handlePrint = () => {
    window.print()
  }

  return (
    <header className="app-header">
      <div className="header-inner">
        <p className="header-tagline">Build your resume</p>
        <div className="header-actions">
          <button onClick={handleImport} className="btn-ghost btn-sm">Import</button>
          <button onClick={exportResume} className="btn-ghost btn-sm">Export JSON</button>
          <button onClick={handlePrint} className="btn-primary btn-sm">Print / PDF</button>
        </div>
      </div>
    </header>
  )
}