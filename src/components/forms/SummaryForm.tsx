import { useResume } from '../../contexts/ResumeContext'

export default function SummaryForm() {
  const { summary, updateSummary } = useResume()

  return (
    <div className="section-wrapper">
      <div className="section-header">
        <h2 className="section-title">Professional Summary</h2>
      </div>

      <div className="form-stack">
        <div className="form-group">
          <label htmlFor="summary" className="form-label">Summary</label>
          <textarea
            id="summary"
            className="form-input"
            value={summary}
            onChange={e => updateSummary(e.target.value)}
            placeholder="Results-driven professional with X years of experience in..."
            rows={7}
          />
          <p className="form-hint">{summary.length} / 600 characters</p>
        </div>
      </div>
    </div>
  )
}