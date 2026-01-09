import { createContext, useContext, useState, useEffect } from 'react'
import { translations, languages } from '../i18n/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('es')
  const [volume, setVolume] = useState(50)
  const [soundEffectsVolume, setSoundEffectsVolume] = useState(50)
  const [musicVolume, setMusicVolume] = useState(50)

  // Cargar configuración del localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language')
    const savedVolume = localStorage.getItem('volume')
    const savedSoundEffectsVolume = localStorage.getItem('soundEffectsVolume')
    const savedMusicVolume = localStorage.getItem('musicVolume')

    if (savedLanguage) setLanguage(savedLanguage)
    if (savedVolume) setVolume(parseInt(savedVolume))
    if (savedSoundEffectsVolume) setSoundEffectsVolume(parseInt(savedSoundEffectsVolume))
    if (savedMusicVolume) setMusicVolume(parseInt(savedMusicVolume))
  }, [])

  // Guardar configuración en localStorage
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

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
        setLanguage,
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

