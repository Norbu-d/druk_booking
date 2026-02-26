// app/admin/settings/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
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
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Settings,
  User,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Mail,
  Phone,
  MapPin,
  Building,
  Film,
  Clock,
  DollarSign,
  Percent,
  Calendar,
  Users,
  Ticket,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Edit,
  Plus,
  Eye,
  EyeOff,
  Key,
  LogOut,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Moon,
  Sun,
  Laptop,
  Palette,
  Languages,
  Volume2,
  HelpCircle,
  FileText,
  Camera,
  Lock,
  Wallet, // Add this line
  Gift, // You might also need Gift if not already imported
  Landmark // You might also need Landmark if not already imported
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

// Types
type TabValue = 'general' | 'profile' | 'notifications' | 'security' | 'payment' | 'theater' | 'system'

interface AdminProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
  avatar?: string
  department: string
  joinDate: Date
  lastActive: Date
  bio: string
}

interface NotificationSetting {
  id: string
  name: string
  description: string
  email: boolean
  push: boolean
  sms: boolean
}

interface SecuritySetting {
  twoFactorAuth: boolean
  loginNotifications: boolean
  sessionTimeout: number
  ipWhitelisting: boolean
}

interface PaymentSetting {
  currency: string
  taxRate: number
  convenienceFee: number
  paymentMethods: string[]
  refundPolicy: string
}

interface TheaterSetting {
  name: string
  address: string
  phone: string
  email: string
  website: string
  timezone: string
  defaultLanguage: string
  currency: string
}

interface SystemSetting {
  maintenanceMode: boolean
  debugMode: boolean
  autoBackup: boolean
  backupFrequency: string
  logRetention: number
  apiRateLimit: number
}

