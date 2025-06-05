import React from 'react'
import { motion } from 'framer-motion'

export default function Card({ children, className = '', onClick, hoverEffect = false, layout = false, ...props }) {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-xl shadow-soft dark:shadow-dark-soft'
  const hoverClasses = hoverEffect ? 'group cursor-pointer overflow-hidden transition-all duration-300' : ''
  const combinedClasses = `${baseClasses} ${hoverClasses} ${className}`

  const motionProps = {
    layout: layout,
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    whileHover: hoverEffect ? { y: -5 } : {},
    transition: { duration: 0.3 }
  }

  return (
    <motion.div
      className={combinedClasses}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.div>
  )
}