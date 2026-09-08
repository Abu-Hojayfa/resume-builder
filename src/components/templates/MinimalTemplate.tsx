import { ResumeData } from '../../contexts/ResumeContext'

interface Props { data: ResumeData }

function fmt(d: string) {
  if (!d) return ''
  const date = new Date(d + '-01')
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function MinimalTemplate({ data }: Props) {
  const { personalInfo: p, summary, experience, education, skills, sections, style } = data

  const fontStack = `'${style.fontFamily}', system-ui, sans-serif`
  const hr = style.dividerWidth > 0
    ? { borderTop: `${style.dividerWidth}px solid ${style.dividerColor}`, margin: '14px 0' }
    : { borderTop: 'none', margin: '14px 0' }

  return (
    <div style={{ fontFamily: fontStack, color: style.textColor, padding: '0.6in', background: '#fff', minHeight: '11in' }}>

      {/* Header — large airy name */}
      {sections.personalInfo && (
        <header style={{ marginBottom: '0.3in' }}>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 300, letterSpacing: '-0.5px', color: style.accentColor, margin: '0 0 10px' }}>
            {p.fullName || 'Your Name'}
          </h1>
          <div style={{ fontSize: '0.8rem', color: '#6b7280', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {p.email && <span>{p.email}</span>}
            {p.phone && <span>{p.phone}</span>}
            {p.location && <span>{p.location}</span>}
            {p.website && <span>{p.website}</span>}
            {p.linkedin && <span>{p.linkedin}</span>}
            {p.github && <span>{p.github}</span>}
          </div>
        </header>
      )}

      {/* Summary — no heading, just the text */}
      {sections.summary && summary && (
        <>
          <div style={hr} />
          <p style={{ fontSize: '0.88rem', lineHeight: 1.7, fontWeight: 300, marginBottom: '0.2in' }}>{summary}</p>
        </>
      )}

      {/* Experience */}
      {sections.experience && experience.length > 0 && (
        <>
          <div style={hr} />
          <h2 style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 14 }}>Experience</h2>
          {experience.map((exp, i) => (
            <div key={exp.id} style={{ marginBottom: 18, pageBreakInside: 'avoid' }}>
              {i > 0 && <div style={{ borderTop: `1px solid ${style.dividerColor}`, marginBottom: 18, opacity: 0.5 }} />}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 3 }}>
                <h3 style={{ fontSize: '0.88rem', fontWeight: 500, margin: 0, color: style.accentColor }}>{exp.position}</h3>
                <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{fmt(exp.startDate)} – {exp.current ? 'Present' : fmt(exp.endDate)}</span>
              </div>
              <p style={{ fontSize: '0.82rem', margin: '0 0 5px', fontWeight: 300 }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
              {exp.description && (
                <div style={{ fontSize: '0.8rem', lineHeight: 1.6, fontWeight: 300 }}>
                  {exp.description.split('\n').map((l, i) => <p key={i} style={{ margin: '1px 0' }}>{l}</p>)}
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {/* Education */}
      {sections.education && education.length > 0 && (
        <>
          <div style={hr} />
          <h2 style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 14 }}>Education</h2>
          {education.map((edu, i) => (
            <div key={edu.id} style={{ marginBottom: 12 }}>
              {i > 0 && <div style={{ borderTop: `1px solid ${style.dividerColor}`, marginBottom: 12, opacity: 0.5 }} />}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <p style={{ fontWeight: 500, fontSize: '0.86rem', margin: 0, color: style.accentColor }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</p>
                  <p style={{ fontSize: '0.8rem', fontWeight: 300, margin: '2px 0 0' }}>{edu.institution}</p>
                  {edu.gpa && <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: '1px 0 0' }}>GPA: {edu.gpa}</p>}
                </div>
                <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{fmt(edu.startDate)}{edu.endDate ? ` – ${fmt(edu.endDate)}` : ''}</span>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Skills — inline pill list */}
      {sections.skills && skills.length > 0 && (
        <>
          <div style={hr} />
          <h2 style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 10 }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {skills.map(s => (
              <span key={s.id} style={{ fontSize: '0.78rem', border: `1px solid ${style.dividerColor}`, borderRadius: 4, padding: '2px 9px', fontWeight: 300 }}>
                {s.name}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  )
}