import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg mx-auto"
      >
        <div className="mb-8">
          <ApperIcon name="MapPin" className="h-24 w-24 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Lost in Translation?</h1>
          <p className="text-lg text-gray-600 mb-8">
            It looks like you've wandered off the beaten path. Let's get you back to planning your next adventure.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-all duration-200 hover:shadow-trip-card-hover"
          >
            <ApperIcon name="Home" className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>Error 404 - Page not found</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}