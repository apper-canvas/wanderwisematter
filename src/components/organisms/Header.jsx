import React from 'react'
import AppLogo from '../molecules/AppLogo'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
import TabButton from '../molecules/TabButton'

export default function Header({ activeView, setActiveView, darkMode, setDarkMode }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'Home' },
    { id: 'discover', label: 'Discover', icon: 'Globe' },
    { id: 'documents', label: 'Documents', icon: 'FileText' }
  ]

  return (
    <header className="bg-white dark:bg-gray-800 shadow-soft dark:shadow-dark-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <AppLogo />
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setDarkMode(!darkMode)}
              variant="ghost"
              icon={({ className }) => <Icon name={darkMode ? "Sun" : "Moon"} className={`${className} text-gray-600 dark:text-gray-400`} />}
            >
              <span className="sr-only">{darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
            </Button>
            
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <TabButton
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  icon={item.icon}
                  isActive={activeView === item.id}
                  onClick={setActiveView}
                />
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}