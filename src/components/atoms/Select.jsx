import React from 'react'

export default function Select({ options, value, onChange, className = '', ...props }) {
  const baseClasses = 'input-field' // defined in index.css
  const combinedClasses = `${baseClasses} ${className}`

  return (
    <select
      value={value}
      onChange={onChange}
      className={combinedClasses}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value || option} value={option.value || option}>
          {option.label || option}
        </option>
      ))}
    </select>
  )
}