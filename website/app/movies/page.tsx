'use client'

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
import { Textarea } from '@/components/ui/textarea'
import {
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Filter,
  Star,
  Calendar,
  Clock,
  Film,
  Popcorn,
  Clapperboard,
  Languages,
  Subtitles,
  PlayCircle
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image' // Add this import
import Link from 'next/link' // Add this import

// Movie type definition
type Movie = {
  id: string
  posterUrl: string
  name: string
  description: string
  genres: string[]
  languages: string[]
  subtitles: string[]
  rating: string
  duration: number // in minutes
  releaseDate: string
  status: 'upcoming' | 'now_showing' | 'ended' | 'cancelled'
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([
    {
      id: '1',
      posterUrl: 'https://via.placeholder.com/150x200',
      name: 'Dobchu',
      description: 'Dobchu is a Bhutanese thriller set against the backdrop of...',
      genres: ['Drama', 'Thriller'],
      languages: ['Dzongkha'],
      subtitles: ['English'],
      rating: 'PG',
      duration: 120,
      releaseDate: 'Aug 29, 2025',
      status: 'now_showing'
    },
    {
      id: '2',
      posterUrl: 'https://via.placeholder.com/150x200',
      name: 'Karma',
      description: 'Jerry Films presents an intense thriller about...',
      genres: ['Thriller'],
      languages: ['English', 'Hindi'],
      subtitles: ['English', 'Spanish'],
      rating: 'R',
      duration: 135,
      releaseDate: 'Sep 15, 2025',
      status: 'upcoming'
    },
    {
      id: '3',
      posterUrl: 'https://via.placeholder.com/150x200',
      name: 'The Last Dragon',
      description: 'A fantasy epic about the last dragon and its guardian',
      genres: ['Fantasy', 'Adventure'],
      languages: ['English'],
      subtitles: ['French', 'German'],
      rating: 'PG-13',
      duration: 148,
      releaseDate: 'Jul 10, 2025',
      status: 'now_showing'
    },
    {
      id: '4',
      posterUrl: 'https://via.placeholder.com/150x200',
      name: 'Midnight Shadows',
      description: 'A psychological thriller that keeps you guessing',
      genres: ['Thriller', 'Mystery'],
      languages: ['English'],
      subtitles: ['English'],
      rating: 'R',
      duration: 118,
      releaseDate: 'Jun 20, 2025',
      status: 'ended'
    },
    {
      id: '5',
      posterUrl: 'https://via.placeholder.com/150x200',
      name: 'Ocean\'s Whisper',
      description: 'A deep sea adventure with breathtaking visuals',
      genres: ['Adventure', 'Sci-Fi'],
      languages: ['English'],
      subtitles: ['Multiple'],
      rating: 'PG',
      duration: 155,
      releaseDate: 'Oct 05, 2025',
      status: 'upcoming'
    },
    {
      id: '6',
      posterUrl: 'https://via.placeholder.com/150x200',
      name: 'Desert Dreams',
      description: 'Cancelled due to production issues',
      genres: ['Drama'],
      languages: ['Arabic'],
      subtitles: ['English'],
      rating: 'PG-13',
      duration: 0,
      releaseDate: 'TBA',
      status: 'cancelled'
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  // New movie form state
  const [newMovie, setNewMovie] = useState<Omit<Movie, 'id'>>({
    posterUrl: '',
    name: '',
    description: '',
    genres: [],
    languages: [],
    subtitles: [],
    rating: '',
    duration: 0,
    releaseDate: '',
    status: 'upcoming'
  })

  // Filter movies based on search and tab
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movie.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movie.genres.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesTab = activeTab === 'all' || movie.status === activeTab
    return matchesSearch && matchesTab
  })

  // Count movies by status
  const movieCounts = {
    all: movies.length,
    upcoming: movies.filter(m => m.status === 'upcoming').length,
    now_showing: movies.filter(m => m.status === 'now_showing').length,
    ended: movies.filter(m => m.status === 'ended').length,
    cancelled: movies.filter(m => m.status === 'cancelled').length,
  }

  // Handle add movie
  const handleAddMovie = () => {
    const movieToAdd: Movie = {
      ...newMovie,
      id: Date.now().toString(),
      genres: newMovie.genres.length > 0 ? newMovie.genres : ['Drama'],
      languages: newMovie.languages.length > 0 ? newMovie.languages : ['English'],
      subtitles: newMovie.subtitles.length > 0 ? newMovie.subtitles : ['English'],
      duration: newMovie.duration || 120
    }
    setMovies([...movies, movieToAdd])
    setNewMovie({
      posterUrl: '',
      name: '',
      description: '',
      genres: [],
      languages: [],
      subtitles: [],
      rating: '',
      duration: 0,
      releaseDate: '',
      status: 'upcoming'
    })
    setIsAddDialogOpen(false)
  }

  // Handle edit movie
  const handleEditMovie = () => {
    if (!selectedMovie) return
    setMovies(movies.map(movie => 
      movie.id === selectedMovie.id ? selectedMovie : movie
    ))
    setIsEditDialogOpen(false)
    setSelectedMovie(null)
  }

  // Handle delete movie
  const handleDeleteMovie = () => {
    if (!selectedMovie) return
    setMovies(movies.filter(movie => movie.id !== selectedMovie.id))
    setIsDeleteDialogOpen(false)
    setSelectedMovie(null)
  }

  // Format duration
  const formatDuration = (minutes: number) => {
    if (minutes === 0) return 'TBA'
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  // Get status color
  const getStatusColor = (status: Movie['status']) => {
    switch (status) {
      case 'now_showing':
        return 'bg-gradient-to-r from-yellow-500/20 to-green-500/20 text-yellow-400 border-yellow-500/30'
      case 'upcoming':
        return 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 text-orange-400 border-orange-500/30'
      case 'ended':
        return 'bg-gradient-to-r from-gray-500/20 to-blue-500/20 text-gray-400 border-gray-500/30'
      case 'cancelled':
        return 'bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-400 border-red-500/30'
    }
  }

  // Get status text
  const getStatusText = (status: Movie['status']) => {
    switch (status) {
      case 'now_showing':
        return 'Now Showing'
      case 'upcoming':
        return 'Upcoming'
      case 'ended':
        return 'Ended'
      case 'cancelled':
        return 'Cancelled'
    }
  }

  return (
    <LayoutWrapper>
      {/* Add Header with Logo at the top */}
      <header className="border-b border-yellow-500/20 bg-black/50 backdrop-blur-xl mb-6">
        <div className="container mx-auto px-6 py-4">
          <Link href="/" className="flex items-center space-x-3 w-fit group">
            <div className="w-12 h-12 relative">
              <Image 
                src="/logo.png"
                alt="Drunk Cinema Logo"
                width={48}
                height={48}
                className="object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Drunk Cinema
              </span>
              <span className="text-sm text-yellow-500/80 font-medium flex items-center">
                <Film className="w-3 h-3 mr-1" />
                Movie Management
              </span>
            </div>
          </Link>
        </div>
      </header>

      <div className="space-y-6 px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                <Film className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Movie Management</h1>
                <p className="text-gray-400">Manage your movie collection, add new movies, and edit existing ones</p>
              </div>
            </div>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                Add Movie
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gradient-to-b from-gray-900 to-black border-yellow-500/30 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Add New Movie
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Fill in the details for the new movie
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">Movie Name</Label>
                    <Input
                      id="name"
                      value={newMovie.name}
                      onChange={(e) => setNewMovie({...newMovie, name: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                      placeholder="Enter movie name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="genres" className="text-gray-300">Genres (comma-separated)</Label>
                    <Input
                      id="genres"
                      value={newMovie.genres.join(', ')}
                      onChange={(e) => setNewMovie({...newMovie, genres: e.target.value.split(',').map(g => g.trim())})}
                      className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                      placeholder="e.g., Drama, Thriller, Action"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="languages" className="text-gray-300">Languages (comma-separated)</Label>
                    <Input
                      id="languages"
                      value={newMovie.languages.join(', ')}
                      onChange={(e) => setNewMovie({...newMovie, languages: e.target.value.split(',').map(l => l.trim())})}
                      className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                      placeholder="e.g., English, Spanish"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="rating" className="text-gray-300">Rating</Label>
                    <select
                      id="rating"
                      value={newMovie.rating}
                      onChange={(e) => setNewMovie({...newMovie, rating: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:border-yellow-500 focus:outline-none"
                    >
                      <option value="">Select Rating</option>
                      <option value="G">G</option>
                      <option value="PG">PG</option>
                      <option value="PG-13">PG-13</option>
                      <option value="R">R</option>
                      <option value="NC-17">NC-17</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="duration" className="text-gray-300">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={newMovie.duration || ''}
                      onChange={(e) => setNewMovie({...newMovie, duration: parseInt(e.target.value) || 0})}
                      className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                      placeholder="120"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="releaseDate" className="text-gray-300">Release Date</Label>
                    <Input
                      id="releaseDate"
                      type="date"
                      value={newMovie.releaseDate}
                      onChange={(e) => setNewMovie({...newMovie, releaseDate: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subtitles" className="text-gray-300">Subtitles (comma-separated)</Label>
                    <Input
                      id="subtitles"
                      value={newMovie.subtitles.join(', ')}
                      onChange={(e) => setNewMovie({...newMovie, subtitles: e.target.value.split(',').map(s => s.trim())})}
                      className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                      placeholder="e.g., English, French"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="status" className="text-gray-300">Status</Label>
                    <select
                      id="status"
                      value={newMovie.status}
                      onChange={(e) => setNewMovie({...newMovie, status: e.target.value as Movie['status']})}
                      className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:border-yellow-500 focus:outline-none"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="now_showing">Now Showing</option>
                      <option value="ended">Ended</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <Label htmlFor="posterUrl" className="text-gray-300">Poster URL</Label>
                    <Input
                      id="posterUrl"
                      value={newMovie.posterUrl}
                      onChange={(e) => setNewMovie({...newMovie, posterUrl: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                      placeholder="https://example.com/poster.jpg"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description" className="text-gray-300">Description</Label>
                    <Textarea
                      id="description"
                      value={newMovie.description}
                      onChange={(e) => setNewMovie({...newMovie, description: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500 min-h-[100px]"
                      placeholder="Enter movie description"
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
                  onClick={handleAddMovie}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                >
                  Add Movie
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search Bar */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search movies by name, description, or genre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                />
              </div>
              
              <Button
                variant="outline"
                className="border-gray-700 text-white hover:border-yellow-500/50 hover:bg-yellow-500/10"
                onClick={() => setSearchTerm('')}
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-orange-500/20">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-5 bg-gray-800 p-1 m-6 rounded-lg">
                <TabsTrigger 
                  value="all" 
                  className={cn(
                    "data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500",
                    "data-[state=active]:text-white text-gray-400"
                  )}
                >
                  All ({movieCounts.all})
                </TabsTrigger>
                <TabsTrigger 
                  value="upcoming"
                  className={cn(
                    "data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500",
                    "data-[state=active]:text-white text-gray-400"
                  )}
                >
                  Upcoming ({movieCounts.upcoming})
                </TabsTrigger>
                <TabsTrigger 
                  value="now_showing"
                  className={cn(
                    "data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-green-500",
                    "data-[state=active]:text-white text-gray-400"
                  )}
                >
                  Now Showing ({movieCounts.now_showing})
                </TabsTrigger>
                <TabsTrigger 
                  value="ended"
                  className={cn(
                    "data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-500 data-[state=active]:to-blue-500",
                    "data-[state=active]:text-white text-gray-400"
                  )}
                >
                  Ended ({movieCounts.ended})
                </TabsTrigger>
                <TabsTrigger 
                  value="cancelled"
                  className={cn(
                    "data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-orange-500",
                    "data-[state=active]:text-white text-gray-400"
                  )}
                >
                  Cancelled ({movieCounts.cancelled})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Movies Table */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-white">Movies List</CardTitle>
            <CardDescription className="text-gray-400">
              Showing {filteredMovies.length} of {movies.length} movies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-800 hover:bg-transparent">
                    <TableHead className="text-gray-300 font-medium">ID</TableHead>
                    <TableHead className="text-gray-300 font-medium">Poster</TableHead>
                    <TableHead className="text-gray-300 font-medium">Name</TableHead>
                    <TableHead className="text-gray-300 font-medium">Description</TableHead>
                    <TableHead className="text-gray-300 font-medium">Genres</TableHead>
                    <TableHead className="text-gray-300 font-medium">Languages</TableHead>
                    <TableHead className="text-gray-300 font-medium">Subtitles</TableHead>
                    <TableHead className="text-gray-300 font-medium">Rating</TableHead>
                    <TableHead className="text-gray-300 font-medium">Duration</TableHead>
                    <TableHead className="text-gray-300 font-medium">Release Date</TableHead>
                    <TableHead className="text-gray-300 font-medium">Status</TableHead>
                    <TableHead className="text-gray-300 font-medium text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMovies.map((movie) => (
                    <TableRow key={movie.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                      <TableCell className="font-medium text-white">#{movie.id}</TableCell>
                      <TableCell>
                        <div className="w-16 h-20 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded overflow-hidden flex items-center justify-center">
                          {movie.posterUrl ? (
                            <img 
                              src={movie.posterUrl} 
                              alt={movie.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Film className="w-8 h-8 text-yellow-400" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-white">{movie.name}</div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="text-sm text-gray-300 line-clamp-2">{movie.description}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {movie.genres.map((genre, index) => (
                            <Badge 
                              key={index} 
                              variant="outline"
                              className="text-xs bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30 text-yellow-400"
                            >
                              {genre}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Languages className="w-3 h-3 text-yellow-500" />
                          <div className="text-sm text-gray-300">
                            {movie.languages.length > 0 ? movie.languages.join(', ') : 'No'}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Subtitles className="w-3 h-3 text-orange-500" />
                          <div className="text-sm text-gray-300">
                            {movie.subtitles.length > 0 ? movie.subtitles.join(', ') : 'No'}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30 text-yellow-400">
                          {movie.rating}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-300">{formatDuration(movie.duration)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          {movie.releaseDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("px-3 py-1 rounded-full text-xs font-medium border", getStatusColor(movie.status))}>
                          {getStatusText(movie.status)}
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
                                setSelectedMovie(movie)
                                setIsEditDialogOpen(true)
                              }}
                            >
                              <Edit className="w-4 h-4 mr-2 text-yellow-400" />
                              Edit Movie
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="cursor-pointer hover:bg-yellow-500/10 focus:bg-yellow-500/10"
                              onClick={() => {
                                setSelectedMovie(movie)
                              }}
                            >
                              <Eye className="w-4 h-4 mr-2 text-blue-400" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/10 focus:bg-red-500/10"
                              onClick={() => {
                                setSelectedMovie(movie)
                                setIsDeleteDialogOpen(true)
                              }}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Movie
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Footer with counts */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800">
              <div className="text-sm text-gray-400">
                Showing {filteredMovies.length} to {filteredMovies.length} of {filteredMovies.length} {activeTab === 'all' ? 'movies' : getStatusText(activeTab as Movie['status']).toLowerCase()}
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gradient-to-b from-gray-900 to-black border-orange-500/30 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Edit Movie
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Modify the movie details
            </DialogDescription>
          </DialogHeader>
          
          {selectedMovie && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-name" className="text-gray-300">Movie Name</Label>
                  <Input
                    id="edit-name"
                    value={selectedMovie.name}
                    onChange={(e) => setSelectedMovie({...selectedMovie, name: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-genres" className="text-gray-300">Genres (comma-separated)</Label>
                  <Input
                    id="edit-genres"
                    value={selectedMovie.genres.join(', ')}
                    onChange={(e) => setSelectedMovie({...selectedMovie, genres: e.target.value.split(',').map(g => g.trim())})}
                    className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-languages" className="text-gray-300">Languages (comma-separated)</Label>
                  <Input
                    id="edit-languages"
                    value={selectedMovie.languages.join(', ')}
                    onChange={(e) => setSelectedMovie({...selectedMovie, languages: e.target.value.split(',').map(l => l.trim())})}
                    className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-rating" className="text-gray-300">Rating</Label>
                  <select
                    id="edit-rating"
                    value={selectedMovie.rating}
                    onChange={(e) => setSelectedMovie({...selectedMovie, rating: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:border-yellow-500 focus:outline-none"
                  >
                    <option value="G">G</option>
                    <option value="PG">PG</option>
                    <option value="PG-13">PG-13</option>
                    <option value="R">R</option>
                    <option value="NC-17">NC-17</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-duration" className="text-gray-300">Duration (minutes)</Label>
                  <Input
                    id="edit-duration"
                    type="number"
                    value={selectedMovie.duration}
                    onChange={(e) => setSelectedMovie({...selectedMovie, duration: parseInt(e.target.value) || 0})}
                    className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-releaseDate" className="text-gray-300">Release Date</Label>
                  <Input
                    id="edit-releaseDate"
                    type="date"
                    value={selectedMovie.releaseDate}
                    onChange={(e) => setSelectedMovie({...selectedMovie, releaseDate: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-subtitles" className="text-gray-300">Subtitles (comma-separated)</Label>
                  <Input
                    id="edit-subtitles"
                    value={selectedMovie.subtitles.join(', ')}
                    onChange={(e) => setSelectedMovie({...selectedMovie, subtitles: e.target.value.split(',').map(s => s.trim())})}
                    className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-status" className="text-gray-300">Status</Label>
                  <select
                    id="edit-status"
                    value={selectedMovie.status}
                    onChange={(e) => setSelectedMovie({...selectedMovie, status: e.target.value as Movie['status']})}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:border-yellow-500 focus:outline-none"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="now_showing">Now Showing</option>
                    <option value="ended">Ended</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              
              <div className="md:col-span-2 space-y-4">
                <div>
                  <Label htmlFor="edit-posterUrl" className="text-gray-300">Poster URL</Label>
                  <Input
                    id="edit-posterUrl"
                    value={selectedMovie.posterUrl}
                    onChange={(e) => setSelectedMovie({...selectedMovie, posterUrl: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-description" className="text-gray-300">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={selectedMovie.description}
                    onChange={(e) => setSelectedMovie({...selectedMovie, description: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white focus:border-yellow-500 min-h-[100px]"
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
              onClick={handleEditMovie}
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
              Are you sure you want to delete this movie? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedMovie && (
            <div className="py-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                <div className="w-16 h-20 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded overflow-hidden flex items-center justify-center">
                  {selectedMovie.posterUrl ? (
                    <img 
                      src={selectedMovie.posterUrl} 
                      alt={selectedMovie.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Film className="w-8 h-8 text-yellow-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-white">{selectedMovie.name}</p>
                  <p className="text-sm text-gray-400">{selectedMovie.genres.join(', ')}</p>
                  <Badge className={cn("mt-2", getStatusColor(selectedMovie.status))}>
                    {getStatusText(selectedMovie.status)}
                  </Badge>
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
              onClick={handleDeleteMovie}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
            >
              Delete Movie
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </LayoutWrapper>
  )
}