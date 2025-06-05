import React from 'react'
import { motion } from 'framer-motion'
import TripCard from '../molecules/TripCard'
import Text from '../atoms/Text'

export default function TripGridSection({ trips, onDeleteTrip, onSelectTrip, getDaysUntilTrip, formatDateRange }) {
  return (
    <section>
      <Text type="h3" className="mb-6">Your Trips ({trips.length})</Text>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <TripCard
            key={trip.id}
            trip={trip}
            onDelete={onDeleteTrip}
            onClick={onSelectTrip}
            getDaysUntilTrip={getDaysUntilTrip}
            formatDateRange={formatDateRange}
          />
        ))}
      </div>
    </section>
  )
}