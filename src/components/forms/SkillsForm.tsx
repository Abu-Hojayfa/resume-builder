import { useState, useRef } from 'react'
import { useResume, Skill } from '../../contexts/ResumeContext'

const SUGGESTIONS = [
  'JavaScript', 'TypeScript', 'Python', 'React', 'Node.js', 'Java', 'C++', 'SQL',
  'HTML/CSS', 'Git', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL',
  'Project Management', 'Leadership', 'Data Analysis', 'Figma', 'Marketing',
]

const levelColors: Record<Skill['level'], string> = {
  beginner: 'badge-gray',
  intermediate: 'badge-yellow',
  advanced: 'badge-blue',
  expert: 'badge-green',
}

export default function SkillsForm() {
  const { skills, addSkill, updateSkill, deleteSkill, reorderSkills, generateId } = useResume()
  const [name, setName] = useState('')
  const [level, setLevel] = useState<Skill['level']>('intermediate')
  const dragIndex = useRef<number>(-1)
  const [dragOverIndex, setDragOverIndex] = useState<number>(-1)

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    addSkill({ id: generateId(), name: name.trim(), level })
    setName('')
    setLevel('intermediate')
  }

  const handleDrop = (toIndex: number) => {
    if (dragIndex.current !== -1 && dragIndex.current !== toIndex) {
      reorderSkills(dragIndex.current, toIndex)
    }
    dragIndex.current = -1
    setDragOverIndex(-1)
  }

  const unusedSuggestions = SUGGESTIONS.filter(
    s => !skills.some(sk => sk.name.toLowerCase() === s.toLowerCase())
  )

  return (
    <div className="section-wrapper">
      <div className="section-header">
        <h2 className="section-title">Skills</h2>
      </div>

      <form onSubmit={handleAdd} className="form-stack">
        <div className="form-row">
          <div className="form-group" style={{ flex: 2 }}>
            <label htmlFor="skillName" className="form-label">Skill Name</label>
            <input
              id="skillName"
              className="form-input"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. JavaScript"
            />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="skillLevel" className="form-label">Level</label>
            <select
              id="skillLevel"
              className="form-input"
              value={level}
              onChange={e => setLevel(e.target.value as Skill['level'])}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn-primary">Add Skill</button>
      </form>

      {skills.length > 0 && (
        <div className="skills-list">
          {skills.map((skill, index) => (
            <div
              key={skill.id}
              className={`skill-row draggable-card ${dragOverIndex === index ? 'drag-over' : ''}`}
              draggable
              onDragStart={() => { dragIndex.current = index }}
              onDragOver={(e) => { e.preventDefault(); setDragOverIndex(index) }}
              onDragLeave={() => setDragOverIndex(-1)}
              onDrop={() => handleDrop(index)}
            >
              <div className="drag-handle" title="Drag to reorder">⋮⋮</div>
              <span className="skill-name">{skill.name}</span>
              <span className={`badge ${levelColors[skill.level]}`}>{skill.level}</span>
              <select
                className="skill-level-select"
                value={skill.level}
                onChange={e => updateSkill(skill.id, { level: e.target.value as Skill['level'] })}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
              <button className="btn-text-danger" onClick={() => deleteSkill(skill.id)}>✕</button>
            </div>
          ))}
        </div>
      )}

      {unusedSuggestions.length > 0 && (
        <div className="suggestions">
          <p className="form-label">Suggestions</p>
          <div className="suggestion-chips">
            {unusedSuggestions.map(s => (
              <button
                key={s}
                type="button"
                className="chip"
                onClick={() => setName(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}