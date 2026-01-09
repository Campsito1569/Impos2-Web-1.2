import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../components/Button'
import Card from '../components/Card'
import { useGame } from '../store/GameContext'

export default function RevealRole() {
  const navigate = useNavigate()
  const { currentGame } = useGame()
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [infoRevealed, setInfoRevealed] = useState(false)

  useEffect(() => {
    setInfoRevealed(false)
  }, [currentPlayerIndex])

  const handleRevealInfo = () => {
    setInfoRevealed(true)
  }

  const handleNext = () => {
    if (!infoRevealed) {
      alert('Debes ver tu información antes de continuar.')
      return
    }

    const game = currentGame || JSON.parse(localStorage.getItem('currentGame') || '{}')
    const turnOrder = game.turnOrder || []
    const players = game.players || []

    if (currentPlayerIndex < turnOrder.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1)
    } else {
      navigate('/round')
    }
  }

  const game = currentGame || JSON.parse(localStorage.getItem('currentGame') || '{}')
  const turnOrder = game.turnOrder || []
  const players = game.players || []

  if (turnOrder.length === 0 || players.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-2xl text-neon-lila">Cargando...</div>
      </div>
    )
  }

  // Obtener el nombre del jugador actual según turnOrder
  const currentPlayerName = turnOrder[currentPlayerIndex]
  // Buscar el jugador completo en players usando el nombre
  const currentPlayer = players.find(p => p.name === currentPlayerName)
  
  if (!currentPlayer) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-2xl text-neon-lila">Error: Jugador no encontrado</div>
      </div>
    )
  }

  const isImpostor = currentPlayer.role === 'impostor'

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-bg via-purple-900/20 to-dark-bg p-6">
      <motion.div
        key={currentPlayerIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.3 }}
        className="max-w-2xl w-full text-center"
      >
        {!infoRevealed ? (
          <>
            <div className="mb-8">
              <p className="text-xl text-gray-400 mb-4">
                Jugador {currentPlayerIndex + 1} de {turnOrder.length}
              </p>
              <h1 className="text-5xl font-bold text-neon-lila mb-8 animate-glow">
                Turno de {currentPlayer.name}
              </h1>
            </div>

            <Card glowColor="lila" className="mb-8">
              <div className="py-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="text-6xl mb-6">👤</div>
                  <Button
                    onClick={handleRevealInfo}
                    variant="primary"
                    className="text-xl px-16 py-5"
                  >
                    VER MI INFORMACIÓN
                  </Button>
                </motion.div>
              </div>
            </Card>
          </>
        ) : (
          <>
            <Card glowColor={isImpostor ? 'purple' : 'green'} className="mb-8">
              <div className="py-12">
                <AnimatePresence mode="wait">
                  {isImpostor ? (
                    <motion.div
                      key="impostor"
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="text-8xl mb-6"
                      >
                        🎭
                      </motion.div>
                      <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl font-bold text-red-400 mb-6"
                      >
                        ERES EL IMPOSTOR
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl text-gray-300 leading-relaxed"
                      >
                        No conoces la palabra secreta.
                        <br />
                        <span className="text-red-400 font-semibold">Intenta pasar desapercibido.</span>
                      </motion.p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="player"
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="text-8xl mb-6"
                      >
                        🎯
                      </motion.div>
                      <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl font-bold text-neon-green mb-6"
                      >
                        ERES JUGADOR
                      </motion.h2>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="mb-6"
                      >
                        <p className="text-sm text-gray-400 mb-2">La palabra secreta es:</p>
                        <p className="text-4xl font-bold text-neon-lila animate-pulse-neon px-4 py-3 bg-dark-hover rounded-lg inline-block">
                          {game.word?.toUpperCase()}
                        </p>
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-xl text-gray-300"
                      >
                        Descubre quién es el impostor.
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>

            <Button
              onClick={handleNext}
              variant="primary"
              className="text-lg px-12 py-4"
            >
              {currentPlayerIndex < turnOrder.length - 1 ? 'OCULTAR Y PASAR AL SIGUIENTE' : 'OCULTAR Y COMENZAR RONDA'}
            </Button>
          </>
        )}
      </motion.div>
    </div>
  )
}
