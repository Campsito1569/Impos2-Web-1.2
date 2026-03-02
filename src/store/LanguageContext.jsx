import { createContext, useContext, useState, useEffect } from 'react'
import { translations, languages } from '../i18n/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  // Inicializar desde localStorage inmediatamente para evitar flash de idioma incorrecto
  const getInitialLanguage = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language')
      return saved && translations[saved] ? saved : 'es'
    }
    return 'es'
  }

  const [language, setLanguage] = useState(getInitialLanguage)
  const [volume, setVolume] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('volume')
      return saved ? parseInt(saved) : 50
    }
    return 50
  })
  const [soundEffectsVolume, setSoundEffectsVolume] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('soundEffectsVolume')
      return saved ? parseInt(saved) : 50
    }
    return 50
  })
  const [musicVolume, setMusicVolume] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('musicVolume')
      return saved ? parseInt(saved) : 50
    }
    return 50
  })

  // Guardar configuración en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  // Función para cambiar idioma que también guarda en localStorage
  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage)
      localStorage.setItem('language', newLanguage)
    }
  }

  useEffect(() => {
    localStorage.setItem('volume', volume.toString())
  }, [volume])

  useEffect(() => {
    localStorage.setItem('soundEffectsVolume', soundEffectsVolume.toString())
  }, [soundEffectsVolume])

  useEffect(() => {
    localStorage.setItem('musicVolume', musicVolume.toString())
  }, [musicVolume])

  const t = (key, params = {}) => {
    const keys = key.split('.')
    let value = translations[language]
    
    for (const k of keys) {
      value = value?.[k]
    }

    if (value === undefined) {
      // Fallback a español si no existe la traducción
      let fallbackValue = translations['es']
      for (const k of keys) {
        fallbackValue = fallbackValue?.[k]
      }
      value = fallbackValue || key
    }

    // Reemplazar parámetros
    if (typeof value === 'string') {
      let result = value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? params[paramKey] : match
      })
      
      // Manejar plurales {plural}
      if (params.count !== undefined) {
        const plural = params.count === 1 ? '' : 's'
        result = result.replace(/\{plural\}/g, plural)
      }
      
      return result
    }

    return value
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: changeLanguage,
        lang: language, // Alias para compatibilidad
        setLang: changeLanguage, // Alias para compatibilidad
        volume,
        setVolume,
        soundEffectsVolume,
        setSoundEffectsVolume,
        musicVolume,
        setMusicVolume,
        t,
        languages
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

