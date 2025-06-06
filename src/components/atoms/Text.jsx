import React from 'react'

export default function Text({ children, className = '', type = 'p', ...props }) {
  const commonClasses = 'text-gray-600 dark:text-gray-400'
  
  const textStyles = {
    h1: 'text-xl font-bold text-gray-900 dark:text-white',
    h2: 'text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white',
    h3: 'text-2xl font-semibold text-gray-900 dark:text-white',
    h4: 'text-xl font-semibold text-gray-900 dark:text-white',
    h5: 'font-medium text-gray-900 dark:text-gray-200',
    p: `${commonClasses}`,
    span: `text-xs ${commonClasses}`,
    small: `text-sm ${commonClasses}`,
    large: `text-lg ${commonClasses}`,
    subtle: `text-sm text-gray-500 dark:text-gray-400`,
    strong: `font-medium text-gray-900 dark:text-gray-200`,
}

  const Component = type === 'large' ? 'span' : (type in textStyles ? type : 'p')
  const finalClass = `${textStyles[type] || textStyles.p} ${className}`
  return (
    <Component className={finalClass} {...props}>
      {children}
    </Component>
  )
}