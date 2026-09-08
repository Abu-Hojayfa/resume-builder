import { ResumeData } from '../../contexts/ResumeContext'

interface MinimalTemplateProps {
  data: ResumeData
}

export default function MinimalTemplate({ data }: MinimalTemplateProps) {
  const { personalInfo, summary, experience, education, skills, sections } = data

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  return (
    <div className="resume-content font-sans text-gray-900" style={{ padding: '0.5in' }}>
      {/* Header */}
      {sections.personalInfo && (
        <header className="mb-8">
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="text-sm text-gray-600 space-y-1">
            {personalInfo.email && <p>{personalInfo.email}</p>}
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.location && <p>{personalInfo.location}</p>}
            {personalInfo.website && <p>{personalInfo.website}</p>}
            {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
            {personalInfo.github && <p>{personalInfo.github}</p>}
          </div>
        </header>
      )}

      {/* Professional Summary */}
      {sections.summary && summary && (
        <section className="mb-8">
          <p className="text-base leading-relaxed text-gray-800 font-light">
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {sections.experience && experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-light text-gray-900 mb-6 uppercase tracking-wider">
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={exp.id} className="break-inside-avoid">
                {index > 0 && <hr className="border-gray-200 mb-6" />}
                <div className="mb-2">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg font-medium text-gray-900">{exp.position}</h3>
                    <span className="text-sm text-gray-500 font-light">
                      {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-base text-gray-700 font-light">{exp.company}</p>
                  {exp.location && (
                    <p className="text-sm text-gray-500">{exp.location}</p>
                  )}
                </div>
                {exp.description && (
                  <div className="text-sm text-gray-700 leading-relaxed font-light">
                    {exp.description.split('\n').map((line, index) => (
                      <p key={index} className="mb-2">{line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {sections.education && education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-light text-gray-900 mb-6 uppercase tracking-wider">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={edu.id} className="break-inside-avoid">
                {index > 0 && <hr className="border-gray-200 mb-4" />}
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-base text-gray-700 font-light">{edu.institution}</p>
                    {edu.location && (
                      <p className="text-sm text-gray-500">{edu.location}</p>
                    )}
                    {edu.gpa && (
                      <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  <span className="text-sm text-gray-500 font-light">
                    {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {sections.skills && skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-light text-gray-900 mb-6 uppercase tracking-wider">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span 
                key={skill.id} 
                className="text-sm text-gray-700 font-light border border-gray-300 px-3 py-1 rounded-full"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}