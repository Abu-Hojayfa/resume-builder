import { useState, useCallback } from 'react'
import { ResumeProvider } from './contexts/ResumeContext'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ResumePreview from './components/ResumePreview'
import TemplateSelector from './components/TemplateSelector'
import PersonalInfoForm from './components/forms/PersonalInfoForm'
import SummaryForm from './components/forms/SummaryForm'
import ExperienceForm from './components/forms/ExperienceForm'
import EducationForm from './components/forms/EducationForm'
import SkillsForm from './components/forms/SkillsForm'

export type ActiveSection = 'template' | 'personal' | 'summary' | 'experience' | 'education' | 'skills'

function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('template')
  const [showPreview, setShowPreview] = useState(false)

  const handlePrint = useCallback(() => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    // Get the resume content
    const resumeElement = document.querySelector('.resume-content')
    if (!resumeElement) return

    // Create the print HTML
    const printHTML = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Resume</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@100;200;300;400;500;600;700;800&display=swap');
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            @page {
              size: letter;
              margin: 0.5in;
            }

            body {
              font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
              line-height: 1.5;
              color: #000;
              background: white;
            }

            .resume-content {
              width: 100%;
              max-width: none;
              margin: 0;
              padding: 0;
              background: white;
              box-shadow: none;
              border: none;
            }

            /* Copy all the necessary styles from your CSS */
            h1, h2, h3, h4, h5, h6 {
              margin: 0;
              font-weight: 600;
            }

            p, ul, li {
              margin: 0;
            }

            ul {
              list-style: none;
            }

            .text-xs { font-size: 0.75rem; line-height: 1rem; }
            .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
            .text-base { font-size: 1rem; line-height: 1.5rem; }
            .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
            .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
            .text-2xl { font-size: 1.5rem; line-height: 2rem; }
            .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }

            .font-light { font-weight: 300; }
            .font-normal { font-weight: 400; }
            .font-medium { font-weight: 500; }
            .font-semibold { font-weight: 600; }
            .font-bold { font-weight: 700; }

            .text-gray-600 { color: #525252; }
            .text-gray-700 { color: #404040; }
            .text-gray-800 { color: #262626; }
            .text-gray-900 { color: #171717; }
            .text-blue-600 { color: #0284c7; }
            .text-purple-600 { color: #c026d3; }
            .text-orange-600 { color: #ea580c; }

            .bg-gray-50 { background-color: #fafafa; }
            .bg-gray-100 { background-color: #f5f5f5; }
            .bg-blue-50 { background-color: #f0f9ff; }
            .bg-purple-50 { background-color: #fdf4ff; }
            .bg-orange-50 { background-color: #fff7ed; }

            .p-4 { padding: 1rem; }
            .p-6 { padding: 1.5rem; }
            .p-8 { padding: 2rem; }
            .px-4 { padding-left: 1rem; padding-right: 1rem; }
            .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
            .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
            .pt-4 { padding-top: 1rem; }
            .pb-4 { padding-bottom: 1rem; }
            .mb-2 { margin-bottom: 0.5rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .mb-8 { margin-bottom: 2rem; }
            .mt-4 { margin-top: 1rem; }
            .mr-4 { margin-right: 1rem; }

            .grid { display: grid; }
            .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            .gap-4 { gap: 1rem; }
            .gap-6 { gap: 1.5rem; }

            .flex { display: flex; }
            .items-center { align-items: center; }
            .justify-between { justify-content: space-between; }
            .space-x-2 > :not([hidden]) ~ :not([hidden]) { margin-left: 0.5rem; }

            .border-l { border-left-width: 1px; border-color: #e5e5e5; }
            .border-b { border-bottom-width: 1px; border-color: #e5e5e5; }
            .border-t { border-top-width: 1px; border-color: #e5e5e5; }

            .w-full { width: 100%; }
            .h-2 { height: 0.5rem; }
            .rounded { border-radius: 0.25rem; }
            .rounded-full { border-radius: 9999px; }

            .uppercase { text-transform: uppercase; }
            .tracking-wide { letter-spacing: 0.025em; }

            /* Template specific styles */
            .nexus-gradient { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
            .aurora-gradient { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
            .modern-accent { color: #0284c7; }
            .creative-primary { color: #c026d3; }
            .professional-blue { color: #0369a1; }
          </style>
        </head>
        <body>
          ${resumeElement.outerHTML}
        </body>
      </html>
    `

    // Write to the print window and print
    printWindow.document.write(printHTML)
    printWindow.document.close()
    
    // Wait for fonts to load, then print
    setTimeout(() => {
      printWindow.focus()
      printWindow.print()
      printWindow.close()
    }, 1000)
  }, [])

  const renderActiveSection = useCallback(() => {
    switch (activeSection) {
      case 'template':
        return <TemplateSelector />
      case 'personal':
        return <PersonalInfoForm />
      case 'summary':
        return <SummaryForm />
      case 'experience':
        return <ExperienceForm />
      case 'education':
        return <EducationForm />
      case 'skills':
        return <SkillsForm />
      default:
        return <TemplateSelector />
    }
  }, [activeSection])

  return (
    <ResumeProvider>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/30 to-secondary-50/20">
        <Header />
        
        <div className="flex">
          <Sidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection}
            onTogglePreview={() => setShowPreview(!showPreview)}
            showPreview={showPreview}
          />
          
          <main className="flex-1 transition-all duration-500 ease-in-out">
            {showPreview ? (
              <div className="p-6">
                <div className="max-w-none">
                  <div className="mb-6 flex items-center justify-between print:hidden">
                    <div>
                      <h2 className="text-2xl font-bold text-neutral-900 mb-2">Resume Preview</h2>
                      <p className="text-neutral-600">This is how your resume will look when printed or exported</p>
                    </div>
                    <button
                      onClick={handlePrint}
                      className="btn-primary inline-flex items-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      <span>Download PDF</span>
                    </button>
                  </div>
                  <div className="flex justify-center print:block print:justify-start">
                    <div className="transform scale-75 origin-top print:scale-100 print:transform-none">
                      <div className="resume-preview-container">
                        <ResumePreview />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex">
                <div className="flex-1 p-6">
                  <div className="max-w-4xl mx-auto">
                    <div className="animate-fade-in">
                      {renderActiveSection()}
                    </div>
                  </div>
                </div>
                
                <div className="w-96 border-l border-neutral-200 bg-white/50 backdrop-blur-sm overflow-hidden">
                  <div className="h-full flex flex-col">
                    <div className="p-4 border-b border-neutral-200 bg-white/80">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-1">Live Preview</h3>
                      <p className="text-sm text-neutral-600">See your changes in real-time</p>
                    </div>
                    
                    <div className="flex-1 p-4 overflow-auto">
                      <div className="flex justify-center">
                        <div 
                          className="transform origin-top transition-transform duration-200"
                          style={{ 
                            transform: 'scale(0.35)',
                            width: '8.5in',
                            height: '11in'
                          }}
                        >
                          <div className="w-full h-full">
                            <ResumePreview />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </ResumeProvider>
  )
}

export default App