export default function SettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabValue>('general')
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [admin, setAdmin] = useState<any>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false)

  // Profile state
  const [profile, setProfile] = useState<AdminProfile>({
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'admin@drunkcinema.com',
    phone: '+1 (555) 123-4567',
    role: 'Super Admin',
    department: 'Administration',
    joinDate: new Date(2024, 0, 1),
    lastActive: new Date(),
    bio: 'Cinema enthusiast and system administrator with over 5 years of experience in theater management.'
  })

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      id: '1',
      name: 'New Bookings',
      description: 'Get notified when a new booking is made',
      email: true,
      push: true,
      sms: false
    },
    {
      id: '2',
      name: 'Payment Received',
      description: 'Get notified when a payment is successfully processed',
      email: true,
      push: true,
      sms: false
    },
    {
      id: '3',
      name: 'Low Seat Alert',
      description: 'Get notified when showtimes are running low on seats',
      email: true,
      push: true,
      sms: true
    },
    {
      id: '4',
      name: 'System Updates',
      description: 'Get notified about system maintenance and updates',
      email: true,
      push: false,
      sms: false
    },
    {
      id: '5',
      name: 'User Registrations',
      description: 'Get notified when new users register',
      email: false,
      push: true,
      sms: false
    },
    {
      id: '6',
      name: 'Refund Requests',
      description: 'Get notified when a refund is requested',
      email: true,
      push: true,
      sms: true
    }
  ])

  // Security settings
  const [securitySettings, setSecuritySettings] = useState<SecuritySetting>({
    twoFactorAuth: false,
    loginNotifications: true,
    sessionTimeout: 30,
    ipWhitelisting: false
  })

  // Payment settings
  const [paymentSettings, setPaymentSettings] = useState<PaymentSetting>({
    currency: 'USD',
    taxRate: 8.5,
    convenienceFee: 1.5,
    paymentMethods: ['credit_card', 'debit_card', 'online_wallet'],
    refundPolicy: 'full_refund'
  })

  // Theater settings
  const [theaterSettings, setTheaterSettings] = useState<TheaterSetting>({
    name: 'Drunk Cinema',
    address: '123 Main Street, Downtown, New York, NY 10001',
    phone: '+1 (212) 555-0123',
    email: 'info@drunkcinema.com',
    website: 'https://drunkcinema.com',
    timezone: 'America/New_York',
    defaultLanguage: 'English',
    currency: 'USD'
  })

  // System settings
  const [systemSettings, setSystemSettings] = useState<SystemSetting>({
    maintenanceMode: false,
    debugMode: false,
    autoBackup: true,
    backupFrequency: 'daily',
    logRetention: 30,
    apiRateLimit: 1000
  })

  // Theme preference
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark')

  useEffect(() => {
    const adminData = localStorage.getItem('admin')
    if (adminData) {
      setAdmin(JSON.parse(adminData))
    }
  }, [])

  // Handle save settings
  const handleSaveSettings = () => {
    setIsSaving(true)
    setSaveSuccess(false)
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      
      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 1000)
  }

  // Handle notification toggle
  const toggleNotification = (id: string, type: 'email' | 'push' | 'sms') => {
    setNotificationSettings(prev =>
      prev.map(setting =>
        setting.id === id
          ? { ...setting, [type]: !setting[type] }
          : setting
      )
    )
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('admin')
    router.push('/login')
  }

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium'
    }).format(date)
  }

  // Get user initials
  const getUserInitials = () => {
    return `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <LayoutWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Settings</h1>
                <p className="text-gray-400">Manage your account and system preferences</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500"
              onClick={handleSaveSettings}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
            
            {saveSuccess && (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 animate-pulse">
                <CheckCircle className="w-3 h-3 mr-1" />
                Saved Successfully
              </Badge>
            )}
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as TabValue)}>
          <TabsList className="grid grid-cols-3 lg:grid-cols-7 bg-gray-800 p-1 rounded-lg mb-6">
            <TabsTrigger value="general" className="text-gray-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              General
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-gray-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-gray-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="text-gray-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              Security
            </TabsTrigger>
            <TabsTrigger value="payment" className="text-gray-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              Payment
            </TabsTrigger>
            <TabsTrigger value="theater" className="text-gray-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              Theater
            </TabsTrigger>
            <TabsTrigger value="system" className="text-gray-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              System
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            {/* Theme Settings */}
            <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Palette className="w-5 h-5 text-yellow-400" />
                  Appearance
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Customize the look and feel of your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Theme</Label>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className={cn(
                        "flex-1 border-gray-700",
                        theme === 'light' && "bg-yellow-500/10 border-yellow-500 text-yellow-400"
                      )}
                      onClick={() => setTheme('light')}
                    >
                      <Sun className="w-4 h-4 mr-2" />
                      Light
                    </Button>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex-1 border-gray-700",
                        theme === 'dark' && "bg-yellow-500/10 border-yellow-500 text-yellow-400"
                      )}
                      onClick={() => setTheme('dark')}
                    >
                      <Moon className="w-4 h-4 mr-2" />
                      Dark
                    </Button>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex-1 border-gray-700",
                        theme === 'system' && "bg-yellow-500/10 border-yellow-500 text-yellow-400"
                      )}
                      onClick={() => setTheme('system')}
                    >
                      <Laptop className="w-4 h-4 mr-2" />
                      System
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="en">English (US)</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                      <SelectItem value="ja">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Timezone</Label>
                  <Select defaultValue="ny">
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="ny">Eastern Time (New York)</SelectItem>
                      <SelectItem value="la">Pacific Time (Los Angeles)</SelectItem>
                      <SelectItem value="ch">Central Time (Chicago)</SelectItem>
                      <SelectItem value="lon">Greenwich Mean Time (London)</SelectItem>
                      <SelectItem value="tok">Japan Standard Time (Tokyo)</SelectItem>
                      <SelectItem value="syd">Australian Eastern Time (Sydney)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Date & Time Format */}
            <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  Date & Time Format
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Configure how dates and times are displayed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Date Format</Label>
                    <Select defaultValue="mdy">
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Time Format</Label>
                    <Select defaultValue="12h">
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="12h">12-hour (02:30 PM)</SelectItem>
                        <SelectItem value="24h">24-hour (14:30)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">First Day of Week</Label>
                  <Select defaultValue="sunday">
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="sunday">Sunday</SelectItem>
                      <SelectItem value="monday">Monday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-yellow-400" />
                  Profile Information
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20 border-2 border-yellow-500/30">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white text-2xl">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" className="border-gray-700 text-white">
                      <Camera className="w-4 h-4 mr-2" />
                      Change Avatar
                    </Button>
                    <p className="text-xs text-gray-400">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-gray-300">Department</Label>
                    <Input
                      id="department"
                      value={profile.department}
                      onChange={(e) => setProfile({...profile, department: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-gray-300">Role</Label>
                    <Input
                      id="role"
                      value={profile.role}
                      disabled
                      className="bg-gray-800/50 border-gray-700 text-gray-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-gray-300">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500 min-h-[100px]"
                    placeholder="Tell us a little about yourself"
                  />
                </div>

                {/* Account Info */}
                <div className="bg-gray-800/30 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Member Since:</span>
                    <span className="text-white">{formatDate(profile.joinDate)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Last Active:</span>
                    <span className="text-white">{formatDate(profile.lastActive)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="w-5 h-5 text-yellow-400" />
                  Notification Preferences
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Configure how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Notification Channels */}
                  <div className="grid grid-cols-4 gap-4 pb-2 border-b border-gray-800">
                    <div className="text-sm font-medium text-gray-300">Notification Type</div>
                    <div className="text-sm font-medium text-gray-300 text-center">Email</div>
                    <div className="text-sm font-medium text-gray-300 text-center">Push</div>
                    <div className="text-sm font-medium text-gray-300 text-center">SMS</div>
                  </div>

                  {notificationSettings.map((setting) => (
                    <div key={setting.id} className="grid grid-cols-4 gap-4 items-center">
                      <div>
                        <p className="text-sm font-medium text-white">{setting.name}</p>
                        <p className="text-xs text-gray-400">{setting.description}</p>
                      </div>
                      <div className="flex justify-center">
                        <Switch
                          checked={setting.email}
                          onCheckedChange={() => toggleNotification(setting.id, 'email')}
                          className="data-[state=checked]:bg-yellow-500"
                        />
                      </div>
                      <div className="flex justify-center">
                        <Switch
                          checked={setting.push}
                          onCheckedChange={() => toggleNotification(setting.id, 'push')}
                          className="data-[state=checked]:bg-yellow-500"
                        />
                      </div>
                      <div className="flex justify-center">
                        <Switch
                          checked={setting.sms}
                          onCheckedChange={() => toggleNotification(setting.id, 'sms')}
                          className="data-[state=checked]:bg-yellow-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-yellow-400" />
                  Security Settings
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your account security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Password Change */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Change Password</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password" className="text-gray-300">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password" className="text-gray-300">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-gray-300">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                        Update Password
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-800" />

                {/* Security Options */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Security Options</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                      </div>
                      <Switch
                        checked={securitySettings.twoFactorAuth}
                        onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})}
                        className="data-[state=checked]:bg-yellow-500"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Login Notifications</p>
                        <p className="text-sm text-gray-400">Get notified when someone logs into your account</p>
                      </div>
                      <Switch
                        checked={securitySettings.loginNotifications}
                        onCheckedChange={(checked) => setSecuritySettings({...securitySettings, loginNotifications: checked})}
                        className="data-[state=checked]:bg-yellow-500"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">IP Whitelisting</p>
                        <p className="text-sm text-gray-400">Restrict access to specific IP addresses</p>
                      </div>
                      <Switch
                        checked={securitySettings.ipWhitelisting}
                        onCheckedChange={(checked) => setSecuritySettings({...securitySettings, ipWhitelisting: checked})}
                        className="data-[state=checked]:bg-yellow-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Session Timeout (minutes)</Label>
                      <Select 
                        value={securitySettings.sessionTimeout.toString()}
                        onValueChange={(value) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(value)})}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                          <SelectItem value="240">4 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-800" />

                {/* Active Sessions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Active Sessions</h3>
                  <div className="bg-gray-800/30 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg flex items-center justify-center">
                          <Laptop className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Current Session</p>
                          <p className="text-xs text-gray-400">Chrome on Windows • IP: 192.168.1.1</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Active Now
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="border-gray-700 text-red-400 hover:bg-red-500/10">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out All Other Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment" className="space-y-6">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-yellow-400" />
                  Payment Configuration
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Configure payment methods and pricing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Currency</Label>
                    <Select 
                      value={paymentSettings.currency}
                      onValueChange={(value) => setPaymentSettings({...paymentSettings, currency: value})}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="JPY">JPY (¥)</SelectItem>
                        <SelectItem value="CAD">CAD ($)</SelectItem>
                        <SelectItem value="AUD">AUD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Tax Rate (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={paymentSettings.taxRate}
                      onChange={(e) => setPaymentSettings({...paymentSettings, taxRate: parseFloat(e.target.value)})}
                      className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Convenience Fee ($)</Label>
                    <Input
                      type="number"
                      step="0.5"
                      value={paymentSettings.convenienceFee}
                      onChange={(e) => setPaymentSettings({...paymentSettings, convenienceFee: parseFloat(e.target.value)})}
                      className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Refund Policy</Label>
                    <Select 
                      value={paymentSettings.refundPolicy}
                      onValueChange={(value) => setPaymentSettings({...paymentSettings, refundPolicy: value})}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="full_refund">Full Refund</SelectItem>
                        <SelectItem value="partial_refund">Partial Refund</SelectItem>
                        <SelectItem value="no_refund">No Refund</SelectItem>
                        <SelectItem value="store_credit">Store Credit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-4">
                  <Label className="text-gray-300">Accepted Payment Methods</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: 'credit_card', name: 'Credit Card', icon: CreditCard },
                      { id: 'debit_card', name: 'Debit Card', icon: CreditCard },
                      { id: 'online_wallet', name: 'Online Wallet', icon: Wallet },
                      { id: 'cash', name: 'Cash', icon: DollarSign },
                      { id: 'gift_card', name: 'Gift Card', icon: Gift },
                      { id: 'bank_transfer', name: 'Bank Transfer', icon: Landmark },
                    ].map((method) => (
                      <div
                        key={method.id}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                          paymentSettings.paymentMethods.includes(method.id)
                            ? "bg-yellow-500/10 border-yellow-500/50"
                            : "bg-gray-800/50 border-gray-700 hover:bg-gray-800"
                        )}
                        onClick={() => {
                          const methods = paymentSettings.paymentMethods.includes(method.id)
                            ? paymentSettings.paymentMethods.filter(m => m !== method.id)
                            : [...paymentSettings.paymentMethods, method.id]
                          setPaymentSettings({...paymentSettings, paymentMethods: methods})
                        }}
                      >
                        <method.icon className={cn(
                          "w-5 h-5",
                          paymentSettings.paymentMethods.includes(method.id)
                            ? "text-yellow-400"
                            : "text-gray-400"
                        )} />
                        <span className={cn(
                          "text-sm",
                          paymentSettings.paymentMethods.includes(method.id)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        )}>
                          {method.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Theater Settings */}
          <TabsContent value="theater" className="space-y-6">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Building className="w-5 h-5 text-yellow-400" />
                  Theater Information
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your theater's public information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theater-name" className="text-gray-300">Theater Name</Label>
                  <Input
                    id="theater-name"
                    value={theaterSettings.name}
                    onChange={(e) => setTheaterSettings({...theaterSettings, name: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theater-address" className="text-gray-300">Address</Label>
                  <Textarea
                    id="theater-address"
                    value={theaterSettings.address}
                    onChange={(e) => setTheaterSettings({...theaterSettings, address: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="theater-phone" className="text-gray-300">Phone</Label>
                    <Input
                      id="theater-phone"
                      value={theaterSettings.phone}
                      onChange={(e) => setTheaterSettings({...theaterSettings, phone: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="theater-email" className="text-gray-300">Email</Label>
                    <Input
                      id="theater-email"
                      type="email"
                      value={theaterSettings.email}
                      onChange={(e) => setTheaterSettings({...theaterSettings, email: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="theater-website" className="text-gray-300">Website</Label>
                    <Input
                      id="theater-website"
                      value={theaterSettings.website}
                      onChange={(e) => setTheaterSettings({...theaterSettings, website: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="theater-timezone" className="text-gray-300">Timezone</Label>
                    <Select 
                      value={theaterSettings.timezone}
                      onValueChange={(value) => setTheaterSettings({...theaterSettings, timezone: value})}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="America/New_York">Eastern Time (New York)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (Chicago)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (Denver)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (Los Angeles)</SelectItem>
                        <SelectItem value="America/Anchorage">Alaska Time (Anchorage)</SelectItem>
                        <SelectItem value="Pacific/Honolulu">Hawaii Time (Honolulu)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="system" className="space-y-6">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5 text-yellow-400" />
                  System Configuration
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Advanced system settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* System Modes */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Maintenance Mode</p>
                      <p className="text-sm text-gray-400">Put the system in maintenance mode for updates</p>
                    </div>
                    <Switch
                      checked={systemSettings.maintenanceMode}
                      onCheckedChange={(checked) => setSystemSettings({...systemSettings, maintenanceMode: checked})}
                      className="data-[state=checked]:bg-yellow-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Debug Mode</p>
                      <p className="text-sm text-gray-400">Enable detailed error logging for debugging</p>
                    </div>
                    <Switch
                      checked={systemSettings.debugMode}
                      onCheckedChange={(checked) => setSystemSettings({...systemSettings, debugMode: checked})}
                      className="data-[state=checked]:bg-yellow-500"
                    />
                  </div>
                </div>

                <Separator className="bg-gray-800" />

                {/* Backup Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Backup Settings</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Automatic Backups</p>
                      <p className="text-sm text-gray-400">Schedule regular system backups</p>
                    </div>
                    <Switch
                      checked={systemSettings.autoBackup}
                      onCheckedChange={(checked) => setSystemSettings({...systemSettings, autoBackup: checked})}
                      className="data-[state=checked]:bg-yellow-500"
                    />
                  </div>

                  {systemSettings.autoBackup && (
                    <div className="space-y-2">
                      <Label className="text-gray-300">Backup Frequency</Label>
                      <Select 
                        value={systemSettings.backupFrequency}
                        onValueChange={(value) => setSystemSettings({...systemSettings, backupFrequency: value})}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label className="text-gray-300">Log Retention (days)</Label>
                    <Input
                      type="number"
                      value={systemSettings.logRetention}
                      onChange={(e) => setSystemSettings({...systemSettings, logRetention: parseInt(e.target.value)})}
                      className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="border-gray-700 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Download Backup
                    </Button>
                    <Button variant="outline" className="border-gray-700 text-white">
                      <Upload className="w-4 h-4 mr-2" />
                      Restore Backup
                    </Button>
                  </div>
                </div>

                <Separator className="bg-gray-800" />

                {/* API Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">API Settings</h3>
                  
                  <div className="space-y-2">
                    <Label className="text-gray-300">API Rate Limit (requests per minute)</Label>
                    <Input
                      type="number"
                      value={systemSettings.apiRateLimit}
                      onChange={(e) => setSystemSettings({...systemSettings, apiRateLimit: parseInt(e.target.value)})}
                      className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                    />
                  </div>

                  <div className="bg-gray-800/30 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">API Key</p>
                        <p className="text-sm text-gray-400">Your secret API key for integrations</p>
                      </div>
                      <Button
                        variant="outline"
                        className="border-gray-700 text-white"
                        onClick={() => setShowApiKeyDialog(true)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Key
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-800" />

                {/* Danger Zone */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-red-400">Danger Zone</h3>
                  
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Clear All Data</p>
                        <p className="text-sm text-gray-400">Permanently delete all system data</p>
                      </div>
                      <Button
                        variant="outline"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        onClick={() => setShowDeleteDialog(true)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear Data
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* API Key Dialog */}
        <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
          <DialogContent className="bg-gradient-to-b from-gray-900 to-black border-yellow-500/30 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                API Key
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Your secret API key for integrations
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="bg-gray-800 p-4 rounded-lg font-mono text-sm text-yellow-400 break-all">
                dc_live_8f7a3b2c1d9e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z
              </div>
              <p className="text-xs text-gray-400 mt-2">
                This key will only be shown once. Keep it secure!
              </p>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowApiKeyDialog(false)}
                className="border-gray-700 text-white"
              >
                Close
              </Button>
              <Button
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                onClick={() => {
                  navigator.clipboard.writeText('dc_live_8f7a3b2c1d9e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z')
                  setShowApiKeyDialog(false)
                }}
              >
                Copy Key
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Data Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="bg-gradient-to-b from-gray-900 to-black border-red-500/30 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-red-400">Clear All Data</DialogTitle>
              <DialogDescription className="text-gray-400">
                This action cannot be undone. All system data will be permanently deleted.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-300">
                      This will delete:
                    </p>
                    <ul className="text-sm text-gray-400 list-disc list-inside mt-2">
                      <li>All user accounts and data</li>
                      <li>All bookings and payment records</li>
                      <li>All movies and showtimes</li>
                      <li>All theater configurations</li>
                      <li>System settings and preferences</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button
              variant="outline"
                onClick={() => setShowDeleteDialog(false)}
                className="border-gray-700 text-white hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                className="bg-gradient-to-r from-red-500 to-orange-500 text-white"
                onClick={() => {
                  setShowDeleteDialog(false)
                  // Handle delete logic here
                }}
              >
                Yes, Delete Everything
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </LayoutWrapper>
  )
}