import { motion, AnimatePresence } from 'framer-motion'
import Button from './Button'

export default function Modal({ isOpen, onClose, title, children, onConfirm, confirmText = 'Confirmar', showCancel = true }) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-dark-card border-2 border-neon-lila rounded-3xl p-6 max-w-md w-full mx-4 shadow-neon-lila"
        >
          {title && (
            <h2 className="text-2xl font-bold text-neon-lila mb-4">{title}</h2>
          )}
          
          <div className="mb-6">
            {children}
          </div>

          <div className="flex gap-4 justify-end">
            {showCancel && (
              <Button onClick={onClose} variant="secondary">
                Cancelar
              </Button>
            )}
            {onConfirm && (
              <Button onClick={onConfirm} variant="primary">
                {confirmText}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

