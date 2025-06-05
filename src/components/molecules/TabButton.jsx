import React from 'react'
import Icon from '../atoms/Icon'

export default function TabButton({ id, label, icon, isActive, onClick }) {
  return (
    <button
      key={id}
      onClick={() => onClick(id)}
      className={`flex items-center space-x-2 px-4 py-2 border-b-2 transition-colors ${
        isActive
          ? 'border-primary text-primary'
          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
      }`}
    >
      <Icon name={icon} className="h-4 w-4" />
      <span>{label}</span>
    </button>
  )
}