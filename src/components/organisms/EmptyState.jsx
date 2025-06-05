import React from 'react'
import { motion } from 'framer-motion'
import Icon from '../atoms/Icon'
import Text from '../atoms/Text'

export default function EmptyState({ iconName, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-16"
    >
      <div className="mx-auto h-24 w-24 text-gray-400 mb-6">
        <Icon name={iconName} className="h-full w-full" />
      </div>
      <Text type="h3" className="mb-2">{title}</Text>
      <Text type="p" className="mb-6 max-w-md mx-auto">{description}</Text>
    </motion.div>
  )
}