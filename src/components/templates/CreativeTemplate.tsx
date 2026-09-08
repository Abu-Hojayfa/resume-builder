import { ResumeData } from '../../contexts/ResumeContext'

interface CreativeTemplateProps {
  data: ResumeData
}

export default function CreativeTemplate({ data }: CreativeTemplateProps) {
  const { personalInfo, summary, experience, education, skills, sections } = data

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const getSkillBar = (level: string) => {
    const levels = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 }
    const width = (levels[level as keyof typeof levels] || 1) * 25
    return width
  }

  return (
    <div className="resume-content font-sans text-gray-900" style={{ padding: '0.5in' }}>
      <div className="flex">
        {/* Left Column */}
        <div className="w-1/3 bg-gray-800 text-white p-6 -m-2 mr-4">
          {/* Header */}
          {sections.personalInfo && (
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold">
                  {personalInfo.fullName?.split(' ').map(n => n[0]).join('') || 'YN'}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-center mb-4">
                {personalInfo.fullName || 'Your Name'}
              </h1>
              <div className="space-y-2 text-sm">
                {personalInfo.email && (
                  <div className="flex items-center">
                    <span className="w-4 h-4 mr-2">📧</span>
                    <span className="break-all">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center">
                    <span className="w-4 h-4 mr-2">📞</span>
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center">
                    <span className="w-4 h-4 mr-2">📍</span>
                    <span>{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo.website && (
                  <div className="flex items-center">
                    <span className="w-4 h-4 mr-2">🌐</span>
                    <span className="break-all text-xs">{personalInfo.website}</span>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center">
                    <span className="w-4 h-4 mr-2">💼</span>
                    <span className="text-xs">LinkedIn</span>
                  </div>
                )}
                {personalInfo.github && (
                  <div className="flex items-center">
                    <span className="w-4 h-4 mr-2">💻</span>
                    <span className="text-xs">GitHub</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Skills */}
          {sections.skills && skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 border-b border-gray-600 pb-2">
                SKILLS
              </h2>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-gray-300 capitalize">{skill.level}</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary-400 to-primary-500 h-2 rounded-full"
                        style={{ width: `${getSkillBar(skill.level)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {sections.education && education.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-4 border-b border-gray-600 pb-2">
                EDUCATION
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-sm font-bold text-primary-300">
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-medium">{edu.field}</p>
                    <p className="text-xs text-gray-300">{edu.institution}</p>
                    <p className="text-xs text-gray-400">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                    {edu.gpa && (
                      <p className="text-xs text-gray-400">GPA: {edu.gpa}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="flex-1 pl-6">
          {/* Professional Summary */}
          {sections.summary && summary && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 relative">
                ABOUT ME
                <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-primary-500 to-primary-600"></div>
              </h2>
              <p className="text-sm leading-relaxed text-gray-700">
                {summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {sections.experience && experience.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 relative">
                EXPERIENCE
                <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-primary-500 to-primary-600"></div>
              </h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={exp.id} className="break-inside-avoid relative">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-primary-500 rounded-full"></div>
                    <div className="ml-8 border-l-2 border-gray-200 pl-6 pb-6">
                      <div className="mb-3">
                        <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                        <div className="flex justify-between items-center">
                          <p className="text-base font-medium text-primary-600">{exp.company}</p>
                          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                          </span>
                        </div>
                        {exp.location && (
                          <p className="text-sm text-gray-600">{exp.location}</p>
                        )}
                      </div>
                      {exp.description && (
                        <div className="text-sm text-gray-700 leading-relaxed">
                          {exp.description.split('\n').map((line, index) => (
                            <p key={index} className="mb-2">{line}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}