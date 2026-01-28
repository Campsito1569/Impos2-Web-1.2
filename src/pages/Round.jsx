import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../components/Button'
import Card from '../components/Card'
import { useGame } from '../store/GameContext'

export default function Round() {
  const navigate = useNavigate()
  const { currentGame, setCurrentGame } = useGame()
  const [gameState, setGameState] = useState(null)

  useEffect(() => {
    const game = currentGame || JSON.parse(localStorage.getItem('currentGame') || '{}')
    // Fallback para juegos antiguos sin eliminationRule
    if (!game.eliminationRule) {
      game.eliminationRule = 'classic'
    }
    setGameState(game)
  }, [currentGame])

  const toggleEliminated = (index) => {
    if (!gameState) return
    
    const updatedPlayers = [...gameState.players]
    const player = updatedPlayers[index]
    const isEliminating = !player.eliminado
    
    // Si estamos eliminando (no reviviendo) y la regla es no-miss
    if (isEliminating && gameState.eliminationRule === 'no-miss') {
      // Si el jugador NO es impostor, los impostores ganan inmediatamente
      if (player.role !== 'impostor') {
        updatedPlayers[index].eliminado = true
        
        const endGameData = {
          ...gameState,
          players: updatedPlayers,
          winner: 'Impostores',
          winnerType: 'impostors',
          endReason: 'Regla: Sin fallos (Muerte súbita). Expulsión incorrecta → ganan impostores.',
          eliminationRule: gameState.eliminationRule
        }
        
        setGameState(endGameData)
        setCurrentGame(endGameData)
        localStorage.setItem('currentGame', JSON.stringify(endGameData))
        navigate('/end')
        return
      }
    }
    
    // Comportamiento normal (classic o revivir)
    updatedPlayers[index].eliminado = !updatedPlayers[index].eliminado
    
    const updatedGame = {
      ...gameState,
      players: updatedPlayers
    }
    
    setGameState(updatedGame)
    setCurrentGame(updatedGame)
    localStorage.setItem('currentGame', JSON.stringify(updatedGame))
  }

  const handleEndGame = () => {
    if (!gameState) return

    const activePlayers = gameState.players.filter(p => !p.eliminado)
    const activeImpostors = activePlayers.filter(p => p.role === 'impostor')
    const activeNormalPlayers = activePlayers.filter(p => p.role === 'player')

    let winner = null
    let winnerType = null

    // Condiciones de fin
    if (activeImpostors.length === 0) {
      winner = 'Jugadores'
      winnerType = 'players'
    } else if (activeImpostors.length >= activeNormalPlayers.length) {
      winner = 'Impostores'
      winnerType = 'impostors'
    } else {
      // El juego continúa
      return
    }

    const endGameData = {
      ...gameState,
      winner,
      winnerType,
      endReason: winnerType === 'players' 
        ? 'Todos los impostores fueron eliminados'
        : 'Los impostores igualan o superan a los jugadores',
      eliminationRule: gameState.eliminationRule || 'classic'
    }

    setCurrentGame(endGameData)
    localStorage.setItem('currentGame', JSON.stringify(endGameData))
    navigate('/end')
  }

  if (!gameState) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-2xl text-neon-lila">Cargando...</div>
      </div>
    )
  }

  const activePlayers = gameState.players.filter(p => !p.eliminado)
  const activeImpostors = activePlayers.filter(p => p.role === 'impostor')
  const activeNormalPlayers = activePlayers.filter(p => p.role === 'player')

  const canEndGame = activeImpostors.length === 0 || activeImpostors.length >= activeNormalPlayers.length

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-bg via-purple-900/20 to-dark-bg p-3 sm:p-4 md:p-6 py-6 sm:py-8">
      <div className="max-w-4xl w-full py-4 sm:py-6 md:py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-center bg-gradient-to-r from-neon-lila to-purple-500 bg-clip-text text-transparent px-2">
          Ronda de Eliminación
        </h1>

        <Card glowColor="lila" className="mb-4 sm:mb-6">
          <div className="mb-4">
            <h2 className="text-lg sm:text-xl font-bold mb-3 text-neon-lila">Jugadores</h2>
            <div className="space-y-3">
              <AnimatePresence>
                {gameState.players.map((player, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={`
                      flex items-center justify-between p-4 rounded-xl border-2 transition-all
                      ${player.eliminado 
                        ? 'bg-red-900/30 border-red-500 opacity-50' 
                        : 'bg-dark-hover border-neon-purple hover:border-neon-lila'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{player.eliminado ? '💀' : '👤'}</span>
                      <span className={`text-lg font-semibold ${player.eliminado ? 'line-through text-gray-500' : 'text-white'}`}>
                        {player.name}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleEliminated(index)}
                      className={`
                        px-4 py-2 rounded-lg font-semibold transition-all
                        ${player.eliminado
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-red-600 hover:bg-red-700 text-white'
                        }
                      `}
                    >
                      {player.eliminado ? 'Revivir' : 'Eliminar'}
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-6 p-4 bg-dark-hover rounded-xl">
            <p className="text-gray-300 mb-2">
              <span className="text-neon-green font-semibold">Jugadores activos:</span> {activeNormalPlayers.length}
            </p>
            <p className="text-gray-300">
              <span className="text-red-400 font-semibold">Impostores activos:</span> {activeImpostors.length}
            </p>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-2">
          <Button
            onClick={() => navigate('/reveal-role')}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            Volver
          </Button>
          <Button
            onClick={handleEndGame}
            variant="primary"
            disabled={!canEndGame}
            className="text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 w-full sm:w-auto"
          >
            Finalizar Partida
          </Button>
        </div>

        {canEndGame && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center"
          >
            <p className="text-neon-green text-lg font-semibold">
              ✓ Puedes finalizar la partida
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}



