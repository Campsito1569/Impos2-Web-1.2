/**
 * Devuelve el dataset de palabras por idioma.
 * Normaliza lang (ej: "en-US" => "en"), fallback a "es" si no existe.
 */
import { AUTOMATIC_WORDS } from './words_auto_es.js'
import { footballWords } from './footballWords.js'
import wordsEn from './words/words.en.json'
import wordsFr from './words/words.fr.json'
import wordsPt from './words/words.pt.json'

const ES_EXTRA_COUNTRIES = [
  'Uruguay', 'Paraguay', 'Bolivia', 'Honduras', 'El Salvador', 'Nicaragua', 'Guatemala', 'Haití', 'Jamaica', 'Trinidad y Tobago',
  'Bahamas', 'Barbados', 'Guyana', 'Surinam', 'Belice', 'Luxemburgo', 'Croacia', 'Eslovenia', 'Eslovaquia', 'República Checa',
  'Hungría', 'Rumanía', 'Bulgaria', 'Ucrania', 'Bielorrusia', 'Lituania', 'Letonia', 'Estonia', 'Albania', 'Macedonia',
  'Bosnia', 'Serbia', 'Montenegro', 'Kosovo', 'Chipre', 'Malta', 'Islandia', 'Kazajistán', 'Uzbekistán', 'Georgia',
  'Armenia', 'Azerbaiyán', 'Israel', 'Jordania', 'Líbano', 'Siria', 'Arabia Saudita', 'Emiratos Árabes', 'Kuwait', 'Qatar'
]

const ES_MOVIES_AND_SERIES = [
  'Titanic', 'Avatar', 'El Rey León', 'Star Wars', 'Harry Potter', 'Jurassic Park', 'Forrest Gump', 'Matrix', 'Gladiador', 'El Señor de los Anillos',
  'Pulp Fiction', 'Inception', 'El Padrino', 'Toy Story', 'Buscando a Nemo', 'Shrek', 'Los Vengadores', 'Iron Man', 'Batman', 'Superman',
  'E.T.', 'Regreso al Futuro', 'Indiana Jones', 'James Bond', 'La Guerra de las Galaxias', 'Los Simpson', 'Friends', 'Breaking Bad', 'Juego de Tronos', 'The Office',
  'Stranger Things', 'The Walking Dead', 'La Casa de Papel', 'Narcos', 'Black Mirror', 'Sherlock', 'Doctor Who', 'The Crown', 'The Big Bang Theory', 'Cómo conocí a vuestra madre',
  'Modern Family', 'Grey\'s Anatomy', 'The Witcher', 'Bridgerton', 'Lupin', 'Squid Game', 'Wednesday', 'The Last of Us', 'The Mandalorian', 'WandaVision',
  'Peaky Blinders', 'The Queen\'s Gambit', 'Chernobyl', 'Vikingos', 'The Umbrella Academy', 'Lucifer', 'The Boys', 'Ozark', 'The Handmaid\'s Tale', 'Westworld',
  'Better Call Saul', 'The Crown', 'Fleabag', 'Succession', 'The White Lotus', 'Euphoria', 'Yellowstone', 'Cobra Kai', 'Emily in Paris', 'Loki'
]

const ES_SPORTS = [
  'Fútbol', 'Baloncesto', 'Tenis', 'Atletismo', 'Natación', 'Ciclismo', 'Boxeo', 'Voleibol', 'Balonmano', 'Rugby',
  'Golf', 'Béisbol', 'Hockey', 'Esquí', 'Surf', 'Escalada', 'Artes marciales', 'Judo', 'Taekwondo', 'Lucha',
  'Gimnasia', 'Remo', 'Piragüismo', 'Equitación', 'Tiro al arco', 'Esgrima', 'Triatlón', 'Maratón', 'Salto de longitud', 'Lanzamiento de jabalina',
  'Patinaje', 'Hockey sobre hielo', 'Bádminton', 'Tenis de mesa', 'Críquet', 'Waterpolo', 'Sóftbol', 'Aeróbic', 'Crossfit', 'Pádel'
]

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
    },
    animalsMode: arr.slice(350, 420),
    countriesMode: [...arr.slice(0, 50), ...ES_EXTRA_COUNTRIES],
    moviesAndSeries: ES_MOVIES_AND_SERIES,
    sports: ES_SPORTS
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

function getRandomFromArray(arr) {
  if (!arr || arr.length === 0) return null
  return arr[Math.floor(Math.random() * arr.length)]
}

export function getRandomWordFromDb(lang) {
  const all = getAllWordsFromDb(lang)
  return getRandomFromArray(all)
}

export function getRandomFootballWordFromDb(lang) {
  const all = getAllFootballWordsFromDb(lang)
  return getRandomFromArray(all)
}

export function getRandomAnimalsWordFromDb(lang) {
  const db = getWordsDb(lang)
  return getRandomFromArray(db.animalsMode || [])
}

export function getRandomCountriesWordFromDb(lang) {
  const db = getWordsDb(lang)
  return getRandomFromArray(db.countriesMode || [])
}

export function getRandomMoviesAndSeriesWordFromDb(lang) {
  const db = getWordsDb(lang)
  return getRandomFromArray(db.moviesAndSeries || [])
}

export function getRandomSportsWordFromDb(lang) {
  const db = getWordsDb(lang)
  return getRandomFromArray(db.sports || [])
}
