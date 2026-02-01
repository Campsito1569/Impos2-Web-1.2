import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'
import { useGame } from '../store/GameContext'

export default function Players() {
  const navigate = useNavigate()
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
      alert('Necesitas al menos 3 jugadores para comenzar.')
      return
    }

    const duplicates = validPlayers.filter((p, i) => 
      validPlayers.some((p2, i2) => i !== i2 && p.toLowerCase() === p2.toLowerCase())
    )
    
    if (duplicates.length > 0) {
      alert('No puede haber jugadores con el mismo nombre.')
      return
    }

    if (impostorCount >= validPlayers.length) {
      alert('No puede haber más o igual cantidad de impostores que jugadores.')
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
      <div className="max-w-3xl w-full py-4 sm:py-6 md:py-8 space-y-6 sm:space-y-8">
        {/* Título mejorado */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 sm:mb-8 text-center bg-gradient-to-r from-neon-lila via-purple-400 to-neon-lila bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(167,139,250,0.5)] px-2"
        >
          Gestión de Jugadores
        </motion.h1>

        {/* Card: Configuración de Impostores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.25)] p-6 sm:p-8"
        >
          <label className="block text-sm sm:text-base font-bold text-neon-lila mb-4 sm:mb-5">
            Cantidad de Impostores
          </label>
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-3 sm:mb-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setImpostorCount(Math.max(1, impostorCount - 1))}
              disabled={impostorCount <= 1}
              className={`
                w-12 h-12 sm:w-14 sm:h-14 rounded-xl font-bold text-xl sm:text-2xl
                transition-all duration-200
                ${impostorCount <= 1
                  ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed border border-gray-600/30'
                  : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white border-2 border-purple-400/50 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                }
              `}
            >
              −
            </motion.button>
            <div className="min-w-[60px] sm:min-w-[80px] text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-neon-lila to-purple-400 bg-clip-text text-transparent">
                {impostorCount}
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setImpostorCount(Math.min(maxImpostors, impostorCount + 1))}
              disabled={impostorCount >= maxImpostors}
              className={`
                w-12 h-12 sm:w-14 sm:h-14 rounded-xl font-bold text-xl sm:text-2xl
                transition-all duration-200
                ${impostorCount >= maxImpostors
                  ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed border border-gray-600/30'
                  : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white border-2 border-purple-400/50 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                }
              `}
            >
              +
            </motion.button>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 text-center">
            Puedes tener hasta {maxImpostors} impostor{maxImpostors !== 1 ? 'es' : ''}
          </p>
        </motion.div>

        {/* Card: Tipo de Eliminación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.25)] p-6 sm:p-8"
        >
          <label className="block text-sm sm:text-base font-bold text-neon-lila mb-4 sm:mb-5">
            Tipo de Eliminación
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setEliminationRule('classic')}
              className={`
                px-4 sm:px-6 py-4 sm:py-5 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300
                ${eliminationRule === 'classic'
                  ? 'bg-gradient-to-r from-neon-lila to-purple-600 text-white border-2 border-purple-400 shadow-[0_0_25px_rgba(167,139,250,0.5)]'
                  : 'bg-black/20 text-gray-300 border-2 border-purple-400/30 hover:border-purple-400/50 hover:bg-white/5'
                }
              `}
            >
              <div className="font-bold mb-1">Clásico</div>
              <div className={`text-xs ${eliminationRule === 'classic' ? 'text-purple-200' : 'text-gray-400'}`}>
                (Recomendado)
              </div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setEliminationRule('no-miss')}
              className={`
                px-4 sm:px-6 py-4 sm:py-5 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300
                ${eliminationRule === 'no-miss'
                  ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white border-2 border-red-400 shadow-[0_0_25px_rgba(239,68,68,0.5)]'
                  : 'bg-black/20 text-gray-300 border-2 border-red-400/30 hover:border-red-400/50 hover:bg-white/5'
                }
              `}
            >
              <div className="font-bold mb-1">Sin fallos</div>
              <div className={`text-xs ${eliminationRule === 'no-miss' ? 'text-red-200' : 'text-gray-400'}`}>
                (Muerte súbita)
              </div>
            </motion.button>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 text-center leading-relaxed">
            {eliminationRule === 'classic' 
              ? 'Puedes expulsar jugadores aunque te equivoques.'
              : 'Si expulsan a un jugador y NO es impostor, los impostores ganan inmediatamente.'
            }
          </p>
        </motion.div>

        {/* Card: Lista de Jugadores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.25)] p-6 sm:p-8"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-neon-lila">Jugadores</h2>
          
          <div className="space-y-3 sm:space-y-4 mb-6">
            <AnimatePresence>
              {localPlayers.map((player, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-black/20 border border-purple-400/20 hover:border-purple-400/50 hover:bg-white/5 transition-all duration-200"
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
                      placeholder={`Jugador ${index + 1}`}
                      className="mb-0"
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      ref={(el) => {
                        inputRefs.current[index] = el
                      }}
                    />
                  </div>
                  
                  {/* Botón eliminar */}
                  {localPlayers.length > 2 && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRemovePlayer(index)}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-red-500/20 border border-red-400/50 text-red-300 hover:bg-red-500/30 hover:border-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all duration-200 flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0"
                    >
                      ✕
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Botón Agregar Jugador */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddPlayer}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base border-2 border-purple-400/40 text-white/90 hover:bg-white/5 hover:border-purple-400/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span className="text-lg sm:text-xl">+</span>
            <span>Agregar Jugador</span>
          </motion.button>
        </motion.div>

        {/* Botones inferiores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-2"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/mode-select')}
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base border border-purple-400/40 text-white/90 hover:bg-white/5 hover:border-purple-400/60 transition-all duration-200 w-full sm:w-auto"
          >
            Volver
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            className="px-8 sm:px-12 py-3 sm:py-4 md:py-5 rounded-xl font-bold text-base sm:text-lg bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] transition-all duration-300 w-full sm:w-auto"
          >
            Continuar
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}



