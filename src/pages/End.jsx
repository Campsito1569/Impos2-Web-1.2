import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import Card from '../components/Card'
import { useGame } from '../store/GameContext'

export default function End() {
  const navigate = useNavigate()
  const { currentGame, resetGame, gameMode, players } = useGame()
  const [endData, setEndData] = useState(null)

  useEffect(() => {
    const game = currentGame || JSON.parse(localStorage.getItem('currentGame') || '{}')
    setEndData(game)
  }, [currentGame])

  const handlePlayAgain = () => {
    resetGame()
    localStorage.removeItem('currentGame')
    
    if (gameMode === 'manual') {
      navigate('/word-setup')
    } else if (gameMode === 'semi-manual') {
      navigate('/word-setup')
    } else if (gameMode === 'database') {
      navigate('/word-setup')
    } else {
      navigate('/word-setup')
    }
  }

  const handleChangePlayers = () => {
    resetGame()
    localStorage.removeItem('currentGame')
    navigate('/players')
  }

  const handleChangeMode = () => {
    resetGame()
    localStorage.removeItem('currentGame')
    navigate('/mode-select')
  }

  if (!endData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-2xl text-neon-lila">Cargando...</div>
      </div>
    )
  }

  const winner = endData.winner || 'Jugadores'
  const isImpostorWin = endData.winnerType === 'impostors'
  const impostors = endData.players?.filter(p => p.role === 'impostor') || []

  // Función para obtener inicial del nombre
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?'
  }

  // Mensaje narrativo según el tipo de victoria
  const narrativeMessage = isImpostorWin
    ? 'El impostor logró engañar al grupo.'
    : 'El grupo logró descubrir al impostor.'

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-bg via-purple-900/20 to-dark-bg p-3 sm:p-4 md:p-6 py-6 sm:py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl w-full text-center px-2"
      >
        {/* Título principal mejorado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 sm:mb-8 md:mb-10"
        >
          <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 sm:mb-6">
            {isImpostorWin ? '🎭' : '🎉'}
          </div>
          <h1 className={`
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-5 tracking-wide
            ${isImpostorWin 
              ? 'bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent animate-text-glow-red' 
              : 'bg-gradient-to-r from-cyan-300 to-green-300 bg-clip-text text-transparent animate-text-glow-green'
            }
          `}>
            {isImpostorWin ? 'IMPOSTORES GANARON' : 'LOS JUGADORES GANARON'}
          </h1>
          
          {/* Mensaje narrativo */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`text-base sm:text-lg md:text-xl mb-3 sm:mb-4 ${
              isImpostorWin ? 'text-pink-300' : 'text-cyan-300'
            } font-medium`}
          >
            {narrativeMessage}
          </motion.p>

          {/* Razón del fin con mejor jerarquía */}
          {endData.endReason && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`text-sm sm:text-base md:text-lg px-2 ${
                endData.endReason.includes('Expulsión incorrecta') 
                  ? 'text-red-400 font-semibold' 
                  : 'text-gray-300'
              }`}
            >
              {endData.endReason}
            </motion.p>
          )}
        </motion.div>

        {/* Tarjeta principal con glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={`
            relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 sm:p-8 md:p-10 mb-6 sm:mb-8
            ${isImpostorWin 
              ? 'animate-slow-pulse-glow-red' 
              : 'animate-slow-pulse-glow-green'
            }
          `}
        >
          {/* Palabra secreta como badge destacado */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5 text-gray-300">
              La palabra secreta era:
            </h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="inline-block px-6 sm:px-8 py-4 sm:py-5 bg-dark-hover/80 backdrop-blur-sm border-2 rounded-xl shadow-[0_0_25px_rgba(167,139,250,0.4)]"
              style={{
                borderColor: isImpostorWin ? 'rgba(239, 68, 68, 0.5)' : 'rgba(34, 211, 238, 0.5)'
              }}
            >
              <p className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider ${
                isImpostorWin ? 'text-red-300' : 'text-cyan-300'
              }`}>
                {endData.word?.toUpperCase()}
              </p>
            </motion.div>
          </div>

          {/* Impostores como chips/badges mejorados */}
          {impostors.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 sm:mt-8"
            >
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-4 sm:mb-5 font-medium">
                Los impostores eran:
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {impostors.map((impostor, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 bg-red-500/20 border-2 border-red-400/50 rounded-full"
                  >
                    {/* Avatar con inicial */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-red-600/60 to-pink-800/60 border border-red-400/50 flex items-center justify-center font-bold text-sm sm:text-base text-red-200">
                      {getInitial(impostor.name)}
                    </div>
                    <span className="text-sm sm:text-base md:text-lg text-red-300 font-semibold">
                      {impostor.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Botones finales con mejor jerarquía */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col gap-4 sm:gap-5 max-w-md mx-auto"
        >
          {/* Botón principal */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePlayAgain}
            className="w-full px-6 sm:px-8 py-3 sm:py-4 md:py-5 rounded-2xl font-bold text-base sm:text-lg md:text-xl bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] transition-all duration-300"
          >
            🎮 Jugar Otra Partida
          </motion.button>

          {/* Botones secundarios */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleChangePlayers}
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base border border-purple-400/40 text-white/90 hover:bg-white/5 hover:border-purple-400/60 transition-all duration-200"
            >
              Cambiar Jugadores
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleChangeMode}
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base border border-purple-400/40 text-white/90 hover:bg-white/5 hover:border-purple-400/60 transition-all duration-200"
            >
              Cambiar Modo
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}



