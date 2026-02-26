import { Film } from 'lucide-react'
import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: 'w-6 h-6', text: 'text-lg', container: 'space-x-2' },
    md: { icon: 'w-8 h-8', text: 'text-xl', container: 'space-x-3' },
    lg: { icon: 'w-10 h-10', text: 'text-2xl', container: 'space-x-3' }
  }

  const { icon, text, container } = sizes[size]

  return (
    <Link href="/" className="flex items-center">
      <div className={`flex items-center ${container}`}>
        {/* Logo Container with Gradient */}
        <div className={`${icon} rounded-xl bg-gradient-to-br from-yellow-500 via-orange-500 to-yellow-600 flex items-center justify-center shadow-lg`}>
          <Film className="w-3/4 h-3/4 text-white" />
        </div>
        
        {/* Logo Text */}
        {showText && (
          <div className="flex flex-col">
            <span className={`${text} font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent`}>
              Drunk Cinema
            </span>
            <span className="text-[10px] text-gray-400 font-medium tracking-wider">
              ADMIN DASHBOARD
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}

// Alternative Logo with different style
export function LogoAlt() {
  return (
    <Link href="/" className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
          <Film className="w-6 h-6 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 border-2 border-gray-900" />
      </div>
      <div>
        <div className="text-lg font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
          Drunk Cinema
        </div>
        <div className="text-xs text-gray-400 font-medium">Film Management</div>
      </div>
    </Link>
  )
}