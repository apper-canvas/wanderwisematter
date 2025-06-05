import React from 'react'
import Icon from '../atoms/Icon'
import Text from '../atoms/Text'

export default function MobileNavItem({ iconName, label, onClick, isActive }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center space-y-1 ${
        isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
      }`}
    >
      <Icon name={iconName} className="h-5 w-5" />
      <Text type="span" className="text-xs capitalize">{label}</Text>
    </button>
  )
}