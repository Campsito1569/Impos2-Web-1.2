import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'
import { useGame } from '../store/GameContext'

export default function Players() {
  const navigate = useNavigate()
  const { players, setPlayers, addPlayer, removePlayer, updatePlayer, impostorCount, setImpostorCount } = useGame()
  const [localPlayers, setLocalPlayers] = useState(['', ''])
  const [editingIndex, setEditingIndex] = useState(null)
  const [editingName, setEditingName] = useState('')

  useEffect(() => {
    if (players.length > 0) {
      setLocalPlayers([...players, ''])
    }
  }, [])

  const handleAddPlayer = () => {
    setLocalPlayers([...localPlayers, ''])
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

  const handleStartEditing = (index) => {
    setEditingIndex(index)
    setEditingName(localPlayers[index])
  }

  const handleSaveEdit = () => {
    if (editingIndex !== null && editingName.trim()) {
      const trimmedName = editingName.trim()
      const isDuplicate = localPlayers.some((p, i) => i !== editingIndex && p.toLowerCase() === trimmedName.toLowerCase())
      
      if (isDuplicate) {
        alert('Ya existe un jugador con ese nombre.')
        return
      }
      
      const newPlayers = [...localPlayers]
      newPlayers[editingIndex] = trimmedName
      setLocalPlayers(newPlayers)
      setEditingIndex(null)
      setEditingName('')
    }
  }

  const handleCancelEdit = () => {
    setEditingIndex(null)
    setEditingName('')
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
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-bg via-purple-900/20 to-dark-bg p-6 overflow-y-auto">
      <div className="max-w-3xl w-full py-8">
        <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-neon-lila to-purple-500 bg-clip-text text-transparent">
          Gestión de Jugadores
        </h1>

        <Card glowColor="lila" className="mb-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-neon-lila mb-3">
              Cantidad de Impostores
            </label>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setImpostorCount(Math.max(1, impostorCount - 1))}
                variant="secondary"
                disabled={impostorCount <= 1}
              >
                -
              </Button>
              <div className="text-3xl font-bold text-neon-green min-w-[60px] text-center">
                {impostorCount}
              </div>
              <Button
                onClick={() => setImpostorCount(Math.min(maxImpostors, impostorCount + 1))}
                variant="secondary"
                disabled={impostorCount >= maxImpostors}
              >
                +
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Puedes tener hasta {maxImpostors} impostor{maxImpostors !== 1 ? 'es' : ''}
            </p>
          </div>
        </Card>

        <Card glowColor="purple" className="mb-6">
          <h2 className="text-2xl font-bold mb-4 text-neon-lila">Jugadores</h2>
          
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
                  {editingIndex === index ? (
                    <div className="flex gap-2 flex-1">
                      <Input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        placeholder={`Jugador ${index + 1}`}
                        className="flex-1 mb-0"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') handleSaveEdit()
                          if (e.key === 'Escape') handleCancelEdit()
                        }}
                        autoFocus
                      />
                      <Button
                        onClick={handleSaveEdit}
                        variant="success"
                        className="px-4"
                      >
                        ✓
                      </Button>
                      <Button
                        onClick={handleCancelEdit}
                        variant="secondary"
                        className="px-4"
                      >
                        ✕
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div
                        className="flex-1 px-4 py-3 rounded-xl bg-dark-hover border-2 border-neon-purple text-white cursor-pointer hover:border-neon-lila transition-all"
                        onClick={() => handleStartEditing(index)}
                      >
                        {player || `Jugador ${index + 1}`}
                      </div>
                      {localPlayers.length > 2 && (
                        <Button
                          onClick={() => handleRemovePlayer(index)}
                          variant="danger"
                          className="px-4"
                        >
                          ✕
                        </Button>
                      )}
                    </>
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

        <div className="flex justify-center gap-4">
          <Button
            onClick={() => navigate('/mode-select')}
            variant="secondary"
          >
            Volver
          </Button>
          <Button
            onClick={handleContinue}
            variant="primary"
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  )
}

