'use client'

import { useState } from 'react'
import { Sidebar } from './sidebar'
import { MobileHeader } from './mobile-header'

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Sample admin data for display
  const admin = {
    name: 'Admin',
    email: 'admin@drunkcinema.com'
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <MobileHeader 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        admin={admin}
      />
      
      <main className="lg:ml-64 p-4 lg:p-6 min-h-screen">
        {children}
      </main>
    </div>
  )
}