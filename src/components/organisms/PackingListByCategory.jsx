import React from 'react'
import { motion } from 'framer-motion'
import Checkbox from '../atoms/Checkbox'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
import Text from '../atoms/Text'
import ProgressBar from '../atoms/ProgressBar'
import Card from '../atoms/Card'

export default function PackingListByCategory({ packingItems, categories, packedPercentage, onTogglePackingItem, onDeletePackingItem }) {
  return (
    <div className="space-y-6">
      <Card className="bg-secondary bg-opacity-10 dark:bg-secondary-dark dark:bg-opacity-20 p-6 text-center shadow-none">
        <Text type="h3" className="text-secondary">{packedPercentage}%</Text>
        <Text type="p" className="text-gray-600 dark:text-gray-400">Packed</Text>
        <ProgressBar value={packedPercentage} className="mt-3" />
      </Card>

      {packingItems.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Text type="p">Your packing list is empty. Start adding items!</Text>
        </div>
      ) : (
        categories.map(category => {
          const categoryItems = packingItems.filter(item => item.category === category)
          if (categoryItems.length === 0) return null

          return (
            <div key={category} className="space-y-3">
              <Text type="h5" className="border-b dark:border-gray-700 pb-2">{category}</Text>
              {categoryItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <Checkbox
                    checked={item.packed}
                    onChange={() => onTogglePackingItem(item.id)}
                    label={item.item}
                  />
                  <Button
                    onClick={() => onDeletePackingItem(item.id)}
                    variant="ghost"
                    icon={Icon}
                    iconName="Trash2"
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <span className="sr-only">Delete Item</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          )
        })
      )}
    </div>
  )
}