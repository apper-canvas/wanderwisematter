import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Header from '../organisms/Header'
import SectionHeader from '../organisms/SectionHeader'
import TripForm from '../organisms/TripForm'
import TripGridSection from '../organisms/TripGridSection'
import EmptyState from '../organisms/EmptyState'
import TripManagementTabs from '../organisms/TripManagementTabs'
import ComingSoonSection from '../organisms/ComingSoonSection'
import MobileNav from '../organisms/MobileNav'

export default function HomePageTemplate({ 
  trips, 
  loading, 
  error, 
  activeView, 
  setActiveView, 
  selectedTrip, 
  setSelectedTrip, 
  darkMode, 
  setDarkMode, 
  handleCreateTrip, 
  handleDeleteTrip, 
  getDaysUntilTrip, 
  formatDateRange,
  showCreateForm,
  setShowCreateForm,
  formData,
  setFormData,
  handleSubmitForm
}) {
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
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

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
              <SectionHeader
                title="Plan Your Next Adventure"
                description="Organize every detail of your journey from itineraries to budgets, all in one place."
              />

              <TripForm
                showForm={showCreateForm}
                setShowForm={setShowCreateForm}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmitForm}
              />

              {trips?.length > 0 && (
                <TripGridSection
                  trips={trips}
                  onDeleteTrip={handleDeleteTrip}
                  onSelectTrip={setSelectedTrip}
                  getDaysUntilTrip={getDaysUntilTrip}
                  formatDateRange={formatDateRange}
                />
              )}

              {trips?.length === 0 && !loading && (
                <EmptyState
                  iconName="MapPin"
                  title="No trips planned yet"
                  description="Start planning your next adventure by creating your first trip above."
                />
              )}

              {trips?.length > 0 && (
                <TripManagementTabs />
              )}
            </motion.div>
          )}

          {activeView === 'discover' && (
            <ComingSoonSection
              title="Explore Destinations"
              description="Discover amazing places and get inspired for your next adventure. Coming next month!"
              iconName="Globe"
              iconColorClass="text-primary"
              examples={[
                { title: 'Paris, France', subtitle: 'Coming soon...' },
                { title: 'Tokyo, Japan', subtitle: 'Coming soon...' },
                { title: 'New York, USA', subtitle: 'Coming soon...' }
              ]}
            />
          )}

          {activeView === 'documents' && (
            <ComingSoonSection
              title="Travel Documents"
              description="Securely store your passports, visas, and travel documents in one place. Coming soon!"
              iconName="FileText"
              iconColorClass="text-accent"
            />
          )}
        </AnimatePresence>
      </main>

      <MobileNav activeView={activeView} setActiveView={setActiveView} />
    </div>
  )
}