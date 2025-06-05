import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

export default function MainFeature({ trips = [], onCreateTrip, onDeleteTrip }) {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [activeTab, setActiveTab] = useState('itinerary')
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    description: '',
    coverImage: ''
  })

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.destination || !formData.startDate || !formData.endDate) {
      toast.error("Please fill in all required fields")
      return
    }

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      toast.error("End date must be after start date")
      return
    }

    const tripData = {
      ...formData,
      coverImage: formData.coverImage || `https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop&q=80&auto=format`,
      createdAt: new Date().toISOString()
    }

    await onCreateTrip(tripData)
    setFormData({
      destination: '',
      startDate: '',
      endDate: '',
      description: '',
      coverImage: ''
    })
    setShowCreateForm(false)
  }

  const addActivity = () => {
    if (!newActivity.title || !newActivity.startTime) {
      toast.error("Please fill in activity title and start time")
      return
    }

    const activity = {
      id: Date.now(),
      ...newActivity,
      category: 'Activity'
    }

    setActivities(prev => [...prev, activity])
    setNewActivity({
      title: '',
      startTime: '',
      endTime: '',
      location: '',
      notes: ''
    })
    toast.success("Activity added!")
  }

  const addExpense = () => {
    if (!newExpense.amount || !newExpense.description) {
      toast.error("Please fill in amount and description")
      return
    }

    const expense = {
      id: Date.now(),
      ...newExpense,
      amount: parseFloat(newExpense.amount),
      date: new Date().toISOString().split('T')[0]
    }

    setExpenses(prev => [...prev, expense])
    setNewExpense({
      amount: '',
      category: 'Food',
      description: ''
    })
    toast.success("Expense added!")
  }

  const addPackingItem = () => {
    if (!newPackingItem.item) {
      toast.error("Please enter an item name")
      return
    }

    const item = {
      id: Date.now(),
      ...newPackingItem,
      packed: false
    }

    setPackingItems(prev => [...prev, item])
    setNewPackingItem({
      item: '',
      category: 'Clothes'
    })
    toast.success("Item added to packing list!")
  }

  const togglePackingItem = (id) => {
    setPackingItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    )
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

  const categories = ['Clothes', 'Toiletries', 'Electronics', 'Documents', 'Other']
  const expenseCategories = ['Food', 'Transport', 'Accommodation', 'Activities', 'Shopping', 'Other']

  return (
    <div className="space-y-8">
      {/* Create Trip Section */}
      <div className="card p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Trip Planning Center</h3>
            <p className="text-gray-600">Create and manage your travel adventures</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="mt-4 sm:mt-0 btn-primary flex items-center space-x-2"
          >
            <ApperIcon name={showCreateForm ? "X" : "Plus"} className="h-5 w-5" />
            <span>{showCreateForm ? 'Cancel' : 'New Trip'}</span>
          </motion.button>
        </div>

        <AnimatePresence>
          {showCreateForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-6 border-t pt-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination *
                  </label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                    placeholder="Where are you going?"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.coverImage}
                    onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                    placeholder="https://images.unsplash.com/..."
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Tell us about your trip..."
                  rows={3}
                  className="input-field resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="btn-primary flex items-center justify-center space-x-2"
                >
                  <ApperIcon name="Check" className="h-5 w-5" />
                  <span>Create Trip</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Trip Management Demo */}
      {trips?.length > 0 && (
        <div className="card p-6 lg:p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Trip Management Demo</h3>
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap border-b border-gray-200 mb-6">
            {[
              { id: 'itinerary', label: 'Itinerary', icon: 'Calendar' },
              { id: 'budget', label: 'Budget', icon: 'DollarSign' },
              { id: 'packing', label: 'Packing', icon: 'Package' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <ApperIcon name={tab.icon} className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'itinerary' && (
              <motion.div
                key="itinerary"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-4">Add New Activity</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <input
                      type="text"
                      value={newActivity.title}
                      onChange={(e) => setNewActivity(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Activity title"
                      className="input-field"
                    />
                    <input
                      type="time"
                      value={newActivity.startTime}
                      onChange={(e) => setNewActivity(prev => ({ ...prev, startTime: e.target.value }))}
                      className="input-field"
                    />
                    <input
                      type="text"
                      value={newActivity.location}
                      onChange={(e) => setNewActivity(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Location"
                      className="input-field"
                    />
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newActivity.notes}
                      onChange={(e) => setNewActivity(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Notes"
                      className="input-field flex-1"
                    />
                    <button
                      onClick={addActivity}
                      className="btn-primary"
                    >
                      <ApperIcon name="Plus" className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {activities.map((activity) => (
                    <motion.div
                      key={activity.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-card transition-shadow"
                    >
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <h5 className="font-medium text-gray-900">{activity.title}</h5>
                          <span className="text-sm text-gray-500">{activity.startTime}</span>
                        </div>
                        {activity.location && (
                          <p className="text-sm text-gray-600 mt-1">📍 {activity.location}</p>
                        )}
                        {activity.notes && (
                          <p className="text-sm text-gray-500 mt-1">{activity.notes}</p>
                        )}
                      </div>
                      <button
                        onClick={() => deleteActivity(activity.id)}
                        className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <ApperIcon name="Trash2" className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
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
                <div className="bg-primary bg-opacity-10 rounded-lg p-6 text-center">
                  <h4 className="text-2xl font-bold text-primary">${totalExpenses.toFixed(2)}</h4>
                  <p className="text-gray-600">Total Expenses</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-4">Add Expense</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                      type="number"
                      step="0.01"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense(prev => ({ ...prev, amount: e.target.value }))}
                      placeholder="Amount"
                      className="input-field"
                    />
                    <select
                      value={newExpense.category}
                      onChange={(e) => setNewExpense(prev => ({ ...prev, category: e.target.value }))}
                      className="input-field"
                    >
                      {expenseCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={newExpense.description}
                      onChange={(e) => setNewExpense(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Description"
                      className="input-field"
                    />
                  </div>
                  <button
                    onClick={addExpense}
                    className="btn-primary"
                  >
                    Add Expense
                  </button>
                </div>

                <div className="space-y-3">
                  {expenses.map((expense) => (
                    <motion.div
                      key={expense.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <span className="font-medium">{expense.description}</span>
                          <span className="text-lg font-semibold text-primary">${expense.amount}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500 mt-1">
                          <span>{expense.category}</span>
                          <span>{expense.date}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteExpense(expense.id)}
                        className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <ApperIcon name="Trash2" className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
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
                <div className="bg-secondary bg-opacity-10 rounded-lg p-6 text-center">
                  <h4 className="text-2xl font-bold text-secondary">{packedPercentage}%</h4>
                  <p className="text-gray-600">Packed</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div 
                      className="bg-secondary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${packedPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-4">Add Item</h4>
                  <div className="flex gap-4 mb-4">
                    <input
                      type="text"
                      value={newPackingItem.item}
                      onChange={(e) => setNewPackingItem(prev => ({ ...prev, item: e.target.value }))}
                      placeholder="Item name"
                      className="input-field flex-1"
                    />
                    <select
                      value={newPackingItem.category}
                      onChange={(e) => setNewPackingItem(prev => ({ ...prev, category: e.target.value }))}
                      className="input-field"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <button
                      onClick={addPackingItem}
                      className="btn-primary"
                    >
                      <ApperIcon name="Plus" className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {categories.map(category => {
                  const categoryItems = packingItems.filter(item => item.category === category)
                  if (categoryItems.length === 0) return null

                  return (
                    <div key={category} className="space-y-3">
                      <h5 className="font-medium text-gray-900 border-b pb-2">{category}</h5>
                      {categoryItems.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
                        >
                          <label className="flex items-center space-x-3 cursor-pointer flex-1">
                            <input
                              type="checkbox"
                              checked={item.packed}
                              onChange={() => togglePackingItem(item.id)}
                              className="w-4 h-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                            />
                            <span className={`${item.packed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                              {item.item}
                            </span>
                          </label>
                          <button
                            onClick={() => deletePackingItem(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <ApperIcon name="Trash2" className="h-4 w-4" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}