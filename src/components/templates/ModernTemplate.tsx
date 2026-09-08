import { ResumeData } from '../../contexts/ResumeContext'

interface Props { data: ResumeData }

function fmt(d: string) {
  if (!d) return ''
  const date = new Date(d + '-01')
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function ModernTemplate({ data }: Props) {
  const { personalInfo: p, summary, experience, education, skills, sections, style } = data

  const fontStack = `'${style.fontFamily}', system-ui, sans-serif`
  const divider = style.dividerWidth > 0
    ? `${style.dividerWidth}px solid ${style.dividerColor}`
    : 'none'

  const SectionHeading = ({ children }: { children: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
      <div style={{ width: 3, height: 18, background: style.accentColor, borderRadius: 2 }} />
      <h2 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', color: style.accentColor, textTransform: 'uppercase', margin: 0 }}>{children}</h2>
      <div style={{ flex: 1, height: style.dividerWidth, background: style.dividerColor }} />
    </div>
  )

  return (
    <div style={{ fontFamily: fontStack, color: style.textColor, background: '#fff', minHeight: '11in' }}>

      {/* Bold header bar */}
      {sections.personalInfo && (
        <header style={{ background: style.accentColor, color: '#fff', padding: '0.35in 0.5in' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>{p.fullName || 'Your Name'}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 1.2rem', marginTop: 8, fontSize: '0.8rem', opacity: 0.85 }}>
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
          <section style={{ marginBottom: 20 }}>
            <SectionHeading>About</SectionHeading>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>{summary}</p>
          </section>
        )}

        {/* Experience */}
        {sections.experience && experience.length > 0 && (
          <section style={{ marginBottom: 20 }}>
            <SectionHeading>Experience</SectionHeading>
            {experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: 14, paddingLeft: 12, borderLeft: `3px solid ${style.dividerColor}`, pageBreakInside: 'avoid' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.88rem', margin: 0 }}>{exp.position}</p>
                    <p style={{ fontSize: '0.82rem', color: style.accentColor, margin: '2px 0 0' }}>{exp.company}</p>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', whiteSpace: 'nowrap', marginLeft: 12 }}>
                    {fmt(exp.startDate)} – {exp.current ? 'Present' : fmt(exp.endDate)}
                    {exp.location && ` · ${exp.location}`}
                  </p>
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
          <section style={{ marginBottom: 20 }}>
            <SectionHeading>Education</SectionHeading>
            {education.map(edu => (
              <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, paddingLeft: 12, borderLeft: `3px solid ${style.dividerColor}` }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.88rem', margin: 0 }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</p>
                  <p style={{ fontSize: '0.82rem', color: style.accentColor, margin: '2px 0 0' }}>{edu.institution}</p>
                  {edu.gpa && <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '1px 0 0' }}>GPA: {edu.gpa}</p>}
                </div>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', whiteSpace: 'nowrap', marginLeft: 12 }}>
                  {fmt(edu.startDate)}{edu.endDate ? ` – ${fmt(edu.endDate)}` : ''}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {sections.skills && skills.length > 0 && (
          <section>
            <SectionHeading>Skills</SectionHeading>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {skills.map(s => (
                <span key={s.id} style={{ padding: '3px 10px', background: `${style.accentColor}15`, color: style.accentColor, borderRadius: 4, fontSize: '0.78rem', fontWeight: 500 }}>
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