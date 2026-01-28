import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'
import { useGame } from '../store/GameContext'
import { getRandomAutomaticWord, getAllAutomaticWords } from '../data/words_auto_es'

export default function WordSetup() {
  const navigate = useNavigate()
  const { gameMode, wordPool, addWordsToPool, getRandomWord, setCurrentGame, players, impostorCount, assignImpostors, shuffleArray, usedAutomaticWords, setUsedAutomaticWords } = useGame()
  const [manualWord, setManualWord] = useState('')
  const [semiManualWords, setSemiManualWords] = useState('')
  const [wordPoolDisplay, setWordPoolDisplay] = useState([])

  useEffect(() => {
    setWordPoolDisplay(wordPool)
  }, [wordPool])

  const handleManualWordSubmit = () => {
    if (!manualWord.trim()) {
      alert('Debes ingresar una palabra secreta.')
      return
    }

    const word = manualWord.trim()
    // Crear turnOrder barajado
    const turnOrder = shuffleArray(players)
    // Asignar impostores sobre turnOrder
    const impostorIndices = assignImpostors(turnOrder, impostorCount)
    
    // Crear players con roles basados en turnOrder
    const playersWithRoles = turnOrder.map((playerName, index) => ({
      name: playerName,
      role: impostorIndices.includes(index) ? 'impostor' : 'player',
      eliminado: false
    }))
    
    const gameData = {
      players: playersWithRoles,
      turnOrder: turnOrder,
      word,
      impostorCount,
      gameMode: 'manual'
    }

    setCurrentGame(gameData)
    localStorage.setItem('currentGame', JSON.stringify(gameData))
    navigate('/reveal-role')
  }

  const handleSemiManualWordsSubmit = () => {
    if (!semiManualWords.trim()) {
      alert('Debes ingresar al menos una palabra.')
      return
    }

    addWordsToPool(semiManualWords)
    setSemiManualWords('')
    alert('Palabras agregadas al pool. Puedes agregar más o continuar.')
  }

  const handleSemiManualContinue = () => {
    if (wordPool.length === 0) {
      alert('Debes agregar al menos una palabra al pool.')
      return
    }

    const word = getRandomWord()
    if (!word) {
      alert('Error al obtener palabra. Intenta agregar más palabras.')
      return
    }

    // Crear turnOrder barajado
    const turnOrder = shuffleArray(players)
    // Asignar impostores sobre turnOrder
    const impostorIndices = assignImpostors(turnOrder, impostorCount)
    
    // Crear players con roles basados en turnOrder
    const playersWithRoles = turnOrder.map((playerName, index) => ({
      name: playerName,
      role: impostorIndices.includes(index) ? 'impostor' : 'player',
      eliminado: false
    }))
    
    const gameData = {
      players: playersWithRoles,
      turnOrder: turnOrder,
      word,
      impostorCount,
      gameMode: 'semi-manual'
    }

    setCurrentGame(gameData)
    localStorage.setItem('currentGame', JSON.stringify(gameData))
    navigate('/reveal-role')
  }

  const handleDatabaseContinue = () => {
    const allWords = getAllAutomaticWords()
    
    // Obtener palabras disponibles
    const availableWords = allWords.filter(w => !usedAutomaticWords.includes(w))
    
    let word
    if (availableWords.length === 0) {
      // Si se agotaron todas, reiniciar y usar una aleatoria
      setUsedAutomaticWords([])
      word = getRandomAutomaticWord()
    } else {
      // Seleccionar una palabra aleatoria de las disponibles
      word = availableWords[Math.floor(Math.random() * availableWords.length)]
      setUsedAutomaticWords([...usedAutomaticWords, word])
    }
    
    // Crear turnOrder barajado
    const turnOrder = shuffleArray(players)
    // Asignar impostores sobre turnOrder
    const impostorIndices = assignImpostors(turnOrder, impostorCount)
    
    // Crear players con roles basados en turnOrder
    const playersWithRoles = turnOrder.map((playerName, index) => ({
      name: playerName,
      role: impostorIndices.includes(index) ? 'impostor' : 'player',
      eliminado: false
    }))
    
    const gameData = {
      players: playersWithRoles,
      turnOrder: turnOrder,
      word,
      impostorCount,
      gameMode: 'database'
    }

    setCurrentGame(gameData)
    localStorage.setItem('currentGame', JSON.stringify(gameData))
    navigate('/reveal-role')
  }

  if (gameMode === 'manual') {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-bg via-purple-900/20 to-dark-bg p-3 sm:p-4 md:p-6 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-center bg-gradient-to-r from-neon-lila to-purple-500 bg-clip-text text-transparent px-2">
            Palabra Secreta
          </h1>

          <Card glowColor="lila" className="mb-4 sm:mb-6">
            <Input
              label="Ingresa la palabra secreta para esta partida"
              value={manualWord}
              onChange={(e) => setManualWord(e.target.value)}
              placeholder="Escribe la palabra..."
              onKeyPress={(e) => e.key === 'Enter' && handleManualWordSubmit()}
              autoFocus
            />
          </Card>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-2">
            <Button
              onClick={() => navigate('/players')}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Volver
            </Button>
            <Button
              onClick={handleManualWordSubmit}
              variant="primary"
              className="w-full sm:w-auto"
            >
              Continuar
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (gameMode === 'semi-manual') {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-bg via-purple-900/20 to-dark-bg p-3 sm:p-4 md:p-6 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full py-4 sm:py-6 md:py-8"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-center bg-gradient-to-r from-neon-lila to-purple-500 bg-clip-text text-transparent px-2">
            Pool de Palabras
          </h1>

          <Card glowColor="lila" className="mb-4 sm:mb-6">
            <Input
              label="Agrega palabras (una por línea o separadas por comas)"
              value={semiManualWords}
              onChange={(e) => setSemiManualWords(e.target.value)}
              placeholder="Palabra1, Palabra2, Palabra3..."
              type="textarea"
              className="mb-4"
            />
            <Button
              onClick={handleSemiManualWordsSubmit}
              variant="secondary"
              className="w-full"
            >
              Agregar al Pool
            </Button>
          </Card>

          {wordPoolDisplay.length > 0 && (
            <Card glowColor="purple" className="mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold mb-3 text-neon-lila">
                Pool actual: {wordPoolDisplay.length} palabra{wordPoolDisplay.length !== 1 ? 's' : ''}
              </h2>
              <div className="max-h-40 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {wordPoolDisplay.map((word, index) => (
                    <span key={index} className="px-2 sm:px-3 py-1 bg-dark-hover rounded-lg text-xs sm:text-sm text-gray-300">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-2">
            <Button
              onClick={() => navigate('/players')}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Volver
            </Button>
            <Button
              onClick={handleSemiManualContinue}
              variant="primary"
              disabled={wordPoolDisplay.length === 0}
              className="w-full sm:w-auto"
            >
              Continuar
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (gameMode === 'database') {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-bg via-purple-900/20 to-dark-bg p-3 sm:p-4 md:p-6 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full text-center"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-neon-lila to-purple-500 bg-clip-text text-transparent px-2">
            Preparación de Palabra
          </h1>

          <Card glowColor="lila" className="mb-4 sm:mb-6">
            <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
              Se seleccionará una palabra aleatoria de la base de datos de ~1000 palabras conocidas.
            </p>
            <Button
              onClick={handleDatabaseContinue}
              variant="primary"
              className="w-full text-base sm:text-lg py-3 sm:py-4"
            >
              Continuar
            </Button>
          </Card>

          <div className="flex justify-center gap-3 sm:gap-4 px-2">
            <Button
              onClick={() => navigate('/players')}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Volver
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return null
}

