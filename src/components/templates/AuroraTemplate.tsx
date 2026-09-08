import { ResumeData } from '../../contexts/ResumeContext'

interface Props { data: ResumeData }

function fmt(d: string) {
  if (!d) return ''
  const date = new Date(d + '-01')
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function AuroraTemplate({ data }: Props) {
  const { personalInfo: p, summary, experience, education, skills, sections, style } = data

  const fontStack = `'${style.fontFamily}', system-ui, sans-serif`
  const divider = style.dividerWidth > 0
    ? `${style.dividerWidth}px solid ${style.dividerColor}`
    : 'none'

  return (
    <div style={{ fontFamily: fontStack, color: style.textColor, background: '#fff', minHeight: '11in' }}>

      {/* Accent header */}
      {sections.personalInfo && (
        <header style={{ background: style.accentColor, color: '#fff', padding: '0.4in 0.5in 0.3in' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>
            {p.fullName || 'Your Name'}
          </h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 20px', marginTop: 10, fontSize: '0.78rem', opacity: 0.85 }}>
            {p.email && <span>{p.email}</span>}
            {p.phone && <span>{p.phone}</span>}
            {p.location && <span>{p.location}</span>}
            {p.website && <span>{p.website}</span>}
            {p.linkedin && <span>{p.linkedin}</span>}
            {p.github && <span>{p.github}</span>}
          </div>
        </header>
      )}

      <div style={{ padding: '0.3in 0.5in' }}>
        {/* Summary */}
        {sections.summary && summary && (
          <section style={{ marginBottom: 22 }}>
            <h2 style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: style.accentColor, marginBottom: 8, borderBottom: divider, paddingBottom: 5 }}>
              Summary
            </h2>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.65 }}>{summary}</p>
          </section>
        )}

        {/* Experience */}
        {sections.experience && experience.length > 0 && (
          <section style={{ marginBottom: 22 }}>
            <h2 style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: style.accentColor, marginBottom: 12, borderBottom: divider, paddingBottom: 5 }}>
              Experience
            </h2>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: 16, pageBreakInside: 'avoid' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', margin: 0 }}>{exp.position}</p>
                    <p style={{ fontSize: '0.82rem', color: style.accentColor, margin: '2px 0 0', fontWeight: 500 }}>{exp.company}</p>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#6b7280', marginLeft: 12, whiteSpace: 'nowrap' }}>
                    <p style={{ margin: 0 }}>{fmt(exp.startDate)} – {exp.current ? 'Present' : fmt(exp.endDate)}</p>
                    {exp.location && <p style={{ margin: '2px 0 0' }}>{exp.location}</p>}
                  </div>
                </div>
                {exp.description && (
                  <div style={{ marginTop: 5, fontSize: '0.82rem', lineHeight: 1.55 }}>
                    {exp.description.split('\n').map((l, i) => <p key={i} style={{ margin: '1px 0' }}>{l}</p>)}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {sections.education && education.length > 0 && (
          <section style={{ marginBottom: 22 }}>
            <h2 style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: style.accentColor, marginBottom: 12, borderBottom: divider, paddingBottom: 5 }}>
              Education
            </h2>
            {education.map(edu => (
              <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, pageBreakInside: 'avoid' }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.88rem', margin: 0 }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</p>
                  <p style={{ fontSize: '0.82rem', color: style.accentColor, margin: '2px 0 0' }}>{edu.institution}</p>
                  {edu.gpa && <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '1px 0 0' }}>GPA: {edu.gpa}</p>}
                </div>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', marginLeft: 12, whiteSpace: 'nowrap' }}>
                  {fmt(edu.startDate)}{edu.endDate ? ` – ${fmt(edu.endDate)}` : ''}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {sections.skills && skills.length > 0 && (
          <section>
            <h2 style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: style.accentColor, marginBottom: 10, borderBottom: divider, paddingBottom: 5 }}>
              Skills
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {skills.map(s => (
                <span key={s.id} style={{ padding: '4px 12px', background: `${style.accentColor}18`, color: style.accentColor, borderRadius: 20, fontSize: '0.78rem', fontWeight: 500 }}>
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}