import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import Card from '../components/Card'
import { useLanguage } from '../store/LanguageContext'
import { playBackgroundMusic } from '../utils/audio'

export default function Home() {
  const navigate = useNavigate()
  const { t, musicVolume } = useLanguage()
  const [logoLoaded, setLogoLoaded] = useState(false)
  const [logoError, setLogoError] = useState(false)

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-bg via-purple-900/20 via-purple-800/10 to-dark-bg p-3 sm:p-4 md:p-6 relative py-8 sm:py-12 animate-gradient-shift">
      {/* Botón de Configuración - Discreto */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/settings')}
        className="absolute top-3 right-3 sm:top-6 sm:right-6 p-2 sm:p-3 rounded-xl bg-dark-card/50 backdrop-blur-sm border border-purple-400/30 hover:border-purple-400/50 hover:shadow-[0_0_15px_rgba(167,139,250,0.3)] transition-all z-10"
        title={t('settings.title')}
      >
        <span className="text-xl sm:text-2xl opacity-70 hover:opacity-100 transition-opacity">⚙️</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl w-full px-2"
      >
        {/* Logo + Título mejorado */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          className="mb-6 sm:mb-8 md:mb-10 flex flex-col items-center"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-4 sm:mb-5 bg-gradient-to-r from-neon-lila via-purple-400 to-neon-lila bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(167,139,250,0.5)] animate-slow-pulse"
          >
            🎮 IMPOS2
          </motion.h1>
        </motion.div>
        
        {/* Subtítulo mejorado */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-4 sm:mb-5 font-bold tracking-wide px-2"
        >
          {t('home.title')}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-sm sm:text-base md:text-lg text-gray-400/80 mb-8 sm:mb-10 md:mb-12 px-2"
        >
          {t('home.subtitle')}
        </motion.p>

        {/* Tarjeta central premium con glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
          className="max-w-lg mx-auto mb-6 sm:mb-8"
        >
          <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.25)] p-6 sm:p-8 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Descripción mejorada */}
              <div className="space-y-3">
                <p className="text-gray-200 leading-relaxed text-center text-sm sm:text-base md:text-lg">
                  Uno (o varios) jugadores no conocen la palabra secreta.
                </p>
                <p className="text-gray-300 leading-relaxed text-center text-sm sm:text-base md:text-lg font-medium">
                  Engaña, observa y descubre quién es el impostor.
                </p>
              </div>
              
              {/* Botón héroe mejorado */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(168, 85, 247, 0.6)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playBackgroundMusic(musicVolume / 100)
                  navigate('/mode-select')
                }}
                className="w-full px-8 sm:px-10 py-4 sm:py-5 md:py-6 rounded-2xl font-bold text-base sm:text-lg md:text-xl bg-gradient-to-r from-purple-500 via-neon-lila to-fuchsia-600 text-white shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_50px_rgba(168,85,247,0.7)] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span className="text-lg sm:text-xl">🎮</span>
                <span>{t('home.startGame')}</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
