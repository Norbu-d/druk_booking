// app/admin/analytics/page.tsx
'use client'

import { useState } from 'react'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { Button } from '@/components/ui/button'
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Ticket,
  DollarSign,
  Film,
  Calendar,
  Clock,
  Percent,
  Award,
  Download,
  Printer,
  RefreshCw,
  Calendar as CalendarIcon,
  Eye,
  Star,
  Heart,
  Share2,
  Activity,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Smartphone,
  Laptop,
  Monitor,
  Tablet,
  Globe,
  MapPin,
  Wallet,
  CreditCard,
  Landmark,
  Smartphone as SmartphoneIcon,
  Gift
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Sector
} from 'recharts'

// Types
type TimeRange = 'today' | 'week' | 'month' | 'quarter' | 'year' | 'custom'
type MetricType = 'revenue' | 'bookings' | 'attendance' | 'occupancy'

// Mock data for charts
const revenueData = [
  { name: 'Mon', revenue: 4500, bookings: 45, attendance: 380 },
  { name: 'Tue', revenue: 5200, bookings: 52, attendance: 410 },
  { name: 'Wed', revenue: 4800, bookings: 48, attendance: 395 },
  { name: 'Thu', revenue: 6100, bookings: 61, attendance: 520 },
  { name: 'Fri', revenue: 7300, bookings: 73, attendance: 650 },
  { name: 'Sat', revenue: 8500, bookings: 85, attendance: 780 },
  { name: 'Sun', revenue: 9200, bookings: 92, attendance: 820 },
]

const monthlyRevenueData = [
  { name: 'Jan', revenue: 125000, bookings: 1250, attendance: 11200 },
  { name: 'Feb', revenue: 142000, bookings: 1420, attendance: 12800 },
  { name: 'Mar', revenue: 168000, bookings: 1680, attendance: 15100 },
  { name: 'Apr', revenue: 154000, bookings: 1540, attendance: 13800 },
  { name: 'May', revenue: 189000, bookings: 1890, attendance: 17000 },
  { name: 'Jun', revenue: 210000, bookings: 2100, attendance: 18900 },
]

const moviePerformanceData = [
  { name: 'Dobchu', revenue: 45600, bookings: 380, rating: 4.8, occupancy: 92 },
  { name: 'Karma', revenue: 38900, bookings: 324, rating: 4.6, occupancy: 88 },
  { name: 'The Last Dragon', revenue: 52300, bookings: 435, rating: 4.9, occupancy: 95 },
  { name: 'Midnight Shadows', revenue: 28700, bookings: 239, rating: 4.3, occupancy: 79 },
  { name: "Ocean's Whisper", revenue: 34200, bookings: 285, rating: 4.5, occupancy: 84 },
]

const timeSlotData = [
  { time: '10:00 - 13:00', bookings: 320, revenue: 4800, occupancy: 65 },
  { time: '13:00 - 16:00', bookings: 580, revenue: 8700, occupancy: 78 },
  { time: '16:00 - 19:00', bookings: 720, revenue: 10800, occupancy: 85 },
  { time: '19:00 - 22:00', bookings: 890, revenue: 13350, occupancy: 92 },
  { time: '22:00 - 01:00', bookings: 450, revenue: 6750, occupancy: 70 },
]

const demographicData = [
  { name: '18-24', value: 25 },
  { name: '25-34', value: 35 },
  { name: '35-44', value: 20 },
  { name: '45-54', value: 12 },
  { name: '55+', value: 8 },
]

const genreData = [
  { name: 'Action', value: 28 },
  { name: 'Drama', value: 22 },
  { name: 'Comedy', value: 18 },
  { name: 'Thriller', value: 15 },
  { name: 'Sci-Fi', value: 12 },
  { name: 'Romance', value: 5 },
]

const deviceData = [
  { name: 'Mobile', value: 45, icon: Smartphone },
  { name: 'Desktop', value: 30, icon: Monitor },
  { name: 'Tablet', value: 15, icon: Tablet },
  { name: 'Other', value: 10, icon: Globe },
]

