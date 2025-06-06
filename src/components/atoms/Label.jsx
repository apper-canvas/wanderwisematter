import React from 'react'

export default function Label({ children, htmlFor, className = '', required = false }) {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${className}`}>
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  )
}