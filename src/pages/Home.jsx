import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import Card from '../components/Card'
import { useLanguage } from '../store/LanguageContext'

export default function Home() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [logoLoaded, setLogoLoaded] = useState(false)
  const [logoError, setLogoError] = useState(false)

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-bg via-purple-900/20 to-dark-bg p-3 sm:p-4 md:p-6 relative py-8 sm:py-12">
      {/* Botón de Configuración */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/settings')}
        className="absolute top-3 right-3 sm:top-6 sm:right-6 p-2 sm:p-3 rounded-xl bg-dark-card border-2 border-neon-lila hover:shadow-neon-lila transition-all z-10"
        title={t('settings.title')}
      >
        <span className="text-xl sm:text-2xl">⚙️</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl w-full px-2"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 sm:mb-6 flex flex-col items-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-neon-lila via-purple-500 to-neon-purple bg-clip-text text-transparent animate-glow"
          >
            🎮 IMPOS2
          </motion.h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-3 sm:mb-4 font-semibold px-2"
        >
          {t('home.title')}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8 md:mb-12 px-2"
        >
          {t('home.subtitle')}
        </motion.p>

        <Card glowColor="lila" className="max-w-md mx-auto mb-4 sm:mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4 sm:space-y-6"
          >
            <p className="text-gray-300 leading-relaxed text-center text-sm sm:text-base">
              {t('home.description')}
            </p>
            
            <Button
              onClick={() => navigate('/mode-select')}
              variant="primary"
              className="w-full text-base sm:text-lg py-3 sm:py-4"
            >
              {t('home.startGame')}
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  )
}
