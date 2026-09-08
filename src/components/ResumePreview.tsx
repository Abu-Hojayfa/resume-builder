import { useResume } from '../contexts/ResumeContext'
import ProfessionalTemplate from './templates/ProfessionalTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import CreativeTemplate from './templates/CreativeTemplate'
import AuroraTemplate from './templates/AuroraTemplate'
import NexusTemplate from './templates/NexusTemplate'

export default function ResumePreview() {
  const { personalInfo, summary, experience, education, skills, selectedTemplate, style, sections } = useResume()

  const resumeData = { personalInfo, summary, experience, education, skills, template: selectedTemplate, style, sections }

  const Template = {
    professional: ProfessionalTemplate,
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    creative: CreativeTemplate,
    aurora: AuroraTemplate,
    nexus: NexusTemplate,
  }[selectedTemplate] ?? ProfessionalTemplate

  return (
    <div
      className="resume-preview-container resume-content"
      id="resume-preview"
      style={{ width: '8.5in', minHeight: '11in', background: '#fff' }}
    >
      <Template data={resumeData} />
    </div>
  )
}