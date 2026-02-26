'use client'

import { useState } from 'react'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  Grid3x3,
  Plus,
  Settings,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  XCircle,
  Scissors,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

// Types
type SeatStatus = 'available' | 'booked' | 'selected'
type SeatType = 'standard' | 'vip' | 'recliner'

type Seat = {
  id: string
  row: string
  number: number
  status: SeatStatus
  type: SeatType
  price?: number
}

type Row = {
  name: string
  seats: (Seat | null)[] // null represents a gap/empty space
}

type Screen = {
  id: string
  name: string
  rows: Row[]
  totalSeats: number
}

type Theater = {
  id: string
  name: string
  screens: Screen[]
}

// Helper to randomly set some seats as booked
const setRandomBooked = (seats: (Seat | null)[], count: number): (Seat | null)[] => {
  const bookedIndices = new Set<number>()
  while (bookedIndices.size < count) {
    const randomIndex = Math.floor(Math.random() * seats.length)
    if (seats[randomIndex] !== null) {
      bookedIndices.add(randomIndex)
    }
  }
  
  return seats.map((seat, index) => {
    if (seat && bookedIndices.has(index)) {
      return { ...seat, status: 'booked' }
    }
    return seat
  })
}

// Generate Hall I Balcony layout exactly as shown
function generateHallIBalconyLayout(): Row[] {
  // Row A: seats 1,2, gap, seats 3-19
  const rowASeats: (Seat | null)[] = [
    { id: 'A1', row: 'A', number: 1, status: 'available', type: 'standard', price: 15 },
    { id: 'A2', row: 'A', number: 2, status: 'available', type: 'standard', price: 15 },
    null, // Gap for door
    null, // Gap for door
    { id: 'A3', row: 'A', number: 3, status: 'available', type: 'standard', price: 15 },
    { id: 'A4', row: 'A', number: 4, status: 'available', type: 'standard', price: 15 },
    { id: 'A5', row: 'A', number: 5, status: 'available', type: 'standard', price: 15 },
    { id: 'A6', row: 'A', number: 6, status: 'available', type: 'standard', price: 15 },
    { id: 'A7', row: 'A', number: 7, status: 'available', type: 'standard', price: 15 },
    { id: 'A8', row: 'A', number: 8, status: 'available', type: 'standard', price: 15 },
    { id: 'A9', row: 'A', number: 9, status: 'available', type: 'standard', price: 15 },
    { id: 'A10', row: 'A', number: 10, status: 'available', type: 'standard', price: 15 },
    { id: 'A11', row: 'A', number: 11, status: 'available', type: 'standard', price: 15 },
    { id: 'A12', row: 'A', number: 12, status: 'available', type: 'standard', price: 15 },
    { id: 'A13', row: 'A', number: 13, status: 'available', type: 'standard', price: 15 },
    { id: 'A14', row: 'A', number: 14, status: 'available', type: 'standard', price: 15 },
    { id: 'A15', row: 'A', number: 15, status: 'available', type: 'standard', price: 15 },
    { id: 'A16', row: 'A', number: 16, status: 'available', type: 'standard', price: 15 },
    { id: 'A17', row: 'A', number: 17, status: 'available', type: 'standard', price: 15 },
    { id: 'A18', row: 'A', number: 18, status: 'available', type: 'standard', price: 15 },
    { id: 'A19', row: 'A', number: 19, status: 'available', type: 'standard', price: 15 },
  ]

  // Row B: seats 1,2, gap, seats 3-6, gap, seats 7-12, gap, seats 13-14
  const rowBSeats: (Seat | null)[] = [
    { id: 'B1', row: 'B', number: 1, status: 'available', type: 'standard', price: 15 },
    { id: 'B2', row: 'B', number: 2, status: 'available', type: 'standard', price: 15 },
    null, // Gap
    null, // Gap
    { id: 'B3', row: 'B', number: 3, status: 'available', type: 'standard', price: 15 },
    { id: 'B4', row: 'B', number: 4, status: 'available', type: 'standard', price: 15 },
    { id: 'B5', row: 'B', number: 5, status: 'available', type: 'standard', price: 15 },
    { id: 'B6', row: 'B', number: 6, status: 'available', type: 'standard', price: 15 },
    null, // Gap
    null, // Gap
    null, // Gap
    null, // Gap
    { id: 'B7', row: 'B', number: 7, status: 'available', type: 'standard', price: 15 },
    { id: 'B8', row: 'B', number: 8, status: 'available', type: 'standard', price: 15 },
    { id: 'B9', row: 'B', number: 9, status: 'available', type: 'standard', price: 15 },
    { id: 'B10', row: 'B', number: 10, status: 'available', type: 'standard', price: 15 },
    { id: 'B11', row: 'B', number: 11, status: 'available', type: 'standard', price: 15 },
    { id: 'B12', row: 'B', number: 12, status: 'available', type: 'standard', price: 15 },
    null, // Gap
    null, // Gap
    { id: 'B13', row: 'B', number: 13, status: 'available', type: 'standard', price: 15 },
    { id: 'B14', row: 'B', number: 14, status: 'available', type: 'standard', price: 15 },
  ]

  // Row C: seats 1-2, large gap, seats 3-5, gap, seats 6-7
  const rowCSeats: (Seat | null)[] = [
    { id: 'C1', row: 'C', number: 1, status: 'available', type: 'standard', price: 15 },
    { id: 'C2', row: 'C', number: 2, status: 'available', type: 'standard', price: 15 },
    null, // Gap
    null, // Gap
    null, // Gap
    null, // Gap
    null, // Gap
    null, // Gap
    null, // Gap
    null, // Gap
    null, // Gap
    { id: 'C3', row: 'C', number: 3, status: 'available', type: 'standard', price: 15 },
    { id: 'C4', row: 'C', number: 4, status: 'available', type: 'standard', price: 15 },
    { id: 'C5', row: 'C', number: 5, status: 'available', type: 'standard', price: 15 },
    null, // Gap
    null, // Gap
    null, // Gap
    null, // Gap
    null, // Gap
    { id: 'C6', row: 'C', number: 6, status: 'available', type: 'standard', price: 15 },
    { id: 'C7', row: 'C', number: 7, status: 'available', type: 'standard', price: 15 },
  ]

  // Row D: seats 1-2, gap, seats 3-8, gap, seats 9-14, gap, seats 15-16
  const rowDSeats: (Seat | null)[] = [
    { id: 'D1', row: 'D', number: 1, status: 'available', type: 'standard', price: 15 },
    { id: 'D2', row: 'D', number: 2, status: 'available', type: 'standard', price: 15 },
    null, // Gap
    null, // Gap
    { id: 'D3', row: 'D', number: 3, status: 'available', type: 'standard', price: 15 },
    { id: 'D4', row: 'D', number: 4, status: 'available', type: 'standard', price: 15 },
    { id: 'D5', row: 'D', number: 5, status: 'available', type: 'standard', price: 15 },
    { id: 'D6', row: 'D', number: 6, status: 'available', type: 'standard', price: 15 },
    { id: 'D7', row: 'D', number: 7, status: 'available', type: 'standard', price: 15 },
    { id: 'D8', row: 'D', number: 8, status: 'available', type: 'standard', price: 15 },
    null, // Gap
    null, // Gap
    { id: 'D9', row: 'D', number: 9, status: 'available', type: 'standard', price: 15 },
    { id: 'D10', row: 'D', number: 10, status: 'available', type: 'standard', price: 15 },
    { id: 'D11', row: 'D', number: 11, status: 'available', type: 'standard', price: 15 },
    { id: 'D12', row: 'D', number: 12, status: 'available', type: 'standard', price: 15 },
    { id: 'D13', row: 'D', number: 13, status: 'available', type: 'standard', price: 15 },
    { id: 'D14', row: 'D', number: 14, status: 'available', type: 'standard', price: 15 },
    null, // Gap
    null, // Gap
    { id: 'D15', row: 'D', number: 15, status: 'available', type: 'standard', price: 15 },
    { id: 'D16', row: 'D', number: 16, status: 'available', type: 'standard', price: 15 },
  ]

  // Set some random booked seats (about 10% of total)
  return [
    { name: 'A', seats: setRandomBooked(rowASeats, 4) },
    { name: 'B', seats: setRandomBooked(rowBSeats, 3) },
    { name: 'C', seats: setRandomBooked(rowCSeats, 2) },
    { name: 'D', seats: setRandomBooked(rowDSeats, 3) },
  ]
}

