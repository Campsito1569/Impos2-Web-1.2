import { motion } from 'framer-motion'

export default function Input({ 
  label, 
  value, 
  onChange, 
  placeholder = '',
  type = 'text',
  className = '',
  ...props 
}) {
  const inputClasses = `
    w-full px-4 py-3 rounded-xl
    bg-dark-hover border-2 border-neon-purple
    text-white placeholder-gray-400
    focus:outline-none focus:border-neon-lila
    focus:shadow-neon-lila
    transition-all duration-300
  `

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-neon-lila mb-2">
          {label}
        </label>
      )}
      {type === 'textarea' ? (
        <motion.textarea
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
}

