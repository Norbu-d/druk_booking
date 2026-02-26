// app/admin/bookings/page.tsx
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
  Ticket,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Calendar as CalendarIcon,
  Film,
  User,
  CreditCard,
  DollarSign,
  Clock,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  Search,
  Download,
  Printer,
  Eye,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Types
type BookingStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'refunded'
type PaymentMethod = 'credit_card' | 'debit_card' | 'cash' | 'online_wallet' | 'gift_card'

type Seat = {
  row: string
  number: number
  type: 'standard' | 'vip' | 'recliner'
  price: number
}

type Booking = {
  id: string
  bookingNumber: string
  movieId: string
  movieName: string
  theaterId: string
  theaterName: string
  screenNumber: number
  showtimeId: string
  showDate: Date
  showTime: string
  customerName: string
  customerEmail: string
  customerPhone: string
  seats: Seat[]
  totalSeats: number
  subtotal: number
  tax: number
  convenienceFee: number
  totalAmount: number
  paymentMethod: PaymentMethod
  paymentId: string
  status: BookingStatus
  bookingDate: Date
  checkedIn: boolean
  checkInTime?: Date
  specialRequests?: string
}

// Mock data
const mockBookings: Booking[] = [
  {
    id: '1',
    bookingNumber: 'BKG-2025-0001',
    movieId: '1',
    movieName: 'Dobchu',
    theaterId: '1',
    theaterName: 'City Cinema',
    screenNumber: 1,
    showtimeId: 'st1',
    showDate: new Date(2025, 1, 20),
    showTime: '10:30',
    customerName: 'John Doe',
    customerEmail: 'john.doe@email.com',
    customerPhone: '+1 (555) 123-4567',
    seats: [
      { row: 'F', number: 12, type: 'standard', price: 12.50 },
      { row: 'F', number: 13, type: 'standard', price: 12.50 }
    ],
    totalSeats: 2,
    subtotal: 25.00,
    tax: 2.50,
    convenienceFee: 1.50,
    totalAmount: 29.00,
    paymentMethod: 'credit_card',
    paymentId: 'pay_123456789',
    status: 'confirmed',
    bookingDate: new Date(2025, 1, 15),
    checkedIn: false
  },
  {
    id: '2',
    bookingNumber: 'BKG-2025-0002',
    movieId: '2',
    movieName: 'Karma',
    theaterId: '1',
    theaterName: 'City Cinema',
    screenNumber: 2,
    showtimeId: 'st2',
    showDate: new Date(2025, 1, 20),
    showTime: '14:00',
    customerName: 'Jane Smith',
    customerEmail: 'jane.smith@email.com',
    customerPhone: '+1 (555) 234-5678',
    seats: [
      { row: 'G', number: 5, type: 'standard', price: 15.00 },
      { row: 'G', number: 6, type: 'standard', price: 15.00 },
      { row: 'G', number: 7, type: 'standard', price: 15.00 }
    ],
    totalSeats: 3,
    subtotal: 45.00,
    tax: 4.50,
    convenienceFee: 2.25,
    totalAmount: 51.75,
    paymentMethod: 'online_wallet',
    paymentId: 'pay_234567890',
    status: 'confirmed',
    bookingDate: new Date(2025, 1, 16),
    checkedIn: true,
    checkInTime: new Date(2025, 1, 20, 13, 45)
  },
  {
    id: '3',
    bookingNumber: 'BKG-2025-0003',
    movieId: '3',
    movieName: 'The Last Dragon',
    theaterId: '2',
    theaterName: 'IMAX Theater',
    screenNumber: 1,
    showtimeId: 'st3',
    showDate: new Date(2025, 1, 20),
    showTime: '19:30',
    customerName: 'Robert Johnson',
    customerEmail: 'robert.j@email.com',
    customerPhone: '+1 (555) 345-6789',
    seats: [
      { row: 'D', number: 10, type: 'vip', price: 25.00 },
      { row: 'D', number: 11, type: 'vip', price: 25.00 }
    ],
    totalSeats: 2,
    subtotal: 50.00,
    tax: 5.00,
    convenienceFee: 2.50,
    totalAmount: 57.50,
    paymentMethod: 'credit_card',
    paymentId: 'pay_345678901',
    status: 'pending',
    bookingDate: new Date(2025, 1, 19),
    checkedIn: false
  },
  {
    id: '4',
    bookingNumber: 'BKG-2025-0004',
    movieId: '4',
    movieName: 'Midnight Shadows',
    theaterId: '3',
    theaterName: 'VIP Lounge',
    screenNumber: 1,
    showtimeId: 'st4',
    showDate: new Date(2025, 1, 21),
    showTime: '21:00',
    customerName: 'Emily Brown',
    customerEmail: 'emily.b@email.com',
    customerPhone: '+1 (555) 456-7890',
    seats: [
      { row: 'A', number: 1, type: 'recliner', price: 35.00 },
      { row: 'A', number: 2, type: 'recliner', price: 35.00 },
      { row: 'A', number: 3, type: 'recliner', price: 35.00 },
      { row: 'A', number: 4, type: 'recliner', price: 35.00 }
    ],
    totalSeats: 4,
    subtotal: 140.00,
    tax: 14.00,
    convenienceFee: 5.00,
    totalAmount: 159.00,
    paymentMethod: 'credit_card',
    paymentId: 'pay_456789012',
    status: 'confirmed',
    bookingDate: new Date(2025, 1, 18),
    checkedIn: false
  },
  {
    id: '5',
    bookingNumber: 'BKG-2025-0005',
    movieId: '5',
    movieName: 'Ocean\'s Whisper',
    theaterId: '2',
    theaterName: 'IMAX Theater',
    screenNumber: 2,
    showtimeId: 'st5',
    showDate: new Date(2025, 1, 22),
    showTime: '16:30',
    customerName: 'Michael Wilson',
    customerEmail: 'michael.w@email.com',
    customerPhone: '+1 (555) 567-8901',
    seats: [
      { row: 'C', number: 8, type: 'standard', price: 16.00 }
    ],
    totalSeats: 1,
    subtotal: 16.00,
    tax: 1.60,
    convenienceFee: 1.00,
    totalAmount: 18.60,
    paymentMethod: 'debit_card',
    paymentId: 'pay_567890123',
    status: 'cancelled',
    bookingDate: new Date(2025, 1, 17),
    checkedIn: false
  },
  {
    id: '6',
    bookingNumber: 'BKG-2025-0006',
    movieId: '1',
    movieName: 'Dobchu',
    theaterId: '1',
    theaterName: 'City Cinema',
    screenNumber: 1,
    showtimeId: 'st1',
    showDate: new Date(2025, 1, 20),
    showTime: '10:30',
    customerName: 'Sarah Davis',
    customerEmail: 'sarah.d@email.com',
    customerPhone: '+1 (555) 678-9012',
    seats: [
      { row: 'H', number: 3, type: 'standard', price: 12.50 },
      { row: 'H', number: 4, type: 'standard', price: 12.50 }
    ],
    totalSeats: 2,
    subtotal: 25.00,
    tax: 2.50,
    convenienceFee: 1.50,
    totalAmount: 29.00,
    paymentMethod: 'cash',
    paymentId: 'pay_678901234',
    status: 'completed',
    bookingDate: new Date(2025, 1, 10),
    checkedIn: true,
    checkInTime: new Date(2025, 1, 20, 10, 15)
  },
  {
    id: '7',
    bookingNumber: 'BKG-2025-0007',
    movieId: '2',
    movieName: 'Karma',
    theaterId: '1',
    theaterName: 'City Cinema',
    screenNumber: 2,
    showtimeId: 'st2',
    showDate: new Date(2025, 1, 20),
    showTime: '14:00',
    customerName: 'David Miller',
    customerEmail: 'david.m@email.com',
    customerPhone: '+1 (555) 789-0123',
    seats: [
      { row: 'J', number: 15, type: 'standard', price: 15.00 }
    ],
    totalSeats: 1,
    subtotal: 15.00,
    tax: 1.50,
    convenienceFee: 1.00,
    totalAmount: 17.50,
    paymentMethod: 'gift_card',
    paymentId: 'pay_789012345',
    status: 'refunded',
    bookingDate: new Date(2025, 1, 12),
    checkedIn: false
  }
]

