import { createContext, useContext, useState, useEffect } from 'react'

const GameContext = createContext()

export function GameProvider({ children }) {
  const [gameMode, setGameMode] = useState(null)
  const [players, setPlayers] = useState([])
  const [impostorCount, setImpostorCount] = useState(1)
  const [currentGame, setCurrentGame] = useState(null)
  const [wordPool, setWordPool] = useState([])
  const [usedWords, setUsedWords] = useState([])
  const [usedAutomaticWords, setUsedAutomaticWords] = useState([])
  const [impostorHistory, setImpostorHistory] = useState({})

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const savedMode = localStorage.getItem('gameMode')
    const savedPlayers = localStorage.getItem('players')
    const savedImpostorCount = localStorage.getItem('impostorCount')
    const savedWordPool = localStorage.getItem('wordPool')
    const savedUsedWords = localStorage.getItem('usedWords')
    const savedUsedAutomaticWords = localStorage.getItem('usedAutomaticWords')
    const savedHistory = localStorage.getItem('impostorHistory')

    if (savedMode) setGameMode(savedMode)
    if (savedPlayers) setPlayers(JSON.parse(savedPlayers))
    if (savedImpostorCount) setImpostorCount(parseInt(savedImpostorCount))
    if (savedWordPool) setWordPool(JSON.parse(savedWordPool))
    if (savedUsedWords) setUsedWords(JSON.parse(savedUsedWords))
    if (savedUsedAutomaticWords) setUsedAutomaticWords(JSON.parse(savedUsedAutomaticWords))
    if (savedHistory) setImpostorHistory(JSON.parse(savedHistory))
  }, [])

  // Guardar en localStorage cuando cambien los valores
  useEffect(() => {
    if (gameMode) localStorage.setItem('gameMode', gameMode)
  }, [gameMode])

  useEffect(() => {
    if (players.length > 0) localStorage.setItem('players', JSON.stringify(players))
  }, [players])

  useEffect(() => {
    if (impostorCount > 0) localStorage.setItem('impostorCount', impostorCount.toString())
  }, [impostorCount])

  useEffect(() => {
    if (wordPool.length > 0) localStorage.setItem('wordPool', JSON.stringify(wordPool))
  }, [wordPool])

  useEffect(() => {
    if (usedWords.length > 0) localStorage.setItem('usedWords', JSON.stringify(usedWords))
  }, [usedWords])

  useEffect(() => {
    if (usedAutomaticWords.length > 0) localStorage.setItem('usedAutomaticWords', JSON.stringify(usedAutomaticWords))
  }, [usedAutomaticWords])

  useEffect(() => {
    if (Object.keys(impostorHistory).length > 0) {
      localStorage.setItem('impostorHistory', JSON.stringify(impostorHistory))
    }
  }, [impostorHistory])

  const addPlayer = (name) => {
    const trimmedName = name.trim()
    if (trimmedName && !players.some(p => p.toLowerCase() === trimmedName.toLowerCase())) {
      setPlayers([...players, trimmedName])
    }
  }

  const removePlayer = (index) => {
    if (players.length > 2) {
      setPlayers(players.filter((_, i) => i !== index))
    }
  }

  const updatePlayer = (index, newName) => {
    const trimmedName = newName.trim()
    if (trimmedName && !players.some((p, i) => i !== index && p.toLowerCase() === trimmedName.toLowerCase())) {
      const newPlayers = [...players]
      newPlayers[index] = trimmedName
      setPlayers(newPlayers)
    }
  }

  const addWordsToPool = (words) => {
    const newWords = words
      .split(/[,\n]/)
      .map(w => w.trim())
      .filter(w => w.length > 0 && !wordPool.includes(w))
    
    setWordPool([...wordPool, ...newWords])
  }

  const getRandomWord = () => {
    if (wordPool.length === 0) return null
    
    const availableWords = wordPool.filter(w => !usedWords.includes(w))
    
    if (availableWords.length === 0) {
      // Reiniciar palabras usadas si se agotaron
      setUsedWords([])
      return wordPool[Math.floor(Math.random() * wordPool.length)]
    }
    
    const word = availableWords[Math.floor(Math.random() * availableWords.length)]
    setUsedWords([...usedWords, word])
    return word
  }

  // Función Fisher-Yates shuffle
  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const assignImpostors = (playerList, count) => {
    // Obtener historial de roles recientes
    const history = impostorHistory || {}
    
    // Crear array de jugadores con probabilidades ajustadas
    const playersWithWeights = playerList.map((player, index) => {
      const recentImpostorCount = (history[player] || []).filter(
        (wasImpostor, i) => i >= history[player].length - 3 && wasImpostor
      ).length
      
      // Si fue impostor 3 veces seguidas, reducir probabilidad drásticamente
      const weight = recentImpostorCount >= 3 ? 0.1 : 1.0
      
      return { player, index, weight }
    })

    // Seleccionar impostores con probabilidades ajustadas
    const selectedImpostors = []
    let attempts = 0
    const maxAttempts = 50

    while (selectedImpostors.length < count && attempts < maxAttempts) {
      // Calcular probabilidades normalizadas
      const totalWeight = playersWithWeights
        .filter(p => !selectedImpostors.includes(p.index))
        .reduce((sum, p) => sum + p.weight, 0)

      if (totalWeight === 0) break

      // Selección aleatoria ponderada
      let random = Math.random() * totalWeight
      let selectedIndex = null

      for (const { index, weight } of playersWithWeights) {
        if (selectedImpostors.includes(index)) continue
        random -= weight
        if (random <= 0) {
          selectedIndex = index
          break
        }
      }

      if (selectedIndex !== null && !selectedImpostors.includes(selectedIndex)) {
        selectedImpostors.push(selectedIndex)
      }
      
      attempts++
    }

    // Si no se pudo seleccionar suficientes, usar selección aleatoria simple
    if (selectedImpostors.length < count) {
      const availableIndices = playerList
        .map((_, i) => i)
        .filter(i => !selectedImpostors.includes(i))
      
      while (selectedImpostors.length < count && availableIndices.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableIndices.length)
        selectedImpostors.push(availableIndices.splice(randomIndex, 1)[0])
      }
    }

    // Actualizar historial
    const newHistory = { ...history }
    playerList.forEach((player, index) => {
      if (!newHistory[player]) {
        newHistory[player] = []
      }
      newHistory[player].push(selectedImpostors.includes(index))
      
      // Mantener solo los últimos 10 registros
      if (newHistory[player].length > 10) {
        newHistory[player] = newHistory[player].slice(-10)
      }
    })
    
    setImpostorHistory(newHistory)

    return selectedImpostors
  }

  const resetGame = () => {
    setCurrentGame(null)
  }

  const resetUsedWords = () => {
    setUsedWords([])
  }

  return (
    <GameContext.Provider
      value={{
        gameMode,
        setGameMode,
        players,
        setPlayers,
        addPlayer,
        removePlayer,
        updatePlayer,
        impostorCount,
        setImpostorCount,
        currentGame,
        setCurrentGame,
        wordPool,
        setWordPool,
        addWordsToPool,
        getRandomWord,
        usedWords,
        resetUsedWords,
        usedAutomaticWords,
        setUsedAutomaticWords,
        assignImpostors,
        shuffleArray,
        impostorHistory,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}

