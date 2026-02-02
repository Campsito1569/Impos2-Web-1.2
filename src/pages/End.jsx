import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
      <div className="max-w-3xl w-full text-center px-2 gpu anim-lite">
        {/* Título principal mejorado */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 sm:mb-6">
            {isImpostorWin ? '🎭' : '🎉'}
          </div>
          <h1 className={`
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-5 tracking-wide
            ${isImpostorWin 
              ? 'bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent' 
              : 'bg-gradient-to-r from-cyan-300 to-green-300 bg-clip-text text-transparent'
            }
          `}>
            {isImpostorWin ? 'IMPOSTORES GANARON' : 'LOS JUGADORES GANARON'}
          </h1>
          
          {/* Mensaje narrativo */}
          <p className={`text-base sm:text-lg md:text-xl mb-3 sm:mb-4 ${
            isImpostorWin ? 'text-pink-300' : 'text-cyan-300'
          } font-medium`}>
            {narrativeMessage}
          </p>

          {/* Razón del fin con mejor jerarquía */}
          {endData.endReason && (
            <p className={`text-sm sm:text-base md:text-lg px-2 ${
              endData.endReason.includes('Expulsión incorrecta') 
                ? 'text-red-400 font-semibold' 
                : 'text-gray-300'
            }`}>
              {endData.endReason}
            </p>
          )}
        </div>

        {/* Tarjeta principal con glassmorphism */}
        <div className={`
          relative bg-white/5 card-lite rounded-3xl border border-white/10 p-6 sm:p-8 md:p-10 mb-6 sm:mb-8 glow-lite
        `}>
          {/* Palabra secreta como badge destacado */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5 text-gray-300">
              La palabra secreta era:
            </h2>
            <div
              className="inline-block px-6 sm:px-8 py-4 sm:py-5 bg-dark-hover/80 border-2 rounded-xl glow-lite gpu anim-lite"
              style={{
                borderColor: isImpostorWin ? 'rgba(239, 68, 68, 0.5)' : 'rgba(34, 211, 238, 0.5)'
              }}
            >
              <p className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider ${
                isImpostorWin ? 'text-red-300' : 'text-cyan-300'
              }`}>
                {endData.word?.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Impostores como chips/badges mejorados */}
          {impostors.length > 0 && (
            <div className="mt-6 sm:mt-8">
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-4 sm:mb-5 font-medium">
                Los impostores eran:
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {impostors.map((impostor, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 bg-red-500/20 border-2 border-red-400/50 rounded-full gpu anim-lite"
                    style={{
                      opacity: 0,
                      transform: 'scale(0.9)',
                      animation: `fadeInScaleLite 0.2s ease-out ${index * 0.05}s forwards`
                    }}
                  >
                    {/* Avatar con inicial */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-red-600/60 to-pink-800/60 border border-red-400/50 flex items-center justify-center font-bold text-sm sm:text-base text-red-200">
                      {getInitial(impostor.name)}
                    </div>
                    <span className="text-sm sm:text-base md:text-lg text-red-300 font-semibold">
                      {impostor.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Botones finales con mejor jerarquía */}
        <div className="flex flex-col gap-4 sm:gap-5 max-w-md mx-auto gpu anim-lite">
          {/* Botón principal */}
          <button
            onClick={handlePlayAgain}
            className="w-full px-6 sm:px-8 py-3 sm:py-4 md:py-5 rounded-2xl font-bold text-base sm:text-lg md:text-xl bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white glow-lite gpu anim-lite"
          >
            🎮 Jugar Otra Partida
          </button>

          {/* Botones secundarios */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <button
              onClick={handleChangePlayers}
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base border border-purple-400/40 text-white/90 gpu anim-lite"
            >
              Cambiar Jugadores
            </button>
            <button
              onClick={handleChangeMode}
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base border border-purple-400/40 text-white/90 gpu anim-lite"
            >
              Cambiar Modo
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeInScaleLite {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @media (max-width: 768px) {
          .card-lite {
            backdrop-filter: none !important;
          }
        }
        
        @media (hover: hover) {
          .gpu:hover {
            transform: translateY(-2px) scale(1.01) translateZ(0);
          }
        }
        
        .gpu:active {
          transform: scale(0.99) translateZ(0);
        }
      `}</style>
    </div>
  )
}



