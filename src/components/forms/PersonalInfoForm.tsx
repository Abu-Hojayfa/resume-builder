import { useResume } from '../../contexts/ResumeContext'

const fields: { key: keyof ReturnType<typeof useResume>['personalInfo']; label: string; type: string; placeholder: string; required?: boolean }[] = [
  { key: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Alex Mercer', required: true },
  { key: 'email', label: 'Email Address', type: 'email', placeholder: 'alex.mercer@example.com', required: true },
  { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 (415) 867-5309', required: true },
  { key: 'location', label: 'Location', type: 'text', placeholder: 'San Francisco, CA', required: true },
  { key: 'website', label: 'Website', type: 'url', placeholder: 'https://alexmercer.dev' },
  { key: 'linkedin', label: 'LinkedIn', type: 'url', placeholder: 'https://linkedin.com/in/alexmercer' },
  { key: 'github', label: 'GitHub', type: 'url', placeholder: 'https://github.com/alexmercer' },
]

export default function PersonalInfoForm() {
  const { personalInfo, updatePersonalInfo } = useResume()

  return (
    <div className="section-wrapper">
      <div className="section-header">
        <h2 className="section-title">Personal Info</h2>
      </div>

      <div className="form-stack">
        {fields.map(f => (
          <div key={f.key} className="form-group">
            <label className="form-label">
              {f.label} {f.required && <span className="req">*</span>}
            </label>
            <input
              id={f.key}
              className="form-input"
              type={f.type}
              value={personalInfo[f.key] || ''}
              onChange={e => updatePersonalInfo({ [f.key]: e.target.value })}
              placeholder={f.placeholder}
            />
          </div>
        ))}
      </div>
    </div>
  )
}