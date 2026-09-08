import { ResumeData } from '../../contexts/ResumeContext'

interface Props { data: ResumeData }

function fmt(d: string) {
  if (!d) return ''
  const date = new Date(d + '-01')
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'YN'
}

const LEVEL_WIDTH: Record<string, string> = {
  beginner: '25%', intermediate: '50%', advanced: '75%', expert: '100%',
}

export default function CreativeTemplate({ data }: Props) {
  const { personalInfo: p, summary, experience, education, skills, sections, style } = data

  const fontStack = `'${style.fontFamily}', system-ui, sans-serif`

  return (
    <div style={{ fontFamily: fontStack, color: style.textColor, display: 'flex', minHeight: '11in', background: '#fff' }}>

      {/* Left sidebar */}
      <div style={{ width: '32%', background: style.accentColor, color: '#fff', padding: '0.4in 0.25in', flexShrink: 0 }}>

        {sections.personalInfo && (
          <div style={{ marginBottom: 28, textAlign: 'center' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '1.4rem', fontWeight: 700 }}>
              {initials(p.fullName)}
            </div>
            <h1 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 12px', lineHeight: 1.2 }}>{p.fullName || 'Your Name'}</h1>
            <div style={{ fontSize: '0.72rem', opacity: 0.8, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {p.email && <span>✉ {p.email}</span>}
              {p.phone && <span>📞 {p.phone}</span>}
              {p.location && <span>📍 {p.location}</span>}
              {p.website && <span>🌐 {p.website}</span>}
              {p.linkedin && <span>in {p.linkedin}</span>}
              {p.github && <span>⌨ {p.github}</span>}
            </div>
          </div>
        )}

        {/* Skills */}
        {sections.skills && skills.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10, opacity: 0.7, borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 4 }}>Skills</h2>
            {skills.map(s => (
              <div key={s.id} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: 3 }}>
                  <span>{s.name}</span>
                  <span style={{ opacity: 0.65 }}>{s.level}</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 2, height: 3 }}>
                  <div style={{ width: LEVEL_WIDTH[s.level] || '50%', height: '100%', background: '#fff', borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education in sidebar */}
        {sections.education && education.length > 0 && (
          <div>
            <h2 style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10, opacity: 0.7, borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 4 }}>Education</h2>
            {education.map(edu => (
              <div key={edu.id} style={{ marginBottom: 12, fontSize: '0.75rem' }}>
                <p style={{ fontWeight: 700, margin: 0 }}>{edu.degree}</p>
                {edu.field && <p style={{ opacity: 0.85, margin: '1px 0' }}>{edu.field}</p>}
                <p style={{ opacity: 0.7, margin: '1px 0' }}>{edu.institution}</p>
                <p style={{ opacity: 0.6, margin: '1px 0' }}>{fmt(edu.startDate)}{edu.endDate ? ` – ${fmt(edu.endDate)}` : ''}</p>
                {edu.gpa && <p style={{ opacity: 0.6, margin: '1px 0' }}>GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right main */}
      <div style={{ flex: 1, padding: '0.4in 0.35in' }}>

        {sections.summary && summary && (
          <section style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: style.accentColor, marginBottom: 8, borderBottom: style.dividerWidth > 0 ? `${style.dividerWidth}px solid ${style.dividerColor}` : 'none', paddingBottom: 4 }}>About</h2>
            <p style={{ fontSize: '0.83rem', lineHeight: 1.6 }}>{summary}</p>
          </section>
        )}

        {sections.experience && experience.length > 0 && (
          <section>
            <h2 style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: style.accentColor, marginBottom: 12, borderBottom: style.dividerWidth > 0 ? `${style.dividerWidth}px solid ${style.dividerColor}` : 'none', paddingBottom: 4 }}>Experience</h2>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: 18, position: 'relative', paddingLeft: 14, borderLeft: `3px solid ${style.accentColor}`, pageBreakInside: 'avoid' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: '0.88rem', margin: 0 }}>{exp.position}</h3>
                    <p style={{ fontSize: '0.8rem', color: style.accentColor, margin: '2px 0 0' }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: 8 }}>
                    {fmt(exp.startDate)} – {exp.current ? 'Present' : fmt(exp.endDate)}
                  </span>
                </div>
                {exp.description && (
                  <div style={{ marginTop: 5, fontSize: '0.8rem', lineHeight: 1.55 }}>
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