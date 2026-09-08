import { useState, useEffect, useRef } from 'react'
import { useResume } from '../../contexts/ResumeContext'

export default function SummaryForm() {
  const { summary, updateSummary } = useResume()
  
  // Local state to prevent focus loss
  const [localSummary, setLocalSummary] = useState(summary)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Update local state when context changes (from other sources)
  useEffect(() => {
    setLocalSummary(summary)
  }, [summary])

  const handleChange = (value: string) => {
    // Update local state immediately for responsive UI
    setLocalSummary(value)
    
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    // Set new timeout for debounced update
    timeoutRef.current = setTimeout(() => {
      updateSummary(value)
    }, 500) // Longer debounce for textarea
  }

  const handleExampleClick = (example: string) => {
    setLocalSummary(example)
    updateSummary(example) // Immediate update for examples
  }

  const examples = [
    "Results-driven software engineer with 5+ years of experience in full-stack development. Passionate about creating scalable solutions and leading cross-functional teams to deliver high-quality products.",
    "Marketing professional with a proven track record of driving 40% growth in digital engagement. Skilled in content strategy, social media marketing, and data-driven campaign optimization.",
    "Financial analyst with expertise in financial modeling, budgeting, and strategic planning. Strong analytical skills with experience in supporting C-level executives in decision-making processes."
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Summary</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
              Summary
            </label>
            <textarea
              id="summary"
              value={localSummary}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Write a compelling summary that highlights your key achievements and skills..."
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
            />
            <div className="mt-2 text-sm text-gray-500">
              {localSummary.length}/500 characters
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Example Summaries</h4>
            <div className="space-y-3">
              {examples.map((example, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleExampleClick(example)}
                >
                  <p className="text-sm text-gray-700">{example}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Tips for a Great Summary</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Keep it concise (2-3 sentences)</li>
              <li>• Include years of experience</li>
              <li>• Highlight key achievements with numbers</li>
              <li>• Match keywords from job descriptions</li>
              <li>• Focus on value you can bring to employers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}