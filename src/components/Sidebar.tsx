import { ActiveSection } from '../App'
import { useResume } from '../contexts/ResumeContext'

interface SidebarProps {
  activeSection: ActiveSection
  onSectionChange: (section: ActiveSection) => void
}

const NAV_ITEMS: { id: ActiveSection; label: string; icon: string }[] = [
  { id: 'template', label: 'Template', icon: '⊞' },
  { id: 'style',    label: 'Style',    icon: '🎨' },
  { id: 'personal', label: 'Personal', icon: '👤' },
  { id: 'summary',  label: 'Summary',  icon: '📝' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'skills',   label: 'Skills',   icon: '⚡' },
]

function isComplete(id: ActiveSection, ctx: ReturnType<typeof useResume>) {
  switch (id) {
    case 'personal': return !!(ctx.personalInfo.fullName && ctx.personalInfo.email)
    case 'summary':  return ctx.summary.length > 10
    case 'experience': return ctx.experience.length > 0
    case 'education':  return ctx.education.length > 0
    case 'skills':     return ctx.skills.length > 0
    default: return true
  }
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const ctx = useResume()

  const totalCompletable = NAV_ITEMS.filter(n => !['template','style'].includes(n.id)).length
  const completed = NAV_ITEMS.filter(n => !['template','style'].includes(n.id) && isComplete(n.id, ctx)).length
  const progress = Math.round((completed / totalCompletable) * 100)

  return (
    <aside className="sidebar">
      {/* Logo area */}
      <div className="sidebar-logo">
        <span className="sidebar-logo-icon">◈</span>
        <span className="sidebar-logo-text">ResumeKit</span>
      </div>

      {/* Progress */}
      <div className="sidebar-progress">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-label">{progress}% complete</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => {
          const active = activeSection === item.id
          const done = isComplete(item.id, ctx)
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`sidebar-item ${active ? 'sidebar-item--active' : ''}`}
            >
              <span className="sidebar-item-icon">{item.icon}</span>
              <span className="sidebar-item-label">{item.label}</span>
              {done && !['template','style'].includes(item.id) && !active && (
                <span className="sidebar-item-check">✓</span>
              )}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}