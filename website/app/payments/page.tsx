// app/admin/payments/page.tsx
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
  CreditCard,
  DollarSign,
  MoreVertical,
  Eye,
  Download,
  Printer,
  Calendar as CalendarIcon,
  Film,
  User,
  Search,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Wallet,
  Landmark,
  Smartphone,
  Gift,
  FileText,
  Receipt
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Types
type PaymentStatus = 'completed' | 'pending' | 'failed' | 'refunded' | 'partially_refunded'
type PaymentMethod = 'credit_card' | 'debit_card' | 'cash' | 'online_wallet' | 'gift_card' | 'bank_transfer'

type Payment = {
  id: string
  paymentId: string
  bookingId: string
  bookingNumber: string
  customerName: string
  customerEmail: string
  movieName: string
  amount: number
  tax: number
  convenienceFee: number
  totalAmount: number
  paymentMethod: PaymentMethod
  status: PaymentStatus
  transactionDate: Date
  refundAmount?: number
  refundDate?: Date
  refundReason?: string
  cardLastFour?: string
  cardType?: string
  walletProvider?: string
  bankName?: string
  notes?: string
}

// Mock data
const mockPayments: Payment[] = [
  {
    id: '1',
    paymentId: 'pay_123456789',
    bookingId: '1',
    bookingNumber: 'BKG-2025-0001',
    customerName: 'John Doe',
    customerEmail: 'john.doe@email.com',
    movieName: 'Dobchu',
    amount: 25.00,
    tax: 2.50,
    convenienceFee: 1.50,
    totalAmount: 29.00,
    paymentMethod: 'credit_card',
    status: 'completed',
    transactionDate: new Date(2025, 1, 15, 14, 30),
    cardLastFour: '4242',
    cardType: 'Visa'
  },
  {
    id: '2',
    paymentId: 'pay_234567890',
    bookingId: '2',
    bookingNumber: 'BKG-2025-0002',
    customerName: 'Jane Smith',
    customerEmail: 'jane.smith@email.com',
    movieName: 'Karma',
    amount: 45.00,
    tax: 4.50,
    convenienceFee: 2.25,
    totalAmount: 51.75,
    paymentMethod: 'online_wallet',
    status: 'completed',
    transactionDate: new Date(2025, 1, 16, 10, 15),
    walletProvider: 'PayPal'
  },
  {
    id: '3',
    paymentId: 'pay_345678901',
    bookingId: '3',
    bookingNumber: 'BKG-2025-0003',
    customerName: 'Robert Johnson',
    customerEmail: 'robert.j@email.com',
    movieName: 'The Last Dragon',
    amount: 50.00,
    tax: 5.00,
    convenienceFee: 2.50,
    totalAmount: 57.50,
    paymentMethod: 'credit_card',
    status: 'pending',
    transactionDate: new Date(2025, 1, 19, 9, 45),
    cardLastFour: '1234',
    cardType: 'Mastercard'
  },
  {
    id: '4',
    paymentId: 'pay_456789012',
    bookingId: '4',
    bookingNumber: 'BKG-2025-0004',
    customerName: 'Emily Brown',
    customerEmail: 'emily.b@email.com',
    movieName: 'Midnight Shadows',
    amount: 140.00,
    tax: 14.00,
    convenienceFee: 5.00,
    totalAmount: 159.00,
    paymentMethod: 'credit_card',
    status: 'completed',
    transactionDate: new Date(2025, 1, 18, 16, 20),
    cardLastFour: '9876',
    cardType: 'American Express'
  },
  {
    id: '5',
    paymentId: 'pay_567890123',
    bookingId: '5',
    bookingNumber: 'BKG-2025-0005',
    customerName: 'Michael Wilson',
    customerEmail: 'michael.w@email.com',
    movieName: 'Ocean\'s Whisper',
    amount: 16.00,
    tax: 1.60,
    convenienceFee: 1.00,
    totalAmount: 18.60,
    paymentMethod: 'debit_card',
    status: 'failed',
    transactionDate: new Date(2025, 1, 17, 11, 30),
    cardLastFour: '5555',
    cardType: 'Visa',
    notes: 'Insufficient funds'
  },
  {
    id: '6',
    paymentId: 'pay_678901234',
    bookingId: '6',
    bookingNumber: 'BKG-2025-0006',
    customerName: 'Sarah Davis',
    customerEmail: 'sarah.d@email.com',
    movieName: 'Dobchu',
    amount: 25.00,
    tax: 2.50,
    convenienceFee: 1.50,
    totalAmount: 29.00,
    paymentMethod: 'cash',
    status: 'completed',
    transactionDate: new Date(2025, 1, 10, 18, 45)
  },
  {
    id: '7',
    paymentId: 'pay_789012345',
    bookingId: '7',
    bookingNumber: 'BKG-2025-0007',
    customerName: 'David Miller',
    customerEmail: 'david.m@email.com',
    movieName: 'Karma',
    amount: 15.00,
    tax: 1.50,
    convenienceFee: 1.00,
    totalAmount: 17.50,
    paymentMethod: 'gift_card',
    status: 'refunded',
    transactionDate: new Date(2025, 1, 12, 13, 15),
    refundAmount: 17.50,
    refundDate: new Date(2025, 1, 14, 10, 0),
    refundReason: 'Customer cancelled booking'
  },
  {
    id: '8',
    paymentId: 'pay_890123456',
    bookingId: '8',
    bookingNumber: 'BKG-2025-0008',
    customerName: 'Jennifer Lee',
    customerEmail: 'jennifer.l@email.com',
    movieName: 'The Last Dragon',
    amount: 75.00,
    tax: 7.50,
    convenienceFee: 3.75,
    totalAmount: 86.25,
    paymentMethod: 'bank_transfer',
    status: 'pending',
    transactionDate: new Date(2025, 1, 20, 8, 30),
    bankName: 'Chase Bank'
  },
  {
    id: '9',
    paymentId: 'pay_901234567',
    bookingId: '9',
    bookingNumber: 'BKG-2025-0009',
    customerName: 'Thomas Anderson',
    customerEmail: 'thomas.a@email.com',
    movieName: 'Midnight Shadows',
    amount: 35.00,
    tax: 3.50,
    convenienceFee: 2.00,
    totalAmount: 40.50,
    paymentMethod: 'credit_card',
    status: 'partially_refunded',
    transactionDate: new Date(2025, 1, 13, 19, 20),
    refundAmount: 20.25,
    refundDate: new Date(2025, 1, 15, 11, 30),
    refundReason: 'Partial refund for cancelled seats',
    cardLastFour: '7777',
    cardType: 'Discover'
  },
  {
    id: '10',
    paymentId: 'pay_012345678',
    bookingId: '10',
    bookingNumber: 'BKG-2025-0010',
    customerName: 'Lisa Wong',
    customerEmail: 'lisa.w@email.com',
    movieName: 'Ocean\'s Whisper',
    amount: 32.00,
    tax: 3.20,
    convenienceFee: 1.60,
    totalAmount: 36.80,
    paymentMethod: 'online_wallet',
    status: 'completed',
    transactionDate: new Date(2025, 1, 19, 20, 15),
    walletProvider: 'Google Pay'
  }
]

