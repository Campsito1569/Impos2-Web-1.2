// Gestor de música de fondo
// Maneja la reproducción de música de fondo en loop sin duplicación

let backgroundAudio = null
let isPlaying = false
let currentVolume = 0.5
let isInitialized = false
let wasPlayingBeforeBackground = false
let wasManuallyPaused = false
let visibilityChangeHandler = null
let blurHandler = null
let focusHandler = null

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
    
    // Inicializar listeners de background/foreground
    setupBackgroundListeners()
  }
}

/**
 * Pausa el audio cuando la app va a background
 * Exportada para uso externo (ej: listeners de Capacitor)
 */
export function pauseOnBackground() {
  if (backgroundAudio && !backgroundAudio.paused) {
    wasPlayingBeforeBackground = true
    wasManuallyPaused = false
    backgroundAudio.pause()
    console.log('⏸️ Música pausada por background')
  }
}

/**
 * Reanuda el audio cuando la app vuelve a foreground
 * Exportada para uso externo (ej: listeners de Capacitor)
 */
export async function resumeOnForeground() {
  // Esperar 100ms antes de intentar reanudar
  await new Promise(resolve => setTimeout(resolve, 100))
  
  if (backgroundAudio && wasPlayingBeforeBackground && !wasManuallyPaused) {
    try {
      const playPromise = backgroundAudio.play()
      if (playPromise !== undefined) {
        await playPromise
        console.log('▶️ Música reanudada desde background')
      }
    } catch (error) {
      console.warn('⚠️ No se pudo reanudar automáticamente (autoplay bloqueado):', error)
      // No lanzar error, solo loguear
    }
  }
  wasPlayingBeforeBackground = false
}

/**
 * Configura los listeners para detectar cuando la app va a background/foreground
 */
function setupBackgroundListeners() {
  // Limpiar listeners anteriores si existen
  cleanupBackgroundListeners()
  
  // Listener para cambios de visibilidad del documento (web)
  visibilityChangeHandler = () => {
    if (document.hidden) {
      pauseOnBackground()
    } else {
      resumeOnForeground()
    }
  }
  document.addEventListener('visibilitychange', visibilityChangeHandler)
  
  // Listener para cuando la ventana pierde el foco (web)
  blurHandler = () => {
    pauseOnBackground()
  }
  window.addEventListener('blur', blurHandler)
  
  // Listener para cuando la ventana recupera el foco (web)
  focusHandler = () => {
    resumeOnForeground()
  }
  window.addEventListener('focus', focusHandler)
  
  // Nota: Los listeners de Capacitor App se registran externamente
  // desde main.jsx solo si estamos en una plataforma nativa
}

/**
 * Limpia todos los listeners de background/foreground
 */
function cleanupBackgroundListeners() {
  if (visibilityChangeHandler) {
    document.removeEventListener('visibilitychange', visibilityChangeHandler)
    visibilityChangeHandler = null
  }
  
  if (blurHandler) {
    window.removeEventListener('blur', blurHandler)
    blurHandler = null
  }
  
  if (focusHandler) {
    window.removeEventListener('focus', focusHandler)
    focusHandler = null
  }
  
  // Nota: Los listeners de Capacitor se limpian externamente
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
  
  // Marcar que NO fue pausada manualmente (el usuario quiere reproducir)
  wasManuallyPaused = false
  wasPlayingBeforeBackground = false
  
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
    // Marcar que fue pausada manualmente por el usuario
    wasManuallyPaused = true
    wasPlayingBeforeBackground = false
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

/**
 * Limpia todos los recursos y listeners
 * Debe llamarse cuando la app se desmonte o cuando ya no se necesite el audio
 */
export function cleanupAudio() {
  cleanupBackgroundListeners()
  if (backgroundAudio) {
    backgroundAudio.pause()
    backgroundAudio = null
  }
  isPlaying = false
  wasPlayingBeforeBackground = false
  wasManuallyPaused = false
  isInitialized = false
  console.log('🧹 Recursos de audio limpiados')
}

