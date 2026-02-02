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
      <div className="max-w-6xl w-full py-4 sm:py-6 md:py-8 gpu anim-lite">
        {/* Título mejorado */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 sm:mb-10 md:mb-12 text-center bg-gradient-to-r from-neon-lila via-purple-400 to-neon-lila bg-clip-text text-transparent px-2">
          Selecciona el Modo de Juego
        </h1>

        {/* Grid de modos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10">
          {Object.entries(modeConfig).map(([mode, config], index) => (
            <div
              key={mode}
              onClick={() => handleModeClick(mode)}
              className="cursor-pointer h-full gpu anim-lite"
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                animation: `fadeInUpLite 0.3s ease-out ${index * 0.05}s forwards`
              }}
            >
              <div
                className="relative bg-white/5 card-lite rounded-3xl border border-white/10 p-6 sm:p-8 h-full glow-lite gpu"
                style={{
                  borderColor: config.borderColor.replace('/50', '/30')
                }}
              >
                <div className="text-center h-full flex flex-col">
                  {/* Icono sin animación continua */}
                  <div className="mb-4 sm:mb-6">
                    <div className="text-5xl sm:text-6xl md:text-7xl">
                      {config.icon}
                    </div>
                  </div>

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
            </div>
          ))}
        </div>

        {/* Botón Volver */}
        <div className="flex justify-center gpu anim-lite">
          <button
            onClick={() => navigate('/')}
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base border border-purple-400/40 text-white/90 hover:bg-white/5 hover:border-purple-400/60 gpu anim-lite"
          >
            Volver
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