// Payment method labels
const paymentMethodLabels: Record<PaymentMethod, string> = {
  credit_card: 'Credit Card',
  debit_card: 'Debit Card',
  cash: 'Cash',
  online_wallet: 'Online Wallet',
  gift_card: 'Gift Card'
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isCheckInDialogOpen, setIsCheckInDialogOpen] = useState(false)

  // Filter bookings based on search, status, and date
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.movieName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
    
    const matchesDate = dateFilter 
      ? format(booking.showDate, 'yyyy-MM-dd') === format(dateFilter, 'yyyy-MM-dd')
      : true
    
    return matchesSearch && matchesStatus && matchesDate
  })

  // Count bookings by status
  const bookingCounts = {
    all: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    refunded: bookings.filter(b => b.status === 'refunded').length,
  }

  // Calculate total revenue
  const totalRevenue = bookings.reduce((acc, b) => {
    if (b.status !== 'cancelled' && b.status !== 'refunded') {
      return acc + b.totalAmount
    }
    return acc
  }, 0)

  // Get status color
  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30'
      case 'pending':
        return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30'
      case 'completed':
        return 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30'
      case 'cancelled':
        return 'bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-400 border-red-500/30'
      case 'refunded':
        return 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30'
    }
  }

  // Get status text
  const getStatusText = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed'
      case 'pending':
        return 'Pending'
      case 'completed':
        return 'Completed'
      case 'cancelled':
        return 'Cancelled'
      case 'refunded':
        return 'Refunded'
    }
  }

  // Handle check-in
  const handleCheckIn = () => {
    if (!selectedBooking) return
    
    setBookings(bookings.map(b => 
      b.id === selectedBooking.id 
        ? { 
            ...b, 
            checkedIn: true, 
            checkInTime: new Date(),
            status: 'completed' as BookingStatus
          } 
        : b
    ))
    
    setIsCheckInDialogOpen(false)
    setSelectedBooking(null)
  }

  // Handle edit booking
  const handleEditBooking = () => {
    if (!selectedBooking) return
    setBookings(bookings.map(b => 
      b.id === selectedBooking.id ? selectedBooking : b
    ))
    setIsEditDialogOpen(false)
    setSelectedBooking(null)
  }

  // Handle delete booking
  const handleDeleteBooking = () => {
    if (!selectedBooking) return
    setBookings(bookings.filter(b => b.id !== selectedBooking.id))
    setIsDeleteDialogOpen(false)
    setSelectedBooking(null)
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  // Format date
  const formatDate = (date: Date) => {
    return format(date, 'MMM d, yyyy')
  }

  // Format datetime
  const formatDateTime = (date: Date) => {
    return format(date, 'MMM d, yyyy h:mm a')
  }

  return (
    <LayoutWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                <Ticket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Booking Management</h1>
                <p className="text-gray-400">View and manage all customer bookings</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            
            <Button
              variant="outline"
              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Bookings
              </CardTitle>
              <Ticket className="w-4 h-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{bookingCounts.all}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Confirmed
              </CardTitle>
              <CheckCircle className="w-4 h-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{bookingCounts.confirmed}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Pending
              </CardTitle>
              <RefreshCw className="w-4 h-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{bookingCounts.pending}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-orange-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Revenue
              </CardTitle>
              <DollarSign className="w-4 h-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatCurrency(totalRevenue)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by booking #, customer, email, or movie..."
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
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full sm:w-[240px] justify-start text-left font-normal border-gray-700 text-white hover:bg-gray-800",
                      !dateFilter && "text-gray-400"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFilter ? format(dateFilter, 'PPP') : 'Filter by date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                  <Calendar
                    mode="single"
                    selected={dateFilter}
                    onSelect={setDateFilter}
                    initialFocus
                    className="bg-gray-800 text-white"
                  />
                </PopoverContent>
              </Popover>
              
              {(searchTerm || statusFilter !== 'all' || dateFilter) && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSearchTerm('')
                    setStatusFilter('all')
                    setDateFilter(undefined)
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Status Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-6 bg-gray-800 p-1 rounded-lg">
            <TabsTrigger value="all" className="text-gray-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              All ({bookingCounts.all})
            </TabsTrigger>
            <TabsTrigger value="confirmed" className="text-gray-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">
              Confirmed ({bookingCounts.confirmed})
            </TabsTrigger>
            <TabsTrigger value="pending" className="text-gray-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              Pending ({bookingCounts.pending})
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-gray-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
              Completed ({bookingCounts.completed})
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="text-gray-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-rose-500 data-[state=active]:text-white">
              Cancelled ({bookingCounts.cancelled})
            </TabsTrigger>
            <TabsTrigger value="refunded" className="text-gray-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              Refunded ({bookingCounts.refunded})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {/* Bookings Table */}
            <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white">All Bookings</CardTitle>
                <CardDescription className="text-gray-400">
                  Showing {filteredBookings.length} of {bookings.length} bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-gray-800 hover:bg-transparent">
                        <TableHead className="text-gray-300 font-medium">Booking #</TableHead>
                        <TableHead className="text-gray-300 font-medium">Customer</TableHead>
                        <TableHead className="text-gray-300 font-medium">Movie</TableHead>
                        <TableHead className="text-gray-300 font-medium">Date & Time</TableHead>
                        <TableHead className="text-gray-300 font-medium">Seats</TableHead>
                        <TableHead className="text-gray-300 font-medium">Total</TableHead>
                        <TableHead className="text-gray-300 font-medium">Status</TableHead>
                        <TableHead className="text-gray-300 font-medium">Check-in</TableHead>
                        <TableHead className="text-gray-300 font-medium text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-8">
                            <div className="flex flex-col items-center justify-center text-gray-400">
                              <AlertCircle className="w-12 h-12 mb-3 text-gray-600" />
                              <p className="text-lg font-medium">No bookings found</p>
                              <p className="text-sm">Try adjusting your filters</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredBookings.map((booking) => (
                          <TableRow key={booking.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                            <TableCell>
                              <div className="font-medium text-white">{booking.bookingNumber}</div>
                              <div className="text-xs text-gray-400">{formatDate(booking.bookingDate)}</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium text-white">{booking.customerName}</div>
                              <div className="text-xs text-gray-400">{booking.customerEmail}</div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Film className="w-4 h-4 text-yellow-500" />
                                <span className="text-white">{booking.movieName}</span>
                              </div>
                              <div className="text-xs text-gray-400">
                                {booking.theaterName} • Screen {booking.screenNumber}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-white">{formatDate(booking.showDate)}</div>
                              <div className="text-xs text-gray-400">{booking.showTime}</div>
                            </TableCell>
                            <TableCell>
                              <div className="text-white">{booking.totalSeats} seats</div>
                              <div className="text-xs text-gray-400">
                                {booking.seats.map(s => `${s.row}${s.number}`).join(', ')}
                              </div>
                            </TableCell>
                            <TableCell className="font-medium text-white">
                              {formatCurrency(booking.totalAmount)}
                            </TableCell>
                            <TableCell>
                              <Badge className={cn("px-3 py-1", getStatusColor(booking.status))}>
                                {getStatusText(booking.status)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {booking.checkedIn ? (
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                  Checked In
                                  {booking.checkInTime && (
                                    <span className="ml-1 text-xs">
                                      {format(booking.checkInTime, 'h:mm a')}
                                    </span>
                                  )}
                                </Badge>
                              ) : (
                                <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
                                  Not Checked In
                                </Badge>
                              )}
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
                                      setSelectedBooking(booking)
                                      setIsViewDialogOpen(true)
                                    }}
                                  >
                                    <Eye className="w-4 h-4 mr-2 text-blue-400" />
                                    View Details
                                  </DropdownMenuItem>
                                  {!booking.checkedIn && booking.status !== 'cancelled' && booking.status !== 'refunded' && (
                                    <DropdownMenuItem 
                                      className="cursor-pointer hover:bg-green-500/10 focus:bg-green-500/10"
                                      onClick={() => {
                                        setSelectedBooking(booking)
                                        setIsCheckInDialogOpen(true)
                                      }}
                                    >
                                      <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                                      Check In
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem 
                                    className="cursor-pointer hover:bg-yellow-500/10 focus:bg-yellow-500/10"
                                    onClick={() => {
                                      setSelectedBooking(booking)
                                      setIsEditDialogOpen(true)
                                    }}
                                  >
                                    <Edit className="w-4 h-4 mr-2 text-yellow-400" />
                                    Edit Booking
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/10 focus:bg-red-500/10"
                                    onClick={() => {
                                      setSelectedBooking(booking)
                                      setIsDeleteDialogOpen(true)
                                    }}
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete Booking
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

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800">
                  <div className="text-sm text-gray-400">
                    Showing {filteredBookings.length} of {bookings.length} bookings
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:border-yellow-500/50 hover:bg-yellow-500/10">
                      Previous
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                    >
                      1
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:border-yellow-500/50 hover:bg-yellow-500/10">
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs would show filtered content - for brevity, using same table with different filters */}
          <TabsContent value="confirmed" className="mt-6">
            {/* Same table structure but with confirmed bookings */}
          </TabsContent>
          <TabsContent value="pending" className="mt-6">
            {/* Same table structure but with pending bookings */}
          </TabsContent>
          <TabsContent value="completed" className="mt-6">
            {/* Same table structure but with completed bookings */}
          </TabsContent>
          <TabsContent value="cancelled" className="mt-6">
            {/* Same table structure but with cancelled bookings */}
          </TabsContent>
          <TabsContent value="refunded" className="mt-6">
            {/* Same table structure but with refunded bookings */}
          </TabsContent>
        </Tabs>
      </div>

      {/* View Booking Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-gradient-to-b from-gray-900 to-black border-yellow-500/30 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Booking Details
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Complete information for this booking
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-6 py-4">
              {/* Booking Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Booking Number</p>
                  <p className="text-2xl font-bold text-white">{selectedBooking.bookingNumber}</p>
                </div>
                <Badge className={cn("px-4 py-2 text-base", getStatusColor(selectedBooking.status))}>
                  {getStatusText(selectedBooking.status)}
                </Badge>
              </div>

              {/* Customer Information */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-yellow-400 text-lg">Customer Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Name</p>
                      <p className="text-white font-medium">{selectedBooking.customerName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white">{selectedBooking.customerEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <p className="text-white">{selectedBooking.customerPhone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Booking Date</p>
                      <p className="text-white">{formatDateTime(selectedBooking.bookingDate)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Showtime Information */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-yellow-400 text-lg">Showtime Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Movie</p>
                      <p className="text-white font-medium">{selectedBooking.movieName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Theater</p>
                      <p className="text-white">{selectedBooking.theaterName} (Screen {selectedBooking.screenNumber})</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Date</p>
                      <p className="text-white">{formatDate(selectedBooking.showDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Time</p>
                      <p className="text-white">{selectedBooking.showTime}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Seats and Payment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-yellow-400 text-lg">Seats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedBooking.seats.map((seat, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div>
                            <span className="text-white font-medium">Row {seat.row}, Seat {seat.number}</span>
                            <Badge className="ml-2 bg-yellow-500/10 text-yellow-400 border-yellow-500/30 text-xs">
                              {seat.type}
                            </Badge>
                          </div>
                          <span className="text-white">{formatCurrency(seat.price)}</span>
                        </div>
                      ))}
                      <div className="pt-2 mt-2 border-t border-gray-700">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total Seats:</span>
                          <span className="text-white font-bold">{selectedBooking.totalSeats}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-yellow-400 text-lg">Payment Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Subtotal:</span>
                        <span className="text-white">{formatCurrency(selectedBooking.subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tax:</span>
                        <span className="text-white">{formatCurrency(selectedBooking.tax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Convenience Fee:</span>
                        <span className="text-white">{formatCurrency(selectedBooking.convenienceFee)}</span>
                      </div>
                      <div className="flex justify-between pt-2 mt-2 border-t border-gray-700">
                        <span className="text-gray-400 font-medium">Total:</span>
                        <span className="text-xl font-bold text-yellow-400">{formatCurrency(selectedBooking.totalAmount)}</span>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-400">Payment Method:</p>
                        <p className="text-white">{paymentMethodLabels[selectedBooking.paymentMethod]}</p>
                        <p className="text-xs text-gray-500">Payment ID: {selectedBooking.paymentId}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Check-in Status */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-yellow-400 text-lg">Check-in Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      {selectedBooking.checkedIn ? (
                        <>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1">
                            Checked In
                          </Badge>
                          {selectedBooking.checkInTime && (
                            <p className="text-sm text-gray-400 mt-1">
                              Check-in Time: {formatDateTime(selectedBooking.checkInTime)}
                            </p>
                          )}
                        </>
                      ) : (
                        <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 px-3 py-1">
                          Not Checked In
                        </Badge>
                      )}
                    </div>
                    {!selectedBooking.checkedIn && selectedBooking.status !== 'cancelled' && selectedBooking.status !== 'refunded' && (
                      <Button
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                        onClick={() => {
                          setIsViewDialogOpen(false)
                          setIsCheckInDialogOpen(true)
                        }}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Check In Customer
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Special Requests */}
              {selectedBooking.specialRequests && (
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-yellow-400 text-lg">Special Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white">{selectedBooking.specialRequests}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button
              onClick={() => setIsViewDialogOpen(false)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Check-in Dialog */}
      <Dialog open={isCheckInDialogOpen} onOpenChange={setIsCheckInDialogOpen}>
        <DialogContent className="bg-gradient-to-b from-gray-900 to-black border-green-500/30 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-green-400">Confirm Check-in</DialogTitle>
            <DialogDescription className="text-gray-400">
              Mark this customer as checked in for their showtime
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="py-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{selectedBooking.customerName}</p>
                  <p className="text-sm text-gray-400">{selectedBooking.bookingNumber}</p>
                  <p className="text-xs text-gray-500">
                    {selectedBooking.movieName} • {formatDate(selectedBooking.showDate)} at {selectedBooking.showTime}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mt-4">
                This action will mark the customer as checked in and update the booking status to completed.
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCheckInDialogOpen(false)}
              className="border-gray-700 text-white hover:bg-gray-800 hover:border-green-500/50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCheckIn}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              Confirm Check-in
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gradient-to-b from-gray-900 to-black border-yellow-500/30 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Edit Booking
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Modify booking details
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="edit-status" className="text-gray-300">Status</Label>
                <Select
                  value={selectedBooking.status}
                  onValueChange={(value: any) => setSelectedBooking({...selectedBooking, status: value})}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="edit-checkedIn" className="text-gray-300">Check-in Status</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "border-gray-700",
                      selectedBooking.checkedIn && "bg-green-500/20 border-green-500 text-green-400"
                    )}
                    onClick={() => setSelectedBooking({...selectedBooking, checkedIn: true})}
                  >
                    Checked In
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "border-gray-700",
                      !selectedBooking.checkedIn && "bg-gray-500/20 border-gray-500 text-gray-400"
                    )}
                    onClick={() => setSelectedBooking({...selectedBooking, checkedIn: false})}
                  >
                    Not Checked In
                  </Button>
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
              onClick={handleEditBooking}
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
              Are you sure you want to delete this booking? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="py-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
                  <Ticket className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{selectedBooking.bookingNumber}</p>
                  <p className="text-sm text-gray-400">{selectedBooking.customerName}</p>
                  <p className="text-xs text-gray-500">{selectedBooking.movieName} • {formatDate(selectedBooking.showDate)}</p>
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
              onClick={handleDeleteBooking}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
            >
              Delete Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </LayoutWrapper>
  )
}