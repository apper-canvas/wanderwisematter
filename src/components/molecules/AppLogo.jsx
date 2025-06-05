import React from 'react'
import Icon from '../atoms/Icon'
import Text from '../atoms/Text'

export default function AppLogo() {
  return (
    <div className="flex items-center space-x-3">
      <div className="travel-gradient p-2 rounded-lg">
        <Icon name="Compass" className="h-6 w-6 text-white" />
      </div>
      <div>
        <Text type="h1">Wanderwise</Text>
        <Text type="span">Your Travel Companion</Text>
      </div>
    </div>
  )
}