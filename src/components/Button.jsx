import { motion } from 'framer-motion'

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  disabled = false,
  ...props 
}) {
  const variants = {
    primary: 'bg-ochre-600 hover:shadow-neon-lila',
    secondary: 'bg-dark-card border-2 border-neon-lila hover:border-ochre-500 hover:shadow-neon-purple',
    danger: 'bg-ember-600 hover:shadow-lg',
    success: 'bg-emerald-700 hover:shadow-neon-green'
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-lg font-semibold text-white text-sm sm:text-base
        transition-all duration-300
        ${variants[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  )
}



