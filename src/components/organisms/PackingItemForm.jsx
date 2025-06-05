import React from 'react'
import FormField from '../molecules/FormField'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
import Text from '../atoms/Text'

export default function PackingItemForm({ newPackingItem, setNewPackingItem, onAddPackingItem, categories }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
      <Text type="h5" className="mb-4">Add Item</Text>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <FormField
          label="Item Name"
          type="text"
          value={newPackingItem.item}
          onChange={(e) => setNewPackingItem(prev => ({ ...prev, item: e.target.value }))}
          placeholder="Item name"
          required
          className="flex-1"
        />
        <FormField
          label="Category"
          type="select"
          value={newPackingItem.category}
          onChange={(e) => setNewPackingItem(prev => ({ ...prev, category: e.target.value }))}
          options={categories}
          className="sm:w-1/3"
        />
        <Button
          onClick={onAddPackingItem}
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