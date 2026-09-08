import { ResumeData } from '../../contexts/ResumeContext'

interface Props { data: ResumeData }

function fmt(d: string) {
  if (!d) return ''
  const date = new Date(d + '-01')
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function ProfessionalTemplate({ data }: Props) {
  const { personalInfo: p, summary, experience, education, skills, sections, style } = data

  const fontStack = `'${style.fontFamily}', Georgia, serif`
  const divider = style.dividerWidth > 0
    ? `${style.dividerWidth}px solid ${style.dividerColor}`
    : 'none'

  return (
    <div style={{ fontFamily: fontStack, color: style.textColor, padding: '0.55in', background: '#fff', minHeight: '11in' }}>

      {/* Header */}
      {sections.personalInfo && (
        <header style={{ textAlign: 'center', borderBottom: `2px solid ${style.accentColor}`, paddingBottom: '0.35in', marginBottom: '0.25in' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: style.accentColor, margin: 0 }}>
            {p.fullName || 'Your Name'}
          </h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 1rem', marginTop: 6, fontSize: '0.8rem', color: style.textColor }}>
            {p.email && <span>{p.email}</span>}
            {p.phone && <span>{p.phone}</span>}
            {p.location && <span>{p.location}</span>}
            {p.website && <span>{p.website}</span>}
            {p.linkedin && <span>linkedin.com/in/{p.linkedin.replace(/.*\/in\//, '')}</span>}
            {p.github && <span>github.com/{p.github.replace(/.*github\.com\//, '')}</span>}
          </div>
        </header>
      )}

      {/* Summary */}
      {sections.summary && summary && (
        <section style={{ marginBottom: '0.2in' }}>
          <h2 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: style.accentColor, textTransform: 'uppercase', borderBottom: divider, paddingBottom: 4, marginBottom: 8 }}>
            Professional Summary
          </h2>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>{summary}</p>
        </section>
      )}

      {/* Experience */}
      {sections.experience && experience.length > 0 && (
        <section style={{ marginBottom: '0.2in' }}>
          <h2 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: style.accentColor, textTransform: 'uppercase', borderBottom: divider, paddingBottom: 4, marginBottom: 10 }}>
            Experience
          </h2>
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: 12, pageBreakInside: 'avoid' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', margin: 0 }}>{exp.position}</p>
                  <p style={{ fontSize: '0.82rem', fontWeight: 500, margin: '2px 0 0', color: style.accentColor }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                </div>
                <p style={{ fontSize: '0.78rem', whiteSpace: 'nowrap', marginLeft: 12, color: '#6b7280' }}>
                  {fmt(exp.startDate)} – {exp.current ? 'Present' : fmt(exp.endDate)}
                </p>
              </div>
              {exp.description && (
                <div style={{ marginTop: 4, fontSize: '0.82rem', lineHeight: 1.55 }}>
                  {exp.description.split('\n').map((line, i) => <p key={i} style={{ margin: '1px 0' }}>{line}</p>)}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {sections.education && education.length > 0 && (
        <section style={{ marginBottom: '0.2in' }}>
          <h2 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: style.accentColor, textTransform: 'uppercase', borderBottom: divider, paddingBottom: 4, marginBottom: 10 }}>
            Education
          </h2>
          {education.map(edu => (
            <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, pageBreakInside: 'avoid' }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.88rem', margin: 0 }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</p>
                <p style={{ fontSize: '0.82rem', margin: '2px 0 0', color: style.accentColor }}>{edu.institution}</p>
                {edu.gpa && <p style={{ fontSize: '0.78rem', margin: '1px 0 0', color: '#6b7280' }}>GPA: {edu.gpa}</p>}
              </div>
              <p style={{ fontSize: '0.78rem', whiteSpace: 'nowrap', marginLeft: 12, color: '#6b7280' }}>
                {fmt(edu.startDate)}{edu.endDate ? ` – ${fmt(edu.endDate)}` : ''}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {sections.skills && skills.length > 0 && (
        <section>
          <h2 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: style.accentColor, textTransform: 'uppercase', borderBottom: divider, paddingBottom: 4, marginBottom: 10 }}>
            Skills
          </h2>
          <p style={{ fontSize: '0.82rem', lineHeight: 1.7 }}>
            {skills.map(s => s.name).join(' · ')}
          </p>
        </section>
      )}
    </div>
  )
}