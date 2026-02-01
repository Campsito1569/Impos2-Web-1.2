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

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-bg via-purple-900/20 to-dark-bg p-3 sm:p-4 md:p-6 py-6 sm:py-8">
      <div className="max-w-3xl w-full py-4 sm:py-6 md:py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-center bg-gradient-to-r from-neon-lila to-purple-500 bg-clip-text text-transparent px-2">
          Gestión de Jugadores
        </h1>

        <Card glowColor="lila" className="mb-4 sm:mb-6">
          <div className="mb-4 sm:mb-6">
            <label className="block text-xs sm:text-sm font-medium text-neon-lila mb-2 sm:mb-3">
              Cantidad de Impostores
            </label>
            <div className="flex items-center gap-3 sm:gap-4">
              <Button
                onClick={() => setImpostorCount(Math.max(1, impostorCount - 1))}
                variant="secondary"
                disabled={impostorCount <= 1}
                className="text-lg sm:text-xl px-3 sm:px-4"
              >
                -
              </Button>
              <div className="text-2xl sm:text-3xl font-bold text-neon-green min-w-[50px] sm:min-w-[60px] text-center">
                {impostorCount}
              </div>
              <Button
                onClick={() => setImpostorCount(Math.min(maxImpostors, impostorCount + 1))}
                variant="secondary"
                disabled={impostorCount >= maxImpostors}
                className="text-lg sm:text-xl px-3 sm:px-4"
              >
                +
              </Button>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              Puedes tener hasta {maxImpostors} impostor{maxImpostors !== 1 ? 'es' : ''}
            </p>
          </div>

          <div className="mb-4 sm:mb-6 pt-4 sm:pt-6 border-t border-purple-500/30">
            <label className="block text-xs sm:text-sm font-medium text-neon-lila mb-2 sm:mb-3">
              Tipo de Eliminación
            </label>
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => setEliminationRule('classic')}
                className={`
                  flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all
                  ${eliminationRule === 'classic'
                    ? 'bg-neon-lila text-white border-2 border-neon-lila shadow-lg shadow-purple-500/50'
                    : 'bg-dark-hover text-gray-300 border-2 border-neon-purple hover:border-neon-lila'
                  }
                `}
              >
                Clásico
                <span className="block text-xs text-gray-400 mt-1">(Recomendado)</span>
              </button>
              <button
                onClick={() => setEliminationRule('no-miss')}
                className={`
                  flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all
                  ${eliminationRule === 'no-miss'
                    ? 'bg-red-600 text-white border-2 border-red-500 shadow-lg shadow-red-500/50'
                    : 'bg-dark-hover text-gray-300 border-2 border-neon-purple hover:border-red-500'
                  }
                `}
              >
                Sin fallos
                <span className="block text-xs text-gray-400 mt-1">(Muerte súbita)</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              {eliminationRule === 'classic' 
                ? 'Puedes expulsar jugadores aunque te equivoques.'
                : 'Si expulsan a un jugador y NO es impostor, los impostores ganan inmediatamente.'
              }
            </p>
          </div>
        </Card>

        <Card glowColor="purple" className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-neon-lila">Jugadores</h2>
          
          <div className="space-y-3 mb-4">
            <AnimatePresence>
              {localPlayers.map((player, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex gap-3"
                >
                  <Input
                    value={player}
                    onChange={(e) => handlePlayerChange(index, e.target.value)}
                    placeholder={`Jugador ${index + 1}`}
                    className="flex-1 mb-0"
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => {
                      inputRefs.current[index] = el
                    }}
                  />
                  {localPlayers.length > 2 && (
                    <Button
                      onClick={() => handleRemovePlayer(index)}
                      variant="danger"
                      className="px-4"
                    >
                      ✕
                    </Button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <Button
            onClick={handleAddPlayer}
            variant="secondary"
            className="w-full"
          >
            + Agregar Jugador
          </Button>
        </Card>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-2">
          <Button
            onClick={() => navigate('/mode-select')}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            Volver
          </Button>
          <Button
            onClick={handleContinue}
            variant="primary"
            className="w-full sm:w-auto"
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  )
}



