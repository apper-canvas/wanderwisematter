import React from 'react'
import MobileNavItem from '../molecules/MobileNavItem'

export default function MobileNav({ activeView, setActiveView }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'Home' },
    { id: 'discover', label: 'Discover', icon: 'Globe' },
    { id: 'documents', label: 'Documents', icon: 'FileText' }
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-3 h-16">
        {navItems.map((item) => (
          <MobileNavItem
            key={item.id}
            iconName={item.icon}
            label={item.label}
            onClick={() => setActiveView(item.id)}
            isActive={activeView === item.id}
          />
        ))}
      </div>
    </nav>
  )
}