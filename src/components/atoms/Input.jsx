import React from 'react'

export default function Input({ type = 'text', value, onChange, placeholder, className = '', ...props }) {
  const baseClasses = 'input-field' // defined in index.css
  const combinedClasses = `${baseClasses} ${className}`

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={combinedClasses}
      {...props}
    />
  )
}