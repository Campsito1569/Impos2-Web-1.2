import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../components/Button'
import Card from '../components/Card'
import { useGame } from '../store/GameContext'
import { useLanguage } from '../store/LanguageContext'

export default function Round() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { currentGame, setCurrentGame } = useGame()
  const [gameState, setGameState] = useState(null)
  const [confirmingIndex, setConfirmingIndex] = useState(null)

  useEffect(() => {
    const game = currentGame || JSON.parse(localStorage.getItem('currentGame') || '{}')
    // Fallback para juegos antiguos sin eliminationRule
    if (!game.eliminationRule) {
      game.eliminationRule = 'classic'
    }
    setGameState(game)
  }, [currentGame])

  const handleEliminateClick = (index) => {
    if (!gameState) return
    const player = gameState.players[index]
    
    // Si ya está eliminado, revivir directamente (sin confirmación)
    if (player.eliminado) {
      toggleEliminated(index)
      return
    }
    
    // Si no está eliminado, mostrar confirmación
    setConfirmingIndex(index)
  }

  const confirmElimination = (index) => {
    toggleEliminated(index)
    setConfirmingIndex(null)
  }

  const cancelElimination = () => {
    setConfirmingIndex(null)
  }

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
          endReasonKey: 'wrongEliminationNoMiss',
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
      return
    }

    const endGameData = {
      ...gameState,
      winner,
      winnerType,
      endReasonKey: winnerType === 'players' ? 'allImpostorsEliminated' : 'impostorsWinCondition',
      eliminationRule: gameState.eliminationRule || 'classic'
    }

    setCurrentGame(endGameData)
    localStorage.setItem('currentGame', JSON.stringify(endGameData))
    navigate('/end')
  }

  if (!gameState) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-2xl text-neon-lila">{t('common.loading')}</div>
      </div>
    )
  }

  const activePlayers = gameState.players.filter(p => !p.eliminado)
  const activeImpostors = activePlayers.filter(p => p.role === 'impostor')
  const activeNormalPlayers = activePlayers.filter(p => p.role === 'player')

  const canEndGame = activeImpostors.length === 0 || activeImpostors.length >= activeNormalPlayers.length

  // Función para obtener inicial del nombre
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?'
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-bg via-purple-900/20 to-dark-bg p-3 sm:p-4 md:p-6 py-6 sm:py-8">
      <div className="max-w-4xl w-full py-4 sm:py-6 md:py-8">
        {/* Encabezado mejorado */}
        <div className="mb-6 sm:mb-8 animate-fadeInUp">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide mb-2 sm:mb-3 text-center bg-gradient-to-r from-neon-lila to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(167,139,250,0.5)] px-2">
            {t('round.title')}
          </h1>
          <p className="text-white/70 text-sm sm:text-base md:text-lg text-center">
            {t('round.subtitle')}
          </p>
        </div>

        {/* Tarjeta principal con glassmorphism */}
        <div className="mb-6 sm:mb-8 animate-fadeInUp">
          <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.25)] p-4 sm:p-6 md:p-8">
            {/* Barra superior con badges de resumen */}
            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="px-3 py-1.5 sm:py-2 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs sm:text-sm font-semibold flex items-center gap-2">
                <span>🟢</span>
                <span>{t('round.players')}: {activeNormalPlayers.length}</span>
              </div>
              <div className="px-3 py-1.5 sm:py-2 rounded-full bg-red-500/20 border border-red-400/30 text-red-300 text-xs sm:text-sm font-semibold flex items-center gap-2">
                <span>🔴</span>
                <span>{t('round.winnerImpostors')}: {activeImpostors.length}</span>
              </div>
            </div>

            {/* Lista de jugadores con scroll */}
            <div className="max-h-[420px] sm:max-h-[55vh] overflow-y-auto pr-2 space-y-3 mb-6">
              <AnimatePresence>
                {gameState.players.map((player, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className={`
                      flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-all duration-200
                      ${player.eliminado 
                        ? 'bg-gray-900/30 border-gray-600/30 opacity-60' 
                        : 'bg-black/20 border-purple-400/20 hover:border-purple-400/50 hover:bg-white/5'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 flex-1">
                      {/* Avatar con inicial */}
                      <div className={`
                        w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base
                        ${player.eliminado 
                          ? 'bg-gray-700/50 text-gray-400 border border-gray-600/30' 
                          : 'bg-gradient-to-br from-purple-600/40 to-purple-800/40 text-purple-200 border border-purple-400/30'
                        }
                      `}>
                        {player.eliminado ? '💀' : getInitial(player.name)}
                      </div>
                      
                      <div className="flex-1">
                        <span className={`
                          text-base sm:text-lg font-semibold block
                          ${player.eliminado 
                            ? 'line-through text-gray-500' 
                            : 'text-white'
                          }
                        `}>
                          {player.name}
                        </span>
                        {player.eliminado && (
                          <span className="text-xs text-red-400 font-medium">{t('round.eliminated')}</span>
                        )}
                      </div>
                    </div>

                    {/* Botón de acción con confirmación */}
                    {confirmingIndex === index ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => confirmElimination(index)}
                          className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.97] shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                        >
                          ✅ {t('round.confirm')}
                        </button>
                        <button
                          onClick={cancelElimination}
                          className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white text-xs sm:text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.97]"
                        >
                          ✖ {t('round.cancel')}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEliminateClick(index)}
                        className={`
                          px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-[0.97]
                          ${player.eliminado
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                            : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-[0_0_20px_rgba(239,68,68,0.25)]'
                          }
                        `}
                      >
                        {player.eliminado ? t('round.revive') : t('round.eliminate')}
                      </button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Footer con botones */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4 border-t border-white/10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/reveal-role')}
                className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base border border-purple-400/40 text-white/90 hover:bg-white/5 hover:border-purple-400/60 transition-all duration-200"
              >
                {t('round.back')}
              </motion.button>
              <motion.button
                whileHover={{ scale: canEndGame ? 1.02 : 1 }}
                whileTap={{ scale: canEndGame ? 0.98 : 1 }}
                onClick={handleEndGame}
                disabled={!canEndGame}
                className={`
                  px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200
                  ${canEndGame
                    ? 'bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)]'
                    : 'bg-gray-700/50 text-gray-400 cursor-not-allowed opacity-50'
                  }
                `}
              >
                {t('round.endGame')}
              </motion.button>
            </div>

            {canEndGame && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center"
              >
                <p className="text-cyan-400 text-sm sm:text-base font-semibold">
                  {t('round.canEnd')}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}



