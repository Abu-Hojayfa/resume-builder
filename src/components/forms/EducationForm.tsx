import { useState, useRef } from 'react'
import { useResume, Education } from '../../contexts/ResumeContext'

function fmtDate(d: string) {
  if (!d) return ''
  const [y, m] = d.split('-')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[parseInt(m) - 1]} ${y}`
}

function EducationRow({
  edu,
  index,
  onEdit,
  onDelete,
  onDragStart,
  onDrop,
}: {
  edu: Education
  index: number
  onEdit: () => void
  onDelete: () => void
  onDragStart: (index: number) => void
  onDrop: (index: number) => void
}) {
  const [isDragOver, setIsDragOver] = useState(false)

  return (
    <div
      className={`exp-card draggable-card ${isDragOver ? 'drag-over' : ''}`}
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={() => { setIsDragOver(false); onDrop(index) }}
    >
      <div className="exp-card-header">
        <div className="drag-handle" title="Drag to reorder">⋮⋮</div>
        <div style={{ flex: 1 }}>
          <p className="exp-position">
            {edu.degree || 'Degree'} {edu.field && `in ${edu.field}`}
          </p>
          <p className="exp-company">{edu.institution || 'Institution'}</p>
          {edu.startDate && (
            <p className="exp-dates">
              {fmtDate(edu.startDate)} – {fmtDate(edu.endDate)}
            </p>
          )}
          {edu.gpa && <p className="exp-dates">GPA: {edu.gpa}</p>}
        </div>
        <div className="exp-actions">
          <button onClick={onEdit} className="btn-text-primary">Edit</button>
          <button onClick={onDelete} className="btn-text-danger">Delete</button>
        </div>
      </div>
    </div>
  )
}

function EducationEditForm({
  edu,
  onDone,
  onDelete,
  onUpdate,
}: {
  edu: Education
  onDone: () => void
  onDelete: () => void
  onUpdate: (data: Partial<Education>) => void
}) {
  const [institution, setInstitution] = useState(edu.institution)
  const [degree, setDegree] = useState(edu.degree)
  const [field, setField] = useState(edu.field)
  const [location, setLocation] = useState(edu.location)
  const [startDate, setStartDate] = useState(edu.startDate)
  const [endDate, setEndDate] = useState(edu.endDate)
  const [gpa, setGpa] = useState(edu.gpa || '')

  const flush = () => {
    onUpdate({ institution, degree, field, location, startDate, endDate, gpa })
  }

  return (
    <div className="exp-form">
      <div className="form-group">
        <label className="form-label">Institution *</label>
        <input
          className="form-input"
          type="text"
          value={institution}
          onChange={e => setInstitution(e.target.value)}
          onBlur={flush}
          placeholder="University of California, Berkeley"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Degree *</label>
          <select
            className="form-input"
            value={degree}
            onChange={e => { setDegree(e.target.value); onUpdate({ degree: e.target.value }) }}
          >
            <option value="">Select degree</option>
            <option value="High School Diploma">High School Diploma</option>
            <option value="Associate's Degree">Associate's Degree</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="Doctoral Degree">Doctoral Degree</option>
            <option value="Certificate">Certificate</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Field of Study *</label>
          <input
            className="form-input"
            type="text"
            value={field}
            onChange={e => setField(e.target.value)}
            onBlur={flush}
            placeholder="Computer Science"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Location</label>
        <input
          className="form-input"
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          onBlur={flush}
          placeholder="Berkeley, CA"
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
          <label className="form-label">End Date *</label>
          <input
            className="form-input"
            type="month"
            value={endDate}
            onChange={e => { setEndDate(e.target.value); onUpdate({ endDate: e.target.value }) }}
          />
        </div>
        <div className="form-group">
          <label className="form-label">GPA (Optional)</label>
          <input
            className="form-input"
            type="text"
            value={gpa}
            onChange={e => setGpa(e.target.value)}
            onBlur={flush}
            placeholder="3.8"
          />
        </div>
      </div>

      <div className="form-actions">
        <button onClick={onDelete} className="btn-danger">Delete</button>
        <button onClick={() => { flush(); onDone() }} className="btn-primary">Done</button>
      </div>
    </div>
  )
}

export default function EducationForm() {
  const { education, addEducation, updateEducation, deleteEducation, reorderEducation, generateId } = useResume()
  const [editingId, setEditingId] = useState<string | null>(null)
  const dragIndex = useRef<number>(-1)

  const handleAdd = () => {
    const id = generateId()
    const newEdu: Education = {
      id,
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: ''
    }
    addEducation(newEdu)
    setEditingId(id)
  }

  const handleDelete = (id: string) => {
    deleteEducation(id)
    if (editingId === id) setEditingId(null)
  }

  const handleDrop = (toIndex: number) => {
    if (dragIndex.current !== -1 && dragIndex.current !== toIndex) {
      reorderEducation(dragIndex.current, toIndex)
    }
    dragIndex.current = -1
  }

  return (
    <div className="section-wrapper">
      <div className="section-header">
        <h2 className="section-title">Education</h2>
        <button onClick={handleAdd} className="btn-primary btn-sm">+ Add</button>
      </div>

      {education.length === 0 ? (
        <div className="empty-state">
          <p>No education added yet.</p>
          <p>Click <strong>+ Add</strong> to get started.</p>
        </div>
      ) : (
        <div className="items-list">
          {education.map((edu, index) =>
            editingId === edu.id ? (
              <EducationEditForm
                key={edu.id}
                edu={edu}
                onDone={() => setEditingId(null)}
                onDelete={() => handleDelete(edu.id)}
                onUpdate={data => updateEducation(edu.id, data)}
              />
            ) : (
              <EducationRow
                key={edu.id}
                edu={edu}
                index={index}
                onEdit={() => setEditingId(edu.id)}
                onDelete={() => handleDelete(edu.id)}
                onDragStart={(i) => { dragIndex.current = i }}
                onDrop={handleDrop}
              />
            )
          )}
        </div>
      )}
    </div>
  )
}