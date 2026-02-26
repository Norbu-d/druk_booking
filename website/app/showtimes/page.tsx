// app/admin/showtimes/page.tsx
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
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import {
  Clock,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Calendar as CalendarIcon,
  Film,
  Building,
  Users,
  DollarSign,
  Copy,
  PlayCircle,
  PauseCircle,
  AlertCircle,
  Search // Add this line
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Types
type Showtime = {
  id: string
  movieId: string
  movieName: string
  theaterId: string
  theaterName: string
  screenNumber: number
  date: Date
  startTime: string
  endTime: string
  price: number
  availableSeats: number
  totalSeats: number
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled'
  bookingCount: number
}

type Movie = {
  id: string
  name: string
  duration: number
}

type Theater = {
  id: string
  name: string
  screens: {
    number: number
    totalSeats: number
  }[]
}

// Mock data
const mockMovies: Movie[] = [
  { id: '1', name: 'Dobchu', duration: 120 },
  { id: '2', name: 'Karma', duration: 135 },
  { id: '3', name: 'The Last Dragon', duration: 148 },
  { id: '4', name: 'Midnight Shadows', duration: 118 },
  { id: '5', name: 'Ocean\'s Whisper', duration: 155 },
]

const mockTheaters: Theater[] = [
  { 
    id: '1', 
    name: 'Main Cinema Hall',
    screens: [
      { number: 1, totalSeats: 120 },
      { number: 2, totalSeats: 80 },
      { number: 3, totalSeats: 60 },
    ]
  },
  { 
    id: '2', 
    name: 'IMAX Theater',
    screens: [
      { number: 1, totalSeats: 200 },
      { number: 2, totalSeats: 150 },
    ]
  },
  { 
    id: '3', 
    name: 'VIP Lounge',
    screens: [
      { number: 1, totalSeats: 40 },
    ]
  },
]

const mockShowtimes: Showtime[] = [
  {
    id: '1',
    movieId: '1',
    movieName: 'Dobchu',
    theaterId: '1',
    theaterName: 'Main Cinema Hall',
    screenNumber: 1,
    date: new Date(2025, 1, 20),
    startTime: '10:30',
    endTime: '12:30',
    price: 12.50,
    availableSeats: 45,
    totalSeats: 120,
    status: 'scheduled',
    bookingCount: 75
  },
  {
    id: '2',
    movieId: '2',
    movieName: 'Karma',
    theaterId: '1',
    theaterName: 'Main Cinema Hall',
    screenNumber: 2,
    date: new Date(2025, 1, 20),
    startTime: '14:00',
    endTime: '16:15',
    price: 15.00,
    availableSeats: 12,
    totalSeats: 80,
    status: 'scheduled',
    bookingCount: 68
  },
  {
    id: '3',
    movieId: '3',
    movieName: 'The Last Dragon',
    theaterId: '2',
    theaterName: 'IMAX Theater',
    screenNumber: 1,
    date: new Date(2025, 1, 20),
    startTime: '19:30',
    endTime: '21:58',
    price: 18.50,
    availableSeats: 150,
    totalSeats: 200,
    status: 'scheduled',
    bookingCount: 50
  },
  {
    id: '4',
    movieId: '4',
    movieName: 'Midnight Shadows',
    theaterId: '3',
    theaterName: 'VIP Lounge',
    screenNumber: 1,
    date: new Date(2025, 1, 21),
    startTime: '21:00',
    endTime: '22:58',
    price: 25.00,
    availableSeats: 8,
    totalSeats: 40,
    status: 'scheduled',
    bookingCount: 32
  },
  {
    id: '5',
    movieId: '5',
    movieName: 'Ocean\'s Whisper',
    theaterId: '2',
    theaterName: 'IMAX Theater',
    screenNumber: 2,
    date: new Date(2025, 1, 22),
    startTime: '16:30',
    endTime: '19:05',
    price: 16.00,
    availableSeats: 0,
    totalSeats: 150,
    status: 'cancelled',
    bookingCount: 0
  },
]

export default function ShowtimesPage() {
  const [showtimes, setShowtimes] = useState<Showtime[]>(mockShowtimes)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isBulkAddDialogOpen, setIsBulkAddDialogOpen] = useState(false)
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null)
  const [selectedMovie, setSelectedMovie] = useState<string>('')
  const [selectedTheater, setSelectedTheater] = useState<string>('')
  const [selectedScreen, setSelectedScreen] = useState<string>('')
  const [startTime, setStartTime] = useState('10:00')
  const [price, setPrice] = useState('15.00')

  // New showtime form state
  const [newShowtime, setNewShowtime] = useState<Partial<Showtime>>({
    movieId: '',
    theaterId: '',
    screenNumber: 1,
    date: new Date(),
    startTime: '10:00',
    price: 15,
    status: 'scheduled'
  })

  // Filter showtimes based on search and date
  const filteredShowtimes = showtimes.filter(showtime => {
    const matchesSearch = showtime.movieName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         showtime.theaterName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDate = selectedDate ? 
      format(showtime.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') : true
    return matchesSearch && matchesDate
  })

  // Get available screens for selected theater
  const getAvailableScreens = () => {
    const theater = mockTheaters.find(t => t.id === selectedTheater)
    return theater?.screens || []
  }

  // Calculate end time based on selected movie and start time
  const calculateEndTime = (movieId: string, start: string) => {
    const movie = mockMovies.find(m => m.id === movieId)
    if (!movie) return ''
    
    const [hours, minutes] = start.split(':').map(Number)
    const totalMinutes = hours * 60 + minutes + movie.duration
    const endHours = Math.floor(totalMinutes / 60) % 24
    const endMinutes = totalMinutes % 60
    return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`
  }

  // Handle add showtime
  const handleAddShowtime = () => {
    const movie = mockMovies.find(m => m.id === newShowtime.movieId)
    const theater = mockTheaters.find(t => t.id === newShowtime.theaterId)
    const screen = theater?.screens.find(s => s.number === newShowtime.screenNumber)
    
    if (!movie || !theater || !screen) return

    const showtimeToAdd: Showtime = {
      id: Date.now().toString(),
      movieId: newShowtime.movieId || '',
      movieName: movie.name,
      theaterId: newShowtime.theaterId || '',
      theaterName: theater.name,
      screenNumber: newShowtime.screenNumber || 1,
      date: newShowtime.date || new Date(),
      startTime: newShowtime.startTime || '10:00',
      endTime: calculateEndTime(newShowtime.movieId || '', newShowtime.startTime || '10:00'),
      price: newShowtime.price || 15,
      availableSeats: screen.totalSeats,
      totalSeats: screen.totalSeats,
      status: 'scheduled',
      bookingCount: 0
    }
    
    setShowtimes([...showtimes, showtimeToAdd])
    setIsAddDialogOpen(false)
    setNewShowtime({
      movieId: '',
      theaterId: '',
      screenNumber: 1,
      date: new Date(),
      startTime: '10:00',
      price: 15,
      status: 'scheduled'
    })
  }

  // Handle edit showtime
  const handleEditShowtime = () => {
    if (!selectedShowtime) return
    setShowtimes(showtimes.map(s => 
      s.id === selectedShowtime.id ? selectedShowtime : s
    ))
    setIsEditDialogOpen(false)
    setSelectedShowtime(null)
  }

  // Handle delete showtime
  const handleDeleteShowtime = () => {
    if (!selectedShowtime) return
    setShowtimes(showtimes.filter(s => s.id !== selectedShowtime.id))
    setIsDeleteDialogOpen(false)
    setSelectedShowtime(null)
  }

  // Get status color
  const getStatusColor = (status: Showtime['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-gradient-to-r from-yellow-500/20 to-green-500/20 text-yellow-400 border-yellow-500/30'
      case 'ongoing':
        return 'bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-400 border-green-500/30'
      case 'completed':
        return 'bg-gradient-to-r from-gray-500/20 to-blue-500/20 text-gray-400 border-gray-500/30'
      case 'cancelled':
        return 'bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-400 border-red-500/30'
    }
  }

  // Get status text
  const getStatusText = (status: Showtime['status']) => {
    switch (status) {
      case 'scheduled':
        return 'Scheduled'
      case 'ongoing':
        return 'Ongoing'
      case 'completed':
        return 'Completed'
      case 'cancelled':
        return 'Cancelled'
    }
  }

  // Format time
  const formatTime = (time: string) => {
    return time
  }

  // Get occupancy percentage
  const getOccupancyPercentage = (available: number, total: number) => {
    return Math.round(((total - available) / total) * 100)
  }

  return (
    <LayoutWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Showtime Management</h1>
                <p className="text-gray-400">Schedule and manage movie showtimes across all theaters</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Dialog open={isBulkAddDialogOpen} onOpenChange={setIsBulkAddDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline"
                  className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Bulk Schedule
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gradient-to-b from-gray-900 to-black border-yellow-500/30 text-white">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    Bulk Schedule Showtimes
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Schedule multiple showtimes at once for a movie
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                  <p className="text-center text-gray-300">Coming soon! This feature is under development.</p>
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => setIsBulkAddDialogOpen(false)}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                  >
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Showtime
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gradient-to-b from-gray-900 to-black border-yellow-500/30 text-white max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    Add New Showtime
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Schedule a new movie showtime
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="movie" className="text-gray-300">Movie</Label>
                      <Select
                        value={newShowtime.movieId}
                        onValueChange={(value) => setNewShowtime({...newShowtime, movieId: value})}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select movie" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          {mockMovies.map((movie) => (
                            <SelectItem key={movie.id} value={movie.id}>
                              {movie.name} ({movie.duration} min)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="theater" className="text-gray-300">Theater</Label>
                      <Select
                        value={newShowtime.theaterId}
                        onValueChange={(value) => {
                          setNewShowtime({...newShowtime, theaterId: value, screenNumber: 1})
                          setSelectedTheater(value)
                        }}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select theater" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          {mockTheaters.map((theater) => (
                            <SelectItem key={theater.id} value={theater.id}>
                              {theater.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="screen" className="text-gray-300">Screen</Label>
                      <Select
                        value={newShowtime.screenNumber?.toString()}
                        onValueChange={(value) => setNewShowtime({...newShowtime, screenNumber: parseInt(value)})}
                        disabled={!newShowtime.theaterId}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select screen" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          {getAvailableScreens().map((screen) => (
                            <SelectItem key={screen.number} value={screen.number.toString()}>
                              Screen {screen.number} ({screen.totalSeats} seats)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-300">Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal bg-gray-800 border-gray-700 text-white hover:bg-gray-700",
                              !newShowtime.date && "text-gray-400"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newShowtime.date ? format(newShowtime.date, 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                          <Calendar
                            mode="single"
                            selected={newShowtime.date}
                            onSelect={(date) => setNewShowtime({...newShowtime, date})}
                            initialFocus
                            className="bg-gray-800 text-white"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <Label htmlFor="startTime" className="text-gray-300">Start Time</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={newShowtime.startTime}
                        onChange={(e) => setNewShowtime({...newShowtime, startTime: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="price" className="text-gray-300">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.50"
                        value={newShowtime.price}
                        onChange={(e) => setNewShowtime({...newShowtime, price: parseFloat(e.target.value)})}
                        className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                      />
                    </div>
                  </div>
                  
                  {newShowtime.movieId && newShowtime.startTime && (
                    <div className="md:col-span-2">
                      <div className="bg-gray-800/50 border border-yellow-500/30 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-400">End Time</p>
                            <p className="text-xl font-bold text-yellow-400">
                              {calculateEndTime(newShowtime.movieId, newShowtime.startTime)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Duration</p>
                            <p className="text-xl font-bold text-white">
                              {mockMovies.find(m => m.id === newShowtime.movieId)?.duration} min
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Total Seats</p>
                            <p className="text-xl font-bold text-white">
                              {getAvailableScreens().find(s => s.number === newShowtime.screenNumber)?.totalSeats || 0}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
                    onClick={handleAddShowtime}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                  >
                    Schedule Showtime
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by movie or theater..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                />
              </div>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full sm:w-[240px] justify-start text-left font-normal border-gray-700 text-white hover:bg-gray-800",
                      !selectedDate && "text-gray-400"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    className="bg-gray-800 text-white"
                  />
                </PopoverContent>
              </Popover>
              
              {selectedDate && (
                <Button
                  variant="ghost"
                  onClick={() => setSelectedDate(undefined)}
                  className="text-gray-400 hover:text-white"
                >
                  Clear Date
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
                Today's Showtimes
              </CardTitle>
              <Clock className="w-4 h-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {showtimes.filter(s => format(s.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')).length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-orange-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Seats Available
              </CardTitle>
              <Users className="w-4 h-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {showtimes.reduce((acc, s) => acc + s.availableSeats, 0)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-600/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Occupancy Rate
              </CardTitle>
              <PlayCircle className="w-4 h-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {Math.round((showtimes.reduce((acc, s) => acc + (s.totalSeats - s.availableSeats), 0) / 
                  showtimes.reduce((acc, s) => acc + s.totalSeats, 0)) * 100)}%
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-orange-600/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Revenue
              </CardTitle>
              <DollarSign className="w-4 h-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${showtimes.reduce((acc, s) => acc + (s.bookingCount * s.price), 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Showtimes Table */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-white">Showtimes Schedule</CardTitle>
            <CardDescription className="text-gray-400">
              {selectedDate ? `Showtimes for ${format(selectedDate, 'MMMM d, yyyy')}` : 'All upcoming showtimes'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-800 hover:bg-transparent">
                    <TableHead className="text-gray-300 font-medium">Movie</TableHead>
                    <TableHead className="text-gray-300 font-medium">Theater</TableHead>
                    <TableHead className="text-gray-300 font-medium">Screen</TableHead>
                    <TableHead className="text-gray-300 font-medium">Date</TableHead>
                    <TableHead className="text-gray-300 font-medium">Time</TableHead>
                    <TableHead className="text-gray-300 font-medium">Price</TableHead>
                    <TableHead className="text-gray-300 font-medium">Seats</TableHead>
                    <TableHead className="text-gray-300 font-medium">Occupancy</TableHead>
                    <TableHead className="text-gray-300 font-medium">Status</TableHead>
                    <TableHead className="text-gray-300 font-medium text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredShowtimes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <AlertCircle className="w-12 h-12 mb-3 text-gray-600" />
                          <p className="text-lg font-medium">No showtimes found</p>
                          <p className="text-sm">Try adjusting your search or date filter</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredShowtimes.map((showtime) => (
                      <TableRow key={showtime.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Film className="w-4 h-4 text-yellow-500" />
                            <span className="font-medium text-white">{showtime.movieName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-300">{showtime.theaterName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-gray-700 text-gray-300">
                            Screen {showtime.screenNumber}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {format(showtime.date, 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-300">{showtime.startTime} - {showtime.endTime}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-white">
                          ${showtime.price.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <div className="text-gray-300">
                            {showtime.availableSeats} / {showtime.totalSeats}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                                style={{ width: `${getOccupancyPercentage(showtime.availableSeats, showtime.totalSeats)}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-400">
                              {getOccupancyPercentage(showtime.availableSeats, showtime.totalSeats)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={cn("px-3 py-1 rounded-full text-xs font-medium border", getStatusColor(showtime.status))}>
                            {getStatusText(showtime.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-gray-900 border-gray-800 text-white w-48">
                              <DropdownMenuLabel className="text-gray-300">Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-gray-800" />
                              <DropdownMenuItem 
                                className="cursor-pointer hover:bg-yellow-500/10 focus:bg-yellow-500/10"
                                onClick={() => {
                                  setSelectedShowtime(showtime)
                                  setIsEditDialogOpen(true)
                                }}
                              >
                                <Edit className="w-4 h-4 mr-2 text-yellow-400" />
                                Edit Showtime
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/10 focus:bg-red-500/10"
                                onClick={() => {
                                  setSelectedShowtime(showtime)
                                  setIsDeleteDialogOpen(true)
                                }}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Showtime
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gradient-to-b from-gray-900 to-black border-orange-500/30 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Edit Showtime
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Modify showtime details
            </DialogDescription>
          </DialogHeader>
          
          {selectedShowtime && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-300">Movie</Label>
                  <div className="p-2 bg-gray-800 border border-gray-700 rounded text-white">
                    {selectedShowtime.movieName}
                  </div>
                </div>
                
                <div>
                  <Label className="text-gray-300">Theater</Label>
                  <div className="p-2 bg-gray-800 border border-gray-700 rounded text-white">
                    {selectedShowtime.theaterName} (Screen {selectedShowtime.screenNumber})
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="edit-price" className="text-gray-300">Price ($)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    step="0.50"
                    value={selectedShowtime.price}
                    onChange={(e) => setSelectedShowtime({...selectedShowtime, price: parseFloat(e.target.value)})}
                    className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-300">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(selectedShowtime.date, 'PPP')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                      <Calendar
                        mode="single"
                        selected={selectedShowtime.date}
                        onSelect={(date) => date && setSelectedShowtime({...selectedShowtime, date})}
                        initialFocus
                        className="bg-gray-800 text-white"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <Label htmlFor="edit-startTime" className="text-gray-300">Start Time</Label>
                  <Input
                    id="edit-startTime"
                    type="time"
                    value={selectedShowtime.startTime}
                    onChange={(e) => setSelectedShowtime({...selectedShowtime, startTime: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-status" className="text-gray-300">Status</Label>
                  <Select
                    value={selectedShowtime.status}
                    onValueChange={(value: any) => setSelectedShowtime({...selectedShowtime, status: value})}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
              onClick={handleEditShowtime}
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
              Are you sure you want to delete this showtime? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedShowtime && (
            <div className="py-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{selectedShowtime.movieName}</p>
                  <p className="text-sm text-gray-400">
                    {selectedShowtime.theaterName} • Screen {selectedShowtime.screenNumber} • {format(selectedShowtime.date, 'MMM d')} at {selectedShowtime.startTime}
                  </p>
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
              onClick={handleDeleteShowtime}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
            >
              Delete Showtime
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </LayoutWrapper>
  )
}