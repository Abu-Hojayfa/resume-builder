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

export interface ResumeStyle {
  fontFamily: string
  accentColor: string
  textColor: string
  dividerWidth: number
  dividerColor: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  summary: string
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  template: string
  style: ResumeStyle
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
}

type ResumeAction =
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
  | { type: 'UPDATE_SUMMARY'; payload: string }
  | { type: 'ADD_EXPERIENCE'; payload: Experience }
  | { type: 'UPDATE_EXPERIENCE'; payload: { id: string; data: Partial<Experience> } }
  | { type: 'DELETE_EXPERIENCE'; payload: string }
  | { type: 'REORDER_EXPERIENCE'; payload: { fromIndex: number; toIndex: number } }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Partial<Education> } }
  | { type: 'DELETE_EDUCATION'; payload: string }
  | { type: 'REORDER_EDUCATION'; payload: { fromIndex: number; toIndex: number } }
  | { type: 'ADD_SKILL'; payload: Skill }
  | { type: 'UPDATE_SKILL'; payload: { id: string; data: Partial<Skill> } }
  | { type: 'DELETE_SKILL'; payload: string }
  | { type: 'REORDER_SKILLS'; payload: { fromIndex: number; toIndex: number } }
  | { type: 'SET_TEMPLATE'; payload: string }
  | { type: 'UPDATE_STYLE'; payload: Partial<ResumeStyle> }
  | { type: 'TOGGLE_SECTION'; payload: keyof ResumeData['sections'] }
  | { type: 'LOAD_RESUME'; payload: ResumeData }
  | { type: 'RESET_RESUME' }

const defaultStyle: ResumeStyle = {
  fontFamily: 'Inter',
  accentColor: '#1e293b',
  textColor: '#374151',
  dividerWidth: 1,
  dividerColor: '#cbd5e1',
}

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
    style: defaultStyle,
    sections: {
      personalInfo: true,
      summary: true,
      experience: true,
      education: true,
      skills: true
    }
  }
}

function resumeReducer(state: ResumeState, action: ResumeAction): ResumeState {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        data: {
          ...state.data,
          personalInfo: { ...state.data.personalInfo, ...action.payload }
        }
      }

    case 'UPDATE_SUMMARY':
      return { ...state, data: { ...state.data, summary: action.payload } }

    case 'ADD_EXPERIENCE':
      return {
        ...state,
        data: { ...state.data, experience: [...state.data.experience, action.payload] }
      }

    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        data: {
          ...state.data,
          experience: state.data.experience.map(exp =>
            exp.id === action.payload.id ? { ...exp, ...action.payload.data } : exp
          )
        }
      }

    case 'DELETE_EXPERIENCE':
      return {
        ...state,
        data: {
          ...state.data,
          experience: state.data.experience.filter(exp => exp.id !== action.payload)
        }
      }

    case 'REORDER_EXPERIENCE': {
      const arr = [...state.data.experience]
      const [moved] = arr.splice(action.payload.fromIndex, 1)
      arr.splice(action.payload.toIndex, 0, moved)
      return { ...state, data: { ...state.data, experience: arr } }
    }

    case 'ADD_EDUCATION':
      return {
        ...state,
        data: { ...state.data, education: [...state.data.education, action.payload] }
      }

    case 'UPDATE_EDUCATION':
      return {
        ...state,
        data: {
          ...state.data,
          education: state.data.education.map(edu =>
            edu.id === action.payload.id ? { ...edu, ...action.payload.data } : edu
          )
        }
      }

    case 'DELETE_EDUCATION':
      return {
        ...state,
        data: {
          ...state.data,
          education: state.data.education.filter(edu => edu.id !== action.payload)
        }
      }

    case 'REORDER_EDUCATION': {
      const arr = [...state.data.education]
      const [moved] = arr.splice(action.payload.fromIndex, 1)
      arr.splice(action.payload.toIndex, 0, moved)
      return { ...state, data: { ...state.data, education: arr } }
    }

    case 'ADD_SKILL':
      return {
        ...state,
        data: { ...state.data, skills: [...state.data.skills, action.payload] }
      }

    case 'UPDATE_SKILL':
      return {
        ...state,
        data: {
          ...state.data,
          skills: state.data.skills.map(skill =>
            skill.id === action.payload.id ? { ...skill, ...action.payload.data } : skill
          )
        }
      }

    case 'DELETE_SKILL':
      return {
        ...state,
        data: {
          ...state.data,
          skills: state.data.skills.filter(skill => skill.id !== action.payload)
        }
      }

    case 'REORDER_SKILLS': {
      const arr = [...state.data.skills]
      const [moved] = arr.splice(action.payload.fromIndex, 1)
      arr.splice(action.payload.toIndex, 0, moved)
      return { ...state, data: { ...state.data, skills: arr } }
    }

    case 'SET_TEMPLATE':
      return { ...state, data: { ...state.data, template: action.payload } }

    case 'UPDATE_STYLE':
      return {
        ...state,
        data: { ...state.data, style: { ...state.data.style, ...action.payload } }
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
        }
      }

    case 'LOAD_RESUME':
      return { ...state, data: action.payload }

    case 'RESET_RESUME':
      return initialState

    default:
      return state
  }
}