const paymentMethodData = [
  { name: 'Credit Card', value: 55, icon: CreditCard },
  { name: 'Debit Card', value: 20, icon: CreditCard },
  { name: 'Online Wallet', value: 15, icon: SmartphoneIcon },
  { name: 'Cash', value: 7, icon: Wallet },
  { name: 'Gift Card', value: 3, icon: Gift },
]

const COLORS = [
  '#f59e0b', '#f97316', '#fbbf24', '#fb923c', '#fdba74',
  '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e'
]

const RADIAN = Math.PI / 180

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-yellow-500/30 rounded-lg p-3 shadow-xl">
        <p className="text-sm text-gray-400 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.name === 'revenue' || entry.name === 'Revenue' 
              ? `$${entry.value.toLocaleString()}` 
              : entry.value.toLocaleString()}
            {entry.name === 'occupancy' && '%'}
            {entry.name === 'rating' && ' ★'}
          </p>
        ))}
      </div>
    )
  }
  return null
}

// Custom active shape for pie chart
const renderActiveShape = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#fff" className="text-sm font-medium">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#fff" className="text-xs">
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    </g>
  )
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('week')
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('revenue')
  const [isLoading, setIsLoading] = useState(false)

  // Handle refresh
  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  // Calculate summary metrics
  const summaryMetrics = {
    totalRevenue: 45230,
    revenueChange: 12.5,
    totalBookings: 342,
    bookingsChange: 8.2,
    totalAttendance: 2950,
    attendanceChange: 10.1,
    averageOccupancy: 78,
    occupancyChange: 5.3,
    averageTicketPrice: 13.25,
    ticketPriceChange: -2.1,
    conversionRate: 23.5,
    conversionChange: 3.2,
    customerSatisfaction: 4.6,
    satisfactionChange: 0.3,
    repeatCustomers: 42,
    repeatChange: 7.8
  }

  // Get change icon and color
  const getChangeIcon = (change: number) => {
    if (change > 0) return { icon: ArrowUpRight, color: 'text-green-400' }
    if (change < 0) return { icon: ArrowDownRight, color: 'text-red-400' }
    return { icon: Minus, color: 'text-gray-400' }
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value}%`
  }

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  // Get metric data based on time range
  const getMetricData = () => {
    switch (timeRange) {
      case 'today':
        return revenueData.slice(0, 1)
      case 'week':
        return revenueData
      case 'month':
        return monthlyRevenueData
      default:
        return revenueData
    }
  }

  const metricData = getMetricData()

  // Get chart title
  const getChartTitle = () => {
    switch (selectedMetric) {
      case 'revenue':
        return 'Revenue Trend'
      case 'bookings':
        return 'Bookings Trend'
      case 'attendance':
        return 'Attendance Trend'
      case 'occupancy':
        return 'Occupancy Rate'
    }
  }

  // Get chart data key
  const getDataKey = () => {
    switch (selectedMetric) {
      case 'revenue':
        return 'revenue'
      case 'bookings':
        return 'bookings'
      case 'attendance':
        return 'attendance'
      case 'occupancy':
        return 'occupancy'
    }
  }

  // Get chart color
  const getChartColor = () => {
    switch (selectedMetric) {
      case 'revenue':
        return '#f59e0b'
      case 'bookings':
        return '#10b981'
      case 'attendance':
        return '#3b82f6'
      case 'occupancy':
        return '#8b5cf6'
    }
  }

  // Get Y axis label
  const getYAxisLabel = () => {
    switch (selectedMetric) {
      case 'revenue':
        return 'Revenue ($)'
      case 'bookings':
        return 'Number of Bookings'
      case 'attendance':
        return 'Attendees'
      case 'occupancy':
        return 'Occupancy %'
    }
  }

  // Handle pie chart click
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  return (
    <LayoutWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
                <p className="text-gray-400">Comprehensive insights and performance metrics</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
              <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                <CalendarIcon className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={cn("w-4 h-4 mr-2", isLoading && "animate-spin")} />
              Refresh
            </Button>
            
            <Button
              variant="outline"
              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Revenue Card */}
          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Revenue
              </CardTitle>
              <DollarSign className="w-4 h-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatCurrency(summaryMetrics.totalRevenue)}</div>
              <div className="flex items-center text-sm mt-2">
                {(() => {
                  const { icon: Icon, color } = getChangeIcon(summaryMetrics.revenueChange)
                  return (
                    <>
                      <Icon className={cn("w-4 h-4 mr-1", color)} />
                      <span className={color}>{Math.abs(summaryMetrics.revenueChange)}%</span>
                    </>
                  )
                })()}
                <span className="text-gray-400 ml-2">vs last period</span>
              </div>
            </CardContent>
          </Card>

          {/* Bookings Card */}
          <Card className="bg-gradient-to-br from-gray-900 to-black border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Bookings
              </CardTitle>
              <Ticket className="w-4 h-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatNumber(summaryMetrics.totalBookings)}</div>
              <div className="flex items-center text-sm mt-2">
                {(() => {
                  const { icon: Icon, color } = getChangeIcon(summaryMetrics.bookingsChange)
                  return (
                    <>
                      <Icon className={cn("w-4 h-4 mr-1", color)} />
                      <span className={color}>{Math.abs(summaryMetrics.bookingsChange)}%</span>
                    </>
                  )
                })()}
                <span className="text-gray-400 ml-2">vs last period</span>
              </div>
            </CardContent>
          </Card>

          {/* Attendance Card */}
          <Card className="bg-gradient-to-br from-gray-900 to-black border-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Attendance
              </CardTitle>
              <Users className="w-4 h-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatNumber(summaryMetrics.totalAttendance)}</div>
              <div className="flex items-center text-sm mt-2">
                {(() => {
                  const { icon: Icon, color } = getChangeIcon(summaryMetrics.attendanceChange)
                  return (
                    <>
                      <Icon className={cn("w-4 h-4 mr-1", color)} />
                      <span className={color}>{Math.abs(summaryMetrics.attendanceChange)}%</span>
                    </>
                  )
                })()}
                <span className="text-gray-400 ml-2">vs last period</span>
              </div>
            </CardContent>
          </Card>

          {/* Occupancy Card */}
          <Card className="bg-gradient-to-br from-gray-900 to-black border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Avg. Occupancy
              </CardTitle>
              <Percent className="w-4 h-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatPercentage(summaryMetrics.averageOccupancy)}</div>
              <div className="flex items-center text-sm mt-2">
                {(() => {
                  const { icon: Icon, color } = getChangeIcon(summaryMetrics.occupancyChange)
                  return (
                    <>
                      <Icon className={cn("w-4 h-4 mr-1", color)} />
                      <span className={color}>{Math.abs(summaryMetrics.occupancyChange)}%</span>
                    </>
                  )
                })()}
                <span className="text-gray-400 ml-2">vs last period</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Avg. Ticket Price</span>
                <Ticket className="w-4 h-4 text-yellow-500" />
              </div>
              <div className="text-xl font-bold text-white">{formatCurrency(summaryMetrics.averageTicketPrice)}</div>
              <div className="flex items-center text-xs mt-1">
                {(() => {
                  const { icon: Icon, color } = getChangeIcon(summaryMetrics.ticketPriceChange)
                  return (
                    <>
                      <Icon className={cn("w-3 h-3 mr-1", color)} />
                      <span className={color}>{Math.abs(summaryMetrics.ticketPriceChange)}%</span>
                    </>
                  )
                })()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Conversion Rate</span>
                <Target className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-xl font-bold text-white">{formatPercentage(summaryMetrics.conversionRate)}</div>
              <div className="flex items-center text-xs mt-1">
                {(() => {
                  const { icon: Icon, color } = getChangeIcon(summaryMetrics.conversionChange)
                  return (
                    <>
                      <Icon className={cn("w-3 h-3 mr-1", color)} />
                      <span className={color}>{Math.abs(summaryMetrics.conversionChange)}%</span>
                    </>
                  )
                })()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Customer Satisfaction</span>
                <Star className="w-4 h-4 text-yellow-500" />
              </div>
              <div className="text-xl font-bold text-white">{summaryMetrics.customerSatisfaction} / 5</div>
              <div className="flex items-center text-xs mt-1">
                {(() => {
                  const { icon: Icon, color } = getChangeIcon(summaryMetrics.satisfactionChange)
                  return (
                    <>
                      <Icon className={cn("w-3 h-3 mr-1", color)} />
                      <span className={color}>{Math.abs(summaryMetrics.satisfactionChange)}</span>
                    </>
                  )
                })()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Repeat Customers</span>
                <Heart className="w-4 h-4 text-red-400" />
              </div>
              <div className="text-xl font-bold text-white">{formatPercentage(summaryMetrics.repeatCustomers)}</div>
              <div className="flex items-center text-xs mt-1">
                {(() => {
                  const { icon: Icon, color } = getChangeIcon(summaryMetrics.repeatChange)
                  return (
                    <>
                      <Icon className={cn("w-3 h-3 mr-1", color)} />
                      <span className={color}>{Math.abs(summaryMetrics.repeatChange)}%</span>
                    </>
                  )
                })()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chart */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">{getChartTitle()}</CardTitle>
                <CardDescription className="text-gray-400">
                  {timeRange === 'today' ? 'Hourly' : timeRange === 'week' ? 'Daily' : 'Monthly'} performance
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "border-gray-700",
                    selectedMetric === 'revenue' && "bg-yellow-500/10 border-yellow-500 text-yellow-400"
                  )}
                  onClick={() => setSelectedMetric('revenue')}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Revenue
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "border-gray-700",
                    selectedMetric === 'bookings' && "bg-green-500/10 border-green-500 text-green-400"
                  )}
                  onClick={() => setSelectedMetric('bookings')}
                >
                  <Ticket className="w-4 h-4 mr-2" />
                  Bookings
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "border-gray-700",
                    selectedMetric === 'attendance' && "bg-blue-500/10 border-blue-500 text-blue-400"
                  )}
                  onClick={() => setSelectedMetric('attendance')}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Attendance
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "border-gray-700",
                    selectedMetric === 'occupancy' && "bg-purple-500/10 border-purple-500 text-purple-400"
                  )}
                  onClick={() => setSelectedMetric('occupancy')}
                >
                  <Percent className="w-4 h-4 mr-2" />
                  Occupancy
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metricData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={getChartColor()} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={getChartColor()} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" label={{ value: getYAxisLabel(), angle: -90, position: 'insideLeft', fill: '#9CA3AF' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey={getDataKey()} 
                    stroke={getChartColor()} 
                    fillOpacity={1} 
                    fill="url(#colorMetric)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Movie Performance */}
          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-white">Top Movies Performance</CardTitle>
              <CardDescription className="text-gray-400">
                Revenue and bookings by movie
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={moviePerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" angle={-45} textAnchor="end" height={80} />
                    <YAxis yAxisId="left" orientation="left" stroke="#f59e0b" />
                    <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="revenue" name="Revenue ($)" fill="#f59e0b" />
                    <Bar yAxisId="right" dataKey="bookings" name="Bookings" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-3">
                {moviePerformanceData.slice(0, 3).map((movie, index) => (
                  <div key={movie.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center p-0",
                        index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-500" : "bg-orange-600"
                      )}>
                        {index + 1}
                      </Badge>
                      <span className="text-white">{movie.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400">⭐ {movie.rating}</span>
                      <span className="text-sm text-yellow-400">{formatCurrency(movie.revenue)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Time Slot Analysis */}
          <Card className="bg-gradient-to-br from-gray-900 to-black border-orange-500/20">
            <CardHeader>
              <CardTitle className="text-white">Time Slot Analysis</CardTitle>
              <CardDescription className="text-gray-400">
                Performance by showtime
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timeSlotData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis yAxisId="left" orientation="left" stroke="#f59e0b" />
                    <YAxis yAxisId="right" orientation="right" stroke="#8b5cf6" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="bookings" name="Bookings" fill="#f59e0b" />
                    <Bar yAxisId="right" dataKey="occupancy" name="Occupancy %" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="bg-gray-800/50 p-3 rounded-lg">
                  <p className="text-xs text-gray-400">Peak Time</p>
                  <p className="text-white font-medium">19:00 - 22:00</p>
                  <p className="text-xs text-green-400">890 bookings</p>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg">
                  <p className="text-xs text-gray-400">Best Occupancy</p>
                  <p className="text-white font-medium">19:00 - 22:00</p>
                  <p className="text-xs text-green-400">92%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demographics */}
          <Card className="bg-gradient-to-br from-gray-900 to-black border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Audience Demographics</CardTitle>
              <CardDescription className="text-gray-400">
                Age distribution of customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      data={demographicData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#f59e0b"
                      dataKey="value"
                      onMouseEnter={onPieEnter}
                    >
                      {demographicData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {demographicData.slice(0, 4).map((age, index) => (
                  <div key={age.name} className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{age.name}</span>
                    <span className="text-white">{age.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Genre Preferences */}
          <Card className="bg-gradient-to-br from-gray-900 to-black border-pink-500/20">
            <CardHeader>
              <CardTitle className="text-white">Genre Preferences</CardTitle>
              <CardDescription className="text-gray-400">
                Most popular movie genres
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {genreData.map((genre) => (
                  <div key={genre.name} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">{genre.name}</span>
                      <span className="text-white">{genre.value}%</span>
                    </div>
                    <Progress value={genre.value} className="h-2 bg-gray-800">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                        style={{ width: `${genre.value}%` }}
                      />
                    </Progress>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Device & Payment Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Device Distribution */}
          <Card className="bg-gradient-to-br from-gray-900 to-black border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white">Device Distribution</CardTitle>
              <CardDescription className="text-gray-400">
                How customers are booking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        fill="#f59e0b"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {deviceData.map((device) => {
                    const Icon = device.icon
                    return (
                      <div key={device.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-300">{device.name}</span>
                        </div>
                        <span className="text-sm text-white">{device.value}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="bg-gradient-to-br from-gray-900 to-black border-green-500/20">
            <CardHeader>
              <CardTitle className="text-white">Payment Methods</CardTitle>
              <CardDescription className="text-gray-400">
                Preferred payment options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={paymentMethodData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        fill="#f59e0b"
                        dataKey="value"
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {paymentMethodData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {paymentMethodData.map((method) => {
                    const Icon = method.icon
                    return (
                      <div key={method.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-300">{method.name}</span>
                        </div>
                        <span className="text-sm text-white">{method.value}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Insights */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-white">Key Insights</CardTitle>
            <CardDescription className="text-gray-400">
              Actionable takeaways from your data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-yellow-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-medium text-white">Peak Performance</h3>
                </div>
                <p className="text-sm text-gray-400">
                  Saturday evenings (19:00-22:00) generate 35% more revenue than average. Consider adding more screenings during this time.
                </p>
              </div>
              
              <div className="bg-gray-800/50 p-4 rounded-lg border border-green-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <h3 className="font-medium text-white">Growth Opportunity</h3>
                </div>
                <p className="text-sm text-gray-400">
                  Mobile bookings are up 15% this month. Optimize your mobile booking experience to capture this growing segment.
                </p>
              </div>
              
              <div className="bg-gray-800/50 p-4 rounded-lg border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-purple-400" />
                  <h3 className="font-medium text-white">Customer Insight</h3>
                </div>
                <p className="text-sm text-gray-400">
                  The 25-34 age group makes up 35% of your audience. Consider targeted marketing campaigns for this demographic.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutWrapper>
  )
}