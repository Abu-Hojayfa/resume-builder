import { useResume } from '../contexts/ResumeContext'

const TEMPLATES = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean, traditional layout — great for corporate roles',
    accent: '#1e293b',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary with a bold header and accent colors',
    accent: '#0369a1',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Pure typography focus, nothing gets in the way',
    accent: '#374151',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Two-column layout with personality and visual flair',
    accent: '#7c3aed',
  },
  {
    id: 'aurora',
    name: 'Aurora',
    description: 'Bold header gradient — designed to leave an impression',
    accent: '#0891b2',
  },
  {
    id: 'nexus',
    name: 'Nexus',
    description: 'Dark sidebar, tech-inspired — built for engineering roles',
    accent: '#1d4ed8',
  },
]

// Lightweight mock resume thumbnail
function TemplateThumbnail({ accent }: { accent: string }) {
  return (
    <div className="template-thumb">
      {/* Name line */}
      <div className="thumb-name" style={{ backgroundColor: accent }} />
      {/* Contact line */}
      <div className="thumb-row">
        <div className="thumb-line thumb-line--short" />
        <div className="thumb-line thumb-line--short" />
      </div>
      {/* Divider */}
      <div className="thumb-divider" style={{ backgroundColor: accent }} />
      {/* Section heading */}
      <div className="thumb-heading" style={{ backgroundColor: accent, opacity: 0.7 }} />
      {/* Body lines */}
      <div className="thumb-line" />
      <div className="thumb-line thumb-line--med" />
      <div className="thumb-line thumb-line--short" />
      {/* Section 2 */}
      <div className="thumb-divider" style={{ backgroundColor: accent, marginTop: 10 }} />
      <div className="thumb-heading" style={{ backgroundColor: accent, opacity: 0.7 }} />
      <div className="thumb-line" />
      <div className="thumb-line thumb-line--med" />
    </div>
  )
}

export default function TemplateSelector() {
  const { selectedTemplate, setSelectedTemplate } = useResume()

  return (
    <div className="section-wrapper">
      <div className="section-header">
        <h2 className="section-title">Choose a Template</h2>
      </div>
      <p className="section-desc">Pick the layout that fits your industry and style.</p>

      <div className="template-grid">
        {TEMPLATES.map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedTemplate(t.id)}
            className={`template-card ${selectedTemplate === t.id ? 'template-card--selected' : ''}`}
          >
            <TemplateThumbnail accent={t.accent} />
            <div className="template-card-info">
              <div className="template-card-title-row">
                <span className="template-card-name">{t.name}</span>
                {selectedTemplate === t.id && <span className="template-check">✓</span>}
              </div>
              <p className="template-card-desc">{t.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}