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
    volume,
    setVolume,
    soundEffectsVolume,
    setSoundEffectsVolume,
    musicVolume,
    setMusicVolume,
    t,
    languages: availableLanguages
  } = useLanguage()

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-bg via-purple-900/20 to-dark-bg p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full py-8"
      >
        <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-neon-lila to-purple-500 bg-clip-text text-transparent">
          {t('settings.title')}
        </h1>

        <Card glowColor="lila" className="mb-6">
          <div className="space-y-6">
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

            {/* Volumen General */}
            <div>
              <label className="block text-sm font-medium text-neon-lila mb-3">
                {t('settings.volume')}: {volume}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="w-full h-2 bg-dark-hover rounded-lg appearance-none cursor-pointer accent-neon-lila"
                style={{
                  background: `linear-gradient(to right, #A78BFA 0%, #A78BFA ${volume}%, #1A1033 ${volume}%, #1A1033 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Volumen de Efectos de Sonido */}
            <div>
              <label className="block text-sm font-medium text-neon-lila mb-3">
                {t('settings.soundEffects')}: {soundEffectsVolume}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={soundEffectsVolume}
                onChange={(e) => setSoundEffectsVolume(parseInt(e.target.value))}
                className="w-full h-2 bg-dark-hover rounded-lg appearance-none cursor-pointer accent-neon-lila"
                style={{
                  background: `linear-gradient(to right, #A78BFA 0%, #A78BFA ${soundEffectsVolume}%, #1A1033 ${soundEffectsVolume}%, #1A1033 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0%</span>
                <span>100%</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                (Funcionalidad de sonido próximamente)
              </p>
            </div>

            {/* Volumen de Música */}
            <div>
              <label className="block text-sm font-medium text-neon-lila mb-3">
                {t('settings.music')}: {musicVolume}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={musicVolume}
                onChange={(e) => setMusicVolume(parseInt(e.target.value))}
                className="w-full h-2 bg-dark-hover rounded-lg appearance-none cursor-pointer accent-neon-lila"
                style={{
                  background: `linear-gradient(to right, #A78BFA 0%, #A78BFA ${musicVolume}%, #1A1033 ${musicVolume}%, #1A1033 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0%</span>
                <span>100%</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                (Funcionalidad de música próximamente)
              </p>
            </div>
          </div>
        </Card>

        <div className="flex justify-center gap-4">
          <Button
            onClick={() => navigate(-1)}
            variant="secondary"
          >
            {t('settings.back')}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

