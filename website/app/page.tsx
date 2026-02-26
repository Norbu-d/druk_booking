'use client'

import { LayoutWrapper } from '@/components/layout-wrapper'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  BarChart3,
  TrendingUp,
  Users,
  Ticket,
  DollarSign,
  Calendar,
  Film,
  RefreshCw,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Popcorn,
  Clapperboard,
  Star,
  TrendingDown
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function HomePage() {
  const [timeRange, setTimeRange] = useState('week')

  // Sample data for charts and stats
  const stats = {
    totalRevenue: 45230,
    totalBookings: 342,
    totalUsers: 156,
    totalMovies: 24,
    revenueChange: 12.5,
    bookingsChange: 8.2,
    usersChange: 5.7,
    occupancyRate: 78
  }

  const recentBookings = [
    { id: 1, movie: 'Inception', user: 'John Doe', time: '10:30 AM', seats: 'A1, A2', amount: '$28.50', status: 'completed' },
    { id: 2, movie: 'The Dark Knight', user: 'Jane Smith', time: '2:15 PM', seats: 'B5, B6', amount: '$32.00', status: 'completed' },
    { id: 3, movie: 'Interstellar', user: 'Bob Johnson', time: '6:45 PM', seats: 'C3, C4', amount: '$30.00', status: 'pending' },
    { id: 4, movie: 'Dune: Part Two', user: 'Alice Brown', time: '8:00 PM', seats: 'D7, D8', amount: '$35.50', status: 'completed' },
    { id: 5, movie: 'Oppenheimer', user: 'Charlie Wilson', time: '9:30 PM', seats: 'E9, E10', amount: '$29.00', status: 'cancelled' },
  ]

  // Updated topMovies with fixed trend percentages to fix hydration error
  const topMovies = [
    { title: 'Dune: Part Two', revenue: 18500, bookings: 142, rating: 4.8, trend: 'up', trendPercentage: 12 },
    { title: 'Oppenheimer', revenue: 16200, bookings: 128, rating: 4.7, trend: 'up', trendPercentage: 8 },
    { title: 'Spider-Man: No Way Home', revenue: 14500, bookings: 112, rating: 4.6, trend: 'down', trendPercentage: 7 },
    { title: 'The Batman', revenue: 13200, bookings: 98, rating: 4.5, trend: 'up', trendPercentage: 15 },
    { title: 'Top Gun: Maverick', revenue: 11800, bookings: 86, rating: 4.9, trend: 'up', trendPercentage: 10 },
  ]

  const revenueData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [4500, 5200, 4800, 6100, 7300, 8500, 9200]
  }

  const bookingData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [1200, 1900, 1500, 2100, 1800, 2200]
  }

  return (
    <LayoutWrapper>
      <div className="space-y-6">
        {/* Header with Stats */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                <Clapperboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Cinema Dashboard</h1>
                <p className="text-gray-400">Welcome back! Here's what's happening with your cinema today.</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gray-700 text-white hover:border-yellow-500/50 hover:bg-yellow-500/10">
                  <Calendar className="w-4 h-4 mr-2" />
                  This Week
                  <MoreVertical className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border-gray-800 text-white">
                <DropdownMenuItem onClick={() => setTimeRange('day')} className="hover:bg-yellow-500/10 cursor-pointer">Today</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeRange('week')} className="hover:bg-yellow-500/10 cursor-pointer">This Week</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeRange('month')} className="hover:bg-yellow-500/10 cursor-pointer">This Month</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeRange('year')} className="hover:bg-yellow-500/10 cursor-pointer">This Year</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Revenue Card */}
          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Revenue
              </CardTitle>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-yellow-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</div>
              <div className="flex items-center text-sm mt-2">
                <ArrowUpRight className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-yellow-400">+{stats.revenueChange}%</span>
                <span className="text-gray-400 ml-2">from last week</span>
              </div>
            </CardContent>
          </Card>

          {/* Bookings Card */}
          <Card className="bg-gradient-to-br from-gray-900 to-black border-orange-500/20 hover:border-orange-500/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Bookings
              </CardTitle>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center">
                <Ticket className="w-5 h-5 text-orange-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalBookings}</div>
              <div className="flex items-center text-sm mt-2">
                <ArrowUpRight className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-yellow-400">+{stats.bookingsChange}%</span>
                <span className="text-gray-400 ml-2">from last week</span>
              </div>
            </CardContent>
          </Card>

          {/* Users Card */}
          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-600/20 hover:border-yellow-600/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Users
              </CardTitle>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-600/20 to-orange-600/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-yellow-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
              <div className="flex items-center text-sm mt-2">
                <ArrowUpRight className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-yellow-400">+{stats.usersChange}%</span>
                <span className="text-gray-400 ml-2">from last week</span>
              </div>
            </CardContent>
          </Card>

          {/* Movies Card */}
          <Card className="bg-gradient-to-br from-gray-900 to-black border-orange-600/20 hover:border-orange-600/40 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Active Movies
              </CardTitle>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-600/20 to-yellow-600/20 flex items-center justify-center">
                <Film className="w-5 h-5 text-orange-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalMovies}</div>
              <div className="mt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Occupancy Rate</span>
                  <span className="text-yellow-400">{stats.occupancyRate}%</span>
                </div>
                <Progress value={stats.occupancyRate} className="h-2 bg-gray-800">
                  <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full" />
                </Progress>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart Card */}
          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Revenue Overview</CardTitle>
                  <CardDescription className="text-gray-400">Weekly revenue trends</CardDescription>
                </div>
                <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30 text-yellow-400">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12.5%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 relative">
                {/* Simplified Chart Visualization */}
                <div className="absolute bottom-0 left-0 right-0 h-48 flex items-end justify-between px-4">
                  {revenueData.data.map((value, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="w-8 bg-gradient-to-t from-yellow-500 to-orange-500 rounded-t-lg transition-all hover:from-yellow-400 hover:to-orange-400 shadow-lg"
                        style={{ height: `${(value / 10000) * 100}%` }}
                      />
                      <span className="text-xs text-gray-400 mt-2">{revenueData.labels[index]}</span>
                    </div>
                  ))}
                </div>
                
                {/* Grid Lines */}
                <div className="absolute inset-0">
                  {[0, 25, 50, 75, 100].map((line) => (
                    <div 
                      key={line}
                      className="absolute left-0 right-0 border-t border-gray-800/50"
                      style={{ bottom: `${line}%` }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <div>
                  <p className="text-sm text-gray-400">Average Daily Revenue</p>
                  <p className="text-xl font-bold text-white">$6,457</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Peak Revenue Day</p>
                  <p className="text-xl font-bold text-white">Sunday</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bookings Chart Card */}
          <Card className="bg-gradient-to-br from-gray-900 to-black border-orange-500/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Bookings Trend</CardTitle>
                  <CardDescription className="text-gray-400">Monthly booking statistics</CardDescription>
                </div>
                <Badge className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border-orange-500/30 text-orange-400">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8.2%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 relative">
                {/* Line Chart Visualization */}
                <div className="absolute bottom-0 left-0 right-0 h-48">
                  <svg className="w-full h-full" viewBox="0 0 400 200">
                    <path
                      d="M 0,160 L 66,140 L 133,150 L 200,110 L 266,130 L 333,100 L 400,80"
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="3"
                      className="drop-shadow-lg"
                    />
                    <path
                      d="M 0,160 L 66,140 L 133,150 L 200,110 L 266,130 L 333,100 L 400,80 L 400,200 L 0,200 Z"
                      fill="url(#areaGradient)"
                      fillOpacity="0.2"
                    />
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#f97316" />
                      </linearGradient>
                      <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Labels */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
                    {bookingData.labels.map((label, index) => (
                      <span key={index} className="text-xs text-gray-400">{label}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <div>
                  <p className="text-sm text-gray-400">Total Bookings This Month</p>
                  <p className="text-xl font-bold text-white">2,200</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Avg. Booking Value</p>
                  <p className="text-xl font-bold text-white">$29.50</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section - Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings Table */}
          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Recent Bookings</CardTitle>
                  <CardDescription className="text-gray-400">Latest customer bookings</CardDescription>
                </div>
                <Link href="/bookings">
                  <Button variant="ghost" className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">Movie</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">User</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">Amount</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                        <td className="py-3 px-2">
                          <div className="font-medium text-white flex items-center gap-2">
                            <Popcorn className="w-4 h-4 text-yellow-500" />
                            {booking.movie}
                          </div>
                          <div className="text-xs text-gray-400">{booking.time} • {booking.seats}</div>
                        </td>
                        <td className="py-3 px-2 text-white">{booking.user}</td>
                        <td className="py-3 px-2 text-white font-medium">{booking.amount}</td>
                        <td className="py-3 px-2">
                          <Badge className={
                            booking.status === 'completed' 
                              ? 'bg-gradient-to-r from-yellow-500/20 to-green-500/20 text-yellow-400 border-yellow-500/30' 
                              : booking.status === 'pending'
                              ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30'
                              : 'bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-400 border-red-500/30'
                          }>
                            {booking.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Top Movies Table - Fixed hydration error by using fixed percentages */}
          <Card className="bg-gradient-to-br from-gray-900 to-black border-orange-500/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Top Performing Movies</CardTitle>
                  <CardDescription className="text-gray-400">By revenue this month</CardDescription>
                </div>
                <Link href="/movies">
                  <Button variant="ghost" className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10">
                    Manage Movies
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topMovies.map((movie, index) => (
                  <div key={movie.title} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800/30 group">
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white shadow-lg",
                        index === 0 ? "bg-gradient-to-br from-yellow-500 to-yellow-600" :
                        index === 1 ? "bg-gradient-to-br from-orange-500 to-orange-600" :
                        "bg-gradient-to-br from-gray-800 to-gray-900"
                      )}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-white group-hover:text-yellow-300 transition-colors">
                          {movie.title}
                        </div>
                        <div className="flex items-center text-sm">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-yellow-400 ml-1">{movie.rating}</span>
                          <span className="text-gray-400 mx-2">•</span>
                          <span className="text-gray-400">{movie.bookings} bookings</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white">${movie.revenue.toLocaleString()}</div>
                      <div className="flex items-center text-sm">
                        {movie.trend === 'up' ? (
                          <ArrowUpRight className="w-3 h-3 text-yellow-400 mr-1" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 text-red-400 mr-1" />
                        )}
                        {/* Fixed: Using deterministic trendPercentage instead of Math.random() */}
                        <span className={movie.trend === 'up' ? 'text-yellow-400' : 'text-red-400'}>
                          {movie.trend === 'up' ? '+' : '-'}{movie.trendPercentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
            <CardDescription className="text-gray-400">Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/movies">
                <Button className="w-full h-20 flex-col bg-gradient-to-br from-yellow-500/10 to-orange-500/10 hover:from-yellow-500/20 hover:to-orange-500/20 border border-yellow-500/30 hover:border-yellow-500/50 group">
                  <Film className="w-6 h-6 mb-2 text-yellow-400 group-hover:text-yellow-300" />
                  <span className="font-medium text-white">Manage Movies</span>
                  <span className="text-sm text-gray-400 mt-1">Add/Edit movies</span>
                </Button>
              </Link>
              
              <Link href="/showtimes">
                <Button className="w-full h-20 flex-col bg-gradient-to-br from-orange-500/10 to-yellow-500/10 hover:from-orange-500/20 hover:to-yellow-500/20 border border-orange-500/30 hover:border-orange-500/50 group">
                  <Calendar className="w-6 h-6 mb-2 text-orange-400 group-hover:text-orange-300" />
                  <span className="font-medium text-white">Schedule Showtimes</span>
                  <span className="text-sm text-gray-400 mt-1">Set movie times</span>
                </Button>
              </Link>
              
              <Link href="/bookings">
                <Button className="w-full h-20 flex-col bg-gradient-to-br from-yellow-600/10 to-orange-600/10 hover:from-yellow-600/20 hover:to-orange-600/20 border border-yellow-600/30 hover:border-yellow-600/50 group">
                  <Ticket className="w-6 h-6 mb-2 text-yellow-500 group-hover:text-yellow-400" />
                  <span className="font-medium text-white">View Bookings</span>
                  <span className="text-sm text-gray-400 mt-1">Check reservations</span>
                </Button>
              </Link>
              
              <Link href="/analytics">
                <Button className="w-full h-20 flex-col bg-gradient-to-br from-orange-600/10 to-yellow-600/10 hover:from-orange-600/20 hover:to-yellow-600/20 border border-orange-600/30 hover:border-orange-600/50 group">
                  <BarChart3 className="w-6 h-6 mb-2 text-orange-500 group-hover:text-orange-400" />
                  <span className="font-medium text-white">Advanced Analytics</span>
                  <span className="text-sm text-gray-400 mt-1">Detailed reports</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutWrapper>
  )
}