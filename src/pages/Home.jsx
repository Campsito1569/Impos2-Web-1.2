import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/Button'
import Card from '../components/Card'

export default function Home() {
  const navigate = useNavigate()
  const [logoLoaded, setLogoLoaded] = useState(false)
  const [logoError, setLogoError] = useState(false)

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-bg via-purple-900/20 to-dark-bg p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex flex-col items-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-7xl font-bold mb-4 bg-gradient-to-r from-neon-lila via-purple-500 to-neon-purple bg-clip-text text-transparent animate-glow"
          >
            🎮 IMPOS2
          </motion.h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl text-gray-300 mb-4 font-semibold"
        >
          ¿Quién es el impostor?
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-gray-400 mb-12"
        >
          El juego de deducción entre amigos
        </motion.p>

        <Card glowColor="lila" className="max-w-md mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-6"
          >
            <p className="text-gray-300 leading-relaxed text-center">
              Descubre al impostor entre tus amigos. Un jugador (o varios) no conoce la palabra secreta
              y debe pasar desapercibido mientras los demás intentan descubrirlo.
            </p>
            
            <Button
              onClick={() => navigate('/mode-select')}
              variant="primary"
              className="w-full text-lg py-4"
            >
              COMENZAR PARTIDA
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  )
}