// Generate Hall I layout exactly as shown
function generateHallILayout(): Row[] {
  // Row A: seats 1,2,3, gap, seats 5-11, gap, seats 14-15
  const rowASeats: (Seat | null)[] = [
    { id: 'A1', row: 'A', number: 1, status: 'available', type: 'standard', price: 15 },
    { id: 'A2', row: 'A', number: 2, status: 'available', type: 'standard', price: 15 },
    { id: 'A3', row: 'A', number: 3, status: 'available', type: 'standard', price: 15 },
    null, // Gap
    { id: 'A5', row: 'A', number: 5, status: 'available', type: 'standard', price: 15 },
    { id: 'A6', row: 'A', number: 6, status: 'available', type: 'standard', price: 15 },
    { id: 'A7', row: 'A', number: 7, status: 'available', type: 'standard', price: 15 },
    { id: 'A8', row: 'A', number: 8, status: 'available', type: 'standard', price: 15 },
    { id: 'A9', row: 'A', number: 9, status: 'available', type: 'standard', price: 15 },
    { id: 'A10', row: 'A', number: 10, status: 'available', type: 'standard', price: 15 },
    { id: 'A11', row: 'A', number: 11, status: 'available', type: 'standard', price: 15 },
    null, // Gap
    null, // Gap
    { id: 'A14', row: 'A', number: 14, status: 'available', type: 'standard', price: 15 },
    { id: 'A15', row: 'A', number: 15, status: 'available', type: 'standard', price: 15 },
    null, // Gap
    null, // Gap
  ]

  // Row B: seats 1,2,3, gap, seats 5-11, gap, seats 14-15
  const rowBSeats: (Seat | null)[] = [
    { id: 'B1', row: 'B', number: 1, status: 'available', type: 'standard', price: 15 },
    { id: 'B2', row: 'B', number: 2, status: 'available', type: 'standard', price: 15 },
    { id: 'B3', row: 'B', number: 3, status: 'available', type: 'standard', price: 15 },
    null, // Gap
    { id: 'B5', row: 'B', number: 5, status: 'available', type: 'standard', price: 15 },
    { id: 'B6', row: 'B', number: 6, status: 'available', type: 'standard', price: 15 },
    { id: 'B7', row: 'B', number: 7, status: 'available', type: 'standard', price: 15 },
    { id: 'B8', row: 'B', number: 8, status: 'available', type: 'standard', price: 15 },
    { id: 'B9', row: 'B', number: 9, status: 'available', type: 'standard', price: 15 },
    { id: 'B10', row: 'B', number: 10, status: 'available', type: 'standard', price: 15 },
    { id: 'B11', row: 'B', number: 11, status: 'available', type: 'standard', price: 15 },
    null, // Gap
    null, // Gap
    { id: 'B14', row: 'B', number: 14, status: 'available', type: 'standard', price: 15 },
    { id: 'B15', row: 'B', number: 15, status: 'available', type: 'standard', price: 15 },
  ]

  // Row C: seats 1-5, gap, seats 7-11, gap, seats 13-17
  const rowCSeats: (Seat | null)[] = [
    { id: 'C1', row: 'C', number: 1, status: 'available', type: 'standard', price: 15 },
    { id: 'C2', row: 'C', number: 2, status: 'available', type: 'standard', price: 15 },
    { id: 'C3', row: 'C', number: 3, status: 'available', type: 'standard', price: 15 },
    { id: 'C4', row: 'C', number: 4, status: 'available', type: 'standard', price: 15 },
    { id: 'C5', row: 'C', number: 5, status: 'available', type: 'standard', price: 15 },
    null, // Gap
    { id: 'C7', row: 'C', number: 7, status: 'available', type: 'standard', price: 15 },
    { id: 'C8', row: 'C', number: 8, status: 'available', type: 'standard', price: 15 },
    { id: 'C9', row: 'C', number: 9, status: 'available', type: 'standard', price: 15 },
    { id: 'C10', row: 'C', number: 10, status: 'available', type: 'standard', price: 15 },
    { id: 'C11', row: 'C', number: 11, status: 'available', type: 'standard', price: 15 },
    null, // Gap
    { id: 'C13', row: 'C', number: 13, status: 'available', type: 'standard', price: 15 },
    { id: 'C14', row: 'C', number: 14, status: 'available', type: 'standard', price: 15 },
    { id: 'C15', row: 'C', number: 15, status: 'available', type: 'standard', price: 15 },
    { id: 'C16', row: 'C', number: 16, status: 'available', type: 'standard', price: 15 },
    { id: 'C17', row: 'C', number: 17, status: 'available', type: 'standard', price: 15 },
  ]

  // Row D: seats 1-17 continuously
  const rowDSeats: (Seat | null)[] = []
  for (let i = 1; i <= 17; i++) {
    rowDSeats.push({ id: `D${i}`, row: 'D', number: i, status: 'available', type: 'standard', price: 15 })
  }

  // Row E: seats 1-17 continuously
  const rowESeats: (Seat | null)[] = []
  for (let i = 1; i <= 17; i++) {
    rowESeats.push({ id: `E${i}`, row: 'E', number: i, status: 'available', type: 'standard', price: 15 })
  }

  // Row F: seats 1-18 continuously
  const rowFSeats: (Seat | null)[] = []
  for (let i = 1; i <= 18; i++) {
    rowFSeats.push({ 
      id: `F${i}`, 
      row: 'F', 
      number: i, 
      status: 'available', 
      type: 'vip', 
      price: 25 
    })
  }

  // Row G: seats 1-18 continuously
  const rowGSeats: (Seat | null)[] = []
  for (let i = 1; i <= 18; i++) {
    rowGSeats.push({ 
      id: `G${i}`, 
      row: 'G', 
      number: i, 
      status: 'available', 
      type: 'vip', 
      price: 25 
    })
  }

  // Row H: seats 1-18 continuously
  const rowHSeats: (Seat | null)[] = []
  for (let i = 1; i <= 18; i++) {
    rowHSeats.push({ 
      id: `H${i}`, 
      row: 'H', 
      number: i, 
      status: 'available', 
      type: 'vip', 
      price: 25 
    })
  }

  // Row I: seats 1-18 continuously
  const rowISeats: (Seat | null)[] = []
  for (let i = 1; i <= 18; i++) {
    rowISeats.push({ 
      id: `I${i}`, 
      row: 'I', 
      number: i, 
      status: 'available', 
      type: 'vip', 
      price: 25 
    })
  }

  // Row J: seats 1-18 continuously
  const rowJSeats: (Seat | null)[] = []
  for (let i = 1; i <= 18; i++) {
    rowJSeats.push({ 
      id: `J${i}`, 
      row: 'J', 
      number: i, 
      status: 'available', 
      type: 'vip', 
      price: 25 
    })
  }

  // Row K: seats 1-18 continuously
  const rowKSeats: (Seat | null)[] = []
  for (let i = 1; i <= 18; i++) {
    rowKSeats.push({ 
      id: `K${i}`, 
      row: 'K', 
      number: i, 
      status: 'available', 
      type: 'vip', 
      price: 25 
    })
  }

  // Row L: seats 1-17 continuously
  const rowLSeats: (Seat | null)[] = []
  for (let i = 1; i <= 17; i++) {
    rowLSeats.push({ 
      id: `L${i}`, 
      row: 'L', 
      number: i, 
      status: 'available', 
      type: 'recliner', 
      price: 35 
    })
  }

  // Row M: seats 1-15 continuously
  const rowMSeats: (Seat | null)[] = []
  for (let i = 1; i <= 15; i++) {
    rowMSeats.push({ 
      id: `M${i}`, 
      row: 'M', 
      number: i, 
      status: 'available', 
      type: 'recliner', 
      price: 35 
    })
  }

  // Set some random booked seats (about 15% of total)
  return [
    { name: 'A', seats: setRandomBooked(rowASeats, 3) },
    { name: 'B', seats: setRandomBooked(rowBSeats, 3) },
    { name: 'C', seats: setRandomBooked(rowCSeats, 4) },
    { name: 'D', seats: setRandomBooked(rowDSeats, 5) },
    { name: 'E', seats: setRandomBooked(rowESeats, 5) },
    { name: 'F', seats: setRandomBooked(rowFSeats, 6) },
    { name: 'G', seats: setRandomBooked(rowGSeats, 6) },
    { name: 'H', seats: setRandomBooked(rowHSeats, 6) },
    { name: 'I', seats: setRandomBooked(rowISeats, 6) },
    { name: 'J', seats: setRandomBooked(rowJSeats, 6) },
    { name: 'K', seats: setRandomBooked(rowKSeats, 6) },
    { name: 'L', seats: setRandomBooked(rowLSeats, 4) },
    { name: 'M', seats: setRandomBooked(rowMSeats, 3) },
  ]
}

