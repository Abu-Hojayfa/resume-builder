import { useResume } from '../contexts/ResumeContext'

/**
 * usePdfExport — generates a clean PDF from the resume preview.
 *
 * Strategy: clone the resume DOM node, inject it into a hidden iframe with
 * all necessary styles, then call iframe.contentWindow.print().
 * This avoids the scaling/transform issues with window.print().
 */
export function usePdfExport() {
  const { personalInfo, selectedTemplate } = useResume()

  const savePdf = () => {
    const sourceEl = document.getElementById('resume-preview')
    if (!sourceEl) {
      console.warn('usePdfExport: #resume-preview not found')
      return
    }

    // Build a filename: "John_Doe_Resume_2026-09-08.pdf"
    const namePart = personalInfo.fullName
      ? personalInfo.fullName.trim().replace(/\s+/g, '_')
      : 'Resume'
    const datePart = new Date().toISOString().split('T')[0]
    const filename = `${namePart}_Resume_${datePart}`

    // Clone the resume element so we can manipulate it without affecting the live UI
    const clone = sourceEl.cloneNode(true) as HTMLElement
    clone.style.transform = 'none'
    clone.style.width = '8.5in'
    clone.style.minHeight = '11in'
    clone.style.margin = '0'
    clone.style.padding = '0'
    clone.style.boxShadow = 'none'

    // Collect all stylesheets from the current document
    const styleLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .map((el) => el.outerHTML)
      .join('\n')
    const inlineStyles = Array.from(document.querySelectorAll('style'))
      .map((el) => `<style>${el.innerHTML}</style>`)
      .join('\n')

    // Build iframe HTML
    const iframeHTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${filename}</title>
  ${styleLinks}
  ${inlineStyles}
  <style>
    @page {
      size: letter portrait;
      margin: 0;
    }
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    html, body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      width: 8.5in;
    }
    body > div {
      width: 8.5in;
      min-height: 11in;
    }
  </style>
</head>
<body>
  <div data-template="${selectedTemplate}">
    ${clone.outerHTML}
  </div>
</body>
</html>`

    // Create a hidden iframe
    const iframe = document.createElement('iframe')
    iframe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:8.5in;height:11in;border:none;'
    document.body.appendChild(iframe)

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
    if (!iframeDoc) {
      document.body.removeChild(iframe)
      return
    }

    iframeDoc.open()
    iframeDoc.write(iframeHTML)
    iframeDoc.close()

    // Wait for fonts / resources to load, then print
    const printAndCleanup = () => {
      try {
        if (iframe.contentWindow) {
          // Set the suggested filename via document title
          const origTitle = document.title
          document.title = filename
          iframe.contentWindow.focus()
          iframe.contentWindow.print()
          // Restore title after a short delay
          setTimeout(() => {
            document.title = origTitle
          }, 1000)
        }
      } finally {
        // Remove iframe after print dialog closes (small delay for safety)
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe)
          }
        }, 2000)
      }
    }

    // Give resources ~800ms to load
    setTimeout(printAndCleanup, 800)
  }

  return { savePdf }
}
