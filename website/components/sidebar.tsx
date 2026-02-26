'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import {
  Home,
  Film,
  Clock,
  Building,
  Grid3x3,
  Ticket,
  CreditCard,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const navItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Movies', href: '/movies', icon: Film },
  { name: 'Showtimes', href: '/showtimes', icon: Clock },
  { name: 'Theaters', href: '/theaters', icon: Building },
  { name: 'Seat Maps', href: '/seat-maps', icon: Grid3x3 },
  { name: 'Bookings', href: '/bookings', icon: Ticket },
  { name: 'Payments', href: '/payments', icon: CreditCard },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => {
    router.push('/login')
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full bg-gradient-to-b from-gray-900 to-black border-r border-gray-800 transition-all duration-300 lg:translate-x-0",
        collapsed ? "w-20" : "w-64",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Brand/Logo */}
        <div className={cn(
          "border-b border-gray-800",
          collapsed ? "p-4" : "p-6"
        )}>
          <div className="flex items-center justify-between">
            {collapsed ? (
              <Link href="/" className="block">
                <div className="w-10 h-10 relative">
                  <Image 
                    src="/logo.png"
                    alt="Drunk Cinema"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              </Link>
            ) : (
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 relative">
                  <Image 
                    src="/logo.png"
                    alt="Drunk Cinema Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    Drunk Cinema
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium tracking-wider">
                    ADMIN DASHBOARD
                  </span>
                </div>
              </Link>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Admin Info - Simplified */}
        <div className={cn(
          "border-b border-gray-800",
          collapsed ? "p-4 flex justify-center" : "p-4"
        )}>
          {collapsed ? (
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="font-bold text-white">A</span>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="font-bold text-white">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Admin</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className={cn(
          "overflow-y-auto",
          collapsed ? "px-3" : "px-4"
        )} style={{ height: 'calc(100vh - 250px)' }}>
          <nav className={cn(
            "space-y-1",
            collapsed ? "py-2" : "py-3"
          )}>
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-lg transition-all duration-200 group",
                    isActive 
                      ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-l-4 border-yellow-500"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50",
                    collapsed ? "justify-center p-3" : "space-x-3 px-3 py-3"
                  )}
                  onClick={() => onClose?.()}
                  title={collapsed ? item.name : ''}
                >
                  <Icon className={cn(
                    "w-5 h-5 shrink-0",
                    isActive ? "text-yellow-400" : "text-gray-400 group-hover:text-yellow-300"
                  )} />
                  {!collapsed && <span className="font-medium truncate">{item.name}</span>}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 border-t border-gray-800 bg-gradient-to-t from-black to-gray-900",
          collapsed ? "p-2" : "p-4"
        )}>
          <Button
            variant="ghost"
            className={cn(
              "w-full text-red-400 hover:text-red-300 hover:bg-red-500/10",
              collapsed ? "justify-center px-2" : "justify-start px-3"
            )}
            onClick={handleLogout}
            title={collapsed ? "Logout" : ""}
          >
            <LogOut className={cn("w-5 h-5", collapsed ? "" : "mr-3")} />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </aside>
    </>
  )
}