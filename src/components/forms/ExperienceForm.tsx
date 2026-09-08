import { useState } from 'react'
import { useResume, Experience } from '../../contexts/ResumeContext'

export default function ExperienceForm() {
  const { experience, addExperience, updateExperience, deleteExperience, generateId } = useResume()
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleAdd = () => {
    const newExperience: Experience = {
      id: generateId(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
    addExperience(newExperience)
    setEditingId(newExperience.id)
  }

  const handleUpdate = (id: string, data: Partial<Experience>) => {
    updateExperience(id, data)
  }

  const handleDelete = (id: string) => {
    deleteExperience(id)
    if (editingId === id) {
      setEditingId(null)
    }
  }

  const ExperienceItem = ({ exp }: { exp: Experience }) => {
    const isEditing = editingId === exp.id

    if (!isEditing) {
      return (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-medium text-gray-900">{exp.position || 'New Position'}</h4>
              <p className="text-sm text-gray-600">{exp.company}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingId(exp.id)}
                className="text-primary-600 hover:text-primary-700 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
          {exp.description && (
            <p className="text-sm text-gray-700 mt-2">{exp.description.substring(0, 100)}...</p>
          )}
        </div>
      )
    }

    return (
      <div className="p-4 border border-gray-300 rounded-lg bg-white">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title *
            </label>
            <input
              type="text"
              value={exp.position}
              onChange={(e) => handleUpdate(exp.id, { position: e.target.value })}
              placeholder="Software Engineer"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company *
            </label>
            <input
              type="text"
              value={exp.company}
              onChange={(e) => handleUpdate(exp.id, { company: e.target.value })}
              placeholder="Google"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={exp.location}
              onChange={(e) => handleUpdate(exp.id, { location: e.target.value })}
              placeholder="San Francisco, CA"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) => handleUpdate(exp.id, { startDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="month"
                value={exp.endDate}
                onChange={(e) => handleUpdate(exp.id, { endDate: e.target.value })}
                disabled={exp.current}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) => handleUpdate(exp.id, { 
                  current: e.target.checked,
                  endDate: e.target.checked ? '' : exp.endDate
                })}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">I currently work here</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={exp.description}
              onChange={(e) => handleUpdate(exp.id, { description: e.target.value })}
              placeholder="• Led a team of 5 developers to build a customer-facing web application
• Increased system performance by 40% through database optimization
• Mentored junior developers and conducted code reviews"
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <div className="mt-2 text-sm text-gray-500">
              Use bullet points to highlight your key achievements and responsibilities
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setEditingId(null)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Done
            </button>
            <button
              onClick={() => handleDelete(exp.id)}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
        <button
          onClick={handleAdd}
          className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {experience.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No work experience added yet.</p>
            <p className="text-sm">Click "Add Experience" to get started.</p>
          </div>
        ) : (
          experience.map((exp) => (
            <ExperienceItem key={exp.id} exp={exp} />
          ))
        )}
      </div>
    </div>
  )
}