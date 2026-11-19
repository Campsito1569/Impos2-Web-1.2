import { Gamepad2, Settings } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import Card from '../components/Card'
import FooterCreator from '../components/FooterCreator'
import { useLanguage } from '../store/LanguageContext'

export default function Home() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [logoLoaded, setLogoLoaded] = useState(false)
  const [logoError, setLogoError] = useState(false)

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-bg via-ochre-900/20 via-ochre-800/10 to-dark-bg p-3 sm:p-4 md:p-6 relative py-8 sm:py-12 ">
      {/* Botón de Configuración - Discreto */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/settings')}
        className="absolute top-3 right-3 sm:top-6 sm:right-6 p-2 sm:p-3 rounded-xl bg-dark-card/50  border border-ochre-400/30 hover:border-ochre-400/50  transition-all z-10"
        title={t('settings.title')}
      >
        <span className="text-xl sm:text-2xl opacity-70 hover:opacity-100 transition-opacity"><Settings className="w-[1em] h-[1em]" strokeWidth={1.6} /></span>
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
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-4 sm:mb-5 text-neon-lila  "
          >
            <Gamepad2 className="inline-block w-[0.85em] h-[0.85em] align-[-0.1em] mr-3" strokeWidth={1.8} />IMPOS2
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
          <div className="relative bg-white/5  rounded-xl border border-white/10  p-6 sm:p-8 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Descripción mejorada */}
              <div className="space-y-3">
                <p className="text-gray-200 leading-relaxed text-center text-sm sm:text-base md:text-lg">
                  {t('home.descriptionShort')}
                </p>
                <p className="text-gray-300 leading-relaxed text-center text-sm sm:text-base md:text-lg font-medium">
                  {t('home.tagline')}
                </p>
              </div>
              
              {/* Botón héroe mejorado */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(168, 85, 247, 0.6)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/mode-select')}
                className="w-full px-8 sm:px-10 py-4 sm:py-5 md:py-6 rounded-lg font-bold text-base sm:text-lg md:text-xl bg-ochre-600 text-white   transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span className="text-lg sm:text-xl"><Gamepad2 className="w-[1em] h-[1em]" strokeWidth={2} /></span>
                <span>{t('home.startGame')}</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Footer solo en la pantalla inicial */}
      <FooterCreator />
    </div>
  )
}
