import { useState } from 'react'
import { useResume, Education } from '../../contexts/ResumeContext'

export default function EducationForm() {
  const { education, addEducation, updateEducation, deleteEducation, generateId } = useResume()
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleAdd = () => {
    const newEducation: Education = {
      id: generateId(),
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: ''
    }
    addEducation(newEducation)
    setEditingId(newEducation.id)
  }

  const handleUpdate = (id: string, data: Partial<Education>) => {
    updateEducation(id, data)
  }

  const handleDelete = (id: string) => {
    deleteEducation(id)
    if (editingId === id) {
      setEditingId(null)
    }
  }

  const EducationItem = ({ edu }: { edu: Education }) => {
    const isEditing = editingId === edu.id

    if (!isEditing) {
      return (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-medium text-gray-900">{edu.degree || 'New Degree'} {edu.field && `in ${edu.field}`}</h4>
              <p className="text-sm text-gray-600">{edu.institution}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingId(edu.id)}
                className="text-primary-600 hover:text-primary-700 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(edu.id)}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
          {edu.gpa && (
            <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>
          )}
        </div>
      )
    }

    return (
      <div className="p-4 border border-gray-300 rounded-lg bg-white">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Institution *
            </label>
            <input
              type="text"
              value={edu.institution}
              onChange={(e) => handleUpdate(edu.id, { institution: e.target.value })}
              placeholder="University of California, Berkeley"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Degree *
              </label>
              <select
                value={edu.degree}
                onChange={(e) => handleUpdate(edu.id, { degree: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Field of Study *
              </label>
              <input
                type="text"
                value={edu.field}
                onChange={(e) => handleUpdate(edu.id, { field: e.target.value })}
                placeholder="Computer Science"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={edu.location}
              onChange={(e) => handleUpdate(edu.id, { location: e.target.value })}
              placeholder="Berkeley, CA"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <input
                type="month"
                value={edu.startDate}
                onChange={(e) => handleUpdate(edu.id, { startDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date *
              </label>
              <input
                type="month"
                value={edu.endDate}
                onChange={(e) => handleUpdate(edu.id, { endDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GPA (Optional)
              </label>
              <input
                type="text"
                value={edu.gpa || ''}
                onChange={(e) => handleUpdate(edu.id, { gpa: e.target.value })}
                placeholder="3.8"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
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
              onClick={() => handleDelete(edu.id)}
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
        <h3 className="text-lg font-semibold text-gray-900">Education</h3>
        <button
          onClick={handleAdd}
          className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Add Education
        </button>
      </div>

      <div className="space-y-4">
        {education.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No education added yet.</p>
            <p className="text-sm">Click "Add Education" to get started.</p>
          </div>
        ) : (
          education.map((edu) => (
            <EducationItem key={edu.id} edu={edu} />
          ))
        )}
      </div>
    </div>
  )
}