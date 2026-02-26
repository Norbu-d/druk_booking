// app/admin/theaters/page.tsx
'use client'

import { useState } from 'react'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Building,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  MapPin,
  Users,
  Grid3x3,
  Film,
  Clock,
  DollarSign,
  Wifi,
  Coffee,
  Car,
  Volume2,
  AlertCircle,
  Search
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Types
type Screen = {
  number: number
  name: string
  totalSeats: number
  seatLayout: {
    rows: number
    columns: number
    total: number
  }
  amenities: string[]
}

type Theater = {
  id: string
  name: string
  location: string
  city: string
  contactNumber: string
  email: string
  screens: Screen[]
  totalSeats: number
  facilities: string[]
  status: 'active' | 'maintenance' | 'closed'
  openingTime: string
  closingTime: string
  description: string
  imageUrl: string
}

// Mock data
const mockTheaters: Theater[] = [
  {
    id: '1',
    name: 'City Cinema',
    location: 'Main Street, Downtown',
    city: 'New York',
    contactNumber: '+1 (212) 555-0123',
    email: 'citycinema@example.com',
    screens: [
      {
        number: 1,
        name: 'Screen 1 - IMAX',
        totalSeats: 250,
        seatLayout: { rows: 15, columns: 17, total: 255 },
        amenities: ['IMAX', 'Dolby Atmos', 'Recliner Seats']
      },
      {
        number: 2,
        name: 'Screen 2 - 3D',
        totalSeats: 180,
        seatLayout: { rows: 12, columns: 15, total: 180 },
        amenities: ['3D', 'Dolby Digital', 'Standard Seats']
      },
      {
        number: 3,
        name: 'Screen 3 - Premium',
        totalSeats: 120,
        seatLayout: { rows: 10, columns: 12, total: 120 },
        amenities: ['Premium', 'Dolby Atmos', 'VIP Recliners']
      },
      {
        number: 4,
        name: 'Screen 4 - Standard',
        totalSeats: 150,
        seatLayout: { rows: 10, columns: 15, total: 150 },
        amenities: ['Standard', 'Dolby Digital', 'Standard Seats']
      }
    ],
    totalSeats: 700,
    facilities: ['Parking', 'Cafe', 'Wheelchair Access', 'VIP Lounge', 'Food Court'],
    status: 'active',
    openingTime: '09:00',
    closingTime: '23:00',
    description: 'City Cinema is a premier movie theater located in the heart of downtown. Featuring state-of-the-art IMAX and 3D screens, luxury recliner seats, and a wide selection of snacks and beverages.',
    imageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: '2',
    name: 'Main Cinema Hall',
    location: '123 Broadway Ave',
    city: 'Los Angeles',
    contactNumber: '+1 (213) 555-0456',
    email: 'maincinema@example.com',
    screens: [
      {
        number: 1,
        name: 'Screen 1',
        totalSeats: 120,
        seatLayout: { rows: 10, columns: 12, total: 120 },
        amenities: ['Standard', 'Dolby Digital']
      },
      {
        number: 2,
        name: 'Screen 2',
        totalSeats: 80,
        seatLayout: { rows: 8, columns: 10, total: 80 },
        amenities: ['Standard', 'Dolby Digital']
      },
      {
        number: 3,
        name: 'Screen 3',
        totalSeats: 60,
        seatLayout: { rows: 6, columns: 10, total: 60 },
        amenities: ['Standard', 'Dolby Digital']
      }
    ],
    totalSeats: 260,
    facilities: ['Parking', 'Cafe', 'Wheelchair Access'],
    status: 'active',
    openingTime: '10:00',
    closingTime: '22:00',
    description: 'Main Cinema Hall offers a classic movie experience with three screens showing the latest blockbusters.',
    imageUrl: ''
  },
  {
    id: '3',
    name: 'IMAX Theater',
    location: '456 Sunset Blvd',
    city: 'Los Angeles',
    contactNumber: '+1 (310) 555-0789',
    email: 'imax@example.com',
    screens: [
      {
        number: 1,
        name: 'IMAX Screen',
        totalSeats: 200,
        seatLayout: { rows: 12, columns: 17, total: 204 },
        amenities: ['IMAX', 'Dolby Atmos', 'Laser Projection']
      },
      {
        number: 2,
        name: 'Screen 2',
        totalSeats: 150,
        seatLayout: { rows: 10, columns: 15, total: 150 },
        amenities: ['Standard', 'Dolby Digital']
      }
    ],
    totalSeats: 350,
    facilities: ['Parking', 'Cafe', 'VIP Lounge', 'Valet Parking'],
    status: 'maintenance',
    openingTime: '11:00',
    closingTime: '23:00',
    description: 'Experience movies like never before on our giant IMAX screen with crystal-clear laser projection.',
    imageUrl: ''
  },
  {
    id: '4',
    name: 'VIP Lounge',
    location: '789 Rodeo Drive',
    city: 'Beverly Hills',
    contactNumber: '+1 (424) 555-0123',
    email: 'viplounge@example.com',
    screens: [
      {
        number: 1,
        name: 'VIP Screen',
        totalSeats: 40,
        seatLayout: { rows: 5, columns: 8, total: 40 },
        amenities: ['VIP Recliners', 'Dolby Atmos', 'Waiter Service']
      }
    ],
    totalSeats: 40,
    facilities: ['Valet Parking', 'Full Bar', 'Gourmet Food', 'Private Lounge'],
    status: 'active',
    openingTime: '12:00',
    closingTime: '02:00',
    description: 'Luxury cinema experience with fully reclining leather seats, gourmet food and drinks delivered to your seat.',
    imageUrl: ''
  }
]

