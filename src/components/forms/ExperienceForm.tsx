import { useState } from 'react'
import { useResume, Experience } from '../../contexts/ResumeContext'

// Helper: format month string for display
function fmtDate(d: string) {
  if (!d) return ''
  const [y, m] = d.split('-')
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${months[parseInt(m) - 1]} ${y}`
}

// Collapsed summary row
function ExperienceRow({
  exp,
  onEdit,
  onDelete,
}: {
  exp: Experience
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="exp-card">
      <div className="exp-card-header">
        <div>
          <p className="exp-position">{exp.position || 'New Position'}</p>
          <p className="exp-company">{exp.company || 'Company'}</p>
          {exp.startDate && (
            <p className="exp-dates">
              {fmtDate(exp.startDate)} — {exp.current ? 'Present' : fmtDate(exp.endDate)}
            </p>
          )}
        </div>
        <div className="exp-actions">
          <button onClick={onEdit} className="btn-text-primary">Edit</button>
          <button onClick={onDelete} className="btn-text-danger">Delete</button>
        </div>
      </div>
    </div>
  )
}

// Expanded edit form — uses local state to buffer input, writes to context on blur
function ExperienceEditForm({
  exp,
  onDone,
  onDelete,
  onUpdate,
}: {
  exp: Experience
  onDone: () => void
  onDelete: () => void
  onUpdate: (data: Partial<Experience>) => void
}) {
  const [position, setPosition] = useState(exp.position)
  const [company, setCompany] = useState(exp.company)
  const [location, setLocation] = useState(exp.location)
  const [startDate, setStartDate] = useState(exp.startDate)
  const [endDate, setEndDate] = useState(exp.endDate)
  const [current, setCurrent] = useState(exp.current)
  const [description, setDescription] = useState(exp.description)

  const flush = () => {
    onUpdate({ position, company, location, startDate, endDate, current, description })
  }

  const handleCurrentChange = (checked: boolean) => {
    setCurrent(checked)
    onUpdate({ current: checked, endDate: checked ? '' : endDate })
  }

  return (
    <div className="exp-form">
      <div className="form-group">
        <label className="form-label">Job Title *</label>
        <input
          className="form-input"
          type="text"
          value={position}
          onChange={e => setPosition(e.target.value)}
          onBlur={flush}
          placeholder="Software Engineer"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Company *</label>
        <input
          className="form-input"
          type="text"
          value={company}
          onChange={e => setCompany(e.target.value)}
          onBlur={flush}
          placeholder="Google"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Location</label>
        <input
          className="form-input"
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          onBlur={flush}
          placeholder="San Francisco, CA"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Start Date *</label>
          <input
            className="form-input"
            type="month"
            value={startDate}
            onChange={e => { setStartDate(e.target.value); onUpdate({ startDate: e.target.value }) }}
          />
        </div>
        <div className="form-group">
          <label className="form-label">End Date</label>
          <input
            className="form-input"
            type="month"
            value={endDate}
            disabled={current}
            onChange={e => { setEndDate(e.target.value); onUpdate({ endDate: e.target.value }) }}
          />
        </div>
      </div>

      <div className="form-check">
        <input
          type="checkbox"
          id={`current-${exp.id}`}
          checked={current}
          onChange={e => handleCurrentChange(e.target.checked)}
        />
        <label htmlFor={`current-${exp.id}`}>I currently work here</label>
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          className="form-input"
          value={description}
          rows={6}
          onChange={e => setDescription(e.target.value)}
          onBlur={flush}
          placeholder={'• Led a team of 5 developers\n• Increased performance by 40%\n• Mentored junior developers'}
        />
        <p className="form-hint">Use bullet points (•) to list key achievements</p>
      </div>

      <div className="form-actions">
        <button onClick={onDelete} className="btn-danger">Delete</button>
        <button onClick={() => { flush(); onDone() }} className="btn-primary">Done</button>
      </div>
    </div>
  )
}

export default function ExperienceForm() {
  const { experience, addExperience, updateExperience, deleteExperience, generateId } = useResume()
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleAdd = () => {
    const id = generateId()
    const newExp: Experience = {
      id,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
    addExperience(newExp)
    setEditingId(id)
  }

  const handleDelete = (id: string) => {
    deleteExperience(id)
    if (editingId === id) setEditingId(null)
  }

  return (
    <div className="section-wrapper">
      <div className="section-header">
        <h2 className="section-title">Work Experience</h2>
        <button onClick={handleAdd} className="btn-primary btn-sm">+ Add</button>
      </div>

      {experience.length === 0 ? (
        <div className="empty-state">
          <p>No experience added yet.</p>
          <p>Click <strong>+ Add</strong> to get started.</p>
        </div>
      ) : (
        <div className="items-list">
          {experience.map(exp =>
            editingId === exp.id ? (
              <ExperienceEditForm
                key={exp.id}
                exp={exp}
                onDone={() => setEditingId(null)}
                onDelete={() => handleDelete(exp.id)}
                onUpdate={data => updateExperience(exp.id, data)}
              />
            ) : (
              <ExperienceRow
                key={exp.id}
                exp={exp}
                onEdit={() => setEditingId(exp.id)}
                onDelete={() => handleDelete(exp.id)}
              />
            )
          )}
        </div>
      )}
    </div>
  )
}