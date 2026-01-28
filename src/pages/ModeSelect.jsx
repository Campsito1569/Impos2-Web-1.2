import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import Card from '../components/Card'
import { useGame } from '../store/GameContext'

export default function ModeSelect() {
  const navigate = useNavigate()
  const { setGameMode } = useGame()
  const [selectedMode, setSelectedMode] = useState(null)

  const handleModeSelect = (mode) => {
    setSelectedMode(mode)
  }

  const handleContinue = () => {
    if (!selectedMode) return
    
    setGameMode(selectedMode)
    
    if (selectedMode === 'manual') {
      navigate('/players')
    } else if (selectedMode === 'semi-manual') {
      navigate('/word-setup')
    } else if (selectedMode === 'database') {
      navigate('/players')
    } else if (selectedMode === 'football') {
      navigate('/players')
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-bg via-purple-900/20 to-dark-bg p-3 sm:p-4 md:p-6 py-6 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full py-4 sm:py-6 md:py-8"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-center bg-gradient-to-r from-neon-lila to-purple-500 bg-clip-text text-transparent px-2">
          Selecciona el Modo de Juego
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => handleModeSelect('manual')}
          >
            <Card
              glowColor={selectedMode === 'manual' ? 'lila' : 'purple'}
              className={`
                cursor-pointer h-full
                ${selectedMode === 'manual' ? 'ring-4 ring-neon-lila' : ''}
              `}
            >
              <div className="text-center">
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">✍️</div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-neon-lila">
                  Modo Manual
                </h2>
                <p className="text-gray-300 text-xs sm:text-sm px-2">
                  Una persona externa escribe UNA palabra secreta al iniciar cada partida.
                  Ideal para mayor control sobre las palabras.
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => handleModeSelect('semi-manual')}
          >
            <Card
              glowColor={selectedMode === 'semi-manual' ? 'lila' : 'purple'}
              className={`
                cursor-pointer h-full
                ${selectedMode === 'semi-manual' ? 'ring-4 ring-neon-lila' : ''}
              `}
            >
              <div className="text-center">
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">📝</div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-neon-lila">
                  Modo Semi-Manual
                </h2>
                <p className="text-gray-300 text-xs sm:text-sm px-2">
                  Permite agregar VARIAS palabras de golpe (una por línea o separadas por comas).
                  Se crea un pool de palabras que se usa aleatoriamente sin repetir.
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => handleModeSelect('database')}
          >
            <Card
              glowColor={selectedMode === 'database' ? 'lila' : 'purple'}
              className={`
                cursor-pointer h-full
                ${selectedMode === 'database' ? 'ring-4 ring-neon-lila' : ''}
              `}
            >
              <div className="text-center">
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">📚</div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-neon-lila">
                  Modo Base de Datos
                </h2>
                <p className="text-gray-300 text-xs sm:text-sm px-2">
                  Base de datos local con ~1000 palabras MUY conocidas.
                  Categorías: Países, Famosos, Animales, Objetos, Acciones y Lugares.
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => handleModeSelect('football')}
          >
            <Card
              glowColor={selectedMode === 'football' ? 'lila' : 'purple'}
              className={`
                cursor-pointer h-full
                ${selectedMode === 'football' ? 'ring-4 ring-neon-lila' : ''}
              `}
            >
              <div className="text-center">
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">⚽</div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-neon-lila">
                  Modo Fútbol
                </h2>
                <p className="text-gray-300 text-xs sm:text-sm px-2">
                  Juega con una base de datos de fútbol (jugadores y equipos famosos).
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-2">
          <Button
            onClick={() => navigate('/')}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            Volver
          </Button>
          <Button
            onClick={handleContinue}
            variant="primary"
            disabled={!selectedMode}
            className="w-full sm:w-auto"
          >
            Continuar
          </Button>
        </div>
      </motion.div>
    </div>
  )
}



