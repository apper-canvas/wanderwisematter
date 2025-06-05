import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { tripService } from '../services'
import HomePageTemplate from '../components/templates/HomePageTemplate'

export default function HomePage() {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeView, setActiveView] = useState('dashboard')
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    description: '',
    coverImage: ''
  })

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

  const handleSubmitForm = async (e) => {
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

    await handleCreateTrip(tripData)
    setFormData({
      destination: '',
      startDate: '',
      endDate: '',
      description: '',
      coverImage: ''
    })
    setShowCreateForm(false)
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

  return (
    <HomePageTemplate
      trips={trips}
      loading={loading}
      error={error}
      activeView={activeView}
      setActiveView={setActiveView}
      selectedTrip={selectedTrip}
      setSelectedTrip={setSelectedTrip}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      handleCreateTrip={handleCreateTrip}
      handleDeleteTrip={handleDeleteTrip}
      getDaysUntilTrip={getDaysUntilTrip}
      formatDateRange={formatDateRange}
      showCreateForm={showCreateForm}
      setShowCreateForm={setShowCreateForm}
      formData={formData}
      setFormData={setFormData}
      handleSubmitForm={handleSubmitForm}
    />
  )
}