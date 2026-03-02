import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import Card from '../components/Card'
import { useLanguage } from '../store/LanguageContext'

export default function Settings() {
  const navigate = useNavigate()
  const {
    language,
    setLanguage,
    t,
    languages: availableLanguages
  } = useLanguage()

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-bg via-purple-900/20 to-dark-bg p-3 sm:p-4 md:p-6 py-6 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full py-4 sm:py-6 md:py-8"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-center bg-gradient-to-r from-neon-lila to-purple-500 bg-clip-text text-transparent px-2">
          {t('settings.title')}
        </h1>

        <Card glowColor="lila" className="mb-4 sm:mb-6">
          <div className="space-y-4 sm:space-y-6">
            {/* Selector de Idioma */}
            <div>
              <label className="block text-sm font-medium text-neon-lila mb-3">
                {t('settings.language')}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(availableLanguages).map(([code, lang]) => (
                  <motion.button
                    key={code}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLanguage(code)}
                    className={`
                      px-4 py-3 rounded-xl border-2 transition-all
                      ${language === code
                        ? 'bg-neon-lila/20 border-neon-lila shadow-neon-lila'
                        : 'bg-dark-hover border-neon-purple hover:border-neon-lila'
                      }
                    `}
                  >
                    <div className="text-2xl mb-1">{lang.flag}</div>
                    <div className="text-white font-semibold">{lang.name}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Acerca del juego */}
            <div>
              <Button
                onClick={() => navigate('/about')}
                variant="secondary"
                className="w-full flex items-center justify-center gap-2"
              >
                <span>ℹ️</span>
                <span>{t('settings.aboutGame')}</span>
              </Button>
            </div>
          </div>
        </Card>

        <div className="flex justify-center gap-3 sm:gap-4 px-2">
          <Button
            onClick={() => navigate(-1)}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            {t('settings.back')}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
