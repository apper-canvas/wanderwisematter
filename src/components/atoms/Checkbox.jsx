import React from 'react'

export default function Checkbox({ checked, onChange, label, className = '', ...props }) {
  return (
    <label className={`flex items-center space-x-3 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-secondary focus:ring-secondary border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-secondary dark:focus:ring-secondary"
        {...props}
      />
      {label && <span className={`${checked ? 'line-through text-gray-500' : 'text-gray-900 dark:text-gray-200'}`}>{label}</span>}
    </label>
  )
}