import React, { createContext, useContext, useReducer, ReactNode } from 'react'

export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  website?: string
  linkedin?: string
  github?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string
  gpa?: string
}

export interface Skill {
  id: string
  name: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export interface ResumeData {
  personalInfo: PersonalInfo
  summary: string
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  template: string
  sections: {
    personalInfo: boolean
    summary: boolean
    experience: boolean
    education: boolean
    skills: boolean
  }
}

interface ResumeState {
  data: ResumeData
  isDirty: boolean
  lastSaved: Date | null
}

type ResumeAction =
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
  | { type: 'UPDATE_SUMMARY'; payload: string }
  | { type: 'ADD_EXPERIENCE'; payload: Experience }
  | { type: 'UPDATE_EXPERIENCE'; payload: { id: string; data: Partial<Experience> } }
  | { type: 'DELETE_EXPERIENCE'; payload: string }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Partial<Education> } }
  | { type: 'DELETE_EDUCATION'; payload: string }
  | { type: 'ADD_SKILL'; payload: Skill }
  | { type: 'UPDATE_SKILL'; payload: { id: string; data: Partial<Skill> } }
  | { type: 'DELETE_SKILL'; payload: string }
  | { type: 'SET_TEMPLATE'; payload: string }
  | { type: 'TOGGLE_SECTION'; payload: keyof ResumeData['sections'] }
  | { type: 'LOAD_RESUME'; payload: ResumeData }
  | { type: 'RESET_RESUME' }
  | { type: 'MARK_SAVED' }

const initialState: ResumeState = {
  data: {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    template: 'professional',
    sections: {
      personalInfo: true,
      summary: true,
      experience: true,
      education: true,
      skills: true
    }
  },
  isDirty: false,
  lastSaved: null
}

function resumeReducer(state: ResumeState, action: ResumeAction): ResumeState {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        data: {
          ...state.data,
          personalInfo: { ...state.data.personalInfo, ...action.payload }
        },
        isDirty: true
      }
    
    case 'UPDATE_SUMMARY':
      return {
        ...state,
        data: { ...state.data, summary: action.payload },
        isDirty: true
      }
    
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        data: {
          ...state.data,
          experience: [...state.data.experience, action.payload]
        },
        isDirty: true
      }
    
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        data: {
          ...state.data,
          experience: state.data.experience.map(exp =>
            exp.id === action.payload.id ? { ...exp, ...action.payload.data } : exp
          )
        },
        isDirty: true
      }
    
    case 'DELETE_EXPERIENCE':
      return {
        ...state,
        data: {
          ...state.data,
          experience: state.data.experience.filter(exp => exp.id !== action.payload)
        },
        isDirty: true
      }
    
    case 'ADD_EDUCATION':
      return {
        ...state,
        data: {
          ...state.data,
          education: [...state.data.education, action.payload]
        },
        isDirty: true
      }
    
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        data: {
          ...state.data,
          education: state.data.education.map(edu =>
            edu.id === action.payload.id ? { ...edu, ...action.payload.data } : edu
          )
        },
        isDirty: true
      }
    
    case 'DELETE_EDUCATION':
      return {
        ...state,
        data: {
          ...state.data,
          education: state.data.education.filter(edu => edu.id !== action.payload)
        },
        isDirty: true
      }
    
    case 'ADD_SKILL':
      return {
        ...state,
        data: {
          ...state.data,
          skills: [...state.data.skills, action.payload]
        },
        isDirty: true
      }
    
    case 'UPDATE_SKILL':
      return {
        ...state,
        data: {
          ...state.data,
          skills: state.data.skills.map(skill =>
            skill.id === action.payload.id ? { ...skill, ...action.payload.data } : skill
          )
        },
        isDirty: true
      }
    
    case 'DELETE_SKILL':
      return {
        ...state,
        data: {
          ...state.data,
          skills: state.data.skills.filter(skill => skill.id !== action.payload)
        },
        isDirty: true
      }
    
    case 'SET_TEMPLATE':
      return {
        ...state,
        data: { ...state.data, template: action.payload },
        isDirty: true
      }
    
    case 'TOGGLE_SECTION':
      return {
        ...state,
        data: {
          ...state.data,
          sections: {
            ...state.data.sections,
            [action.payload]: !state.data.sections[action.payload]
          }
        },
        isDirty: true
      }
    
    case 'LOAD_RESUME':
      return {
        ...state,
        data: action.payload,
        isDirty: false,
        lastSaved: new Date()
      }
    
    case 'RESET_RESUME':
      return initialState
    
    case 'MARK_SAVED':
      return {
        ...state,
        isDirty: false,
        lastSaved: new Date()
      }
    
    default:
      return state
  }
}

