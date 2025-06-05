import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import Card from '../atoms/Card'
import Text from '../atoms/Text'
import TabButton from '../molecules/TabButton'
import ActivityForm from './ActivityForm'
import ActivityList from './ActivityList'
import ExpenseForm from './ExpenseForm'
import ExpenseList from './ExpenseList'
import PackingItemForm from './PackingItemForm'
import PackingListByCategory from './PackingListByCategory'

export default function TripManagementTabs() {
  const [activeTab, setActiveTab] = useState('itinerary')
  const [newActivity, setNewActivity] = useState({
    title: '',
    startTime: '',
    endTime: '',
    location: '',
    notes: ''
  })
  const [newExpense, setNewExpense] = useState({
    amount: '',
    category: 'Food',
    description: ''
  })
  const [newPackingItem, setNewPackingItem] = useState({
    item: '',
    category: 'Clothes'
  })

  const [activities, setActivities] = useState([
    {
      id: 1,
      title: 'Morning Coffee',
      startTime: '08:00',
      endTime: '09:00',
      location: 'Local Café',
      notes: 'Try the specialty blend'
    }
  ])
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      amount: 50,
      category: 'Food',
      description: 'Breakfast',
      date: new Date().toISOString().split('T')[0]
    }
  ])
  const [packingItems, setPackingItems] = useState([
    {
      id: 1,
      item: 'T-shirts',
      category: 'Clothes',
      packed: false
    },
    {
      id: 2,
      item: 'Toothbrush',
      category: 'Toiletries',
      packed: true
    }
  ])

  const addActivity = () => {
    if (!newActivity.title || !newActivity.startTime) {
      toast.error("Please fill in activity title and start time")
      return
    }
    const activity = { id: Date.now(), ...newActivity, category: 'Activity' }
    setActivities(prev => [...prev, activity])
    setNewActivity({ title: '', startTime: '', endTime: '', location: '', notes: '' })
    toast.success("Activity added!")
  }

  const addExpense = () => {
    if (!newExpense.amount || !newExpense.description) {
      toast.error("Please fill in amount and description")
      return
    }
    const expense = { id: Date.now(), ...newExpense, amount: parseFloat(newExpense.amount), date: new Date().toISOString().split('T')[0] }
    setExpenses(prev => [...prev, expense])
    setNewExpense({ amount: '', category: 'Food', description: '' })
    toast.success("Expense added!")
  }

  const addPackingItem = () => {
    if (!newPackingItem.item) {
      toast.error("Please enter an item name")
      return
    }
    const item = { id: Date.now(), ...newPackingItem, packed: false }
    setPackingItems(prev => [...prev, item])
    setNewPackingItem({ item: '', category: 'Clothes' })
    toast.success("Item added to packing list!")
  }

  const togglePackingItem = (id) => {
    setPackingItems(prev => prev.map(item => item.id === id ? { ...item, packed: !item.packed } : item))
  }

  const deleteActivity = (id) => {
    setActivities(prev => prev.filter(activity => activity.id !== id))
    toast.success("Activity removed!")
  }

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id))
    toast.success("Expense removed!")
  }

  const deletePackingItem = (id) => {
    setPackingItems(prev => prev.filter(item => item.id !== id))
    toast.success("Item removed!")
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const packedPercentage = packingItems.length > 0 
    ? Math.round((packingItems.filter(item => item.packed).length / packingItems.length) * 100)
    : 0

  const packingCategories = ['Clothes', 'Toiletries', 'Electronics', 'Documents', 'Other']
  const expenseCategories = ['Food', 'Transport', 'Accommodation', 'Activities', 'Shopping', 'Other']

  const tabs = [
    { id: 'itinerary', label: 'Itinerary', icon: 'Calendar' },
    { id: 'budget', label: 'Budget', icon: 'DollarSign' },
    { id: 'packing', label: 'Packing', icon: 'Package' }
  ]

  return (
    <Card className="p-6 lg:p-8">
      <Text type="h3" className="text-xl font-semibold text-gray-900 mb-6">Trip Management Demo</Text>
      
      <div className="flex flex-wrap border-b dark:border-gray-700 border-gray-200 mb-6">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            id={tab.id}
            label={tab.label}
            icon={tab.icon}
            isActive={activeTab === tab.id}
            onClick={setActiveTab}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'itinerary' && (
          <motion.div
            key="itinerary"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <ActivityForm
              newActivity={newActivity}
              setNewActivity={setNewActivity}
              onAddActivity={addActivity}
            />
            <ActivityList activities={activities} onDeleteActivity={deleteActivity} />
          </motion.div>
        )}

        {activeTab === 'budget' && (
          <motion.div
            key="budget"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <ExpenseForm
              newExpense={newExpense}
              setNewExpense={setNewExpense}
              onAddExpense={addExpense}
              expenseCategories={expenseCategories}
            />
            <ExpenseList expenses={expenses} totalExpenses={totalExpenses} onDeleteExpense={deleteExpense} />
          </motion.div>
        )}

        {activeTab === 'packing' && (
          <motion.div
            key="packing"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <PackingItemForm
              newPackingItem={newPackingItem}
              setNewPackingItem={setNewPackingItem}
              onAddPackingItem={addPackingItem}
              categories={packingCategories}
            />
            <PackingListByCategory
              packingItems={packingItems}
              categories={packingCategories}
              packedPercentage={packedPercentage}
              onTogglePackingItem={togglePackingItem}
              onDeletePackingItem={deletePackingItem}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}