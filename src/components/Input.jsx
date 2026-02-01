import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const Input = forwardRef(function Input({ 
  label, 
  value, 
  onChange, 
  placeholder = '',
  type = 'text',
  className = '',
  ...props 
}, ref) {
  const inputClasses = `
    w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl
    bg-dark-hover border-2 border-neon-purple
    text-white placeholder-gray-400 text-base
    focus:outline-none focus:border-neon-lila
    focus:shadow-neon-lila
    transition-all duration-300
  `

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-xs sm:text-sm font-medium text-neon-lila mb-2">
          {label}
        </label>
      )}
      {type === 'textarea' ? (
        <motion.textarea
          ref={ref}
          whileFocus={{ scale: 1.02 }}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClasses}
          rows={6}
          {...props}
        />
      ) : (
        <motion.input
          ref={ref}
          whileFocus={{ scale: 1.02 }}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClasses}
          {...props}
        />
      )}
    </div>
  )
})

export default Input