// Payment method labels and icons
const paymentMethodDetails: Record<PaymentMethod, { label: string, icon: any, color: string }> = {
  credit_card: { 
    label: 'Credit Card', 
    icon: CreditCard, 
    color: 'text-blue-400' 
  },
  debit_card: { 
    label: 'Debit Card', 
    icon: CreditCard, 
    color: 'text-green-400' 
  },
  cash: { 
    label: 'Cash', 
    icon: DollarSign, 
    color: 'text-yellow-400' 
  },
  online_wallet: { 
    label: 'Online Wallet', 
    icon: Smartphone, 
    color: 'text-purple-400' 
  },
  gift_card: { 
    label: 'Gift Card', 
    icon: Gift, 
    color: 'text-pink-400' 
  },
  bank_transfer: { 
    label: 'Bank Transfer', 
    icon: Landmark, 
    color: 'text-indigo-400' 
  }
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(mockPayments)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [methodFilter, setMethodFilter] = useState<string>('all')
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  })
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false)
  const [refundAmount, setRefundAmount] = useState<number>(0)
  const [refundReason, setRefundReason] = useState('')

  // Filter payments based on search, status, method, and date
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.movieName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter
    const matchesMethod = methodFilter === 'all' || payment.paymentMethod === methodFilter
    
    const matchesDate = 
      (!dateRange.from || payment.transactionDate >= dateRange.from) &&
      (!dateRange.to || payment.transactionDate <= dateRange.to)
    
    return matchesSearch && matchesStatus && matchesMethod && matchesDate
  })

  // Calculate statistics
  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((acc, p) => acc + p.totalAmount, 0)
  
  const pendingAmount = payments
    .filter(p => p.status === 'pending')
    .reduce((acc, p) => acc + p.totalAmount, 0)
  
  const refundedAmount = payments
    .filter(p => p.refundAmount)
    .reduce((acc, p) => acc + (p.refundAmount || 0), 0)
  
  const failedAmount = payments
    .filter(p => p.status === 'failed')
    .reduce((acc, p) => acc + p.totalAmount, 0)

  const completedCount = payments.filter(p => p.status === 'completed').length
  const pendingCount = payments.filter(p => p.status === 'pending').length
  const refundedCount = payments.filter(p => p.status === 'refunded' || p.status === 'partially_refunded').length

  // Payment method distribution
  const methodDistribution = Object.keys(paymentMethodDetails).reduce((acc, method) => {
    acc[method as PaymentMethod] = payments.filter(
      p => p.paymentMethod === method && p.status === 'completed'
    ).reduce((sum, p) => sum + p.totalAmount, 0)
    return acc
  }, {} as Record<PaymentMethod, number>)

  // Get status color
  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30'
      case 'pending':
        return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30'
      case 'failed':
        return 'bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-400 border-red-500/30'
      case 'refunded':
        return 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30'
      case 'partially_refunded':
        return 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30'
    }
  }

  // Get status text
  const getStatusText = (status: PaymentStatus) => {
    switch (status) {
      case 'completed':
        return 'Completed'
      case 'pending':
        return 'Pending'
      case 'failed':
        return 'Failed'
      case 'refunded':
        return 'Refunded'
      case 'partially_refunded':
        return 'Partially Refunded'
    }
  }

  // Handle refund
  const handleRefund = () => {
    if (!selectedPayment) return
    
    setPayments(payments.map(p => 
      p.id === selectedPayment.id 
        ? { 
            ...p, 
            status: refundAmount === p.totalAmount ? 'refunded' : 'partially_refunded',
            refundAmount,
            refundDate: new Date(),
            refundReason
          } 
        : p
    ))
    
    setIsRefundDialogOpen(false)
    setSelectedPayment(null)
    setRefundAmount(0)
    setRefundReason('')
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

  // Get payment method icon
  const getPaymentMethodIcon = (method: PaymentMethod) => {
    const Icon = paymentMethodDetails[method].icon
    return <Icon className={cn("w-4 h-4", paymentMethodDetails[method].color)} />
  }

  return (
    <LayoutWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Payment Management</h1>
                <p className="text-gray-400">Track and manage all payment transactions</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            
            <Button
              variant="outline"
              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print Summary
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-gray-900 to-black border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Revenue
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatCurrency(totalRevenue)}</div>
              <p className="text-xs text-gray-400 mt-1">{completedCount} completed transactions</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Pending Amount
              </CardTitle>
              <Clock className="w-4 h-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatCurrency(pendingAmount)}</div>
              <p className="text-xs text-gray-400 mt-1">{pendingCount} pending transactions</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Refunded Amount
              </CardTitle>
              <RefreshCw className="w-4 h-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatCurrency(refundedAmount)}</div>
              <p className="text-xs text-gray-400 mt-1">{refundedCount} refunded transactions</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-red-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Failed Amount
              </CardTitle>
              <TrendingDown className="w-4 h-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatCurrency(failedAmount)}</div>
              <p className="text-xs text-gray-400 mt-1">{payments.filter(p => p.status === 'failed').length} failed transactions</p>
            </CardContent>
          </Card>
        </div>

        {/* Payment Method Distribution */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {(Object.keys(paymentMethodDetails) as PaymentMethod[]).map((method) => {
            const amount = methodDistribution[method] || 0
            const percentage = totalRevenue > 0 ? (amount / totalRevenue) * 100 : 0
            
            return (
              <Card key={method} className="bg-gradient-to-br from-gray-900 to-black border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    {getPaymentMethodIcon(method)}
                    <span className="text-xs text-gray-400">{percentage.toFixed(1)}%</span>
                  </div>
                  <p className="text-sm font-medium text-white truncate">
                    {paymentMethodDetails[method].label}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{formatCurrency(amount)}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Filters */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by payment ID, booking #, customer, or movie..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-[180px] bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                  <SelectItem value="partially_refunded">Partially Refunded</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger className="w-full lg:w-[180px] bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Filter by method" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="debit_card">Debit Card</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="online_wallet">Online Wallet</SelectItem>
                  <SelectItem value="gift_card">Gift Card</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full lg:w-[300px] justify-start text-left font-normal border-gray-700 text-white hover:bg-gray-800",
                      !dateRange.from && !dateRange.to && "text-gray-400"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, 'MMM d, yyyy')} - {format(dateRange.to, 'MMM d, yyyy')}
                        </>
                      ) : (
                        format(dateRange.from, 'MMM d, yyyy')
                      )
                    ) : (
                      'Select date range'
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    initialFocus
                    className="bg-gray-800 text-white"
                  />
                </PopoverContent>
              </Popover>
              
              {(searchTerm || statusFilter !== 'all' || methodFilter !== 'all' || dateRange.from) && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSearchTerm('')
                    setStatusFilter('all')
                    setMethodFilter('all')
                    setDateRange({ from: undefined, to: undefined })
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Payments Table */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-white">Payment Transactions</CardTitle>
            <CardDescription className="text-gray-400">
              Showing {filteredPayments.length} of {payments.length} transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-800 hover:bg-transparent">
                    <TableHead className="text-gray-300 font-medium">Payment ID</TableHead>
                    <TableHead className="text-gray-300 font-medium">Booking #</TableHead>
                    <TableHead className="text-gray-300 font-medium">Customer</TableHead>
                    <TableHead className="text-gray-300 font-medium">Movie</TableHead>
                    <TableHead className="text-gray-300 font-medium">Date & Time</TableHead>
                    <TableHead className="text-gray-300 font-medium">Method</TableHead>
                    <TableHead className="text-gray-300 font-medium">Amount</TableHead>
                    <TableHead className="text-gray-300 font-medium">Status</TableHead>
                    <TableHead className="text-gray-300 font-medium text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <AlertCircle className="w-12 h-12 mb-3 text-gray-600" />
                          <p className="text-lg font-medium">No payments found</p>
                          <p className="text-sm">Try adjusting your filters</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPayments.map((payment) => (
                      <TableRow key={payment.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                        <TableCell>
                          <div className="font-mono text-sm text-white">{payment.paymentId}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-white">{payment.bookingNumber}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-white">{payment.customerName}</div>
                          <div className="text-xs text-gray-400">{payment.customerEmail}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Film className="w-4 h-4 text-yellow-500" />
                            <span className="text-white">{payment.movieName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-white">{formatDate(payment.transactionDate)}</div>
                          <div className="text-xs text-gray-400">{format(payment.transactionDate, 'h:mm a')}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getPaymentMethodIcon(payment.paymentMethod)}
                            <span className="text-gray-300">
                              {paymentMethodDetails[payment.paymentMethod].label}
                            </span>
                          </div>
                          {payment.cardLastFour && (
                            <div className="text-xs text-gray-400">
                              •••• {payment.cardLastFour}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="font-bold text-white">{formatCurrency(payment.totalAmount)}</div>
                          {payment.refundAmount && (
                            <div className="text-xs text-red-400">
                              Refunded: {formatCurrency(payment.refundAmount)}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge className={cn("px-3 py-1", getStatusColor(payment.status))}>
                            {getStatusText(payment.status)}
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
                                  setSelectedPayment(payment)
                                  setIsViewDialogOpen(true)
                                }}
                              >
                                <Eye className="w-4 h-4 mr-2 text-blue-400" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="cursor-pointer hover:bg-yellow-500/10 focus:bg-yellow-500/10"
                              >
                                <Receipt className="w-4 h-4 mr-2 text-yellow-400" />
                                View Receipt
                              </DropdownMenuItem>
                              {(payment.status === 'completed' || payment.status === 'partially_refunded') && (
                                <DropdownMenuItem 
                                  className="cursor-pointer hover:bg-purple-500/10 focus:bg-purple-500/10"
                                  onClick={() => {
                                    setSelectedPayment(payment)
                                    setRefundAmount(payment.totalAmount)
                                    setIsRefundDialogOpen(true)
                                  }}
                                >
                                  <RefreshCw className="w-4 h-4 mr-2 text-purple-400" />
                                  Process Refund
                                </DropdownMenuItem>
                              )}
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
                Showing {filteredPayments.length} of {payments.length} transactions
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
      </div>

      {/* View Payment Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-gradient-to-b from-gray-900 to-black border-yellow-500/30 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Payment Details
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Complete transaction information
            </DialogDescription>
          </DialogHeader>
          
          {selectedPayment && (
            <div className="space-y-6 py-4">
              {/* Payment Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Payment ID</p>
                  <p className="text-xl font-mono text-white">{selectedPayment.paymentId}</p>
                </div>
                <Badge className={cn("px-4 py-2 text-base", getStatusColor(selectedPayment.status))}>
                  {getStatusText(selectedPayment.status)}
                </Badge>
              </div>

              {/* Transaction Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-yellow-400 text-lg">Transaction Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Booking Number:</span>
                      <span className="text-white font-medium">{selectedPayment.bookingNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Transaction Date:</span>
                      <span className="text-white">{formatDateTime(selectedPayment.transactionDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Payment Method:</span>
                      <span className="flex items-center gap-2">
                        {getPaymentMethodIcon(selectedPayment.paymentMethod)}
                        <span className="text-white">
                          {paymentMethodDetails[selectedPayment.paymentMethod].label}
                        </span>
                      </span>
                    </div>
                    {selectedPayment.cardLastFour && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Card:</span>
                        <span className="text-white">
                          {selectedPayment.cardType} •••• {selectedPayment.cardLastFour}
                        </span>
                      </div>
                    )}
                    {selectedPayment.walletProvider && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Wallet:</span>
                        <span className="text-white">{selectedPayment.walletProvider}</span>
                      </div>
                    )}
                    {selectedPayment.bankName && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Bank:</span>
                        <span className="text-white">{selectedPayment.bankName}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-yellow-400 text-lg">Customer Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span className="text-white font-medium">{selectedPayment.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span className="text-white">{selectedPayment.customerEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Movie:</span>
                      <span className="text-white">{selectedPayment.movieName}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Amount Breakdown */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-yellow-400 text-lg">Amount Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal:</span>
                      <span className="text-white">{formatCurrency(selectedPayment.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tax:</span>
                      <span className="text-white">{formatCurrency(selectedPayment.tax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Convenience Fee:</span>
                      <span className="text-white">{formatCurrency(selectedPayment.convenienceFee)}</span>
                    </div>
                    <div className="flex justify-between pt-3 mt-3 border-t border-gray-700">
                      <span className="text-gray-300 font-medium">Total Amount:</span>
                      <span className="text-2xl font-bold text-yellow-400">
                        {formatCurrency(selectedPayment.totalAmount)}
                      </span>
                    </div>
                    
                    {/* Refund Information */}
                    {selectedPayment.refundAmount && (
                      <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                        <h4 className="font-medium text-purple-400 mb-2">Refund Information</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Refund Amount:</span>
                            <span className="text-purple-400 font-medium">
                              {formatCurrency(selectedPayment.refundAmount)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Refund Date:</span>
                            <span className="text-white">
                              {selectedPayment.refundDate && formatDateTime(selectedPayment.refundDate)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Reason:</span>
                            <span className="text-white">{selectedPayment.refundReason}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Notes */}
                    {selectedPayment.notes && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-400">Notes:</p>
                        <p className="text-white bg-gray-800/50 p-2 rounded mt-1">{selectedPayment.notes}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
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

      {/* Refund Dialog */}
      <Dialog open={isRefundDialogOpen} onOpenChange={setIsRefundDialogOpen}>
        <DialogContent className="bg-gradient-to-b from-gray-900 to-black border-purple-500/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-purple-400">Process Refund</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter refund details below
            </DialogDescription>
          </DialogHeader>
          
          {selectedPayment && (
            <div className="space-y-4 py-4">
              <div className="p-3 bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-400">Payment ID</p>
                <p className="font-mono text-white">{selectedPayment.paymentId}</p>
                <p className="text-sm text-gray-400 mt-2">Total Amount</p>
                <p className="text-xl font-bold text-white">{formatCurrency(selectedPayment.totalAmount)}</p>
              </div>
              
              <div>
                <Label htmlFor="refundAmount" className="text-gray-300">Refund Amount</Label>
                <Input
                  id="refundAmount"
                  type="number"
                  step="0.01"
                  min="0"
                  max={selectedPayment.totalAmount}
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(parseFloat(e.target.value))}
                  className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                />
              </div>
              
              <div>
                <Label htmlFor="refundReason" className="text-gray-300">Refund Reason</Label>
                <Select value={refundReason} onValueChange={setRefundReason}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="Customer cancelled booking">Customer cancelled booking</SelectItem>
                    <SelectItem value="Technical issue">Technical issue</SelectItem>
                    <SelectItem value="Duplicate payment">Duplicate payment</SelectItem>
                    <SelectItem value="Movie cancelled">Movie cancelled</SelectItem>
                    <SelectItem value="Customer request">Customer request</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {refundReason === 'Other' && (
                <div>
                  <Label htmlFor="otherReason" className="text-gray-300">Specify Reason</Label>
                  <Input
                    id="otherReason"
                    placeholder="Enter reason"
                    className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                  />
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsRefundDialogOpen(false)
                setRefundAmount(0)
                setRefundReason('')
              }}
              className="border-gray-700 text-white hover:bg-gray-800 hover:border-purple-500/50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRefund}
              disabled={!refundAmount || refundAmount <= 0 || !refundReason}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Process Refund
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </LayoutWrapper>
  )
}