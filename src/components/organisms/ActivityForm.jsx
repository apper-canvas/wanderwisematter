import React from 'react'
import FormField from '../molecules/FormField'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
import Text from '../atoms/Text'

export default function ActivityForm({ newActivity, setNewActivity, onAddActivity }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
      <Text type="h5" className="mb-4">Add New Activity</Text>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <FormField
          label="Activity Title"
          type="text"
          value={newActivity.title}
          onChange={(e) => setNewActivity(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Activity title"
          required
        />
        <FormField
          label="Start Time"
          type="time"
          value={newActivity.startTime}
          onChange={(e) => setNewActivity(prev => ({ ...prev, startTime: e.target.value }))}
          required
        />
        <FormField
          label="Location"
          type="text"
          value={newActivity.location}
          onChange={(e) => setNewActivity(prev => ({ ...prev, location: e.target.value }))}
          placeholder="Location"
        />
      </div>
      <div className="flex gap-3">
        <FormField
          label="Notes"
          type="text"
          value={newActivity.notes}
          onChange={(e) => setNewActivity(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Notes"
          className="flex-1"
        />
        <Button
          onClick={onAddActivity}
          className="self-end"
          icon={Icon}
          iconName="Plus"
        >
          <span>Add</span>
        </Button>
      </div>
    </div>
  )
}