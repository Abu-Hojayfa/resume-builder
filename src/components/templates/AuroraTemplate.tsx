import { ResumeData } from '../../contexts/ResumeContext'

interface AuroraTemplateProps {
  data: ResumeData
}

export default function AuroraTemplate({ data }: AuroraTemplateProps) {
  const { personalInfo, summary, experience, education, skills, sections } = data

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const getSkillLevel = (level: string) => {
    const levels = { beginner: 25, intermediate: 50, advanced: 75, expert: 100 }
    return levels[level as keyof typeof levels] || 25
  }

  return (
    <div className="resume-content relative overflow-hidden" style={{ padding: '0.75in' }}>
      {/* Aurora Background Effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-400 via-secondary-400 to-accent-400 rounded-full blur-3xl transform rotate-12"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-accent-300 via-primary-300 to-secondary-300 rounded-full blur-3xl transform -rotate-12"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        {sections.personalInfo && (
          <header className="mb-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-4xl font-black text-neutral-900 mb-2 tracking-tight">
                  {personalInfo.fullName || 'Your Name'}
                </h1>
                <div className="w-20 h-1.5 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-full mb-4"></div>
                <div className="grid grid-cols-2 gap-4 text-sm text-neutral-700">
                  {personalInfo.email && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span>{personalInfo.email}</span>
                    </div>
                  )}
                  {personalInfo.phone && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                      <span>{personalInfo.phone}</span>
                    </div>
                  )}
                  {personalInfo.location && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                      <span>{personalInfo.location}</span>
                    </div>
                  )}
                  {personalInfo.website && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                      <span className="text-xs">{personalInfo.website}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="ml-8">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center transform rotate-3">
                  <span className="text-2xl font-black text-white">
                    {personalInfo.fullName?.split(' ').map(n => n[0]).join('') || 'YN'}
                  </span>
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Professional Summary */}
        {sections.summary && summary && (
          <section className="mb-8">
            <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-2xl p-6 border border-neutral-200">
              <h2 className="text-lg font-bold text-neutral-900 mb-4 flex items-center">
                <span className="w-6 h-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </span>
                Professional Summary
              </h2>
              <p className="text-sm leading-relaxed text-neutral-700 font-medium">
                {summary}
              </p>
            </div>
          </section>
        )}

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-2 space-y-8">
            {/* Experience */}
            {sections.experience && experience.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center">
                  <span className="w-6 h-6 bg-gradient-to-br from-accent-500 to-primary-500 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                  </span>
                  Work Experience
                </h2>
                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <div key={exp.id} className="relative">
                      {index < experience.length - 1 && (
                        <div className="absolute left-6 top-12 bottom-0 w-px bg-gradient-to-b from-primary-200 to-transparent"></div>
                      )}
                      <div className="flex">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mr-4">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg font-bold text-neutral-900">{exp.position}</h3>
                              <p className="text-base font-semibold text-primary-600">{exp.company}</p>
                              {exp.location && <p className="text-sm text-neutral-600">{exp.location}</p>}
                            </div>
                            <div className="text-right">
                              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 border border-primary-200">
                                {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                              </div>
                            </div>
                          </div>
                          {exp.description && (
                            <div className="text-sm text-neutral-700 leading-relaxed">
                              {exp.description.split('\n').map((line, index) => (
                                <p key={index} className="mb-2">{line}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Skills */}
            {sections.skills && skills.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-neutral-900 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </span>
                  Technical Skills
                </h2>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.id} className="bg-white/60 rounded-xl p-4 border border-neutral-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-neutral-800">{skill.name}</span>
                        <span className="text-xs font-medium text-neutral-600 capitalize">{skill.level}</span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400"
                          style={{ width: `${getSkillLevel(skill.level)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {sections.education && education.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-neutral-900 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-gradient-to-br from-accent-500 to-secondary-500 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.75 2.524z"/>
                    </svg>
                  </span>
                  Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="bg-white/60 rounded-xl p-4 border border-neutral-200">
                      <h3 className="text-sm font-bold text-neutral-900">
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-primary-600 font-semibold">{edu.field}</p>
                      <p className="text-sm text-neutral-700">{edu.institution}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-neutral-600">
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </span>
                        {edu.gpa && (
                          <span className="text-xs font-medium text-neutral-700">GPA: {edu.gpa}</span>
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
    </div>
  )
}