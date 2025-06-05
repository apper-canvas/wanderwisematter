import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { tripService } from '../services'

export default function Home() {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeView, setActiveView] = useState('dashboard')
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const loadTrips = async () => {
      setLoading(true)
      try {
        const result = await tripService.getAll()
        setTrips(result || [])
      } catch (err) {
        setError(err.message)
        toast.error("Failed to load trips")
      } finally {
        setLoading(false)
      }
    }
    loadTrips()
  }, [])

  const handleCreateTrip = async (tripData) => {
    try {
      const newTrip = await tripService.create(tripData)
      setTrips(prev => [...(prev || []), newTrip])
      toast.success("Trip created successfully!")
    } catch (err) {
      toast.error("Failed to create trip")
    }
  }

  const handleDeleteTrip = async (tripId) => {
    try {
      await tripService.delete(tripId)
      setTrips(prev => (prev || []).filter(trip => trip.id !== tripId))
      toast.success("Trip deleted successfully!")
    } catch (err) {
      toast.error("Failed to delete trip")
    }
  }

  const getDaysUntilTrip = (startDate) => {
    const today = new Date()
    const tripDate = new Date(startDate)
    const diffTime = tripDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const options = { month: 'short', day: 'numeric' }
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your adventures...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} pattern-bg`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-soft sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="travel-gradient p-2 rounded-lg">
                <ApperIcon name="Compass" className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Wanderwise</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Your Travel Companion</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ApperIcon name={darkMode ? "Sun" : "Moon"} className="h-5 w-5" />
              </button>
              
              <nav className="hidden md:flex space-x-1">
                {['dashboard', 'discover', 'documents'].map((view) => (
                  <button
                    key={view}
                    onClick={() => setActiveView(view)}
                    className={`px-4 py-2 rounded-lg font-medium capitalize transition-all duration-200 ${
                      activeView === view
                        ? 'bg-primary text-white shadow-card'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700'
                    }`}
                  >
                    {view}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeView === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Welcome Section */}
              <div className="text-center lg:text-left">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Plan Your Next Adventure
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
                  Organize every detail of your journey from itineraries to budgets, all in one place.
                </p>
              </div>

              {/* Trip Planning Interface */}
              <MainFeature 
                trips={trips}
                onCreateTrip={handleCreateTrip}
                onDeleteTrip={handleDeleteTrip}
              />

              {/* Trip Cards Grid */}
              {trips?.length > 0 && (
                <section>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                    Your Trips ({trips.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trips.map((trip) => (
                      <motion.div
                        key={trip.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ y: -5 }}
                        className="card group cursor-pointer overflow-hidden"
                        onClick={() => setSelectedTrip(trip)}
                      >
                        <div className="relative h-48 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
                          <img
                            src={trip.coverImage || `https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop`}
                            alt={trip.destination}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full px-3 py-1">
                            <span className="text-sm font-medium text-gray-900">
                              {getDaysUntilTrip(trip.startDate) > 0 
                                ? `${getDaysUntilTrip(trip.startDate)} days`
                                : 'Started'
                              }
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {trip.destination}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                            {trip.description}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                            <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
                            <div className="flex items-center space-x-1">
                              <ApperIcon name="Calendar" className="h-4 w-4" />
                              <span>
                                {Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24))} days
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-2">
                              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <ApperIcon name="Edit3" className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                              </button>
                              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <ApperIcon name="Share2" className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                              </button>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteTrip(trip.id)
                              }}
                              className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900 transition-colors group"
                            >
                              <ApperIcon name="Trash2" className="h-4 w-4 text-gray-400 group-hover:text-red-500" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {/* Empty State */}
              {trips?.length === 0 && !loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="mx-auto h-24 w-24 text-gray-400 mb-6">
                    <ApperIcon name="MapPin" className="h-full w-full" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No trips planned yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    Start planning your next adventure by creating your first trip above.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeView === 'discover' && (
            <motion.div
              key="discover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16"
            >
              <div className="mx-auto h-24 w-24 text-primary mb-6">
                <ApperIcon name="Globe" className="h-full w-full" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Explore Destinations
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Discover amazing places and get inspired for your next adventure. Coming next month!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {['Paris, France', 'Tokyo, Japan', 'New York, USA'].map((destination, index) => (
                  <div key={index} className="card p-6 opacity-75">
                    <div className="h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4"></div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{destination}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Coming soon...</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeView === 'documents' && (
            <motion.div
              key="documents"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16"
            >
              <div className="mx-auto h-24 w-24 text-accent mb-6">
                <ApperIcon name="FileText" className="h-full w-full" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Travel Documents
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Securely store your passports, visas, and travel documents in one place. Coming soon!
              </p>
              <div className="max-w-md mx-auto">
                <div className="card p-8 opacity-75">
                  <ApperIcon name="Upload" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">Document upload coming soon</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 h-16">
          {['dashboard', 'discover', 'documents'].map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`flex flex-col items-center justify-center space-y-1 ${
                activeView === view ? 'text-primary' : 'text-gray-400'
              }`}
            >
              <ApperIcon 
                name={view === 'dashboard' ? 'Home' : view === 'discover' ? 'Globe' : 'FileText'} 
                className="h-5 w-5" 
              />
              <span className="text-xs capitalize">{view}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}