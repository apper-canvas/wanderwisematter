import React from 'react'
import { motion } from 'framer-motion'
import Icon from '../atoms/Icon'
import Text from '../atoms/Text'
import Button from '../atoms/Button'

export default function ActivityList({ activities, onDeleteActivity }) {
  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <Text type="p">No activities planned yet. Add one above!</Text>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {activities.map((activity) => (
        <motion.div
          key={activity.id}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-card transition-shadow"
        >
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <Text type="h5">{activity.title}</Text>
              <Text type="small" className="text-gray-500 dark:text-gray-400">{activity.startTime}</Text>
            </div>
            {activity.location && (
              <Text type="small" className="mt-1">📍 {activity.location}</Text>
            )}
            {activity.notes && (
              <Text type="small" className="mt-1">{activity.notes}</Text>
            )}
          </div>
          <Button
            onClick={() => onDeleteActivity(activity.id)}
            className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
            variant="ghost"
            icon={Icon}
            iconName="Trash2"
          >
            <span className="sr-only">Delete Activity</span>
          </Button>
        </motion.div>
      ))}
    </div>
  )
}