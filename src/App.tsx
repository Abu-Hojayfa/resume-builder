import { useState } from 'react'
import { ResumeProvider } from './contexts/ResumeContext'
import { ThemeProvider } from './contexts/ThemeContext'
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
export type MobileTab = 'form' | 'preview'

function renderSection(active: ActiveSection) {
  switch (active) {
    case 'template':   return <TemplateSelector />
    case 'style':      return <StyleForm />
    case 'personal':   return <PersonalInfoForm />
    case 'summary':    return <SummaryForm />
    case 'experience': return <ExperienceForm />
    case 'education':  return <EducationForm />
    case 'skills':     return <SkillsForm />
  }
}

function App() {
  const [active, setActive] = useState<ActiveSection>('template')
  const [mobileTab, setMobileTab] = useState<MobileTab>('form')
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)

  return (
    <ThemeProvider>
      <ResumeProvider>
        <div className="app-shell">
          <Header />
          
          {/* Mobile View Toggle Bar (Only visible on screens < 992px) */}
          <div className="mobile-view-tabs">
            <button
              onClick={() => setMobileTab('form')}
              className={`mobile-tab-btn ${mobileTab === 'form' ? 'mobile-tab-btn--active' : ''}`}
            >
              📝 Form Builder
            </button>
            <button
              onClick={() => setMobileTab('preview')}
              className={`mobile-tab-btn ${mobileTab === 'preview' ? 'mobile-tab-btn--active' : ''}`}
            >
              👁️ Live Preview
            </button>
          </div>

          <div className="app-body">
            <Sidebar
              activeSection={active}
              onSectionChange={setActive}
              onOpenFullscreen={() => setIsFullscreen(true)}
            />
            <main className="app-main">
              <div className={`form-panel ${mobileTab === 'preview' ? 'mobile-hidden' : ''}`}>
                {renderSection(active)}
              </div>
              <ResumePreview
                className={mobileTab === 'form' ? 'mobile-hidden' : ''}
                isFullscreen={isFullscreen}
                onCloseFullscreen={() => setIsFullscreen(false)}
                onOpenFullscreen={() => setIsFullscreen(true)}
              />
            </main>
          </div>
        </div>
      </ResumeProvider>
    </ThemeProvider>
  )
}

export default App