import React from 'react'
import Text from '../atoms/Text'

export default function SectionHeader({ title, description, className = '' }) {
  return (
    <div className={`text-center lg:text-left ${className}`}>
      <Text type="h2" className="mb-4">{title}</Text>
      <Text type="large" className="max-w-2xl mx-auto lg:mx-0">{description}</Text>
    </div>
  )
}