// app/admin/users/page.tsx
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
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Users,
  UserPlus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Search,
  AlertCircle,
  Mail,
  Phone,
  Calendar,
  Film,
  Ticket,
  CreditCard,
  Clock,
  Star,
  Shield,
  UserCog,
  Ban,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Printer,
  MapPin,
  Award,
  TrendingUp
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

// Types
type UserRole = 'customer' | 'admin' | 'staff' | 'manager'
type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending'
type MembershipTier = 'bronze' | 'silver' | 'gold' | 'platinum'

type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth?: Date
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say'
  role: UserRole
  status: UserStatus
  membershipTier: MembershipTier
  loyaltyPoints: number
  totalBookings: number
  totalSpent: number
  joinDate: Date
  lastActive?: Date
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  preferences?: {
    emailNotifications: boolean
    smsNotifications: boolean
    marketingEmails: boolean
    preferredGenres: string[]
  }
  avatar?: string
  notes?: string
}

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: new Date(1990, 5, 15),
    gender: 'male',
    role: 'customer',
    status: 'active',
    membershipTier: 'gold',
    loyaltyPoints: 1250,
    totalBookings: 24,
    totalSpent: 456.75,
    joinDate: new Date(2024, 0, 15),
    lastActive: new Date(2025, 1, 19),
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    preferences: {
      emailNotifications: true,
      smsNotifications: true,
      marketingEmails: false,
      preferredGenres: ['Action', 'Thriller']
    }
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@email.com',
    phone: '+1 (555) 234-5678',
    dateOfBirth: new Date(1988, 8, 22),
    gender: 'female',
    role: 'customer',
    status: 'active',
    membershipTier: 'platinum',
    loyaltyPoints: 3450,
    totalBookings: 52,
    totalSpent: 1250.50,
    joinDate: new Date(2023, 5, 10),
    lastActive: new Date(2025, 1, 20),
    address: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA'
    },
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: true,
      preferredGenres: ['Drama', 'Romance', 'Comedy']
    }
  },
  {
    id: '3',
    firstName: 'Robert',
    lastName: 'Johnson',
    email: 'robert.j@email.com',
    phone: '+1 (555) 345-6789',
    dateOfBirth: new Date(1975, 2, 5),
    gender: 'male',
    role: 'staff',
    status: 'active',
    membershipTier: 'silver',
    loyaltyPoints: 850,
    totalBookings: 12,
    totalSpent: 210.25,
    joinDate: new Date(2024, 8, 1),
    lastActive: new Date(2025, 1, 18),
    address: {
      street: '789 Pine St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    },
    preferences: {
      emailNotifications: true,
      smsNotifications: true,
      marketingEmails: true,
      preferredGenres: ['Sci-Fi', 'Fantasy']
    }
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Brown',
    email: 'emily.b@email.com',
    phone: '+1 (555) 456-7890',
    dateOfBirth: new Date(1995, 11, 10),
    gender: 'female',
    role: 'customer',
    status: 'active',
    membershipTier: 'bronze',
    loyaltyPoints: 320,
    totalBookings: 5,
    totalSpent: 87.50,
    joinDate: new Date(2024, 11, 5),
    lastActive: new Date(2025, 1, 15),
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: false,
      preferredGenres: ['Horror', 'Thriller']
    }
  },
  {
    id: '5',
    firstName: 'Michael',
    lastName: 'Wilson',
    email: 'michael.w@email.com',
    phone: '+1 (555) 567-8901',
    dateOfBirth: new Date(1982, 3, 18),
    gender: 'male',
    role: 'manager',
    status: 'active',
    membershipTier: 'gold',
    loyaltyPoints: 2100,
    totalBookings: 38,
    totalSpent: 890.00,
    joinDate: new Date(2023, 2, 20),
    lastActive: new Date(2025, 1, 19),
    address: {
      street: '321 Elm Blvd',
      city: 'Houston',
      state: 'TX',
      zipCode: '77001',
      country: 'USA'
    },
    preferences: {
      emailNotifications: true,
      smsNotifications: true,
      marketingEmails: false,
      preferredGenres: ['Action', 'Adventure', 'Documentary']
    }
  },
  {
    id: '6',
    firstName: 'Sarah',
    lastName: 'Davis',
    email: 'sarah.d@email.com',
    phone: '+1 (555) 678-9012',
    dateOfBirth: new Date(1992, 6, 30),
    gender: 'female',
    role: 'customer',
    status: 'inactive',
    membershipTier: 'bronze',
    loyaltyPoints: 150,
    totalBookings: 3,
    totalSpent: 42.75,
    joinDate: new Date(2024, 9, 12),
    lastActive: new Date(2024, 11, 28),
    preferences: {
      emailNotifications: true,
      smsNotifications: true,
      marketingEmails: true,
      preferredGenres: ['Comedy', 'Family']
    }
  },
  {
    id: '7',
    firstName: 'David',
    lastName: 'Miller',
    email: 'david.m@email.com',
    phone: '+1 (555) 789-0123',
    dateOfBirth: new Date(1985, 9, 8),
    gender: 'male',
    role: 'admin',
    status: 'active',
    membershipTier: 'platinum',
    loyaltyPoints: 5600,
    totalBookings: 87,
    totalSpent: 2450.30,
    joinDate: new Date(2022, 6, 4),
    lastActive: new Date(2025, 1, 20),
    address: {
      street: '555 Cedar Ln',
      city: 'Phoenix',
      state: 'AZ',
      zipCode: '85001',
      country: 'USA'
    },
    preferences: {
      emailNotifications: true,
      smsNotifications: true,
      marketingEmails: false,
      preferredGenres: ['All']
    }
  },
  {
    id: '8',
    firstName: 'Jennifer',
    lastName: 'Lee',
    email: 'jennifer.l@email.com',
    phone: '+1 (555) 890-1234',
    dateOfBirth: new Date(1991, 1, 14),
    gender: 'female',
    role: 'customer',
    status: 'suspended',
    membershipTier: 'silver',
    loyaltyPoints: 450,
    totalBookings: 8,
    totalSpent: 156.25,
    joinDate: new Date(2024, 3, 22),
    lastActive: new Date(2025, 0, 5),
    preferences: {
      emailNotifications: false,
      smsNotifications: false,
      marketingEmails: false,
      preferredGenres: ['Romance', 'Drama']
    },
    notes: 'Account suspended due to multiple chargebacks'
  },
  {
    id: '9',
    firstName: 'Thomas',
    lastName: 'Anderson',
    email: 'thomas.a@email.com',
    phone: '+1 (555) 901-2345',
    dateOfBirth: new Date(1979, 11, 21),
    gender: 'male',
    role: 'customer',
    status: 'pending',
    membershipTier: 'bronze',
    loyaltyPoints: 0,
    totalBookings: 0,
    totalSpent: 0,
    joinDate: new Date(2025, 1, 18),
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: true,
      preferredGenres: ['Sci-Fi', 'Action']
    }
  },
  {
    id: '10',
    firstName: 'Lisa',
    lastName: 'Wong',
    email: 'lisa.w@email.com',
    phone: '+1 (555) 012-3456',
    dateOfBirth: new Date(1987, 4, 3),
    gender: 'female',
    role: 'staff',
    status: 'active',
    membershipTier: 'gold',
    loyaltyPoints: 1850,
    totalBookings: 31,
    totalSpent: 678.90,
    joinDate: new Date(2023, 10, 15),
    lastActive: new Date(2025, 1, 17),
    address: {
      street: '777 Maple Dr',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94101',
      country: 'USA'
    },
    preferences: {
      emailNotifications: true,
      smsNotifications: true,
      marketingEmails: false,
      preferredGenres: ['Thriller', 'Mystery', 'Crime']
    }
  }
]

