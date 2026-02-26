'use client'

import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface MobileHeaderProps {
  onToggleSidebar: () => void
  admin: any
}

export function MobileHeader({ onToggleSidebar, admin }: MobileHeaderProps) {
  return (
    <header className="lg:hidden bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
      <div className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="text-gray-400 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          {/* Logo - Using actual logo.png */}
          <Link href="/" className="block">
            <div className="w-8 h-8 relative">
              <Image 
                src="/logo.png"
                alt="Drunk Cinema"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="text-sm text-right">
            <p className="font-medium text-white">{admin?.name || 'Admin'}</p>
            <p className="text-xs text-gray-400">Administrator</p>
          </div>
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-sm font-semibold text-white">
              {admin?.name?.charAt(0).toUpperCase() || 'A'}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}