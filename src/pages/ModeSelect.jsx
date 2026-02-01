import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import Card from '../components/Card'
import { useGame } from '../store/GameContext'

export default function ModeSelect() {
  const navigate = useNavigate()
  const { setGameMode } = useGame()

  const handleModeClick = (mode) => {
    // Guardar el modo seleccionado y navegar inmediatamente
    setGameMode(mode)
    
    if (mode === 'manual') {
      navigate('/players')
    } else if (mode === 'semi-manual') {
      navigate('/word-setup')
    } else if (mode === 'database') {
      navigate('/players')
    } else if (mode === 'football') {
      navigate('/players')
    }
  }

  // Configuración de colores y estilos por modo
  const modeConfig = {
    manual: {
      icon: '✍️',
      title: 'Modo Manual',
      description: 'Una persona externa escribe UNA palabra secreta al iniciar cada partida. Ideal para mayor control sobre las palabras.',
      borderColor: 'border-pink-400/50',
      glowColor: 'rgba(244, 114, 182, 0.3)',
      hoverGlow: 'rgba(244, 114, 182, 0.5)',
      iconGlow: 'rgba(244, 114, 182, 0.4)'
    },
    'semi-manual': {
      icon: '📝',
      title: 'Modo Semi-Manual',
      description: 'Permite agregar VARIAS palabras de golpe (una por línea o separadas por comas). Se crea un pool de palabras que se usa aleatoriamente sin repetir.',
      borderColor: 'border-blue-400/50',
      glowColor: 'rgba(96, 165, 250, 0.3)',
      hoverGlow: 'rgba(96, 165, 250, 0.5)',
      iconGlow: 'rgba(96, 165, 250, 0.4)'
    },
    database: {
      icon: '📚',
      title: 'Modo Base de Datos',
      description: 'Base de datos local con ~1000 palabras MUY conocidas. Categorías: Países, Famosos, Animales, Objetos, Acciones y Lugares.',
      borderColor: 'border-green-400/50',
      glowColor: 'rgba(74, 222, 128, 0.3)',
      hoverGlow: 'rgba(74, 222, 128, 0.5)',
      iconGlow: 'rgba(74, 222, 128, 0.4)'
    },
    football: {
      icon: '⚽',
      title: 'Modo Fútbol',
      description: 'Juega con una base de datos de fútbol (jugadores y equipos famosos).',
      borderColor: 'border-cyan-400/50',
      glowColor: 'rgba(34, 211, 238, 0.3)',
      hoverGlow: 'rgba(34, 211, 238, 0.5)',
      iconGlow: 'rgba(34, 211, 238, 0.4)'
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-bg via-purple-900/20 to-dark-bg p-3 sm:p-4 md:p-6 py-6 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl w-full py-4 sm:py-6 md:py-8"
      >
        {/* Título mejorado */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 sm:mb-10 md:mb-12 text-center bg-gradient-to-r from-neon-lila via-purple-400 to-neon-lila bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(167,139,250,0.5)] px-2"
        >
          Selecciona el Modo de Juego
        </motion.h1>

        {/* Grid de modos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10">
          {Object.entries(modeConfig).map(([mode, config], index) => (
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleModeClick(mode)}
              className="cursor-pointer h-full"
            >
              <div
                className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 sm:p-8 h-full transition-all duration-300"
                style={{
                  boxShadow: `0 0 40px ${config.glowColor}`,
                  borderColor: config.borderColor.replace('/50', '/30')
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 50px ${config.hoverGlow}`
                  e.currentTarget.style.borderColor = config.borderColor.replace('/30', '/60')
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 40px ${config.glowColor}`
                  e.currentTarget.style.borderColor = config.borderColor.replace('/60', '/30')
                }}
              >
                <div className="text-center h-full flex flex-col">
                  {/* Icono con glow y animación */}
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="mb-4 sm:mb-6"
                    style={{
                      filter: `drop-shadow(0 0 20px ${config.iconGlow})`
                    }}
                  >
                    <div className="text-5xl sm:text-6xl md:text-7xl">
                      {config.icon}
                    </div>
                  </motion.div>

                  {/* Título */}
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">
                    {config.title}
                  </h2>

                  {/* Descripción */}
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed flex-grow">
                    {config.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Botón Volver */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/')}
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base border border-purple-400/40 text-white/90 hover:bg-white/5 hover:border-purple-400/60 transition-all duration-200"
          >
            Volver
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}



