import { useResumeContext } from '../contexts/ResumeContext'

const templates = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and traditional ATS-optimized design',
    category: 'Classic',
    preview: '/api/placeholder/300/400',
    features: ['ATS Optimized', 'Clean Layout', 'Professional'],
    color: 'from-neutral-600 to-neutral-800'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with colors and visual elements',
    category: 'Contemporary',
    preview: '/api/placeholder/300/400',
    features: ['Colorful', 'Visual Elements', 'Modern Layout'],
    color: 'from-primary-500 to-primary-700'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, distraction-free minimalist layout',
    category: 'Minimalist',
    preview: '/api/placeholder/300/400',
    features: ['Minimal Design', 'Typography Focus', 'Clean'],
    color: 'from-neutral-400 to-neutral-600'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Two-column design with visual flair and personality',
    category: 'Creative',
    preview: '/api/placeholder/300/400',
    features: ['Two Column', 'Visual Flair', 'Creative Layout'],
    color: 'from-secondary-500 to-secondary-700'
  },
  {
    id: 'aurora',
    name: 'Aurora',
    description: 'Stunning gradient-based design with modern aesthetics',
    category: 'Premium',
    preview: '/api/placeholder/300/400',
    features: ['Gradient Effects', 'Modern Aesthetics', 'Premium Design'],
    color: 'from-primary-400 via-secondary-400 to-accent-400',
    isNew: true
  },
  {
    id: 'nexus',
    name: 'Nexus',
    description: 'Futuristic tech-inspired design for tech professionals',
    category: 'Tech',
    preview: '/api/placeholder/300/400',
    features: ['Tech-Inspired', 'Dark Theme', 'Futuristic'],
    color: 'from-neutral-800 to-neutral-950',
    isNew: true
  }
]

export default function TemplateSelector() {
  const { selectedTemplate, setSelectedTemplate } = useResumeContext()

  const categories = [...new Set(templates.map(t => t.category))]

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-neutral-900 mb-3">
          Choose Your Template
        </h2>
        <p className="text-lg text-neutral-600 max-w-2xl">
          Select a professional template that matches your style and industry. 
          Each template is carefully designed to help you stand out while remaining ATS-friendly.
        </p>
      </div>

      {categories.map(category => (
        <div key={category} className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <h3 className="text-xl font-semibold text-neutral-800">{category}</h3>
            <div className="flex-1 h-px bg-neutral-200"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {templates
              .filter(template => template.category === category)
              .map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`group relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selectedTemplate === template.id
                      ? 'ring-4 ring-primary-500 ring-opacity-50 scale-105'
                      : ''
                  }`}
                >
                  <div className="card overflow-hidden">
                    {/* Preview Area */}
                    <div className="aspect-[3/4] bg-gradient-to-br p-6 flex items-center justify-center relative overflow-hidden"
                         style={{ background: `linear-gradient(135deg, ${template.color.split(' ').join(', ')})` }}>
                      {template.isNew && (
                        <div className="absolute top-3 right-3 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          NEW
                        </div>
                      )}
                      
                      {/* Mock Resume Preview */}
                      <div className="w-full h-full bg-white rounded-lg shadow-lg p-4 transform scale-75">
                        <div className="space-y-3">
                          <div className="h-4 bg-neutral-900 rounded w-3/4"></div>
                          <div className="h-2 bg-neutral-400 rounded w-1/2"></div>
                          <div className="space-y-2 mt-4">
                            <div className="h-2 bg-neutral-300 rounded w-full"></div>
                            <div className="h-2 bg-neutral-300 rounded w-4/5"></div>
                            <div className="h-2 bg-neutral-300 rounded w-3/4"></div>
                          </div>
                          <div className="mt-4">
                            <div className="h-3 bg-neutral-600 rounded w-2/3 mb-2"></div>
                            <div className="space-y-1">
                              <div className="h-2 bg-neutral-200 rounded w-full"></div>
                              <div className="h-2 bg-neutral-200 rounded w-5/6"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Selection Overlay */}
                      {selectedTemplate === template.id && (
                        <div className="absolute inset-0 bg-primary-500 bg-opacity-20 flex items-center justify-center">
                          <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Template Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-lg font-bold text-neutral-900">{template.name}</h4>
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${template.color}`}></div>
                      </div>
                      
                      <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                        {template.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {template.features.map((feature, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* Action Buttons */}
      <div className="mt-12 flex items-center justify-center space-x-4">
        <button className="btn-primary px-8 py-3">
          Continue with {templates.find(t => t.id === selectedTemplate)?.name || 'Selected'} Template
        </button>
        <button className="px-6 py-3 text-neutral-600 hover:text-neutral-800 transition-colors">
          Preview All Templates
        </button>
      </div>

      {/* Template Stats */}
      <div className="mt-12 bg-gradient-to-r from-neutral-50 to-primary-50/30 rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">98%</div>
            <div className="text-sm text-neutral-600">ATS Compatibility</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-secondary-600 mb-2">6</div>
            <div className="text-sm text-neutral-600">Professional Templates</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent-600 mb-2">15s</div>
            <div className="text-sm text-neutral-600">Average Setup Time</div>
          </div>
        </div>
      </div>
    </div>
  )
}