// Available facilities options
const facilityOptions = [
  'Parking',
  'Cafe',
  'Wheelchair Access',
  'VIP Lounge',
  'Food Court',
  'Valet Parking',
  'Full Bar',
  'Gourmet Food',
  'Private Lounge',
  'Kids Area',
  'Arcade',
  'ATM'
]

// Available amenities options
const amenityOptions = [
  'IMAX',
  '3D',
  'Dolby Atmos',
  'Dolby Digital',
  'Recliner Seats',
  'VIP Recliners',
  'Standard Seats',
  'Laser Projection',
  'Waiter Service'
]

export default function TheatersPage() {
  const [theaters, setTheaters] = useState<Theater[]>(mockTheaters)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewScreensDialogOpen, setIsViewScreensDialogOpen] = useState(false)
  const [selectedTheater, setSelectedTheater] = useState<Theater | null>(null)
  const [expandedScreen, setExpandedScreen] = useState<number | null>(null)

  // New theater form state
  const [newTheater, setNewTheater] = useState<Partial<Theater>>({
    name: '',
    location: '',
    city: '',
    contactNumber: '',
    email: '',
    screens: [],
    facilities: [],
    status: 'active',
    openingTime: '09:00',
    closingTime: '23:00',
    description: '',
    imageUrl: ''
  })

  // New screen form state
  const [newScreen, setNewScreen] = useState<Partial<Screen>>({
    number: 1,
    name: '',
    totalSeats: 0,
    seatLayout: { rows: 0, columns: 0, total: 0 },
    amenities: []
  })
  const [showAddScreen, setShowAddScreen] = useState(false)

  // Filter theaters based on search and status
  const filteredTheaters = theaters.filter(theater => {
    const matchesSearch = theater.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         theater.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         theater.city.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || theater.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Count theaters by status
  const theaterCounts = {
    all: theaters.length,
    active: theaters.filter(t => t.status === 'active').length,
    maintenance: theaters.filter(t => t.status === 'maintenance').length,
    closed: theaters.filter(t => t.status === 'closed').length,
  }

  // Handle add theater
  const handleAddTheater = () => {
    const theaterToAdd: Theater = {
      id: Date.now().toString(),
      name: newTheater.name || 'New Theater',
      location: newTheater.location || '',
      city: newTheater.city || '',
      contactNumber: newTheater.contactNumber || '',
      email: newTheater.email || '',
      screens: newTheater.screens || [],
      totalSeats: (newTheater.screens || []).reduce((acc, screen) => acc + (screen.totalSeats || 0), 0),
      facilities: newTheater.facilities || [],
      status: newTheater.status as 'active' | 'maintenance' | 'closed' || 'active',
      openingTime: newTheater.openingTime || '09:00',
      closingTime: newTheater.closingTime || '23:00',
      description: newTheater.description || '',
      imageUrl: newTheater.imageUrl || ''
    }
    
    setTheaters([...theaters, theaterToAdd])
    setIsAddDialogOpen(false)
    setNewTheater({
      name: '',
      location: '',
      city: '',
      contactNumber: '',
      email: '',
      screens: [],
      facilities: [],
      status: 'active',
      openingTime: '09:00',
      closingTime: '23:00',
      description: '',
      imageUrl: ''
    })
  }

  // Handle edit theater
  const handleEditTheater = () => {
    if (!selectedTheater) return
    setTheaters(theaters.map(t => 
      t.id === selectedTheater.id ? selectedTheater : t
    ))
    setIsEditDialogOpen(false)
    setSelectedTheater(null)
  }

  // Handle delete theater
  const handleDeleteTheater = () => {
    if (!selectedTheater) return
    setTheaters(theaters.filter(t => t.id !== selectedTheater.id))
    setIsDeleteDialogOpen(false)
    setSelectedTheater(null)
  }

  // Handle add screen to new theater
  const handleAddScreen = () => {
    if (!newScreen.name || !newScreen.totalSeats) return
    
    const screenToAdd: Screen = {
      number: newScreen.number || (newTheater.screens?.length || 0) + 1,
      name: newScreen.name,
      totalSeats: newScreen.totalSeats,
      seatLayout: newScreen.seatLayout || { rows: 0, columns: 0, total: newScreen.totalSeats },
      amenities: newScreen.amenities || []
    }
    
    setNewTheater({
      ...newTheater,
      screens: [...(newTheater.screens || []), screenToAdd]
    })
    
    setNewScreen({
      number: (newTheater.screens?.length || 0) + 2,
      name: '',
      totalSeats: 0,
      seatLayout: { rows: 0, columns: 0, total: 0 },
      amenities: []
    })
    setShowAddScreen(false)
  }

  // Handle remove screen from new theater
  const handleRemoveScreen = (screenNumber: number) => {
    setNewTheater({
      ...newTheater,
      screens: (newTheater.screens || []).filter(s => s.number !== screenNumber)
    })
  }

  // Toggle facility selection
  const toggleFacility = (facility: string) => {
    const currentFacilities = newTheater.facilities || []
    if (currentFacilities.includes(facility)) {
      setNewTheater({
        ...newTheater,
        facilities: currentFacilities.filter(f => f !== facility)
      })
    } else {
      setNewTheater({
        ...newTheater,
        facilities: [...currentFacilities, facility]
      })
    }
  }

  // Toggle amenity selection for screen
  const toggleAmenity = (amenity: string) => {
    const currentAmenities = newScreen.amenities || []
    if (currentAmenities.includes(amenity)) {
      setNewScreen({
        ...newScreen,
        amenities: currentAmenities.filter(a => a !== amenity)
      })
    } else {
      setNewScreen({
        ...newScreen,
        amenities: [...currentAmenities, amenity]
      })
    }
  }

  // Get status color
  const getStatusColor = (status: Theater['status']) => {
    switch (status) {
      case 'active':
        return 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30'
      case 'maintenance':
        return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30'
      case 'closed':
        return 'bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-400 border-red-500/30'
    }
  }

  // Get status text
  const getStatusText = (status: Theater['status']) => {
    switch (status) {
      case 'active':
        return 'Active'
      case 'maintenance':
        return 'Maintenance'
      case 'closed':
        return 'Closed'
    }
  }

  return (
    <LayoutWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Theater Management</h1>
                <p className="text-gray-400">Manage your theaters, screens, and facilities</p>
              </div>
            </div>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                Add Theater
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gradient-to-b from-gray-900 to-black border-yellow-500/30 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Add New Theater
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Fill in the details for the new theater
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-yellow-400">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-300">Theater Name</Label>
                      <Input
                        id="name"
                        value={newTheater.name}
                        onChange={(e) => setNewTheater({...newTheater, name: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                        placeholder="e.g., City Cinema"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="city" className="text-gray-300">City</Label>
                      <Input
                        id="city"
                        value={newTheater.city}
                        onChange={(e) => setNewTheater({...newTheater, city: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                        placeholder="e.g., New York"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor="location" className="text-gray-300">Location/Address</Label>
                      <Input
                        id="location"
                        value={newTheater.location}
                        onChange={(e) => setNewTheater({...newTheater, location: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                        placeholder="e.g., Main Street, Downtown"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="contact" className="text-gray-300">Contact Number</Label>
                      <Input
                        id="contact"
                        value={newTheater.contactNumber}
                        onChange={(e) => setNewTheater({...newTheater, contactNumber: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                        placeholder="e.g., +1 (212) 555-0123"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-gray-300">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newTheater.email}
                        onChange={(e) => setNewTheater({...newTheater, email: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                        placeholder="e.g., theater@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-yellow-400">Operating Hours</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="openingTime" className="text-gray-300">Opening Time</Label>
                      <Input
                        id="openingTime"
                        type="time"
                        value={newTheater.openingTime}
                        onChange={(e) => setNewTheater({...newTheater, openingTime: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="closingTime" className="text-gray-300">Closing Time</Label>
                      <Input
                        id="closingTime"
                        type="time"
                        value={newTheater.closingTime}
                        onChange={(e) => setNewTheater({...newTheater, closingTime: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-yellow-400">Status</h3>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "border-gray-700",
                        newTheater.status === 'active' && "bg-green-500/20 border-green-500 text-green-400"
                      )}
                      onClick={() => setNewTheater({...newTheater, status: 'active'})}
                    >
                      Active
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "border-gray-700",
                        newTheater.status === 'maintenance' && "bg-yellow-500/20 border-yellow-500 text-yellow-400"
                      )}
                      onClick={() => setNewTheater({...newTheater, status: 'maintenance'})}
                    >
                      Maintenance
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "border-gray-700",
                        newTheater.status === 'closed' && "bg-red-500/20 border-red-500 text-red-400"
                      )}
                      onClick={() => setNewTheater({...newTheater, status: 'closed'})}
                    >
                      Closed
                    </Button>
                  </div>
                </div>

                {/* Screens */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-yellow-400">Screens</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAddScreen(true)}
                      className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Screen
                    </Button>
                  </div>

                  {/* List of added screens */}
                  {newTheater.screens && newTheater.screens.length > 0 && (
                    <div className="space-y-2">
                      {newTheater.screens.map((screen) => (
                        <div key={screen.number} className="flex items-center justify-between p-3 bg-gray-800/50 border border-gray-700 rounded-lg">
                          <div>
                            <p className="font-medium text-white">{screen.name}</p>
                            <p className="text-sm text-gray-400">
                              Screen {screen.number} • {screen.totalSeats} seats
                            </p>
                            <div className="flex gap-1 mt-1">
                              {screen.amenities?.map((a, i) => (
                                <Badge key={i} className="text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/30">
                                  {a}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveScreen(screen.number)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add screen form */}
                  {showAddScreen && (
                    <div className="p-4 bg-gray-800/30 border border-yellow-500/30 rounded-lg space-y-4">
                      <h4 className="font-medium text-yellow-400">New Screen</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="screenName" className="text-gray-300">Screen Name</Label>
                          <Input
                            id="screenName"
                            value={newScreen.name}
                            onChange={(e) => setNewScreen({...newScreen, name: e.target.value})}
                            className="bg-gray-800 border-gray-700 text-white"
                            placeholder="e.g., Screen 1 - IMAX"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="screenNumber" className="text-gray-300">Screen Number</Label>
                          <Input
                            id="screenNumber"
                            type="number"
                            value={newScreen.number}
                            onChange={(e) => setNewScreen({...newScreen, number: parseInt(e.target.value)})}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="totalSeats" className="text-gray-300">Total Seats</Label>
                          <Input
                            id="totalSeats"
                            type="number"
                            value={newScreen.totalSeats}
                            onChange={(e) => setNewScreen({...newScreen, totalSeats: parseInt(e.target.value)})}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="rows" className="text-gray-300">Rows</Label>
                          <Input
                            id="rows"
                            type="number"
                            value={newScreen.seatLayout?.rows}
                            onChange={(e) => setNewScreen({
                              ...newScreen, 
                              seatLayout: {
                                ...newScreen.seatLayout!,
                                rows: parseInt(e.target.value)
                              }
                            })}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="columns" className="text-gray-300">Columns</Label>
                          <Input
                            id="columns"
                            type="number"
                            value={newScreen.seatLayout?.columns}
                            onChange={(e) => setNewScreen({
                              ...newScreen, 
                              seatLayout: {
                                ...newScreen.seatLayout!,
                                columns: parseInt(e.target.value)
                              }
                            })}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                      </div>

                      {/* Amenities */}
                      <div>
                        <Label className="text-gray-300">Amenities</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {amenityOptions.map((amenity) => (
                            <Badge
                              key={amenity}
                              className={cn(
                                "cursor-pointer",
                                newScreen.amenities?.includes(amenity)
                                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                  : "bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700"
                              )}
                              onClick={() => toggleAmenity(amenity)}
                            >
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowAddScreen(false)}
                          className="border-gray-700 text-white"
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleAddScreen}
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                        >
                          Add Screen
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Facilities */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-yellow-400">Facilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {facilityOptions.map((facility) => (
                      <Badge
                        key={facility}
                        className={cn(
                          "cursor-pointer px-3 py-2",
                          newTheater.facilities?.includes(facility)
                            ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            : "bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700"
                        )}
                        onClick={() => toggleFacility(facility)}
                      >
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-yellow-400">Description</h3>
                  <Textarea
                    value={newTheater.description}
                    onChange={(e) => setNewTheater({...newTheater, description: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500 min-h-[100px]"
                    placeholder="Enter theater description"
                  />
                </div>

                {/* Image URL */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-yellow-400">Image URL (Optional)</h3>
                  <Input
                    value={newTheater.imageUrl}
                    onChange={(e) => setNewTheater({...newTheater, imageUrl: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                    placeholder="https://example.com/theater-image.jpg"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  className="border-gray-700 text-white hover:bg-gray-800 hover:border-yellow-500/50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddTheater}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                >
                  Add Theater
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by theater name, location, or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="all">All Theaters</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              
              {searchTerm && (
                <Button
                  variant="ghost"
                  onClick={() => setSearchTerm('')}
                  className="text-gray-400 hover:text-white"
                >
                  Clear
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Theaters
              </CardTitle>
              <Building className="w-4 h-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{theaterCounts.all}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Active Theaters
              </CardTitle>
              <Users className="w-4 h-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{theaterCounts.active}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Screens
              </CardTitle>
              <Grid3x3 className="w-4 h-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {theaters.reduce((acc, t) => acc + t.screens.length, 0)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-orange-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Seats
              </CardTitle>
              <Users className="w-4 h-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {theaters.reduce((acc, t) => acc + t.totalSeats, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Theaters Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTheaters.length === 0 ? (
            <Card className="col-span-2 bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="w-12 h-12 text-gray-600 mb-3" />
                <p className="text-lg font-medium text-white">No theaters found</p>
                <p className="text-sm text-gray-400">Try adjusting your search or filter</p>
              </CardContent>
            </Card>
          ) : (
            filteredTheaters.map((theater) => (
              <Card key={theater.id} className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20 overflow-hidden group hover:border-yellow-500/40 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {theater.imageUrl ? (
                        <div className="w-16 h-16 rounded-lg overflow-hidden">
                          <img 
                            src={theater.imageUrl} 
                            alt={theater.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg flex items-center justify-center">
                          <Building className="w-8 h-8 text-yellow-400" />
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-white text-xl">{theater.name}</CardTitle>
                        <CardDescription className="text-gray-400 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {theater.location}, {theater.city}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={cn("px-3 py-1", getStatusColor(theater.status))}>
                      {getStatusText(theater.status)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Contact Info */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-400">Contact:</div>
                    <div className="text-white">{theater.contactNumber}</div>
                    <div className="text-gray-400">Email:</div>
                    <div className="text-white truncate">{theater.email}</div>
                    <div className="text-gray-400">Hours:</div>
                    <div className="text-white">{theater.openingTime} - {theater.closingTime}</div>
                  </div>

                  {/* Screens Summary */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-yellow-400">Screens ({theater.screens.length})</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10"
                        onClick={() => {
                          setSelectedTheater(theater)
                          setIsViewScreensDialogOpen(true)
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {theater.screens.slice(0, 3).map((screen) => (
                        <Badge key={screen.number} variant="outline" className="border-gray-700 text-gray-300">
                          Screen {screen.number}
                        </Badge>
                      ))}
                      {theater.screens.length > 3 && (
                        <Badge variant="outline" className="border-gray-700 text-gray-300">
                          +{theater.screens.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Facilities */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Facilities</h4>
                    <div className="flex flex-wrap gap-2">
                      {theater.facilities.slice(0, 4).map((facility, index) => (
                        <Badge key={index} className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30">
                          {facility}
                        </Badge>
                      ))}
                      {theater.facilities.length > 4 && (
                        <Badge className="bg-gray-800 text-gray-400 border-gray-700">
                          +{theater.facilities.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10"
                      onClick={() => {
                        setSelectedTheater(theater)
                        setIsEditDialogOpen(true)
                      }}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      onClick={() => {
                        setSelectedTheater(theater)
                        setIsDeleteDialogOpen(true)
                      }}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* View Screens Dialog */}
      <Dialog open={isViewScreensDialogOpen} onOpenChange={setIsViewScreensDialogOpen}>
        <DialogContent className="bg-gradient-to-b from-gray-900 to-black border-yellow-500/30 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {selectedTheater?.name} - Screens
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Detailed view of all screens in this theater
            </DialogDescription>
          </DialogHeader>
          
          {selectedTheater && (
            <div className="space-y-4 py-4">
              {selectedTheater.screens.map((screen) => (
                <Card key={screen.number} className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white">{screen.name}</CardTitle>
                        <CardDescription className="text-gray-400">
                          Screen {screen.number}
                        </CardDescription>
                      </div>
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        {screen.totalSeats} Seats
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Seat Layout</p>
                        <p className="text-white">{screen.seatLayout.rows} rows × {screen.seatLayout.columns} columns</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Total Seats</p>
                        <p className="text-white">{screen.seatLayout.total}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-400 mb-2">Amenities</p>
                        <div className="flex flex-wrap gap-2">
                          {screen.amenities.map((amenity, index) => (
                            <Badge key={index} className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          <DialogFooter>
            <Button
              onClick={() => setIsViewScreensDialogOpen(false)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gradient-to-b from-gray-900 to-black border-orange-500/30 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Edit Theater
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Modify theater details
            </DialogDescription>
          </DialogHeader>
          
          {selectedTheater && (
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="edit-name" className="text-gray-300">Theater Name</Label>
                <Input
                  id="edit-name"
                  value={selectedTheater.name}
                  onChange={(e) => setSelectedTheater({...selectedTheater, name: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-location" className="text-gray-300">Location</Label>
                <Input
                  id="edit-location"
                  value={selectedTheater.location}
                  onChange={(e) => setSelectedTheater({...selectedTheater, location: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-status" className="text-gray-300">Status</Label>
                <Select
                  value={selectedTheater.status}
                  onValueChange={(value: any) => setSelectedTheater({...selectedTheater, status: value})}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="border-gray-700 text-white hover:bg-gray-800 hover:border-yellow-500/50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditTheater}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-gradient-to-b from-gray-900 to-black border-red-500/30 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-400">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete this theater? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedTheater && (
            <div className="py-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
                  <Building className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{selectedTheater.name}</p>
                  <p className="text-sm text-gray-400">{selectedTheater.location}, {selectedTheater.city}</p>
                  <p className="text-xs text-gray-500">{selectedTheater.screens.length} screens • {selectedTheater.totalSeats} seats</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-gray-700 text-white hover:bg-gray-800 hover:border-yellow-500/50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteTheater}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
            >
              Delete Theater
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </LayoutWrapper>
  )
}