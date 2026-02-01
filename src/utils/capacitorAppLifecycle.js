// Gestor de lifecycle de Capacitor App
// Maneja los listeners pause/resume de Capacitor para Android/iOS

import { App } from '@capacitor/app'

/**
 * Registra los listeners de pause y resume de Capacitor App
 * @param {Object} callbacks - Objeto con funciones onPause y onResume
 * @param {Function} callbacks.onPause - Función a ejecutar cuando la app va a background
 * @param {Function} callbacks.onResume - Función a ejecutar cuando la app vuelve a foreground
 * @returns {Function} Función cleanup() para remover los listeners
 */
export function registerCapacitorLifecycle({ onPause, onResume }) {
  let pauseListener = null
  let resumeListener = null

  // Registrar listener de pause
  App.addListener('pause', () => {
    if (onPause) {
      onPause()
    }
  }).then((listener) => {
    pauseListener = listener
    console.log('✅ Listener de pause de Capacitor App registrado')
  }).catch((error) => {
    console.error('❌ Error al registrar listener de pause:', error)
  })

  // Registrar listener de resume
  App.addListener('resume', () => {
    if (onResume) {
      onResume()
    }
  }).then((listener) => {
    resumeListener = listener
    console.log('✅ Listener de resume de Capacitor App registrado')
  }).catch((error) => {
    console.error('❌ Error al registrar listener de resume:', error)
  })

  // Retornar función de cleanup
  return function cleanup() {
    if (pauseListener) {
      pauseListener.remove().catch((error) => {
        console.error('❌ Error al remover listener de pause:', error)
      })
      pauseListener = null
    }
    
    if (resumeListener) {
      resumeListener.remove().catch((error) => {
        console.error('❌ Error al remover listener de resume:', error)
      })
      resumeListener = null
    }
    
    console.log('🧹 Listeners de Capacitor App removidos')
  }
}

