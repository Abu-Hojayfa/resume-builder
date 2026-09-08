import { useState, useRef, useEffect } from 'react'
import { useResume } from '../contexts/ResumeContext'
import ProfessionalTemplate from './templates/ProfessionalTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import CreativeTemplate from './templates/CreativeTemplate'
import AuroraTemplate from './templates/AuroraTemplate'
import NexusTemplate from './templates/NexusTemplate'

interface PreviewProps {
  className?: string
  isFullscreen: boolean
  onCloseFullscreen: () => void
  onOpenFullscreen: () => void
}

export default function ResumePreview({
  className = '',
  isFullscreen,
  onCloseFullscreen,
  onOpenFullscreen,
}: PreviewProps) {
  const { personalInfo, summary, experience, education, skills, selectedTemplate, style, sections } = useResume()
  const [scale, setScale] = useState<number>(0.68)
  const scrollRef = useRef<HTMLDivElement>(null)

  const resumeData = { personalInfo, summary, experience, education, skills, template: selectedTemplate, style, sections }

  const Template = {
    professional: ProfessionalTemplate,
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    creative: CreativeTemplate,
    aurora: AuroraTemplate,
    nexus: NexusTemplate,
  }[selectedTemplate] ?? ProfessionalTemplate

  // Auto fit scale to container width on mount or resize
  const handleAutoFit = () => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.clientWidth - 48
      // 8.5in in px is ~816px at 96dpi
      const targetScale = Math.min(Math.max(containerWidth / 816, 0.45), 1.0)
      setScale(Number(targetScale.toFixed(2)))
    }
  }

  useEffect(() => {
    handleAutoFit()
    window.addEventListener('resize', handleAutoFit)
    return () => window.removeEventListener('resize', handleAutoFit)
  }, [])

  const zoomIn  = () => setScale(prev => Math.min(Number((prev + 0.08).toFixed(2)), 1.3))
  const zoomOut = () => setScale(prev => Math.max(Number((prev - 0.08).toFixed(2)), 0.35))

  // The actual resume element (rendered at native 8.5in × 11in)
  const documentElement = (
    <div
      className="resume-preview-container resume-content"
      id="resume-preview"
      style={{ width: '8.5in', minHeight: '11in', background: '#fff' }}
    >
      <Template data={resumeData} />
    </div>
  )

  return (
    <div className={`preview-panel ${className}`}>
      {/* Preview Panel Header with Controls */}
      <div className="preview-header">
        <span className="preview-header-title">Live Preview</span>
        <div className="preview-controls">
          <button onClick={zoomOut} className="zoom-btn" title="Zoom Out" aria-label="Zoom out">−</button>
          <span className="zoom-val">{Math.round(scale * 100)}%</span>
          <button onClick={zoomIn} className="zoom-btn" title="Zoom In" aria-label="Zoom in">+</button>
          <button onClick={handleAutoFit} className="zoom-btn" title="Fit to Screen" aria-label="Fit screen">Fit</button>
          <button
            onClick={onOpenFullscreen}
            className="zoom-btn"
            title="Full Screen View"
            aria-label="Full screen"
          >
            ⛶
          </button>
        </div>
      </div>

      {/* Scrollable Container */}
      <div className="preview-scroll" ref={scrollRef}>
        <div
          style={{
            width: `calc(8.5in * ${scale})`,
            height: `calc(11in * ${scale} + 40px)`,
            display: 'flex',
            alignItems: 'flex-start',
          }}
        >
          <div
            className="preview-scale-wrap"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              width: '8.5in',
            }}
          >
            {documentElement}
          </div>
        </div>
      </div>

      {/* Fullscreen Preview Modal */}
      {isFullscreen && (
        <div className="preview-modal-overlay" role="dialog" aria-modal="true" aria-label="Fullscreen resume preview">
          <div className="preview-modal-header">
            <span className="preview-header-title">Full Screen Resume Preview</span>
            <div className="preview-controls">
              <button onClick={zoomOut} className="zoom-btn" aria-label="Zoom out">−</button>
              <span className="zoom-val">{Math.round(scale * 100)}%</span>
              <button onClick={zoomIn} className="zoom-btn" aria-label="Zoom in">+</button>
              <button onClick={handleAutoFit} className="zoom-btn" aria-label="Fit to screen">Fit</button>
              <button
                onClick={onCloseFullscreen}
                className="btn-primary btn-sm"
                aria-label="Close fullscreen"
              >
                Close ✕
              </button>
            </div>
          </div>
          <div className="preview-modal-body">
            <div
              style={{
                width: `calc(8.5in * ${scale})`,
                minHeight: `calc(11in * ${scale} + 60px)`,
              }}
            >
              <div
                className="preview-scale-wrap"
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: 'top center',
                  width: '8.5in',
                }}
              >
                {documentElement}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}