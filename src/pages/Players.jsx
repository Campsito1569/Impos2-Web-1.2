import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import { useGame } from '../store/GameContext'
import { useLanguage } from '../store/LanguageContext'

export default function Players() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { players, setPlayers, impostorCount, setImpostorCount, eliminationRule, setEliminationRule } = useGame()
  const [localPlayers, setLocalPlayers] = useState(['', ''])
  const inputRefs = useRef([])

  useEffect(() => {
    if (players.length > 0) {
      setLocalPlayers([...players, ''])
    }
  }, [])

  // Guardar automáticamente en el estado global mientras se escribe
  useEffect(() => {
    const validPlayers = localPlayers.filter(p => p.trim() !== '')
    // Solo guardar si hay al menos un jugador válido
    if (validPlayers.length > 0) {
      setPlayers(validPlayers)
    }
    // Limpiar refs obsoletos cuando cambia la longitud
    inputRefs.current = inputRefs.current.slice(0, localPlayers.length)
  }, [localPlayers, setPlayers])

  const handleAddPlayer = () => {
    const newPlayers = [...localPlayers, '']
    setLocalPlayers(newPlayers)
    // Enfocar el nuevo input después de que se renderice
    setTimeout(() => {
      const newIndex = newPlayers.length - 1
      if (inputRefs.current[newIndex]) {
        inputRefs.current[newIndex].focus()
      }
    }, 0)
  }

  const handleRemovePlayer = (index) => {
    if (localPlayers.length > 2) {
      const newPlayers = localPlayers.filter((_, i) => i !== index)
      setLocalPlayers(newPlayers)
    }
  }

  const handlePlayerChange = (index, value) => {
    const newPlayers = [...localPlayers]
    newPlayers[index] = value
    setLocalPlayers(newPlayers)
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const isLast = index === localPlayers.length - 1
      const currentValue = localPlayers[index]?.trim() || ''
      
      if (isLast && currentValue !== '') {
        // Si es el último input y no está vacío → agregar nuevo jugador y enfocar
        handleAddPlayer()
      } else if (!isLast) {
        // Si no es el último → pasar el foco al siguiente input
        const nextIndex = index + 1
        if (inputRefs.current[nextIndex]) {
          inputRefs.current[nextIndex].focus()
        }
      }
    }
  }

  const handleContinue = () => {
    const validPlayers = localPlayers.filter(p => p.trim() !== '')
    
    // Validaciones
    if (validPlayers.length < 3) {
      alert(t('players.minPlayers'))
      return
    }

    const duplicates = validPlayers.filter((p, i) => 
      validPlayers.some((p2, i2) => i !== i2 && p.toLowerCase() === p2.toLowerCase())
    )
    
    if (duplicates.length > 0) {
      alert(t('players.duplicateNames'))
      return
    }

    if (impostorCount >= validPlayers.length) {
      alert(t('players.tooManyImpostors'))
      return
    }

    setPlayers(validPlayers)
    navigate('/word-setup')
  }

  const maxImpostors = Math.max(1, localPlayers.filter(p => p.trim() !== '').length - 1)

  // Función para obtener inicial del nombre
  const getInitial = (name) => {
    if (!name || name.trim() === '') return '?'
    return name.charAt(0).toUpperCase()
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-bg via-purple-900/20 to-dark-bg p-3 sm:p-4 md:p-6 py-6 sm:py-8">
      <div className="max-w-3xl w-full py-4 sm:py-6 md:py-8 space-y-6 sm:space-y-8 gpu">
        {/* Título mejorado */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 sm:mb-8 text-center bg-gradient-to-r from-neon-lila via-purple-400 to-neon-lila bg-clip-text text-transparent px-2">
          {t('players.title')}
        </h1>

        {/* Card: Configuración de Impostores */}
        <div className="relative bg-white/5 card-lite rounded-3xl border border-white/10 glow-lite p-6 sm:p-8 gpu anim-lite">
          <label className="block text-sm sm:text-base font-bold text-neon-lila mb-4 sm:mb-5">
            {t('players.impostorCount')}
          </label>
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-3 sm:mb-4">
            <button
              onClick={() => setImpostorCount(Math.max(1, impostorCount - 1))}
              disabled={impostorCount <= 1}
              className={`
                w-12 h-12 sm:w-14 sm:h-14 rounded-xl font-bold text-xl sm:text-2xl gpu anim-lite
                ${impostorCount <= 1
                  ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed border border-gray-600/30'
                  : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white border-2 border-purple-400/50'
                }
              `}
            >
              −
            </button>
            <div className="min-w-[60px] sm:min-w-[80px] text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-neon-lila to-purple-400 bg-clip-text text-transparent">
                {impostorCount}
              </div>
            </div>
            <button
              onClick={() => setImpostorCount(Math.min(maxImpostors, impostorCount + 1))}
              disabled={impostorCount >= maxImpostors}
              className={`
                w-12 h-12 sm:w-14 sm:h-14 rounded-xl font-bold text-xl sm:text-2xl gpu anim-lite
                ${impostorCount >= maxImpostors
                  ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed border border-gray-600/30'
                  : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white border-2 border-purple-400/50'
                }
              `}
            >
              +
            </button>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 text-center">
            {t('players.impostorCountHint', { count: maxImpostors, plural: maxImpostors !== 1 ? 'es' : '' })}
          </p>
        </div>

        {/* Card: Tipo de Eliminación */}
        <div className="relative bg-white/5 card-lite rounded-3xl border border-white/10 glow-lite p-6 sm:p-8 gpu anim-lite">
          <label className="block text-sm sm:text-base font-bold text-neon-lila mb-4 sm:mb-5">
            {t('players.eliminationType')}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
            <button
              onClick={() => setEliminationRule('classic')}
              className={`
                px-4 sm:px-6 py-4 sm:py-5 rounded-2xl font-semibold text-sm sm:text-base gpu anim-lite
                ${eliminationRule === 'classic'
                  ? 'bg-gradient-to-r from-neon-lila to-purple-600 text-white border-2 border-purple-400'
                  : 'bg-black/20 text-gray-300 border-2 border-purple-400/30'
                }
              `}
            >
              <div className="font-bold mb-1">{t('players.classic')}</div>
              <div className={`text-xs ${eliminationRule === 'classic' ? 'text-purple-200' : 'text-gray-400'}`}>
                {t('players.classicRecommended')}
              </div>
            </button>
            <button
              onClick={() => setEliminationRule('no-miss')}
              className={`
                px-4 sm:px-6 py-4 sm:py-5 rounded-2xl font-semibold text-sm sm:text-base gpu anim-lite
                ${eliminationRule === 'no-miss'
                  ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white border-2 border-red-400'
                  : 'bg-black/20 text-gray-300 border-2 border-red-400/30'
                }
              `}
            >
              <div className="font-bold mb-1">{t('players.noMiss')}</div>
              <div className={`text-xs ${eliminationRule === 'no-miss' ? 'text-red-200' : 'text-gray-400'}`}>
                {t('players.noMissDeath')}
              </div>
            </button>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 text-center leading-relaxed">
            {eliminationRule === 'classic' ? t('players.classicHint') : t('players.noMissHint')}
          </p>
        </div>

        {/* Card: Lista de Jugadores */}
        <div className="relative bg-white/5 card-lite rounded-3xl border border-white/10 glow-lite p-6 sm:p-8 gpu anim-lite">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-neon-lila">{t('players.playersList')}</h2>
          
          <div className="space-y-3 sm:space-y-4 mb-6">
            {localPlayers.map((player, index) => (
              <div
                key={index}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-black/20 border border-purple-400/20 gpu anim-lite"
                style={{
                  opacity: 0,
                  transform: 'translateY(6px)',
                  animation: `fadeInUpLiteSmall 0.18s ease-out forwards`
                }}
              >
                {/* Avatar circular con inicial */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-600/40 to-purple-800/40 border border-purple-400/30 flex items-center justify-center font-bold text-sm sm:text-base text-purple-200 flex-shrink-0">
                  {getInitial(player)}
                </div>
                
                {/* Input */}
                <div className="flex-1">
                  <Input
                    value={player}
                    onChange={(e) => handlePlayerChange(index, e.target.value)}
                    placeholder={t('players.playerPlaceholder', { n: index + 1 })}
                    className="mb-0"
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => {
                      inputRefs.current[index] = el
                    }}
                  />
                </div>
                
                {/* Botón eliminar */}
                {localPlayers.length > 2 && (
                  <button
                    onClick={() => handleRemovePlayer(index)}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-red-500/20 border border-red-400/50 text-red-300 flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0 gpu anim-lite"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Botón Agregar Jugador */}
          <button
            onClick={handleAddPlayer}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base border-2 border-purple-400/40 text-white/90 flex items-center justify-center gap-2 gpu anim-lite"
          >
            <span className="text-lg sm:text-xl">+</span>
            <span>{t('players.addPlayerButton')}</span>
          </button>
        </div>

        {/* Botones inferiores */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-2 gpu anim-lite">
          <button
            onClick={() => navigate('/mode-select')}
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base border border-purple-400/40 text-white/90 w-full sm:w-auto gpu anim-lite"
          >
            {t('players.back')}
          </button>
          <button
            onClick={handleContinue}
            className="px-8 sm:px-12 py-3 sm:py-4 md:py-5 rounded-xl font-bold text-base sm:text-lg bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white glow-lite w-full sm:w-auto gpu anim-lite"
          >
            {t('players.continue')}
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeInUpLite {
          to {
            opacity: 1;
            transform: translateY(0);
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