interface ResumeContextType {
  // State
  personalInfo: PersonalInfo
  summary: string
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  selectedTemplate: string
  sections: ResumeData['sections']
  isDirty: boolean
  lastSaved: Date | null
  hasUnsavedChanges: boolean
  
  // Actions
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void
  updateSummary: (summary: string) => void
  addExperience: (experience: Experience) => void
  updateExperience: (id: string, data: Partial<Experience>) => void
  deleteExperience: (id: string) => void
  addEducation: (education: Education) => void
  updateEducation: (id: string, data: Partial<Education>) => void
  deleteEducation: (id: string) => void
  addSkill: (skill: Skill) => void
  updateSkill: (id: string, data: Partial<Skill>) => void
  deleteSkill: (id: string) => void
  setSelectedTemplate: (template: string) => void
  toggleSection: (section: keyof ResumeData['sections']) => void
  generateId: () => string
  resetResume: () => void
  loadResume: (data: ResumeData) => void
  exportResume: () => void
  importResume: (data: ResumeData) => void
  markSaved: () => void
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState)
  
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  const exportResume = () => {
    const dataStr = JSON.stringify(state.data, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `resume-${state.data.personalInfo.fullName || 'untitled'}-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const importResume = (data: ResumeData) => {
    dispatch({ type: 'LOAD_RESUME', payload: data })
  }

  const contextValue: ResumeContextType = {
    // State
    personalInfo: state.data.personalInfo,
    summary: state.data.summary,
    experience: state.data.experience,
    education: state.data.education,
    skills: state.data.skills,
    selectedTemplate: state.data.template,
    sections: state.data.sections,
    isDirty: state.isDirty,
    lastSaved: state.lastSaved,
    hasUnsavedChanges: state.isDirty,
    
    // Actions
    updatePersonalInfo: (info: Partial<PersonalInfo>) => {
      dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: info })
    },
    updateSummary: (summary: string) => {
      dispatch({ type: 'UPDATE_SUMMARY', payload: summary })
    },
    addExperience: (experience: Experience) => {
      dispatch({ type: 'ADD_EXPERIENCE', payload: experience })
    },
    updateExperience: (id: string, data: Partial<Experience>) => {
      dispatch({ type: 'UPDATE_EXPERIENCE', payload: { id, data } })
    },
    deleteExperience: (id: string) => {
      dispatch({ type: 'DELETE_EXPERIENCE', payload: id })
    },
    addEducation: (education: Education) => {
      dispatch({ type: 'ADD_EDUCATION', payload: education })
    },
    updateEducation: (id: string, data: Partial<Education>) => {
      dispatch({ type: 'UPDATE_EDUCATION', payload: { id, data } })
    },
    deleteEducation: (id: string) => {
      dispatch({ type: 'DELETE_EDUCATION', payload: id })
    },
    addSkill: (skill: Skill) => {
      dispatch({ type: 'ADD_SKILL', payload: skill })
    },
    updateSkill: (id: string, data: Partial<Skill>) => {
      dispatch({ type: 'UPDATE_SKILL', payload: { id, data } })
    },
    deleteSkill: (id: string) => {
      dispatch({ type: 'DELETE_SKILL', payload: id })
    },
    setSelectedTemplate: (template: string) => {
      dispatch({ type: 'SET_TEMPLATE', payload: template })
    },
    toggleSection: (section: keyof ResumeData['sections']) => {
      dispatch({ type: 'TOGGLE_SECTION', payload: section })
    },
    generateId,
    resetResume: () => {
      dispatch({ type: 'RESET_RESUME' })
    },
    loadResume: (data: ResumeData) => {
      dispatch({ type: 'LOAD_RESUME', payload: data })
    },
    exportResume,
    importResume,
    markSaved: () => {
      dispatch({ type: 'MARK_SAVED' })
    }
  }

  return (
    <ResumeContext.Provider value={contextValue}>
      {children}
    </ResumeContext.Provider>
  )
}

export function useResume() {
  const context = useContext(ResumeContext)
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider')
  }
  return context
}

// Export the same function with different name for compatibility
export const useResumeContext = useResume