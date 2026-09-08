import { useState } from 'react'
import { ResumeProvider } from './contexts/ResumeContext'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ResumePreview from './components/ResumePreview'
import TemplateSelector from './components/TemplateSelector'
import StyleForm from './components/forms/StyleForm'
import PersonalInfoForm from './components/forms/PersonalInfoForm'
import SummaryForm from './components/forms/SummaryForm'
import ExperienceForm from './components/forms/ExperienceForm'
import EducationForm from './components/forms/EducationForm'
import SkillsForm from './components/forms/SkillsForm'

export type ActiveSection = 'template' | 'style' | 'personal' | 'summary' | 'experience' | 'education' | 'skills'

function renderSection(active: ActiveSection) {
  switch (active) {
    case 'template':  return <TemplateSelector />
    case 'style':     return <StyleForm />
    case 'personal':  return <PersonalInfoForm />
    case 'summary':   return <SummaryForm />
    case 'experience': return <ExperienceForm />
    case 'education': return <EducationForm />
    case 'skills':    return <SkillsForm />
  }
}

function App() {
  const [active, setActive] = useState<ActiveSection>('template')

  return (
    <ResumeProvider>
      <div className="app-shell">
        <Header />
        <div className="app-body">
          <Sidebar activeSection={active} onSectionChange={setActive} />
          <main className="app-main">
            <div className="form-panel">
              {renderSection(active)}
            </div>
            <div className="preview-panel">
              <div className="preview-header">
                <span>Live Preview</span>
              </div>
              <div className="preview-scroll">
                <div className="preview-scale-wrap">
                  <ResumePreview />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ResumeProvider>
  )
}

export default App