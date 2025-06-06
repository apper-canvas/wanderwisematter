import React from 'react'
import { motion } from 'framer-motion'
import Icon from '../atoms/Icon'
import Card from '../atoms/Card'
import Text from '../atoms/Text'

const ComingSoonSection = ({ 
  title, 
  description, 
  iconName = "Clock", 
  iconColorClass = "text-primary",
  examples = [] 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto text-center space-y-8"
    >
      <div className="space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className={`w-20 h-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center`}
        >
          <Icon name={iconName} size="lg" className={`${iconColorClass}`} />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-gray-900 dark:text-white"
        >
          {title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          {description}
        </motion.p>
      </div>

      {examples.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-3 gap-6 mt-12"
        >
          {examples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <Card className="p-6 h-full bg-white/50 backdrop-blur-sm border border-gray-200/50">
                <Text size="lg" weight="semibold" className="text-gray-900 mb-2">
                  {example.title}
                </Text>
                <Text size="sm" className="text-gray-500">
                  {example.subtitle || 'Coming soon...'}
                </Text>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

export default ComingSoonSection