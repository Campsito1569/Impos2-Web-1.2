import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import Card from '../components/Card'
import { useLanguage } from '../store/LanguageContext'

export default function About() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const steps = [
    t('about.step1'),
    t('about.step2'),
    t('about.step3'),
    t('about.step4'),
    t('about.step5'),
    t('about.step6')
  ]

  const modes = [
    { key: 'modeManual', label: t('about.modeManual') },
    { key: 'modeSemiManual', label: t('about.modeSemiManual') },
    { key: 'modeDatabase', label: t('about.modeDatabase') },
    { key: 'modeFootball', label: t('about.modeFootball') },
    { key: 'modeAnimals', label: t('about.modeAnimals') },
    { key: 'modeCountries', label: t('about.modeCountries') },
    { key: 'modeMovies', label: t('about.modeMovies') },
    { key: 'modeSports', label: t('about.modeSports') }
  ]

  const tips = [t('about.tip1'), t('about.tip2'), t('about.tip3')]

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-dark-bg via-purple-900/20 to-dark-bg p-3 sm:p-4 md:p-6 py-6 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full mx-auto flex flex-col flex-1 min-h-0"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center bg-gradient-to-r from-neon-lila to-purple-500 bg-clip-text text-transparent px-2 shrink-0">
          {t('about.title')}
        </h1>

        <div className="flex-1 overflow-y-auto space-y-4 sm:space-y-6 pb-6">
          <Card glowColor="lila">
            <p className="text-gray-200 leading-relaxed">
              {t('about.whatIs')}
            </p>
          </Card>

          <h2 className="text-lg sm:text-xl font-semibold text-neon-lila px-1">
            {t('about.howToPlay')}
          </h2>
          <Card glowColor="purple">
            <ol className="list-decimal list-inside space-y-3 text-gray-200">
              {steps.map((text, i) => (
                <li key={i} className="leading-relaxed">
                  {text}
                </li>
              ))}
            </ol>
          </Card>

          <h2 className="text-lg sm:text-xl font-semibold text-neon-lila px-1">
            {t('about.modes')}
          </h2>
          <Card glowColor="purple">
            <ul className="space-y-3 text-gray-200">
              {modes.map(({ key, label }) => (
                <li key={key} className="leading-relaxed">
                  <span className="font-medium text-neon-lila/90">•</span>{' '}
                  {label}
                </li>
              ))}
            </ul>
          </Card>

          <h2 className="text-lg sm:text-xl font-semibold text-neon-lila px-1">
            {t('about.tips')}
          </h2>
          <Card glowColor="purple">
            <ul className="space-y-3 text-gray-200">
              {tips.map((text, i) => (
                <li key={i} className="leading-relaxed">
                  <span className="font-medium text-neon-lila/90">•</span>{' '}
                  {text}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="shrink-0 pt-4 flex justify-center">
          <Button onClick={() => navigate(-1)} variant="secondary">
            {t('about.back')}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