// Mock data with the exact layouts
const mockTheaters: Theater[] = [
  {
    id: '1',
    name: 'City Cinema',
    screens: [
      {
        id: 's1',
        name: 'Hall I Balcony',
        rows: generateHallIBalconyLayout(),
        totalSeats: 56
      },
      {
        id: 's2',
        name: 'Hall I',
        rows: generateHallILayout(),
        totalSeats: 209
      }
    ]
  }
]

// Seat component with custom images
const SeatComponent = ({ seat, onClick, isSelected }: { seat: Seat; onClick: () => void; isSelected: boolean }) => {
  const getSeatImage = () => {
    if (isSelected) {
      return '/selected.png'
    }
    if (seat.status === 'booked') {
      return '/booked.png'
    }
    return '/available.png'
  }

  const seatImage = getSeatImage()

  return (
    <button
      onClick={onClick}
      disabled={seat.status === 'booked'}
      className={cn(
        "relative w-10 h-10 flex items-center justify-center transition-all duration-200 group",
        isSelected && "ring-2 ring-yellow-400 ring-offset-2 ring-offset-gray-900 rounded-lg",
        seat.status === 'available' && "hover:scale-110"
      )}
      title={`${seat.row}${seat.number} - ${seat.type} - $${seat.price}`}
    >
      <div className="relative w-8 h-8">
        <Image
          src={seatImage}
          alt={`Seat ${seat.row}${seat.number}`}
          width={32}
          height={32}
          className="object-contain"
          onError={(e) => {
            console.error('Failed to load image:', seatImage);
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 border border-yellow-500/30 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
        {seat.row}{seat.number} • {seat.type} • ${seat.price}
      </div>
    </button>
  )
}

export default function SeatMapsPage() {
  const [theaters, setTheaters] = useState<Theater[]>(mockTheaters)
  const [selectedTheater, setSelectedTheater] = useState<string>('1')
  const [selectedScreen, setSelectedScreen] = useState<string>('s2')
  const [zoom, setZoom] = useState(100)
  const [showLegend, setShowLegend] = useState(true)
  const [showGrid, setShowGrid] = useState(false)
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [isEditMode, setIsEditMode] = useState(false)
  const [isAddScreenDialogOpen, setIsAddScreenDialogOpen] = useState(false)
  const [isBulkEditDialogOpen, setIsBulkEditDialogOpen] = useState(false)

  // Get current screen
  const currentTheater = theaters.find(t => t.id === selectedTheater)
  const currentScreen = currentTheater?.screens.find(s => s.id === selectedScreen)

  // Handle seat click
  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'booked') return
    
    if (isEditMode) {
      console.log('Edit seat:', seat)
    } else {
      setSelectedSeats(prev => {
        if (prev.includes(seat.id)) {
          return prev.filter(id => id !== seat.id)
        } else {
          return [...prev, seat.id]
        }
      })
    }
  }

  // Clear all selected seats
  const clearSelectedSeats = () => {
    setSelectedSeats([])
  }

  // Get seat statistics
  const getSeatStats = () => {
    if (!currentScreen) return { total: 0, booked: 0, available: 0, selected: selectedSeats.length }
    
    let booked = 0
    let available = 0
    
    currentScreen.rows.forEach(row => {
      row.seats.forEach(seat => {
        if (seat) {
          if (seat.status === 'booked') booked++
          else if (seat.status === 'available') available++
        }
      })
    })
    
    return {
      total: currentScreen.totalSeats,
      booked,
      available,
      selected: selectedSeats.length
    }
  }

  const stats = getSeatStats()

  // Handle screen change
  const handleScreenChange = (screenId: string) => {
    setSelectedScreen(screenId)
    setSelectedSeats([])
  }

  // Handle zoom
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50))
  const handleZoomReset = () => setZoom(100)

  return (
    <LayoutWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                <Grid3x3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">City Cinema Hall Seating Arrangement</h1>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              className={cn(
                "border-gray-700",
                isEditMode ? "bg-yellow-500/10 border-yellow-500 text-yellow-400" : "text-white"
              )}
              onClick={() => setIsEditMode(!isEditMode)}
            >
              <Settings className="w-4 h-4 mr-2" />
              {isEditMode ? 'Edit Mode' : 'View Mode'}
            </Button>
            
            <Dialog open={isAddScreenDialogOpen} onOpenChange={setIsAddScreenDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Screen
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gradient-to-b from-gray-900 to-black border-yellow-500/30 text-white">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    Add New Screen
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Create a new screen with custom seat layout
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="screen-name" className="text-gray-300">Screen Name</Label>
                    <Input
                      id="screen-name"
                      placeholder="e.g., Screen 4 - Premium"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rows" className="text-gray-300">Number of Rows</Label>
                      <Input
                        id="rows"
                        type="number"
                        min="1"
                        max="26"
                        defaultValue="8"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cols" className="text-gray-300">Seats per Row</Label>
                      <Input
                        id="cols"
                        type="number"
                        min="1"
                        max="20"
                        defaultValue="12"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddScreenDialogOpen(false)}
                    className="border-gray-700 text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                    onClick={() => setIsAddScreenDialogOpen(false)}
                  >
                    Create Screen
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Theater & Screen Selection */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="w-full sm:w-64">
                <Select value={selectedTheater} onValueChange={setSelectedTheater}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select theater" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    {theaters.map(theater => (
                      <SelectItem key={theater.id} value={theater.id}>
                        {theater.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1 flex gap-2 overflow-x-auto pb-2">
                {currentTheater?.screens.map(screen => (
                  <Button
                    key={screen.id}
                    variant="outline"
                    className={cn(
                      "whitespace-nowrap",
                      selectedScreen === screen.id
                        ? "bg-yellow-500/10 border-yellow-500 text-yellow-400"
                        : "border-gray-700 text-gray-400"
                    )}
                    onClick={() => handleScreenChange(screen.id)}
                  >
                    {screen.name}
                    <Badge className="ml-2 bg-gray-800 text-gray-300">
                      {screen.totalSeats} seats
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Controls & Stats */}
          <div className="space-y-6">
            {/* Stats Card */}
            <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white">Seat Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Seats:</span>
                  <span className="text-white font-bold">{stats.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 flex items-center gap-2">
                    <div className="w-4 h-4 relative">
                      <Image src="/booked.png" alt="Booked" width={16} height={16} />
                    </div>
                    Booked:
                  </span>
                  <span className="text-red-400 font-bold">{stats.booked}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 flex items-center gap-2">
                    <div className="w-4 h-4 relative">
                      <Image src="/available.png" alt="Available" width={16} height={16} />
                    </div>
                    Available:
                  </span>
                  <span className="text-green-400 font-bold">{stats.available}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 flex items-center gap-2">
                    <div className="w-4 h-4 relative">
                      <Image src="/selected.png" alt="Selected" width={16} height={16} />
                    </div>
                    Selected:
                  </span>
                  <span className="text-yellow-400 font-bold">{stats.selected}</span>
                </div>

                <Separator className="bg-gray-800" />

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Available to select:</span>
                  <span className="text-green-400 font-bold">{stats.available - stats.selected}</span>
                </div>
              </CardContent>
            </Card>

            {/* Controls Card */}
            <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white">Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Zoom Controls */}
                <div className="space-y-2">
                  <Label className="text-gray-300">Zoom</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleZoomOut}
                      disabled={zoom <= 50}
                      className="border-gray-700"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <span className="flex-1 text-center text-white">{zoom}%</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleZoomIn}
                      disabled={zoom >= 200}
                      className="border-gray-700"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleZoomReset}
                      className="border-gray-700"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* View Options */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Show Legend</Label>
                    <Switch
                      checked={showLegend}
                      onCheckedChange={setShowLegend}
                      className="data-[state=checked]:bg-yellow-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-300">Show Grid</Label>
                    <Switch
                      checked={showGrid}
                      onCheckedChange={setShowGrid}
                      className="data-[state=checked]:bg-yellow-500"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 text-white justify-start"
                    onClick={clearSelectedSeats}
                    disabled={selectedSeats.length === 0}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Clear Selection ({selectedSeats.length})
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-gray-700 text-white justify-start"
                    onClick={() => setIsBulkEditDialogOpen(true)}
                    disabled={!isEditMode}
                  >
                    <Scissors className="w-4 h-4 mr-2" />
                    Bulk Edit
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Legend Card */}
            {showLegend && (
              <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Legend</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 relative">
                      <Image src="/available.png" alt="Available" width={24} height={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Available</p>
                      <p className="text-xs text-gray-400">Click to select</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 relative">
                      <Image src="/selected.png" alt="Selected" width={24} height={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Selected</p>
                      <p className="text-xs text-gray-400">Currently chosen</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 relative">
                      <Image src="/booked.png" alt="Booked" width={24} height={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Booked</p>
                      <p className="text-xs text-gray-400">Already reserved</p>
                    </div>
                  </div>
                  <Separator className="bg-gray-800" />
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gray-700 rounded-sm flex items-center justify-center text-xs text-gray-400">
                      Gap
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Empty Space</p>
                      <p className="text-xs text-gray-400">No seat</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Seat Map Area */}
          <div className="lg:col-span-3">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">
                      {currentScreen?.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {currentScreen?.name === 'Hall I Balcony' ? 'Door →' : ''} Back Side • Total Seat {currentScreen?.totalSeats}
                    </CardDescription>
                  </div>
                  {selectedSeats.length > 0 && (
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-3 py-1">
                      {selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''} selected
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  className="overflow-auto max-h-[600px] p-4 bg-gray-950/50 rounded-lg"
                  style={{ 
                    backgroundImage: showGrid ? 'linear-gradient(#374151 1px, transparent 1px), linear-gradient(90deg, #374151 1px, transparent 1px)' : 'none',
                    backgroundSize: '20px 20px'
                  }}
                >
                  <div 
                    className="inline-block min-w-full transition-transform duration-200"
                    style={{ transform: `scale(${zoom / 100})` }}
                  >
                    {/* Back Side Indicator */}
                    <div className="mb-8 text-center">
                      <div className="w-full h-2 bg-gradient-to-r from-yellow-500/50 via-orange-500 to-yellow-500/50 rounded-full mb-2" />
                      <p className="text-sm font-semibold text-yellow-400">BACK SIDE</p>
                    </div>

                    {/* Door indicator for Balcony */}
                    {currentScreen?.name === 'Hall I Balcony' && (
                      <div className="mb-4 flex justify-start">
                        <Badge variant="outline" className="border-yellow-500/30 text-yellow-400 px-3 py-1">
                          DOOR →
                        </Badge>
                      </div>
                    )}

                    {/* Seat Grid */}
                    <div className="space-y-3">
                      {currentScreen?.rows.map((row) => (
                        <div key={row.name} className="flex items-center gap-3">
                          <div className="w-8 text-center font-bold text-yellow-400 text-lg">
                            {row.name}
                          </div>
                          <div className="flex-1 flex gap-1 flex-wrap">
                            {row.seats.map((seat, index) => (
                              seat ? (
                                <SeatComponent
                                  key={seat.id}
                                  seat={seat}
                                  isSelected={selectedSeats.includes(seat.id)}
                                  onClick={() => handleSeatClick(seat)}
                                />
                              ) : (
                                <div key={`gap-${row.name}-${index}`} className="w-10 h-10" />
                              )
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Front Side Indicator */}
                    <div className="mt-8 text-center">
                      <p className="text-sm font-semibold text-gray-400">FRONT SIDE</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-800 flex justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 relative">
                      <Image src="/available.png" alt="Available" width={12} height={12} />
                    </div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 relative">
                      <Image src="/selected.png" alt="Selected" width={12} height={12} />
                    </div>
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 relative">
                      <Image src="/booked.png" alt="Booked" width={12} height={12} />
                    </div>
                    <span>Booked</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 font-semibold">
                  209 + 56 = 265 Total Seats
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Bulk Edit Dialog */}
        <Dialog open={isBulkEditDialogOpen} onOpenChange={setIsBulkEditDialogOpen}>
          <DialogContent className="bg-gradient-to-b from-gray-900 to-black border-yellow-500/30 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-yellow-400">Bulk Edit Seats</DialogTitle>
              <DialogDescription className="text-gray-400">
                Apply changes to multiple seats at once
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Set Status for All Seats</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="border-gray-700 text-white"
                    onClick={() => {}}
                  >
                    <div className="w-4 h-4 mr-2 relative">
                      <Image src="/available.png" alt="Available" width={16} height={16} />
                    </div>
                    Set Available
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-white"
                    onClick={() => {}}
                  >
                    <div className="w-4 h-4 mr-2 relative">
                      <Image src="/booked.png" alt="Booked" width={16} height={16} />
                    </div>
                    Set Booked
                  </Button>
                </div>
              </div>
              
              <Separator className="bg-gray-800" />
              
              <div className="space-y-2">
                <Label className="text-gray-300">Seat Type</Label>
                <Select defaultValue="standard">
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="standard">Standard ($15)</SelectItem>
                    <SelectItem value="vip">VIP ($25)</SelectItem>
                    <SelectItem value="recliner">Recliner ($35)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsBulkEditDialogOpen(false)}
                className="border-gray-700 text-white"
              >
                Cancel
              </Button>
              <Button
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                onClick={() => setIsBulkEditDialogOpen(false)}
              >
                Apply Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </LayoutWrapper>
  )
}

// Separator component
function Separator({ className }: { className?: string }) {
  return <hr className={cn("border-t border-gray-800", className)} />
}