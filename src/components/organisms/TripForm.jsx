import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FormField from '../molecules/FormField'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
import Text from '../atoms/Text'
import Card from '../atoms/Card'

export default function TripForm({ showForm, setShowForm, formData, setFormData, onSubmit }) {
  return (
    <Card className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <Text type="h3" className="text-xl font-semibold text-gray-900 mb-2">Trip Planning Center</Text>
          <Text type="p" className="text-gray-600">Create and manage your travel adventures</Text>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          variant="primary"
          icon={Icon}
          iconName={showForm ? "X" : "Plus"}
          className="mt-4 sm:mt-0"
        >
          <span>{showForm ? 'Cancel' : 'New Trip'}</span>
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={onSubmit}
            className="space-y-6 border-t dark:border-gray-700 pt-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Destination"
                name="destination"
                type="text"
                value={formData.destination}
                onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                placeholder="Where are you going?"
                required
              />
              <FormField
                label="Cover Image URL"
                name="coverImage"
                type="url"
                value={formData.coverImage}
                onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                placeholder="https://images.unsplash.com/..."
              />
              <FormField
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                required
              />
              <FormField
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                required
              />
            </div>
            <FormField
              label="Description"
              name="description"
              type="textarea"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Tell us about your trip..."
              rows={3}
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <Button type="submit" variant="primary" icon={Icon} iconName="Check">
                Create Trip
              </Button>
              <Button type="button" onClick={() => setShowForm(false)} variant="outline">
                Cancel
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </Card>
  )
}