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
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-bg via-purple-900/20 to-dark-bg p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full py-8"
      >
        <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-neon-lila to-purple-500 bg-clip-text text-transparent">
          Selecciona el Modo de Juego
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
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
                <div className="text-5xl mb-4">✍️</div>
                <h2 className="text-2xl font-bold mb-3 text-neon-lila">
                  Modo Manual
                </h2>
                <p className="text-gray-300 text-sm">
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
                <div className="text-5xl mb-4">📝</div>
                <h2 className="text-2xl font-bold mb-3 text-neon-lila">
                  Modo Semi-Manual
                </h2>
                <p className="text-gray-300 text-sm">
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
                <div className="text-5xl mb-4">📚</div>
                <h2 className="text-2xl font-bold mb-3 text-neon-lila">
                  Modo Base de Datos
                </h2>
                <p className="text-gray-300 text-sm">
                  Base de datos local con ~1000 palabras MUY conocidas.
                  Categorías: Países, Famosos, Animales, Objetos, Acciones y Lugares.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={() => navigate('/')}
            variant="secondary"
          >
            Volver
          </Button>
          <Button
            onClick={handleContinue}
            variant="primary"
            disabled={!selectedMode}
          >
            Continuar
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

