import { useState, useEffect, useRef } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { GameProvider, useGame } from './store/GameContext'
import { useLanguage } from './store/LanguageContext'
import Home from './pages/Home'

function LanguageGameSync() {
  const { language } = useLanguage()
  const { setUsedAutomaticWords, gameMode } = useGame()
  const prevLang = useRef(language)
  useEffect(() => {
    if (prevLang.current !== language && (gameMode === 'database' || gameMode === 'football')) {
      setUsedAutomaticWords([])
      prevLang.current = language
    } else if (prevLang.current !== language) {
      prevLang.current = language
    }
  }, [language, gameMode, setUsedAutomaticWords])
  return null
}
import ModeSelect from './pages/ModeSelect'
import Players from './pages/Players'
import WordSetup from './pages/WordSetup'
import RevealRole from './pages/RevealRole'
import Round from './pages/Round'
import End from './pages/End'
import Settings from './pages/Settings'
import About from './pages/About'

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const { t } = useLanguage()

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Pantalla offline personalizada
  if (!isOnline) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#0f0f1b] p-4">
        <div className="text-center max-w-md w-full">
          <div className="mb-8">
            <div className="text-6xl sm:text-7xl md:text-8xl mb-6">📡</div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-[#a855f7]">
              {t('common.offline.title') || 'Sin conexión'}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8">
              {t('common.offline.message') || 'El impostor se llevó el WiFi'}
            </p>
          </div>
          
          <button
            onClick={() => window.location.reload()}
            className="px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] transition-all duration-300"
          >
            {t('common.offline.retry') || 'Reintentar misión'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <GameProvider>
      <LanguageGameSync />
      <Router>
        <div className="w-full min-h-screen bg-gradient-to-br from-dark-bg via-purple-900/20 to-dark-bg">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mode-select" element={<ModeSelect />} />
              <Route path="/players" element={<Players />} />
              <Route path="/word-setup" element={<WordSetup />} />
              <Route path="/reveal-role" element={<RevealRole />} />
              <Route path="/round" element={<Round />} />
              <Route path="/end" element={<End />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </GameProvider>
  )
}

export default App

