import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { pauseOnBackground, resumeOnForeground } from './utils/audio'

// Detectar si estamos en una plataforma nativa (Android/iOS)
// Usar imports dinámicos para evitar problemas en build de Vercel
let capacitorCleanup = null

// Intentar importar Capacitor core dinámicamente para detectar plataforma nativa
import('@capacitor/core')
  .then(({ Capacitor }) => {
    if (Capacitor.isNativePlatform()) {
      // Solo cargar el módulo de lifecycle si estamos en native
      return import('./utils/capacitorAppLifecycle').then(({ registerCapacitorLifecycle }) => {
        capacitorCleanup = registerCapacitorLifecycle({
          onPause: pauseOnBackground,
          onResume: resumeOnForeground
        })
        console.log('✅ Lifecycle de Capacitor registrado para plataforma nativa')
      })
    } else {
      console.log('ℹ️ Plataforma web detectada, listeners de Capacitor no necesarios')
    }
  })
  .catch((error) => {
    // Capacitor no está disponible (modo web puro)
    // Esto es normal en builds de Vercel donde @capacitor/core no está instalado
    console.log('ℹ️ Capacitor no disponible, modo web puro')
  })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)



