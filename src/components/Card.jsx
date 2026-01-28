import { motion } from 'framer-motion'

export default function Card({ 
  children, 
  className = '',
  glowColor = 'purple',
  ...props 
}) {
  const glowVariants = {
    blue: 'border-neon-blue shadow-neon-blue',
    purple: 'border-neon-purple shadow-neon-purple',
    green: 'border-neon-green shadow-neon-green',
    lila: 'border-neon-lila shadow-neon-lila'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`
        bg-dark-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 border-2
        ${glowVariants[glowColor]}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  )
}



