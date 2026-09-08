import { ResumeData } from '../../contexts/ResumeContext'

interface Props { data: ResumeData }

function fmt(d: string) {
  if (!d) return ''
  const date = new Date(d + '-01')
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function NexusTemplate({ data }: Props) {
  const { personalInfo: p, summary, experience, education, skills, sections, style } = data

  const fontStack = `'${style.fontFamily}', system-ui, sans-serif`
  // Nexus uses a dark sidebar and white body — sidebar color derived from accent
  const sidebarBg = '#0f172a'
  const accentLight = style.accentColor

  return (
    <div style={{ fontFamily: fontStack, display: 'flex', minHeight: '11in', background: '#fff' }}>

      {/* Dark left sidebar */}
      <div style={{ width: '30%', background: sidebarBg, color: '#e2e8f0', padding: '0.4in 0.22in', flexShrink: 0 }}>

        {sections.personalInfo && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ width: 52, height: 52, borderRadius: 6, background: accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: 12 }}>
              {p.fullName?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'YN'}
            </div>
            <h1 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 10px', lineHeight: 1.2 }}>{p.fullName || 'Your Name'}</h1>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {p.email && <span>{p.email}</span>}
              {p.phone && <span>{p.phone}</span>}
              {p.location && <span>{p.location}</span>}
              {p.website && <span>{p.website}</span>}
              {p.linkedin && <span>{p.linkedin}</span>}
              {p.github && <span>{p.github}</span>}
            </div>
          </div>
        )}

        {sections.skills && skills.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: accentLight, marginBottom: 10, paddingBottom: 4, borderBottom: `1px solid #1e293b` }}>Skills</h2>
            {skills.map(s => (
              <div key={s.id} style={{ marginBottom: 6 }}>
                <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>{s.name}</span>
                <div style={{ height: 2, background: '#1e293b', borderRadius: 1, marginTop: 3 }}>
                  <div style={{ height: '100%', borderRadius: 1, background: accentLight, width: { beginner: '25%', intermediate: '55%', advanced: '78%', expert: '100%' }[s.level] || '50%' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {sections.education && education.length > 0 && (
          <div>
            <h2 style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: accentLight, marginBottom: 10, paddingBottom: 4, borderBottom: '1px solid #1e293b' }}>Education</h2>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: 12, fontSize: '0.72rem', color: '#94a3b8' }}>
                <p style={{ fontWeight: 600, color: '#e2e8f0', margin: 0 }}>{edu.degree}</p>
                {edu.field && <p style={{ margin: '1px 0' }}>{edu.field}</p>}
                <p style={{ margin: '1px 0' }}>{edu.institution}</p>
                <p style={{ margin: '1px 0' }}>{fmt(edu.startDate)}{edu.endDate ? ` – ${fmt(edu.endDate)}` : ''}</p>
                {edu.gpa && <p style={{ margin: '1px 0' }}>GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '0.4in 0.35in', color: style.textColor }}>

        {sections.summary && summary && (
          <section style={{ marginBottom: 22 }}>
            <h2 style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: accentLight, marginBottom: 8, borderBottom: style.dividerWidth > 0 ? `${style.dividerWidth}px solid ${style.dividerColor}` : 'none', paddingBottom: 4 }}>
              Summary
            </h2>
            <p style={{ fontSize: '0.84rem', lineHeight: 1.65 }}>{summary}</p>
          </section>
        )}

        {sections.experience && experience.length > 0 && (
          <section>
            <h2 style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: accentLight, marginBottom: 12, borderBottom: style.dividerWidth > 0 ? `${style.dividerWidth}px solid ${style.dividerColor}` : 'none', paddingBottom: 4 }}>
              Experience
            </h2>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: 18, pageBreakInside: 'avoid' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', margin: 0 }}>{exp.position}</p>
                    <p style={{ fontSize: '0.8rem', color: accentLight, margin: '2px 0 0', fontWeight: 500 }}>{exp.company}</p>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '0.72rem', color: '#9ca3af', marginLeft: 12, whiteSpace: 'nowrap' }}>
                    <p style={{ margin: 0 }}>{fmt(exp.startDate)} – {exp.current ? 'Present' : fmt(exp.endDate)}</p>
                    {exp.location && <p style={{ margin: '2px 0 0' }}>{exp.location}</p>}
                  </div>
                </div>
                {exp.description && (
                  <div style={{ marginTop: 5, fontSize: '0.81rem', lineHeight: 1.55 }}>
                    {exp.description.split('\n').map((l, i) => <p key={i} style={{ margin: '1px 0' }}>{l}</p>)}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}