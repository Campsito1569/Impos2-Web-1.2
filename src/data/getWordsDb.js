/**
 * Devuelve el dataset de palabras por idioma.
 * Normaliza lang (ej: "en-US" => "en"), fallback a "es" si no existe.
 */
import { AUTOMATIC_WORDS } from './words_auto_es.js'
import { footballWords } from './footballWords.js'
import wordsEn from './words/words.en.json'
import wordsFr from './words/words.fr.json'
import wordsPt from './words/words.pt.json'

function buildEsDb() {
  const arr = AUTOMATIC_WORDS
  return {
    categories: {
      countries: arr.slice(0, 50),
      famous: arr.slice(50, 150),
      objects: [...arr.slice(150, 350), ...arr.slice(850)],
      animals: arr.slice(350, 500),
      actions: arr.slice(500, 600),
      places: arr.slice(600, 850)
    },
    football: {
      players: footballWords.players,
      teams: footballWords.teams
    }
  }
}

const esDb = buildEsDb()
const byLang = { es: esDb, en: wordsEn, fr: wordsFr, pt: wordsPt }

export function getWordsDb(lang) {
  const normalized = (lang || 'es').split('-')[0].toLowerCase()
  return byLang[normalized] || esDb
}

/**
 * Lista plana de todas las palabras de categorías (para modo Base de Datos).
 */
export function getAllWordsFromDb(lang) {
  const db = getWordsDb(lang)
  const cat = db.categories || {}
  return [
    ...(cat.countries || []),
    ...(cat.famous || []),
    ...(cat.animals || []),
    ...(cat.objects || []),
    ...(cat.actions || []),
    ...(cat.places || [])
  ]
}

/**
 * Lista plana de palabras de fútbol (jugadores + equipos).
 */
export function getAllFootballWordsFromDb(lang) {
  const db = getWordsDb(lang)
  const fb = db.football || {}
  return [...(fb.players || []), ...(fb.teams || [])]
}

export function getRandomWordFromDb(lang) {
  const all = getAllWordsFromDb(lang)
  if (all.length === 0) return null
  return all[Math.floor(Math.random() * all.length)]
}

export function getRandomFootballWordFromDb(lang) {
  const all = getAllFootballWordsFromDb(lang)
  if (all.length === 0) return null
  return all[Math.floor(Math.random() * all.length)]
}
