import { useState, useRef } from 'react'
import { useResume, Experience } from '../../contexts/ResumeContext'

function fmtDate(d: string) {
  if (!d) return ''
  const [y, m] = d.split('-')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[parseInt(m) - 1]} ${y}`
}

function ExperienceRow({
  exp,
  index,
  total,
  onEdit,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
}: {
  exp: Experience
  index: number
  total: number
  onEdit: () => void
  onDelete: () => void
  onDragStart: (index: number) => void
  onDragOver: (e: React.DragEvent, index: number) => void
  onDrop: (index: number) => void
}) {
  const [isDragOver, setIsDragOver] = useState(false)

  return (
    <div
      className={`exp-card draggable-card ${isDragOver ? 'drag-over' : ''}`}
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); onDragOver(e, index) }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={() => { setIsDragOver(false); onDrop(index) }}
    >
      <div className="exp-card-header">
        <div className="drag-handle" title="Drag to reorder">⋮⋮</div>
        <div style={{ flex: 1 }}>
          <p className="exp-position">{exp.position || 'New Position'}</p>
          <p className="exp-company">{exp.company || 'Company'}</p>
          {exp.startDate && (
            <p className="exp-dates">
              {fmtDate(exp.startDate)} – {exp.current ? 'Present' : fmtDate(exp.endDate)}
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
          rows={5}
          onChange={e => setDescription(e.target.value)}
          onBlur={flush}
          placeholder={'• Built a feature that cut load time by 40%\n• Mentored two junior developers\n• Collaborated with design and product teams'}
        />
        <p className="form-hint">Start each line with a bullet point (•) to list your key contributions.</p>
      </div>

      <div className="form-actions">
        <button onClick={onDelete} className="btn-danger">Delete</button>
        <button onClick={() => { flush(); onDone() }} className="btn-primary">Done</button>
      </div>
    </div>
  )
}

export default function ExperienceForm() {
  const { experience, addExperience, updateExperience, deleteExperience, reorderExperience, generateId } = useResume()
  const [editingId, setEditingId] = useState<string | null>(null)
  const dragIndex = useRef<number>(-1)

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

  const handleDrop = (toIndex: number) => {
    if (dragIndex.current !== -1 && dragIndex.current !== toIndex) {
      reorderExperience(dragIndex.current, toIndex)
    }
    dragIndex.current = -1
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
          {experience.map((exp, index) =>
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
                index={index}
                total={experience.length}
                onEdit={() => setEditingId(exp.id)}
                onDelete={() => handleDelete(exp.id)}
                onDragStart={(i) => { dragIndex.current = i }}
                onDragOver={(_e, _i) => {}}
                onDrop={handleDrop}
              />
            )
          )}
        </div>
      )}
    </div>
  )
}