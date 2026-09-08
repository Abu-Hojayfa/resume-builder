import { ActiveSection } from '../App'
import { useResumeContext } from '../contexts/ResumeContext'

interface SidebarProps {
  activeSection: ActiveSection
  onSectionChange: (section: ActiveSection) => void
  onTogglePreview: () => void
  showPreview: boolean
}

const sidebarSections = [
  {
    id: 'template' as ActiveSection,
    name: 'Template',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    description: 'Choose your design',
    color: 'from-primary-500 to-primary-600'
  },
  {
    id: 'personal' as ActiveSection,
    name: 'Personal Info',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    description: 'Contact details',
    color: 'from-secondary-500 to-secondary-600'
  },
  {
    id: 'summary' as ActiveSection,
    name: 'Summary',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    description: 'Professional summary',
    color: 'from-accent-500 to-accent-600'
  },
  {
    id: 'experience' as ActiveSection,
    name: 'Experience',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0h2a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2" />
      </svg>
    ),
    description: 'Work history',
    color: 'from-primary-600 to-secondary-500'
  },
  {
    id: 'education' as ActiveSection,
    name: 'Education',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v6.5l9-5V9m-9 5l-9-5" />
      </svg>
    ),
    description: 'Academic background',
    color: 'from-secondary-600 to-accent-500'
  },
  {
    id: 'skills' as ActiveSection,
    name: 'Skills',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    description: 'Technical skills',
    color: 'from-accent-600 to-primary-500'
  }
]

export default function Sidebar({ activeSection, onSectionChange, onTogglePreview, showPreview }: SidebarProps) {
  const { personalInfo, summary, experience, education, skills } = useResumeContext()

  const getCompletionStatus = (sectionId: ActiveSection) => {
    switch (sectionId) {
      case 'personal':
        return !!(personalInfo.fullName && personalInfo.email)
      case 'summary':
        return !!summary && summary.length > 10
      case 'experience':
        return experience.length > 0
      case 'education':
        return education.length > 0
      case 'skills':
        return skills.length > 0
      default:
        return true
    }
  }

  const getProgress = () => {
    const completedSections = sidebarSections.filter(section => 
      section.id === 'template' || getCompletionStatus(section.id)
    ).length
    return Math.round((completedSections / sidebarSections.length) * 100)
  }

  return (
    <aside className="w-80 bg-white/80 backdrop-blur-md border-r border-neutral-200/50 min-h-screen sticky top-0 no-print">
      <div className="p-6">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-700">Completion Progress</h3>
            <span className="text-sm font-bold text-primary-600">{getProgress()}%</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
          <p className="text-xs text-neutral-600 mt-2">
            {getProgress() === 100 ? 'Your resume is ready!' : `${6 - sidebarSections.filter(s => s.id === 'template' || getCompletionStatus(s.id)).length} sections remaining`}
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 mb-8">
          <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4">
            Resume Sections
          </h3>
          {sidebarSections.map((section, index) => {
            const isActive = activeSection === section.id
            const isCompleted = section.id === 'template' || getCompletionStatus(section.id)
            
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 text-left group ${
                  isActive
                    ? 'bg-gradient-to-r ' + section.color + ' text-white shadow-lg transform scale-105'
                    : 'hover:bg-neutral-50 text-neutral-700'
                }`}
              >
                <div className={`relative flex-shrink-0 ${isActive ? 'text-white' : 'text-neutral-500'}`}>
                  {section.icon}
                  {isCompleted && !isActive && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-medium ${isActive ? 'text-white' : 'text-neutral-900'}`}>
                    {section.name}
                  </h4>
                  <p className={`text-sm ${isActive ? 'text-white/80' : 'text-neutral-600'}`}>
                    {section.description}
                  </p>
                </div>
                <div className={`text-sm font-bold ${isActive ? 'text-white' : 'text-neutral-400'}`}>
                  {index + 1}
                </div>
              </button>
            )
          })}
        </nav>

        {/* Preview Toggle */}
        <div className="border-t border-neutral-200 pt-6">
          <button
            onClick={onTogglePreview}
            className={`w-full flex items-center justify-center space-x-3 p-4 rounded-xl transition-all duration-200 ${
              showPreview
                ? 'bg-gradient-to-r from-neutral-800 to-neutral-900 text-white shadow-lg'
                : 'border-2 border-dashed border-neutral-300 text-neutral-600 hover:border-neutral-400 hover:text-neutral-700'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="font-semibold">
              {showPreview ? 'Close Preview' : 'Full Preview'}
            </span>
          </button>
        </div>

        {/* Quick Tips */}
        <div className="mt-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-neutral-800 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Quick Tip
          </h4>
          <p className="text-xs text-neutral-700 leading-relaxed">
            {activeSection === 'template' && "Choose a template that matches your industry. Modern templates work great for creative fields, while Professional templates are perfect for corporate roles."}
            {activeSection === 'personal' && "Include a professional email address and phone number. Add your LinkedIn profile to showcase your professional network."}
            {activeSection === 'summary' && "Write 2-4 sentences highlighting your key achievements and career goals. Use action words and specific metrics when possible."}
            {activeSection === 'experience' && "List your experiences in reverse chronological order. Focus on achievements rather than job duties, and use bullet points for easy reading."}
            {activeSection === 'education' && "Include your degree, institution, and graduation date. Add GPA if it's 3.5 or higher, and include relevant coursework for recent graduates."}
            {activeSection === 'skills' && "List both hard and soft skills relevant to your target job. Be honest about your skill levels - employers often test technical skills."}
          </p>
        </div>
      </div>
    </aside>
  )
}