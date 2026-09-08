import { useState } from 'react'
import { useResume, Skill } from '../../contexts/ResumeContext'

export default function SkillsForm() {
  const { skills, addSkill, updateSkill, deleteSkill, generateId } = useResume()
  const [newSkillName, setNewSkillName] = useState('')
  const [newSkillLevel, setNewSkillLevel] = useState<Skill['level']>('intermediate')

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSkillName.trim()) return

    const newSkill: Skill = {
      id: generateId(),
      name: newSkillName.trim(),
      level: newSkillLevel
    }

    addSkill(newSkill)
    setNewSkillName('')
    setNewSkillLevel('intermediate')
  }

  const handleUpdateSkill = (id: string, data: Partial<Skill>) => {
    updateSkill(id, data)
  }

  const handleDeleteSkill = (id: string) => {
    deleteSkill(id)
  }

  const skillSuggestions = [
    'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java', 'C++', 'SQL',
    'HTML/CSS', 'Git', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'Express.js',
    'Project Management', 'Communication', 'Leadership', 'Problem Solving',
    'Data Analysis', 'Microsoft Excel', 'Photoshop', 'Figma', 'Marketing',
    'Sales', 'Customer Service', 'Research', 'Writing', 'Public Speaking'
  ]

  const getLevelColor = (level: Skill['level']) => {
    switch (level) {
      case 'beginner':
        return 'bg-red-100 text-red-800'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
        return 'bg-blue-100 text-blue-800'
      case 'expert':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Skills</h3>

      {/* Add New Skill */}
      <form onSubmit={handleAddSkill} className="space-y-4">
        <div>
          <label htmlFor="skillName" className="block text-sm font-medium text-gray-700 mb-2">
            Skill Name
          </label>
          <input
            type="text"
            id="skillName"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            placeholder="e.g., JavaScript, Project Management, etc."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-700 mb-2">
            Proficiency Level
          </label>
          <select
            id="skillLevel"
            value={newSkillLevel}
            onChange={(e) => setNewSkillLevel(e.target.value as Skill['level'])}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Add Skill
        </button>
      </form>

      {/* Current Skills */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Your Skills</h4>
        {skills.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No skills added yet.</p>
            <p className="text-sm">Add your first skill above or choose from suggestions below.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-gray-900">{skill.name}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(skill.level)}`}>
                    {skill.level}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={skill.level}
                    onChange={(e) => handleUpdateSkill(skill.id, { level: e.target.value as Skill['level'] })}
                    className="text-xs border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Skill Suggestions */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Popular Skills</h4>
        <div className="flex flex-wrap gap-2">
          {skillSuggestions
            .filter(suggestion => !skills.some(skill => skill.name.toLowerCase() === suggestion.toLowerCase()))
            .map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setNewSkillName(suggestion)
                }}
                className="px-3 py-1 text-sm text-gray-600 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                {suggestion}
              </button>
            ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Tips for Skills Section</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Include both technical and soft skills</li>
          <li>• Be honest about your proficiency levels</li>
          <li>• Focus on skills relevant to your target job</li>
          <li>• Include certifications where applicable</li>
          <li>• Keep the list concise (8-12 key skills)</li>
        </ul>
      </div>
    </div>
  )
}