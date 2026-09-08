import { useResumeContext } from '../contexts/ResumeContext'
import ProfessionalTemplate from './templates/ProfessionalTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import CreativeTemplate from './templates/CreativeTemplate'
import AuroraTemplate from './templates/AuroraTemplate'
import NexusTemplate from './templates/NexusTemplate'

export default function ResumePreview() {
  const {
    personalInfo,
    summary,
    experience,
    education,
    skills,
    selectedTemplate,
    sections
  } = useResumeContext()

  // Create data object for template compatibility
  const resumeData = {
    personalInfo,
    summary,
    experience,
    education,
    skills,
    template: selectedTemplate,
    sections
  }

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'professional':
        return <ProfessionalTemplate data={resumeData} />
      case 'modern':
        return <ModernTemplate data={resumeData} />
      case 'minimal':
        return <MinimalTemplate data={resumeData} />
      case 'creative':
        return <CreativeTemplate data={resumeData} />
      case 'aurora':
        return <AuroraTemplate data={resumeData} />
      case 'nexus':
        return <NexusTemplate data={resumeData} />
      default:
        return <ProfessionalTemplate data={resumeData} />
    }
  }

  return (
    <div className="flex justify-center p-4">
      <div 
        className="resume-preview-container bg-white shadow-xl rounded-lg overflow-hidden" 
        id="resume-preview"
        style={{ width: '8.5in', minHeight: '11in' }}
      >
        <div className="resume-content">
          {renderTemplate()}
        </div>
      </div>
    </div>
  )
}