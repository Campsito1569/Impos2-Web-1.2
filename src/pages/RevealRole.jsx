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
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-bg via-purple-900/20 to-dark-bg p-3 sm:p-4 md:p-6 py-6 sm:py-8">
      <motion.div
        key={currentPlayerIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.3 }}
        className="max-w-2xl w-full text-center px-2"
      >
        {!infoRevealed ? (
          <>
            {/* Encabezado mejorado con 3 niveles */}
            <div className="mb-6 sm:mb-8 md:mb-10 animate-fadeInUp">
              {/* Línea 1: Aviso de privacidad */}
              <p className="text-xs sm:text-sm md:text-base uppercase tracking-wider text-gray-400 mb-3 sm:mb-4 opacity-70">
                👁️ SOLO PARA {currentPlayer.name.toUpperCase()}
              </p>
              
              {/* Línea 2: Progreso */}
              <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 sm:mb-5 font-medium">
                Jugador {currentPlayerIndex + 1} de {turnOrder.length}
              </p>
              
              {/* Línea 3: Título grande con glow */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-neon-lila via-purple-400 to-neon-lila bg-clip-text text-transparent mb-6 sm:mb-8 drop-shadow-[0_0_15px_rgba(167,139,250,0.5)]">
                Turno de {currentPlayer.name}
              </h1>
            </div>

            {/* Tarjeta principal mejorada */}
            <Card glowColor="lila" className="mb-4 sm:mb-6 md:mb-8 animate-fadeInUp">
              <div className="relative bg-gradient-to-br from-purple-900/30 via-purple-800/20 to-dark-card rounded-3xl p-6 sm:p-8 md:p-10 border-t border-purple-500/30">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6 sm:space-y-8"
                >
                  {/* Ícono central con badge circular */}
                  <div className="flex justify-center mb-4 sm:mb-6">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-purple-600/40 to-purple-800/40 border-2 border-neon-lila/50 flex items-center justify-center shadow-[0_0_30px_rgba(167,139,250,0.4)] animate-pulse">
                      <span className="text-4xl sm:text-5xl md:text-6xl">🕵️</span>
                    </div>
                  </div>

                  {/* Texto de instrucción */}
                  <p className="text-xs sm:text-sm md:text-base text-gray-400 text-center opacity-70 leading-relaxed px-2 sm:px-4">
                    Asegúrate de estar solo. Memoriza tu información antes de pasar el teléfono.
                  </p>

                  {/* Botón mejorado */}
                  <div className="pt-2 sm:pt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleRevealInfo}
                      className="w-full sm:w-auto mx-auto px-8 sm:px-12 md:px-16 py-3 sm:py-4 md:py-5 rounded-2xl font-bold text-base sm:text-lg md:text-xl bg-gradient-to-r from-purple-600 via-neon-lila to-fuchsia-500 text-white shadow-[0_0_20px_rgba(167,139,250,0.5)] hover:shadow-[0_0_30px_rgba(167,139,250,0.7)] transition-all duration-300"
                    >
                      🔍 Revelar mi rol
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </Card>
          </>
        ) : (
          <>
            <Card glowColor={isImpostor ? 'purple' : 'green'} className="mb-4 sm:mb-6 md:mb-8">
              <div className="py-6 sm:py-8 md:py-12">
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
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 sm:mb-6"
                      >
                        🎭
                      </motion.div>
                      <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-400 mb-4 sm:mb-6"
                      >
                        ERES EL IMPOSTOR
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed px-2"
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
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 sm:mb-6"
                      >
                        🎯
                      </motion.div>
                      <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-neon-green mb-4 sm:mb-6"
                      >
                        ERES JUGADOR
                      </motion.h2>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="mb-4 sm:mb-6"
                      >
                        <p className="text-xs sm:text-sm text-gray-400 mb-2">La palabra secreta es:</p>
                        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-neon-lila animate-pulse-neon px-3 sm:px-4 py-2 sm:py-3 bg-dark-hover rounded-lg inline-block">
                          {game.word?.toUpperCase()}
                        </p>
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-base sm:text-lg md:text-xl text-gray-300"
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
              className="text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-12 py-3 sm:py-4 w-full sm:w-auto"
            >
              {currentPlayerIndex < turnOrder.length - 1 ? 'OCULTAR Y PASAR AL SIGUIENTE' : 'OCULTAR Y COMENZAR RONDA'}
            </Button>
          </>
        )}
      </motion.div>
    </div>
  )
}
