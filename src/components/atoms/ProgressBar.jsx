import React from 'react'

export default function ProgressBar({ value, max = 100, color = 'secondary', className = '' }) {
  const percentage = Math.max(0, Math.min(100, (value / max) * 100))
  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    red: 'bg-red-500'
  }

  return (
    <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 ${className}`}>
      <div 
        className={`${colorClasses[color]} h-2 rounded-full transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  )
}