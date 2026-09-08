import { ResumeData } from '../../contexts/ResumeContext'

interface NexusTemplateProps {
  data: ResumeData
}

export default function NexusTemplate({ data }: NexusTemplateProps) {
  const { personalInfo, summary, experience, education, skills, sections } = data

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const getSkillLevel = (level: string) => {
    const levels = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 }
    return levels[level as keyof typeof levels] || 1
  }

  return (
    <div className="resume-content bg-neutral-950 text-white font-mono relative overflow-hidden" style={{ padding: '0.75in' }}>
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        {sections.personalInfo && (
          <header className="border-2 border-primary-500/30 rounded-lg p-6 mb-8 bg-neutral-900/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-3 h-3 bg-primary-400 rounded-full animate-pulse"></div>
                  <div className="text-primary-400 text-sm font-bold tracking-wider">RESUME.EXE</div>
                </div>
                <h1 className="text-3xl font-black text-white mb-2 tracking-wider uppercase">
                  {personalInfo.fullName || 'Your Name'}
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 mb-4"></div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {personalInfo.email && (
                    <div className="flex items-center space-x-3">
                      <span className="text-primary-400">&gt;</span>
                      <span className="text-neutral-300">{personalInfo.email}</span>
                    </div>
                  )}
                  {personalInfo.phone && (
                    <div className="flex items-center space-x-3">
                      <span className="text-secondary-400">&gt;</span>
                      <span className="text-neutral-300">{personalInfo.phone}</span>
                    </div>
                  )}
                  {personalInfo.location && (
                    <div className="flex items-center space-x-3">
                      <span className="text-accent-400">&gt;</span>
                      <span className="text-neutral-300">{personalInfo.location}</span>
                    </div>
                  )}
                  {personalInfo.website && (
                    <div className="flex items-center space-x-3">
                      <span className="text-primary-300">&gt;</span>
                      <span className="text-neutral-400 text-xs">{personalInfo.website}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="ml-8">
                <div className="w-20 h-20 border-2 border-primary-400 rounded-lg flex items-center justify-center bg-neutral-900">
                  <span className="text-lg font-black text-primary-400">
                    {personalInfo.fullName?.split(' ').map(n => n[0]).join('') || 'YN'}
                  </span>
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Summary */}
        {sections.summary && summary && (
          <section className="mb-8">
            <div className="border-l-4 border-primary-400 pl-6 bg-neutral-900/30 p-4 rounded-r-lg">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-primary-400 text-sm font-bold tracking-wider">[EXEC_SUMMARY]</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-neutral-300 font-sans">
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
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-accent-400 text-lg font-bold tracking-wider">[WORK_HISTORY]</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-accent-400/50 to-transparent"></div>
                </div>
                
                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <div key={exp.id} className="relative">
                      <div className="border border-neutral-700 rounded-lg p-5 bg-neutral-900/40 backdrop-blur-sm hover:border-primary-500/50 transition-colors">
                        <div className="absolute top-0 right-0 w-2 h-2 bg-primary-400 rounded-full m-3"></div>
                        
                        <div className="mb-3">
                          <h3 className="text-lg font-bold text-white mb-1 tracking-wide">{exp.position}</h3>
                          <div className="flex items-center justify-between">
                            <p className="text-primary-300 font-semibold">{exp.company}</p>
                            <div className="text-neutral-400 text-xs bg-neutral-800 px-3 py-1 rounded border border-neutral-700">
                              {formatDate(exp.startDate)} → {exp.current ? 'ACTIVE' : formatDate(exp.endDate)}
                            </div>
                          </div>
                          {exp.location && (
                            <p className="text-neutral-500 text-sm">{exp.location}</p>
                          )}
                        </div>
                        
                        {exp.description && (
                          <div className="text-sm text-neutral-300 leading-relaxed font-sans border-t border-neutral-700 pt-3">
                            {exp.description.split('\n').map((line, index) => (
                              <p key={index} className="mb-2 flex items-start">
                                <span className="text-primary-400 mr-2 mt-1">▸</span>
                                <span>{line}</span>
                              </p>
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

          {/* Right Column */}
          <div className="space-y-8">
            {/* Skills */}
            {sections.skills && skills.length > 0 && (
              <section>
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-secondary-400 text-sm font-bold tracking-wider">[SKILLS]</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-secondary-400/50 to-transparent"></div>
                </div>
                
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.id} className="border border-neutral-700 rounded-lg p-4 bg-neutral-900/40">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white text-sm font-medium">{skill.name}</span>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 4 }, (_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < getSkillLevel(skill.level)
                                  ? 'bg-gradient-to-r from-primary-400 to-secondary-400'
                                  : 'bg-neutral-700'
                              }`}
                            ></div>
                          ))}
                        </div>
                      </div>
                      <div className="text-xs text-neutral-500 uppercase tracking-wider">{skill.level}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {sections.education && education.length > 0 && (
              <section>
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-accent-400 text-sm font-bold tracking-wider">[EDUCATION]</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-accent-400/50 to-transparent"></div>
                </div>
                
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="border border-neutral-700 rounded-lg p-4 bg-neutral-900/40">
                      <h3 className="text-white text-sm font-bold mb-1 tracking-wide">
                        {edu.degree}
                      </h3>
                      <p className="text-primary-300 text-sm font-medium">{edu.field}</p>
                      <p className="text-neutral-400 text-xs">{edu.institution}</p>
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-neutral-700">
                        <span className="text-neutral-500 text-xs">
                          {formatDate(edu.startDate)} → {formatDate(edu.endDate)}
                        </span>
                        {edu.gpa && (
                          <span className="text-accent-400 text-xs font-bold">GPA: {edu.gpa}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-neutral-700 flex items-center justify-center space-x-4 text-xs text-neutral-500">
          <span>SYSTEM_STATUS: ONLINE</span>
          <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
          <span>RESUME_VERSION: 2.1.0</span>
        </div>
      </div>
    </div>
  )
}