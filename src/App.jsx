import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { GameProvider } from './store/GameContext'
import { LanguageProvider } from './store/LanguageContext'
import Home from './pages/Home'
import ModeSelect from './pages/ModeSelect'
import Players from './pages/Players'
import WordSetup from './pages/WordSetup'
import RevealRole from './pages/RevealRole'
import Round from './pages/Round'
import End from './pages/End'
import Settings from './pages/Settings'
import FooterCreator from './components/FooterCreator'

function App() {
  return (
    <LanguageProvider>
      <GameProvider>
        <Router>
          <div className="w-full h-screen bg-gradient-to-br from-dark-bg via-purple-900/20 to-dark-bg overflow-hidden">
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
              </Routes>
            </AnimatePresence>
            <FooterCreator />
          </div>
        </Router>
      </GameProvider>
    </LanguageProvider>
  )
}

export default App

