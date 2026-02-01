// Gestor de música de fondo
// Maneja la reproducción de música de fondo en loop sin duplicación

let backgroundAudio = null
let isPlaying = false
let currentVolume = 0.5
let isInitialized = false

/**
 * Inicializa el audio de fondo si no existe
 */
function initBackgroundAudio() {
  if (!backgroundAudio) {
    // Intentar diferentes rutas posibles
    const audioPath = '/sounds/musica-fondo.wav'
    backgroundAudio = new Audio(audioPath)
    backgroundAudio.loop = true
    backgroundAudio.volume = currentVolume
    
    // Manejar errores de carga con más detalle
    backgroundAudio.addEventListener('error', (e) => {
      console.error('❌ Error al cargar música de fondo:', {
        error: e,
        code: backgroundAudio?.error?.code,
        message: backgroundAudio?.error?.message,
        path: audioPath,
        readyState: backgroundAudio?.readyState
      })
      console.warn('💡 Asegúrate de que el archivo existe en:', audioPath)
    })
    
    // Log cuando se carga correctamente
    backgroundAudio.addEventListener('loadeddata', () => {
      console.log('✅ Música de fondo cargada correctamente')
    })
    
    // Log cuando está listo para reproducir
    backgroundAudio.addEventListener('canplay', () => {
      console.log('🎵 Música lista para reproducir')
    })
    
    // Prevenir duplicación si se intenta reproducir mientras ya está reproduciéndose
    backgroundAudio.addEventListener('play', () => {
      isPlaying = true
      console.log('▶️ Música de fondo iniciada')
    })
    
    backgroundAudio.addEventListener('pause', () => {
      isPlaying = false
      console.log('⏸️ Música de fondo pausada')
    })
    
    // Intentar cargar el audio
    backgroundAudio.load()
    isInitialized = true
  }
}

/**
 * Reproduce la música de fondo
 * @param {number} volume - Volumen entre 0 y 1 (por defecto 0.5)
 */
export function playBackgroundMusic(volume = 0.5) {
  initBackgroundAudio()
  
  // Si ya está reproduciéndose, solo actualizar el volumen
  if (isPlaying && backgroundAudio && !backgroundAudio.paused) {
    console.log('🔄 Música ya reproduciéndose, actualizando volumen a:', volume)
    setBackgroundVolume(volume)
    return
  }
  
  // Establecer volumen antes de reproducir
  currentVolume = Math.max(0, Math.min(1, volume))
  if (backgroundAudio) {
    backgroundAudio.volume = currentVolume
    
    // Verificar el estado del audio antes de reproducir
    console.log('🎵 Intentando reproducir música:', {
      volume: currentVolume,
      readyState: backgroundAudio.readyState,
      paused: backgroundAudio.paused,
      error: backgroundAudio.error
    })
    
    const playPromise = backgroundAudio.play()
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('✅ Música de fondo reproduciéndose correctamente')
        })
        .catch((error) => {
          console.error('❌ Error al reproducir música de fondo:', error)
          console.warn('💡 En algunos navegadores, la reproducción requiere interacción del usuario')
          console.warn('💡 Asegúrate de que el archivo existe en: /sounds/musica-fondo.wav')
        })
    }
  } else {
    console.error('❌ backgroundAudio no está inicializado')
  }
}

/**
 * Detiene la música de fondo
 */
export function stopBackgroundMusic() {
  if (backgroundAudio && !backgroundAudio.paused) {
    backgroundAudio.pause()
    backgroundAudio.currentTime = 0
    isPlaying = false
  }
}

/**
 * Establece el volumen de la música de fondo
 * @param {number} value - Volumen entre 0 y 1
 */
export function setBackgroundVolume(value) {
  currentVolume = Math.max(0, Math.min(1, value))
  
  if (backgroundAudio) {
    backgroundAudio.volume = currentVolume
    console.log('🔊 Volumen de música actualizado a:', currentVolume, `(${(currentVolume * 100).toFixed(0)}%)`)
  } else {
    // Si el audio aún no está inicializado, guardar el volumen para cuando se inicialice
    console.log('💾 Volumen guardado para cuando se inicialice el audio:', currentVolume)
  }
}

/**
 * Obtiene el volumen actual de la música de fondo
 * @returns {number} Volumen actual entre 0 y 1
 */
export function getBackgroundVolume() {
  return currentVolume
}

/**
 * Verifica si la música está reproduciéndose
 * @returns {boolean} true si está reproduciéndose, false en caso contrario
 */
export function isBackgroundMusicPlaying() {
  return backgroundAudio && !backgroundAudio.paused && isPlaying
}

