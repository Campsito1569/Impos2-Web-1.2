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

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-bg via-purple-900/20 to-dark-bg p-3 sm:p-4 md:p-6 py-6 sm:py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl w-full text-center px-2"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 sm:mb-6">
            {isImpostorWin ? '🎭' : '🎉'}
          </div>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 ${isImpostorWin ? 'text-red-400' : 'text-neon-green'}`}>
            {winner} GANARON
          </h1>
          {endData.endReason && (
            <p className={`text-base sm:text-lg md:text-xl mb-4 sm:mb-6 md:mb-8 px-2 ${
              endData.endReason.includes('Expulsión incorrecta') 
                ? 'text-red-400 font-semibold' 
                : 'text-gray-300'
            }`}>
              {endData.endReason}
            </p>
          )}
        </motion.div>

        <Card glowColor={isImpostorWin ? 'purple' : 'green'} className="mb-4 sm:mb-6">
          <div className="py-6 sm:py-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-neon-lila">
              La palabra secreta era:
            </h2>
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-neon-lila mb-4 sm:mb-6 animate-pulse-neon px-2"
            >
              {endData.word?.toUpperCase()}
            </motion.p>

            {impostors.length > 0 && (
              <div className="mt-4 sm:mt-6">
                <p className="text-base sm:text-lg text-gray-300 mb-2 sm:mb-3">
                  Los impostores eran:
                </p>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                  {impostors.map((impostor, index) => (
                    <span
                      key={index}
                      className="px-3 sm:px-4 py-1 sm:py-2 bg-red-900/30 border-2 border-red-500 rounded-xl text-sm sm:text-base text-red-300 font-semibold"
                    >
                      {impostor.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        <div className="flex flex-col gap-3 sm:gap-4 max-w-md mx-auto">
          <Button
            onClick={handlePlayAgain}
            variant="primary"
            className="w-full text-base sm:text-lg py-3 sm:py-4"
          >
            Jugar Otra Partida
          </Button>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Button
              onClick={handleChangePlayers}
              variant="secondary"
              className="w-full text-sm sm:text-base"
            >
              Cambiar Jugadores
            </Button>
            <Button
              onClick={handleChangeMode}
              variant="secondary"
              className="w-full text-sm sm:text-base"
            >
              Cambiar Modo
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}



