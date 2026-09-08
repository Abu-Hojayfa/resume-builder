import { ResumeData } from '../../contexts/ResumeContext'

interface ModernTemplateProps {
  data: ResumeData
}

export default function ModernTemplate({ data }: ModernTemplateProps) {
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
        <header className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-6 -m-2 mb-6 rounded-lg">
          <h1 className="text-3xl font-bold mb-2">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap items-center text-sm space-x-4 mb-2">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
          {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
            <div className="flex flex-wrap items-center text-sm space-x-4">
              {personalInfo.website && <span>{personalInfo.website}</span>}
              {personalInfo.linkedin && <span>LinkedIn</span>}
              {personalInfo.github && <span>GitHub</span>}
            </div>
          )}
        </header>
      )}

      {/* Professional Summary */}
      {sections.summary && summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-primary-700 mb-3 flex items-center">
            <span className="w-2 h-6 bg-primary-600 mr-3"></span>
            ABOUT ME
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {sections.experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-primary-700 mb-3 flex items-center">
            <span className="w-2 h-6 bg-primary-600 mr-3"></span>
            EXPERIENCE
          </h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id} className="break-inside-avoid">
                <div className="border-l-4 border-primary-300 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-base font-medium text-primary-700">{exp.company}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded">
                      <p className="font-medium">{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                      {exp.location && <p>{exp.location}</p>}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-sm text-gray-800 leading-relaxed">
                      {exp.description.split('\n').map((line, index) => (
                        <p key={index} className="mb-1">{line}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {sections.education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-primary-700 mb-3 flex items-center">
            <span className="w-2 h-6 bg-primary-600 mr-3"></span>
            EDUCATION
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="break-inside-avoid border-l-4 border-primary-300 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-base font-medium text-primary-700">{edu.institution}</p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded">
                    <p className="font-medium">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
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
          <h2 className="text-xl font-bold text-primary-700 mb-3 flex items-center">
            <span className="w-2 h-6 bg-primary-600 mr-3"></span>
            SKILLS
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {skills.map((skill) => (
              <div key={skill.id} className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">{skill.name}</span>
                  <div className="text-xs">
                    <span className={`px-2 py-1 rounded-full font-medium ${
                      skill.level === 'expert' ? 'bg-green-100 text-green-800' :
                      skill.level === 'advanced' ? 'bg-blue-100 text-blue-800' :
                      skill.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}