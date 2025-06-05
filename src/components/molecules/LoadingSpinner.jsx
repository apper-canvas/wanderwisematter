import React from 'react'
import Text from '../atoms/Text'

export default function LoadingSpinner({ message = 'Loading your adventures...' }) {
  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <Text type="p" className="text-gray-600 dark:text-gray-400">{message}</Text>
      </div>
    </div>
  )
}