interface ResumeContextType {
  personalInfo: PersonalInfo
  summary: string
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  selectedTemplate: string
  style: ResumeStyle
  sections: ResumeData['sections']

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
  updateStyle: (style: Partial<ResumeStyle>) => void
  toggleSection: (section: keyof ResumeData['sections']) => void
  reorderExperience: (fromIndex: number, toIndex: number) => void
  reorderEducation: (fromIndex: number, toIndex: number) => void
  reorderSkills: (fromIndex: number, toIndex: number) => void
  generateId: () => string
  resetResume: () => void
  loadResume: (data: ResumeData) => void
  exportResume: () => void
  importResume: (data: unknown) => void
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState)

  const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2)

  const exportResume = () => {
    const dataStr = JSON.stringify(state.data, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
    const name = `resume-${state.data.personalInfo.fullName || 'untitled'}-${new Date().toISOString().split('T')[0]}.json`
    const link = document.createElement('a')
    link.setAttribute('href', dataUri)
    link.setAttribute('download', name)
    link.click()
  }

  const importResume = (data: unknown) => {
    try {
      const raw = data as Partial<ResumeData>
      // Merge with initial state so partial/old JSON files still work
      const merged: ResumeData = {
        personalInfo: { ...initialState.data.personalInfo, ...(raw.personalInfo ?? {}) },
        summary: typeof raw.summary === 'string' ? raw.summary : '',
        experience: Array.isArray(raw.experience) ? raw.experience : [],
        education: Array.isArray(raw.education) ? raw.education : [],
        skills: Array.isArray(raw.skills) ? raw.skills : [],
        template: typeof raw.template === 'string' ? raw.template : 'professional',
        style: { ...initialState.data.style, ...(raw.style ?? {}) },
        sections: { ...initialState.data.sections, ...(raw.sections ?? {}) },
      }
      dispatch({ type: 'LOAD_RESUME', payload: merged })
    } catch {
      alert('Could not load resume. The file may be corrupted or in an unsupported format.')
    }
  }

  const contextValue: ResumeContextType = {
    personalInfo: state.data.personalInfo,
    summary: state.data.summary,
    experience: state.data.experience,
    education: state.data.education,
    skills: state.data.skills,
    selectedTemplate: state.data.template,
    style: state.data.style,
    sections: state.data.sections,

    updatePersonalInfo: (info) => dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: info }),
    updateSummary: (summary) => dispatch({ type: 'UPDATE_SUMMARY', payload: summary }),
    addExperience: (experience) => dispatch({ type: 'ADD_EXPERIENCE', payload: experience }),
    updateExperience: (id, data) => dispatch({ type: 'UPDATE_EXPERIENCE', payload: { id, data } }),
    deleteExperience: (id) => dispatch({ type: 'DELETE_EXPERIENCE', payload: id }),
    addEducation: (education) => dispatch({ type: 'ADD_EDUCATION', payload: education }),
    updateEducation: (id, data) => dispatch({ type: 'UPDATE_EDUCATION', payload: { id, data } }),
    deleteEducation: (id) => dispatch({ type: 'DELETE_EDUCATION', payload: id }),
    addSkill: (skill) => dispatch({ type: 'ADD_SKILL', payload: skill }),
    updateSkill: (id, data) => dispatch({ type: 'UPDATE_SKILL', payload: { id, data } }),
    deleteSkill: (id) => dispatch({ type: 'DELETE_SKILL', payload: id }),
    setSelectedTemplate: (template) => dispatch({ type: 'SET_TEMPLATE', payload: template }),
    updateStyle: (style) => dispatch({ type: 'UPDATE_STYLE', payload: style }),
    toggleSection: (section) => dispatch({ type: 'TOGGLE_SECTION', payload: section }),
    reorderExperience: (fromIndex, toIndex) => dispatch({ type: 'REORDER_EXPERIENCE', payload: { fromIndex, toIndex } }),
    reorderEducation: (fromIndex, toIndex) => dispatch({ type: 'REORDER_EDUCATION', payload: { fromIndex, toIndex } }),
    reorderSkills: (fromIndex, toIndex) => dispatch({ type: 'REORDER_SKILLS', payload: { fromIndex, toIndex } }),
    generateId,
    resetResume: () => dispatch({ type: 'RESET_RESUME' }),
    loadResume: (data) => dispatch({ type: 'LOAD_RESUME', payload: data }),
    exportResume,
    importResume,
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

export const useResumeContext = useResume