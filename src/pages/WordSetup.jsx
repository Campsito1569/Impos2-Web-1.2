import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'
import { useGame } from '../store/GameContext'
import { useLanguage } from '../store/LanguageContext'
import { getAllWordsFromDb, getAllFootballWordsFromDb, getRandomWordFromDb, getRandomFootballWordFromDb } from '../data/getWordsDb'

export default function WordSetup() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const { gameMode, wordPool, addWordsToPool, resetWordPool, getRandomWordFromPool, setCurrentGame, players, impostorCount, eliminationRule, assignImpostors, shuffleArray, usedAutomaticWords, setUsedAutomaticWords } = useGame()
  const [manualWord, setManualWord] = useState('')
  const [semiManualWords, setSemiManualWords] = useState('')

  const handleManualWordSubmit = () => {
    if (!manualWord.trim()) {
      alert(t('wordSetup.manual.required'))
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
      eliminationRule,
      gameMode: 'manual'
    }

    setCurrentGame(gameData)
    localStorage.setItem('currentGame', JSON.stringify(gameData))
    navigate('/reveal-role')
  }

  const handleSemiManualWordsSubmit = () => {
    if (!semiManualWords.trim()) {
      alert(t('wordSetup.semiManual.minWords'))
      return
    }

    addWordsToPool(semiManualWords)
    setSemiManualWords('')
    alert(t('wordSetup.semiManual.addSuccess'))
  }

  const handleSemiManualContinue = () => {
    if (wordPool.length === 0) {
      alert(t('wordSetup.addWordsToContinue'))
      return
    }

    const word = getRandomWordFromPool()
    if (!word) {
      alert(t('wordSetup.addWordsToContinue'))
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
      eliminationRule,
      gameMode: 'semi-manual'
    }

    setCurrentGame(gameData)
    localStorage.setItem('currentGame', JSON.stringify(gameData))
    navigate('/reveal-role')
  }

  const handleDatabaseContinue = () => {
    const allWords = getAllWordsFromDb(language)
    const availableWords = allWords.filter(w => !usedAutomaticWords.includes(w))
    let word
    if (availableWords.length === 0) {
      setUsedAutomaticWords([])
      word = getRandomWordFromDb(language)
    } else {
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
      eliminationRule,
      gameMode: 'database'
    }

    setCurrentGame(gameData)
    localStorage.setItem('currentGame', JSON.stringify(gameData))
    navigate('/reveal-role')
  }

  const handleFootballContinue = () => {
    const word = getRandomFootballWordFromDb(language)
    
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
      eliminationRule,
      gameMode: 'football'
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
            {t('wordSetup.manual.title')}
          </h1>

          <Card glowColor="lila" className="mb-4 sm:mb-6">
            <Input
              label={t('wordSetup.manual.label')}
              value={manualWord}
              onChange={(e) => setManualWord(e.target.value)}
              placeholder={t('wordSetup.manual.placeholder')}
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
              {t('wordSetup.back')}
            </Button>
            <Button
              onClick={handleManualWordSubmit}
              variant="primary"
              className="w-full sm:w-auto"
            >
              {t('wordSetup.continue')}
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
            {t('wordSetup.semiManual.title')}
          </h1>

          <Card glowColor="lila" className="mb-4 sm:mb-6">
            <Input
              label={t('wordSetup.semiManual.label')}
              value={semiManualWords}
              onChange={(e) => setSemiManualWords(e.target.value)}
              placeholder={t('wordSetup.semiManual.placeholder')}
              type="textarea"
              className="mb-4"
            />
            <Button
              onClick={handleSemiManualWordsSubmit}
              variant="secondary"
              className="w-full"
            >
              {t('wordSetup.semiManual.addToPool')}
            </Button>
          </Card>

          {wordPool.length > 0 && (
            <p className="text-sm text-gray-400 mb-4 text-center">
              {t('wordSetup.semiManual.poolLoaded', { count: wordPool.length })}
            </p>
          )}

          {wordPool.length > 0 && (
            <Button
              onClick={() => {
                if (window.confirm(t('wordSetup.deletePoolConfirm'))) {
                  resetWordPool()
                }
              }}
              variant="secondary"
              className="w-full mb-4"
            >
              {t('wordSetup.deletePool')}
            </Button>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-2">
            <Button
              onClick={() => navigate('/players')}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              {t('wordSetup.back')}
            </Button>
            <Button
              onClick={handleSemiManualContinue}
              variant="primary"
              disabled={wordPool.length === 0}
              className="w-full sm:w-auto"
            >
              {t('wordSetup.continue')}
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
            {t('wordSetup.database.title')}
          </h1>

          <Card glowColor="lila" className="mb-4 sm:mb-6">
            <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
              {t('wordSetup.database.description')}
            </p>
            <Button
              onClick={handleDatabaseContinue}
              variant="primary"
              className="w-full text-base sm:text-lg py-3 sm:py-4"
            >
              {t('wordSetup.continue')}
            </Button>
          </Card>

          <div className="flex justify-center gap-3 sm:gap-4 px-2">
            <Button
              onClick={() => navigate('/players')}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              {t('wordSetup.back')}
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (gameMode === 'football') {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-bg via-purple-900/20 to-dark-bg p-3 sm:p-4 md:p-6 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full text-center"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-neon-lila to-purple-500 bg-clip-text text-transparent px-2">
            {t('wordSetup.database.title')}
          </h1>

          <Card glowColor="lila" className="mb-4 sm:mb-6">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">⚽</div>
            <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
              {t('modeSelect.football.description')}
            </p>
            <Button
              onClick={handleFootballContinue}
              variant="primary"
              className="w-full text-base sm:text-lg py-3 sm:py-4"
            >
              {t('wordSetup.continue')}
            </Button>
          </Card>

          <div className="flex justify-center gap-3 sm:gap-4 px-2">
            <Button
              onClick={() => navigate('/players')}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              {t('wordSetup.back')}
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return null
}

