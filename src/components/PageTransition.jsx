import { motion, useReducedMotion } from 'motion/react'

export default function PageTransition({ children }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduce ? 0 : -8 }}
      transition={{ duration: reduce ? 0.1 : 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