// Membership tier details
const membershipTiers: Record<MembershipTier, { label: string, color: string, minPoints: number, benefits: string[] }> = {
  bronze: {
    label: 'Bronze',
    color: 'text-amber-600 bg-amber-500/10 border-amber-500/30',
    minPoints: 0,
    benefits: ['Standard seating', 'Email notifications', 'Birthday reward']
  },
  silver: {
    label: 'Silver',
    color: 'text-gray-400 bg-gray-500/10 border-gray-500/30',
    minPoints: 500,
    benefits: ['All Bronze benefits', '5% ticket discount', 'Priority booking', 'Free popcorn on Tuesday']
  },
  gold: {
    label: 'Gold',
    color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
    minPoints: 1500,
    benefits: ['All Silver benefits', '10% ticket discount', 'Free drink with every ticket', 'Exclusive screenings']
  },
  platinum: {
    label: 'Platinum',
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    minPoints: 3000,
    benefits: ['All Gold benefits', '15% ticket discount', 'Free popcorn & drink', 'VIP lounge access', 'Guest passes']
  }
}

// Role details
const roleDetails: Record<UserRole, { label: string, icon: any, color: string }> = {
  customer: {
    label: 'Customer',
    icon: Users,
    color: 'text-blue-400'
  },
  staff: {
    label: 'Staff',
    icon: UserCog,
    color: 'text-green-400'
  },
  manager: {
    label: 'Manager',
    icon: Shield,
    color: 'text-purple-400'
  },
  admin: {
    label: 'Admin',
    icon: Shield,
    color: 'text-red-400'
  }
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [tierFilter, setTierFilter] = useState<string>('all')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isBulkActionDialogOpen, setIsBulkActionDialogOpen] = useState(false)

  // New user form state
  const [newUser, setNewUser] = useState<Partial<User>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'customer',
    status: 'pending',
    membershipTier: 'bronze',
    loyaltyPoints: 0,
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: false,
      preferredGenres: []
    }
  })

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
    const matchesSearch = 
      fullName.includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      user.id.includes(searchTerm)
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    const matchesTier = tierFilter === 'all' || user.membershipTier === tierFilter
    
    return matchesSearch && matchesRole && matchesStatus && matchesTier
  })

  // Calculate statistics
  const totalUsers = users.length
  const activeUsers = users.filter(u => u.status === 'active').length
  const newThisMonth = users.filter(u => {
    const now = new Date()
    const monthAgo = new Date(now.setMonth(now.getMonth() - 1))
    return u.joinDate >= monthAgo
  }).length
  
  const totalRevenue = users.reduce((acc, u) => acc + u.totalSpent, 0)
  const totalBookings = users.reduce((acc, u) => acc + u.totalBookings, 0)
  const averageSpent = totalUsers > 0 ? totalRevenue / totalUsers : 0

  // Get status color
  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case 'active':
        return 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30'
      case 'inactive':
        return 'bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-400 border-gray-500/30'
      case 'suspended':
        return 'bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-400 border-red-500/30'
      case 'pending':
        return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30'
    }
  }

  // Get status text
  const getStatusText = (status: UserStatus) => {
    switch (status) {
      case 'active':
        return 'Active'
      case 'inactive':
        return 'Inactive'
      case 'suspended':
        return 'Suspended'
      case 'pending':
        return 'Pending'
    }
  }

  // Get membership tier badge
  const getTierBadge = (tier: MembershipTier) => {
    const tierInfo = membershipTiers[tier]
    return (
      <Badge className={cn("border", tierInfo.color)}>
        {tierInfo.label}
      </Badge>
    )
  }

  // Get role badge
  const getRoleBadge = (role: UserRole) => {
    const roleInfo = roleDetails[role]
    return (
      <Badge className={cn("border", `text-${roleInfo.color.split('-')[1]}-400 bg-${roleInfo.color.split('-')[1]}-500/10 border-${roleInfo.color.split('-')[1]}-500/30`)}>
        {roleInfo.label}
      </Badge>
    )
  }

  // Get user initials
  const getUserInitials = (user: User) => {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  // Format date
  const formatDate = (date?: Date) => {
    return date ? format(date, 'MMM d, yyyy') : 'N/A'
  }

  // Handle add user
  const handleAddUser = () => {
    const userToAdd: User = {
      id: (users.length + 1).toString(),
      firstName: newUser.firstName || '',
      lastName: newUser.lastName || '',
      email: newUser.email || '',
      phone: newUser.phone || '',
      role: newUser.role as UserRole || 'customer',
      status: newUser.status as UserStatus || 'pending',
      membershipTier: newUser.membershipTier as MembershipTier || 'bronze',
      loyaltyPoints: newUser.loyaltyPoints || 0,
      totalBookings: 0,
      totalSpent: 0,
      joinDate: new Date(),
      preferences: newUser.preferences || {
        emailNotifications: true,
        smsNotifications: false,
        marketingEmails: false,
        preferredGenres: []
      }
    }
    
    setUsers([...users, userToAdd])
    setIsAddDialogOpen(false)
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'customer',
      status: 'pending',
      membershipTier: 'bronze',
      loyaltyPoints: 0,
      preferences: {
        emailNotifications: true,
        smsNotifications: false,
        marketingEmails: false,
        preferredGenres: []
      }
    })
  }

  // Handle edit user
  const handleEditUser = () => {
    if (!selectedUser) return
    setUsers(users.map(u => 
      u.id === selectedUser.id ? selectedUser : u
    ))
    setIsEditDialogOpen(false)
    setSelectedUser(null)
  }

  // Handle delete user
  const handleDeleteUser = () => {
    if (!selectedUser) return
    setUsers(users.filter(u => u.id !== selectedUser.id))
    setIsDeleteDialogOpen(false)
    setSelectedUser(null)
  }

  // Handle status change
  const handleStatusChange = (userId: string, newStatus: UserStatus) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: newStatus } : u
    ))
  }

  return (
    <LayoutWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">User Management</h1>
                <p className="text-gray-400">Manage customers, staff, and administrators</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500"
              onClick={() => setIsBulkActionDialogOpen(true)}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Bulk Actions
            </Button>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gradient-to-b from-gray-900 to-black border-yellow-500/30 text-white max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    Add New User
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Create a new user account
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
                      <Input
                        id="firstName"
                        value={newUser.firstName}
                        onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                        placeholder="John"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
                      <Input
                        id="lastName"
                        value={newUser.lastName}
                        onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                        placeholder="Doe"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-gray-300">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                        placeholder="john.doe@email.com"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="text-gray-300">Phone</Label>
                      <Input
                        id="phone"
                        value={newUser.phone}
                        onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="role" className="text-gray-300">Role</Label>
                      <Select
                        value={newUser.role}
                        onValueChange={(value: any) => setNewUser({...newUser, role: value})}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          <SelectItem value="customer">Customer</SelectItem>
                          <SelectItem value="staff">Staff</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="status" className="text-gray-300">Status</Label>
                      <Select
                        value={newUser.status}
                        onValueChange={(value: any) => setNewUser({...newUser, status: value})}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="membershipTier" className="text-gray-300">Membership Tier</Label>
                      <Select
                        value={newUser.membershipTier}
                        onValueChange={(value: any) => setNewUser({...newUser, membershipTier: value})}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select tier" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          <SelectItem value="bronze">Bronze</SelectItem>
                          <SelectItem value="silver">Silver</SelectItem>
                          <SelectItem value="gold">Gold</SelectItem>
                          <SelectItem value="platinum">Platinum</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="loyaltyPoints" className="text-gray-300">Loyalty Points</Label>
                      <Input
                        id="loyaltyPoints"
                        type="number"
                        value={newUser.loyaltyPoints}
                        onChange={(e) => setNewUser({...newUser, loyaltyPoints: parseInt(e.target.value)})}
                        className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                        placeholder="0"
                      />
                    </div>
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
                    onClick={handleAddUser}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                  >
                    Add User
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Users
              </CardTitle>
              <Users className="w-4 h-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalUsers}</div>
              <p className="text-xs text-gray-400 mt-1">{activeUsers} active</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                New This Month
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{newThisMonth}</div>
              <p className="text-xs text-gray-400 mt-1">New signups</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Bookings
              </CardTitle>
              <Ticket className="w-4 h-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalBookings}</div>
              <p className="text-xs text-gray-400 mt-1">Across all users</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-orange-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Avg. Spend
              </CardTitle>
              <CreditCard className="w-4 h-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatCurrency(averageSpent)}</div>
              <p className="text-xs text-gray-400 mt-1">Per user</p>
            </CardContent>
          </Card>
        </div>

        {/* Membership Distribution */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(Object.keys(membershipTiers) as MembershipTier[]).map((tier) => {
            const count = users.filter(u => u.membershipTier === tier).length
            const percentage = totalUsers > 0 ? (count / totalUsers) * 100 : 0
            
            return (
              <Card key={tier} className="bg-gradient-to-br from-gray-900 to-black border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Award className={cn("w-4 h-4", membershipTiers[tier].color.split(' ')[0])} />
                    <span className="text-xs text-gray-400">{percentage.toFixed(1)}%</span>
                  </div>
                  <p className="text-sm font-medium text-white capitalize">{tier}</p>
                  <p className="text-xs text-gray-400 mt-1">{count} users</p>
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
                  placeholder="Search by name, email, phone, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                />
              </div>
              
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full lg:w-[160px] bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-[160px] bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={tierFilter} onValueChange={setTierFilter}>
                <SelectTrigger className="w-full lg:w-[160px] bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="All Tiers" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="bronze">Bronze</SelectItem>
                  <SelectItem value="silver">Silver</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="platinum">Platinum</SelectItem>
                </SelectContent>
              </Select>
              
              {(searchTerm || roleFilter !== 'all' || statusFilter !== 'all' || tierFilter !== 'all') && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSearchTerm('')
                    setRoleFilter('all')
                    setStatusFilter('all')
                    setTierFilter('all')
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-white">User List</CardTitle>
            <CardDescription className="text-gray-400">
              Showing {filteredUsers.length} of {users.length} users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-800 hover:bg-transparent">
                    <TableHead className="text-gray-300 font-medium">User</TableHead>
                    <TableHead className="text-gray-300 font-medium">Contact</TableHead>
                    <TableHead className="text-gray-300 font-medium">Role</TableHead>
                    <TableHead className="text-gray-300 font-medium">Status</TableHead>
                    <TableHead className="text-gray-300 font-medium">Membership</TableHead>
                    <TableHead className="text-gray-300 font-medium">Points</TableHead>
                    <TableHead className="text-gray-300 font-medium">Bookings</TableHead>
                    <TableHead className="text-gray-300 font-medium">Total Spent</TableHead>
                    <TableHead className="text-gray-300 font-medium">Joined</TableHead>
                    <TableHead className="text-gray-300 font-medium">Last Active</TableHead>
                    <TableHead className="text-gray-300 font-medium text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={11} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <AlertCircle className="w-12 h-12 mb-3 text-gray-600" />
                          <p className="text-lg font-medium">No users found</p>
                          <p className="text-sm">Try adjusting your filters</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 border-2 border-yellow-500/30">
                              <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
                                {getUserInitials(user)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-white">{user.firstName} {user.lastName}</div>
                              <div className="text-xs text-gray-400">ID: {user.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Mail className="w-3 h-3 text-gray-500" />
                              <span className="text-gray-300">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Phone className="w-3 h-3 text-gray-500" />
                              <span className="text-gray-300">{user.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getRoleBadge(user.role)}
                        </TableCell>
                        <TableCell>
                          <Badge className={cn("px-3 py-1", getStatusColor(user.status))}>
                            {getStatusText(user.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {getTierBadge(user.membershipTier)}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-white">{user.loyaltyPoints}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-white">{user.totalBookings}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-white">{formatCurrency(user.totalSpent)}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-gray-300">{formatDate(user.joinDate)}</div>
                        </TableCell>
                        <TableCell>
                          {user.lastActive ? (
                            <div className="text-gray-300">{formatDate(user.lastActive)}</div>
                          ) : (
                            <span className="text-gray-600">Never</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-gray-900 border-gray-800 text-white w-56">
                              <DropdownMenuLabel className="text-gray-300">Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-gray-800" />
                              <DropdownMenuItem 
                                className="cursor-pointer hover:bg-yellow-500/10 focus:bg-yellow-500/10"
                                onClick={() => {
                                  setSelectedUser(user)
                                  setIsViewDialogOpen(true)
                                }}
                              >
                                <Eye className="w-4 h-4 mr-2 text-blue-400" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="cursor-pointer hover:bg-yellow-500/10 focus:bg-yellow-500/10"
                                onClick={() => {
                                  setSelectedUser(user)
                                  setIsEditDialogOpen(true)
                                }}
                              >
                                <Edit className="w-4 h-4 mr-2 text-yellow-400" />
                                Edit User
                              </DropdownMenuItem>
                              
                              <DropdownMenuSeparator className="bg-gray-800" />
                              <DropdownMenuLabel className="text-gray-300 text-xs">Change Status</DropdownMenuLabel>
                              
                              {user.status !== 'active' && (
                                <DropdownMenuItem 
                                  className="cursor-pointer hover:bg-green-500/10 focus:bg-green-500/10"
                                  onClick={() => handleStatusChange(user.id, 'active')}
                                >
                                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                                  Set Active
                                </DropdownMenuItem>
                              )}
                              
                              {user.status !== 'inactive' && (
                                <DropdownMenuItem 
                                  className="cursor-pointer hover:bg-gray-500/10 focus:bg-gray-500/10"
                                  onClick={() => handleStatusChange(user.id, 'inactive')}
                                >
                                  <XCircle className="w-4 h-4 mr-2 text-gray-400" />
                                  Set Inactive
                                </DropdownMenuItem>
                              )}
                              
                              {user.status !== 'suspended' && (
                                <DropdownMenuItem 
                                  className="cursor-pointer hover:bg-red-500/10 focus:bg-red-500/10"
                                  onClick={() => handleStatusChange(user.id, 'suspended')}
                                >
                                  <Ban className="w-4 h-4 mr-2 text-red-400" />
                                  Suspend User
                                </DropdownMenuItem>
                              )}
                              
                              <DropdownMenuSeparator className="bg-gray-800" />
                              
                              <DropdownMenuItem 
                                className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/10 focus:bg-red-500/10"
                                onClick={() => {
                                  setSelectedUser(user)
                                  setIsDeleteDialogOpen(true)
                                }}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete User
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
                Showing {filteredUsers.length} of {users.length} users
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

      {/* View User Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-gradient-to-b from-gray-900 to-black border-yellow-500/30 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              User Details
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Complete user information and activity
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-6 py-4">
              {/* User Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20 border-2 border-yellow-500/30">
                    <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white text-2xl">
                      {getUserInitials(selectedUser)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedUser.firstName} {selectedUser.lastName}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      {getRoleBadge(selectedUser.role)}
                      <Badge className={cn("px-3 py-1", getStatusColor(selectedUser.status))}>
                        {getStatusText(selectedUser.status)}
                      </Badge>
                      {getTierBadge(selectedUser.membershipTier)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">User ID</p>
                  <p className="font-mono text-white">{selectedUser.id}</p>
                </div>
              </div>

              {/* Contact Information */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-yellow-400 text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white flex items-center gap-2">
                        <Mail className="w-4 h-4 text-yellow-500" />
                        {selectedUser.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <p className="text-white flex items-center gap-2">
                        <Phone className="w-4 h-4 text-yellow-500" />
                        {selectedUser.phone}
                      </p>
                    </div>
                    {selectedUser.dateOfBirth && (
                      <div>
                        <p className="text-sm text-gray-400">Date of Birth</p>
                        <p className="text-white flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-yellow-500" />
                          {formatDate(selectedUser.dateOfBirth)} ({new Date().getFullYear() - selectedUser.dateOfBirth.getFullYear()} years)
                        </p>
                      </div>
                    )}
                    {selectedUser.gender && (
                      <div>
                        <p className="text-sm text-gray-400">Gender</p>
                        <p className="text-white capitalize">{selectedUser.gender.replace('_', ' ')}</p>
                      </div>
                    )}
                  </div>
                  
                  {selectedUser.address && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <p className="text-sm text-gray-400 mb-2">Address</p>
                      <p className="text-white flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-yellow-500 mt-1" />
                        <span>
                          {selectedUser.address.street}<br />
                          {selectedUser.address.city}, {selectedUser.address.state} {selectedUser.address.zipCode}<br />
                          {selectedUser.address.country}
                        </span>
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Membership & Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-yellow-400 text-lg">Membership Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tier:</span>
                      <span className="font-medium text-white capitalize">{selectedUser.membershipTier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Loyalty Points:</span>
                      <span className="font-bold text-yellow-400">{selectedUser.loyaltyPoints}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Join Date:</span>
                      <span className="text-white">{formatDate(selectedUser.joinDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Active:</span>
                      <span className="text-white">{selectedUser.lastActive ? formatDate(selectedUser.lastActive) : 'Never'}</span>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <p className="text-sm text-gray-400 mb-2">Tier Benefits</p>
                      <ul className="space-y-1">
                        {membershipTiers[selectedUser.membershipTier].benefits.map((benefit, index) => (
                          <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-yellow-500" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-yellow-400 text-lg">Activity Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Bookings:</span>
                      <span className="font-bold text-white">{selectedUser.totalBookings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Spent:</span>
                      <span className="font-bold text-green-400">{formatCurrency(selectedUser.totalSpent)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Average per Booking:</span>
                      <span className="text-white">
                        {selectedUser.totalBookings > 0 
                          ? formatCurrency(selectedUser.totalSpent / selectedUser.totalBookings)
                          : formatCurrency(0)
                        }
                      </span>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <p className="text-sm text-gray-400 mb-2">Points to Next Tier</p>
                      {selectedUser.membershipTier !== 'platinum' && (
                        <div className="space-y-2">
                          {selectedUser.membershipTier === 'bronze' && (
                            <>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">To Silver:</span>
                                <span className="text-white">{500 - selectedUser.loyaltyPoints} points needed</span>
                              </div>
                              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                                  style={{ width: `${(selectedUser.loyaltyPoints / 500) * 100}%` }}
                                />
                              </div>
                            </>
                          )}
                          {selectedUser.membershipTier === 'silver' && (
                            <>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">To Gold:</span>
                                <span className="text-white">{1500 - selectedUser.loyaltyPoints} points needed</span>
                              </div>
                              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                                  style={{ width: `${((selectedUser.loyaltyPoints - 500) / 1000) * 100}%` }}
                                />
                              </div>
                            </>
                          )}
                          {selectedUser.membershipTier === 'gold' && (
                            <>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">To Platinum:</span>
                                <span className="text-white">{3000 - selectedUser.loyaltyPoints} points needed</span>
                              </div>
                              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                                  style={{ width: `${((selectedUser.loyaltyPoints - 1500) / 1500) * 100}%` }}
                                />
                              </div>
                            </>
                          )}
                        </div>
                      )}
                      {selectedUser.membershipTier === 'platinum' && (
                        <p className="text-sm text-yellow-400">Highest tier achieved! Keep earning points for exclusive rewards.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Preferences */}
              {selectedUser.preferences && (
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-yellow-400 text-lg">Preferences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Notifications</p>
                        <ul className="space-y-2">
                          <li className="flex items-center justify-between">
                            <span className="text-gray-300">Email Notifications:</span>
                            <Badge className={selectedUser.preferences.emailNotifications ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}>
                              {selectedUser.preferences.emailNotifications ? 'Enabled' : 'Disabled'}
                            </Badge>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-gray-300">SMS Notifications:</span>
                            <Badge className={selectedUser.preferences.smsNotifications ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}>
                              {selectedUser.preferences.smsNotifications ? 'Enabled' : 'Disabled'}
                            </Badge>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-gray-300">Marketing Emails:</span>
                            <Badge className={selectedUser.preferences.marketingEmails ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}>
                              {selectedUser.preferences.marketingEmails ? 'Enabled' : 'Disabled'}
                            </Badge>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Preferred Genres</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedUser.preferences.preferredGenres.length > 0 ? (
                            selectedUser.preferences.preferredGenres.map((genre, index) => (
                              <Badge key={index} className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30">
                                {genre}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-gray-500">No preferences set</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Notes */}
              {selectedUser.notes && (
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-yellow-400 text-lg">Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white">{selectedUser.notes}</p>
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

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gradient-to-b from-gray-900 to-black border-orange-500/30 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Edit User
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Modify user information
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-firstName" className="text-gray-300">First Name</Label>
                  <Input
                    id="edit-firstName"
                    value={selectedUser.firstName}
                    onChange={(e) => setSelectedUser({...selectedUser, firstName: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-lastName" className="text-gray-300">Last Name</Label>
                  <Input
                    id="edit-lastName"
                    value={selectedUser.lastName}
                    onChange={(e) => setSelectedUser({...selectedUser, lastName: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-email" className="text-gray-300">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-phone" className="text-gray-300">Phone</Label>
                  <Input
                    id="edit-phone"
                    value={selectedUser.phone}
                    onChange={(e) => setSelectedUser({...selectedUser, phone: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-role" className="text-gray-300">Role</Label>
                  <Select
                    value={selectedUser.role}
                    onValueChange={(value: any) => setSelectedUser({...selectedUser, role: value})}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="edit-status" className="text-gray-300">Status</Label>
                  <Select
                    value={selectedUser.status}
                    onValueChange={(value: any) => setSelectedUser({...selectedUser, status: value})}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="edit-tier" className="text-gray-300">Membership Tier</Label>
                  <Select
                    value={selectedUser.membershipTier}
                    onValueChange={(value: any) => setSelectedUser({...selectedUser, membershipTier: value})}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="bronze">Bronze</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="platinum">Platinum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="edit-points" className="text-gray-300">Loyalty Points</Label>
                  <Input
                    id="edit-points"
                    type="number"
                    value={selectedUser.loyaltyPoints}
                    onChange={(e) => setSelectedUser({...selectedUser, loyaltyPoints: parseInt(e.target.value)})}
                    className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                  />
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
              onClick={handleEditUser}
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
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="py-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                <Avatar className="w-12 h-12 border-2 border-red-500/30">
                  <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
                    {getUserInitials(selectedUser)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white">{selectedUser.firstName} {selectedUser.lastName}</p>
                  <p className="text-sm text-gray-400">{selectedUser.email}</p>
                  <p className="text-xs text-gray-500">Role: {roleDetails[selectedUser.role].label}</p>
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
              onClick={handleDeleteUser}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
            >
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Actions Dialog */}
      <Dialog open={isBulkActionDialogOpen} onOpenChange={setIsBulkActionDialogOpen}>
        <DialogContent className="bg-gradient-to-b from-gray-900 to-black border-purple-500/30 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-purple-400">Bulk Actions</DialogTitle>
            <DialogDescription className="text-gray-400">
              Perform actions on multiple users at once
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <p className="text-center text-gray-300">This feature is under development.</p>
            <p className="text-sm text-gray-400 text-center">
              You will be able to:<br />
              • Bulk update user roles<br />
              • Bulk update membership tiers<br />
              • Send bulk emails<br />
              • Export user data
            </p>
          </div>
          
          <DialogFooter>
            <Button
              onClick={() => setIsBulkActionDialogOpen(false)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </LayoutWrapper>
  )
}