import { motion } from 'framer-motion'

export default function Button({ 
  children, 
  onClick, 
  type = 'button', 
  className = '', 
  variant = 'primary',
  icon: IconComponent,
  ...props
}) {
  const baseClasses = 'px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2'
  
  const variantClasses = {
    primary: 'bg-primary text-white shadow-card hover:bg-primary-dark',
    secondary: 'bg-secondary text-white shadow-card hover:bg-secondary-dark',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700',
    ghost: 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    dangerOutline: 'p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900 transition-colors group' // Specific for delete button
  }

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`

  return (
    <motion.button
      whileHover={{ scale: (variant === 'dangerOutline' || variant === 'ghost') ? 1 : 1.02 }}
      whileTap={{ scale: (variant === 'dangerOutline' || variant === 'ghost') ? 0.98 : 0.98 }}
      onClick={onClick}
      type={type}
      className={combinedClasses}
      {...props}
    >
      {IconComponent && <IconComponent className="h-5 w-5" />}
      {children}
    </motion.button>
  )
}