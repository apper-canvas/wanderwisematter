import React from 'react'
import { motion } from 'framer-motion'
import Icon from '../atoms/Icon'
import Button from '../atoms/Button'
import Card from '../atoms/Card'
import Text from '../atoms/Text'

export default function TripCard({ trip, onDelete, onClick, getDaysUntilTrip, formatDateRange }) {
  const daysUntilTrip = getDaysUntilTrip(trip.startDate)
  const isStarted = daysUntilTrip <= 0

  return (
    <Card hoverEffect={true} onClick={() => onClick(trip)}>
      <div className="relative h-48 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
        <img
          src={trip.coverImage || `https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop`}
          alt={trip.destination}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full px-3 py-1 dark:bg-gray-700 dark:bg-opacity-90">
          <Text type="small" className="text-gray-900 dark:text-gray-200 font-medium">
            {isStarted ? 'Started' : `${daysUntilTrip} days`}
          </Text>
        </div>
      </div>
      
      <div className="p-6">
        <Text type="h4" className="mb-2">{trip.destination}</Text>
        <Text type="p" className="line-clamp-2 mb-3">{trip.description}</Text>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Text type="small">{formatDateRange(trip.startDate, trip.endDate)}</Text>
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" className="h-4 w-4" />
            <Text type="small">
              {Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24))} days
            </Text>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button variant="ghost" icon={({ className }) => <Icon name="Edit3" className={`${className} text-gray-600 dark:text-gray-400`} />}>
              <span className="sr-only">Edit Trip</span>
            </Button>
            <Button variant="ghost" icon={({ className }) => <Icon name="Share2" className={`${className} text-gray-600 dark:text-gray-400`} />}>
              <span className="sr-only">Share Trip</span>
            </Button>
          </div>
          <Button
            variant="dangerOutline"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(trip.id)
            }}
            icon={({ className }) => <Icon name="Trash2" className={`${className} text-gray-400 group-hover:text-red-500`} />}
          >
            <span className="sr-only">Delete Trip</span>
          </Button>
        </div>
      </div>
    </Card>
  )
}