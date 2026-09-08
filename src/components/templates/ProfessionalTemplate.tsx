import { ResumeData } from '../../contexts/ResumeContext'

interface ProfessionalTemplateProps {
  data: ResumeData
}

export default function ProfessionalTemplate({ data }: ProfessionalTemplateProps) {
  const { personalInfo, summary, experience, education, skills, sections } = data

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  return (
    <div className="resume-content font-serif text-gray-900" style={{ padding: '0.5in' }}>
      {/* Header */}
      {sections.personalInfo && (
        <header className="text-center border-b-2 border-gray-800 pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap justify-center items-center text-sm text-gray-600 space-x-4">
            {personalInfo.email && (
              <span>{personalInfo.email}</span>
            )}
            {personalInfo.phone && (
              <span>{personalInfo.phone}</span>
            )}
            {personalInfo.location && (
              <span>{personalInfo.location}</span>
            )}
          </div>
          {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
            <div className="flex flex-wrap justify-center items-center text-sm text-gray-600 space-x-4 mt-2">
              {personalInfo.website && (
                <span>{personalInfo.website}</span>
              )}
              {personalInfo.linkedin && (
                <span>LinkedIn: {personalInfo.linkedin}</span>
              )}
              {personalInfo.github && (
                <span>GitHub: {personalInfo.github}</span>
              )}
            </div>
          )}
        </header>
      )}

      {/* Professional Summary */}
      {sections.summary && summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1 mb-3">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-sm leading-relaxed text-gray-800">
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {sections.experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1 mb-3">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="break-inside-avoid">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-sm font-medium text-gray-700">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                    {exp.location && <p>{exp.location}</p>}
                  </div>
                </div>
                {exp.description && (
                  <div className="text-sm text-gray-800 leading-relaxed mt-2">
                    {exp.description.split('\n').map((line, index) => (
                      <p key={index} className="mb-1">{line}</p>
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
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1 mb-3">
            EDUCATION
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="break-inside-avoid">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-sm font-medium text-gray-700">{edu.institution}</p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                    {edu.location && <p>{edu.location}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {sections.skills && skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1 mb-3">
            TECHNICAL SKILLS
          </h2>
          <div className="grid grid-cols-2 gap-x-8 text-sm">
            {skills.map((skill) => (
              <div key={skill.id} className="flex justify-between items-center py-1">
                <span className="text-gray-800">{skill.name}</span>
                <span className="text-gray-600 text-xs capitalize">({skill.level})</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}