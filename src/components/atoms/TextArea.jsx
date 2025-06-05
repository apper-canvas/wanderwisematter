import React from 'react'

export default function TextArea({ value, onChange, placeholder, rows = 3, className = '', ...props }) {
  const baseClasses = 'input-field resize-none' // defined in index.css
  const combinedClasses = `${baseClasses} ${className}`

  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={combinedClasses}
      {...props}
    />
  )
}