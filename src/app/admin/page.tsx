'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Booking, PortfolioItem, Testimonial } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { LogOut, Loader2, Edit, Save, X, Trash2, Plus, GripVertical } from 'lucide-react'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SortablePortfolioItem, SortableTestimonialItem } from '@/components/admin/SortableItems'

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [bookings, setBookings] = useState<Booking[]>([])
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [activeTab, setActiveTab] = useState<'bookings' | 'portfolio' | 'testimonials'>('bookings')
    const [editingPortfolio, setEditingPortfolio] = useState<string | null>(null)
    const [editingTestimonial, setEditingTestimonial] = useState<string | null>(null)

    useEffect(() => {
        checkAuth()
    }, [])

    function checkAuth() {
        const auth = localStorage.getItem('admin_authenticated')
        if (auth === 'true') {
            setIsAuthenticated(true)
            fetchData()
        }
        setLoading(false)
    }

    async function fetchData() {
        const supabase = createClient()

        const { data: bookingsData } = await supabase
            .from('bookings')
            .select('*')
            .order('created_at', { ascending: false })
        if (bookingsData) setBookings(bookingsData)

        const { data: portfolioData } = await supabase
            .from('portfolio_items')
            .select('*')
            .order('display_order', { ascending: true })
        if (portfolioData) setPortfolioItems(portfolioData)

        // Fetch testimonials via admin API
        try {
            const response = await fetch('/api/admin/testimonials', {
                headers: {
                    'x-admin-password': process.env.NEXT_PUBLIC_ADMIN_PASSWORD || ''
                }
            })
            if (response.ok) {
                const testimonialsData = await response.json()
                setTestimonials(testimonialsData)
            }
        } catch (error) {
            console.error('Error fetching testimonials:', error)
        }
    }

    function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setError('')

        const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin'
        const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            localStorage.setItem('admin_authenticated', 'true')
            setIsAuthenticated(true)
            fetchData()
        } else {
            setError('Invalid username or password')
        }
    }

    function handleSignOut() {
        localStorage.removeItem('admin_authenticated')
        setIsAuthenticated(false)
        setBookings([])
        setPortfolioItems([])
        setTestimonials([])
        setUsername('')
        setPassword('')
    }

    async function updateBookingStatus(id: string, status: string) {
        const supabase = createClient()
        const { error } = await supabase
            .from('bookings')
            .update({ status })
            .eq('id', id)

        if (!error) {
            setBookings(bookings.map(b => b.id === id ? { ...b, status: status as any } : b))
        }
    }

    async function updatePortfolioItem(item: PortfolioItem) {
        try {
            const response = await fetch('/api/admin/portfolio', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-password': process.env.NEXT_PUBLIC_ADMIN_PASSWORD || ''
                },
                body: JSON.stringify({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    category: item.category,
                    thumbnail_url: item.thumbnail_url,
                    video_url: item.video_url
                })
            })

            if (!response.ok) {
                const error = await response.json()
                console.error('Failed to update portfolio item:', error)
                alert(`Failed to update portfolio item: ${error.error || 'Unknown error'}`)
                return
            }

            const updatedItem = await response.json()
            setPortfolioItems(portfolioItems.map(p => p.id === item.id ? updatedItem : p))
            setEditingPortfolio(null)
        } catch (error) {
            console.error('Error updating portfolio item:', error)
            alert('Failed to update portfolio item. Please try again.')
        }
    }

    async function deletePortfolioItem(id: string) {
        if (!confirm('Are you sure you want to delete this portfolio item?')) return

        try {
            const response = await fetch(`/api/admin/portfolio?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'x-admin-password': process.env.NEXT_PUBLIC_ADMIN_PASSWORD || ''
                }
            })

            if (!response.ok) {
                const error = await response.json()
                console.error('Failed to delete portfolio item:', error)
                alert(`Failed to delete portfolio item: ${error.error || 'Unknown error'}`)
                return
            }

            setPortfolioItems(portfolioItems.filter(p => p.id !== id))
        } catch (error) {
            console.error('Error deleting portfolio item:', error)
            alert('Failed to delete portfolio item. Please try again.')
        }
    }

    async function createPortfolioItem(item: Partial<PortfolioItem>): Promise<void> {
        try {
            const response = await fetch('/api/admin/portfolio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-password': process.env.NEXT_PUBLIC_ADMIN_PASSWORD || ''
                },
                body: JSON.stringify(item)
            })

            if (!response.ok) {
                const error = await response.json()
                console.error('Failed to create portfolio item:', error)
                alert(`Failed to create portfolio item: ${error.error || 'Unknown error'}`)
                throw new Error('Failed to create portfolio item')
            }

            const newItem = await response.json()
            setPortfolioItems([newItem, ...portfolioItems.filter(p => !p.id.startsWith('new-'))])
        } catch (error) {
            console.error('Error creating portfolio item:', error)
            alert('Failed to create portfolio item. Please try again.')
            throw error
        }
    }

    // Testimonials CRUD Functions
    async function createTestimonial(testimonial: Partial<Testimonial>): Promise<void> {
        try {
            const response = await fetch('/api/admin/testimonials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-password': process.env.NEXT_PUBLIC_ADMIN_PASSWORD || ''
                },
                body: JSON.stringify(testimonial)
            })

            if (!response.ok) {
                const error = await response.json()
                console.error('Failed to create testimonial:', error)
                alert(`Failed to create testimonial: ${error.error || 'Unknown error'}`)
                throw new Error(error.error || 'Failed to create testimonial')
            }

            const newTestimonial = await response.json()
            setTestimonials([newTestimonial, ...testimonials])
        } catch (error) {
            console.error('Error creating testimonial:', error)
            alert('Failed to create testimonial. Please try again.')
            throw error
        }
    }

    async function updateTestimonial(testimonial: Testimonial) {
        try {
            const response = await fetch('/api/admin/testimonials', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-password': process.env.NEXT_PUBLIC_ADMIN_PASSWORD || ''
                },
                body: JSON.stringify({
                    id: testimonial.id,
                    name: testimonial.name,
                    role: testimonial.role,
                    message: testimonial.message,
                    image_url: testimonial.image_url,
                    is_active: testimonial.is_active
                })
            })

            if (!response.ok) {
                const error = await response.json()
                console.error('Failed to update testimonial:', error)
                alert(`Failed to update testimonial: ${error.error || 'Unknown error'}`)
                return
            }

            const updatedTestimonial = await response.json()
            setTestimonials(testimonials.map(t => t.id === testimonial.id ? updatedTestimonial : t))
            setEditingTestimonial(null)
        } catch (error) {
            console.error('Error updating testimonial:', error)
            alert('Failed to update testimonial. Please try again.')
        }
    }

    async function deleteTestimonial(id: string) {
        if (!confirm('Are you sure you want to delete this testimonial?')) return

        try {
            const response = await fetch(`/api/admin/testimonials?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'x-admin-password': process.env.NEXT_PUBLIC_ADMIN_PASSWORD || ''
                }
            })

            if (!response.ok) {
                const error = await response.json()
                console.error('Failed to delete testimonial:', error)
                alert(`Failed to delete testimonial: ${error.error || 'Unknown error'}`)
                return
            }

            setTestimonials(testimonials.filter(t => t.id !== id))
        } catch (error) {
            console.error('Error deleting testimonial:', error)
            alert('Failed to delete testimonial. Please try again.')
        }
    }

    // Drag-and-Drop Sensors
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    // Portfolio Reorder Handler
    async function handlePortfolioDragEnd(event: DragEndEvent) {
        const { active, over } = event

        if (!over || active.id === over.id) return

        const oldIndex = portfolioItems.findIndex(item => item.id === active.id)
        const newIndex = portfolioItems.findIndex(item => item.id === over.id)

        const reorderedItems = arrayMove(portfolioItems, oldIndex, newIndex)

        // Optimistic update
        setPortfolioItems(reorderedItems)

        // Update display_order for all items
        const updates = reorderedItems.map((item, index) => ({
            id: item.id,
            display_order: index
        }))

        try {
            const response = await fetch('/api/admin/portfolio?action=reorder', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-password': process.env.NEXT_PUBLIC_ADMIN_PASSWORD || ''
                },
                body: JSON.stringify({ items: updates })
            })

            if (!response.ok) {
                // Revert on error
                setPortfolioItems(portfolioItems)
                alert('Failed to reorder items')
            }
        } catch (error) {
            console.error('Error reordering portfolio:', error)
            setPortfolioItems(portfolioItems)
            alert('Failed to reorder items')
        }
    }

    // Testimonials Reorder Handler
    async function handleTestimonialsDragEnd(event: DragEndEvent) {
        const { active, over } = event

        if (!over || active.id === over.id) return

        const oldIndex = testimonials.findIndex(item => item.id === active.id)
        const newIndex = testimonials.findIndex(item => item.id === over.id)

        const reorderedItems = arrayMove(testimonials, oldIndex, newIndex)

        // Optimistic update
        setTestimonials(reorderedItems)

        // Update display_order for all items
        const updates = reorderedItems.map((item, index) => ({
            id: item.id,
            display_order: index
        }))

        try {
            const response = await fetch('/api/admin/testimonials?action=reorder', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-password': process.env.NEXT_PUBLIC_ADMIN_PASSWORD || ''
                },
                body: JSON.stringify({ items: updates })
            })

            if (!response.ok) {
                // Revert on error
                setTestimonials(testimonials)
                alert('Failed to reorder items')
            }
        } catch (error) {
            console.error('Error reordering testimonials:', error)
            setTestimonials(testimonials)
            alert('Failed to reorder items')
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin" size={40} />
            </div>
        )
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-grey-100">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl mb-2">Admin Dashboard</CardTitle>
                        <CardDescription>Sign in to access the admin panel</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="username" className="text-sm font-semibold">
                                    Username
                                </label>
                                <Input
                                    id="username"
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter username"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-semibold">
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                />
                            </div>
                            {error && (
                                <div className="p-3 bg-destructive/10 border border-destructive text-destructive text-sm rounded">
                                    {error}
                                </div>
                            )}
                            <Button type="submit" className="w-full cursor-pointer" size="lg">
                                Sign In
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-8 bg-grey-100">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Diffindo Admin</h1>
                        <p className="text-muted-foreground">Manage bookings, portfolio, and testimonials</p>
                    </div>
                    <Button onClick={handleSignOut} variant="outline">
                        <LogOut className="mr-2" size={16} />
                        Sign Out
                    </Button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8">
                    <Button
                        variant={activeTab === 'bookings' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('bookings')}
                    >
                        Bookings ({bookings.length})
                    </Button>
                    <Button
                        variant={activeTab === 'portfolio' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('portfolio')}
                    >
                        Portfolio ({portfolioItems.length})
                    </Button>
                    <Button
                        variant={activeTab === 'testimonials' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('testimonials')}
                    >
                        Testimonials ({testimonials.length})
                    </Button>
                </div>

                {/* Bookings Table */}
                {activeTab === 'bookings' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Requests</CardTitle>
                            <CardDescription>Manage and track all project inquiries and booking requests</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {bookings.length === 0 ? (
                                <p className="text-center text-muted-foreground py-8">No bookings yet</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>WhatsApp</TableHead>
                                                <TableHead>Occasion</TableHead>
                                                <TableHead>Location</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Date</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {bookings.map((booking) => (
                                                <TableRow key={booking.id}>
                                                    <TableCell className="font-medium">{booking.name}</TableCell>
                                                    <TableCell>
                                                        <a
                                                            href={`https://wa.me/${booking.whatsapp_number.replace(/\D/g, '')}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="hover:underline"
                                                        >
                                                            {booking.whatsapp_number}
                                                        </a>
                                                    </TableCell>
                                                    <TableCell>{booking.occasion_type}</TableCell>
                                                    <TableCell>{booking.location}</TableCell>
                                                    <TableCell>
                                                        <Select
                                                            value={booking.status}
                                                            onValueChange={(value) => updateBookingStatus(booking.id, value)}
                                                        >
                                                            <SelectTrigger className="w-32">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="New">New</SelectItem>
                                                                <SelectItem value="Contacted">Contacted</SelectItem>
                                                                <SelectItem value="Confirmed">Confirmed</SelectItem>
                                                                <SelectItem value="Completed">Completed</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </TableCell>
                                                    <TableCell className="text-sm text-muted-foreground">
                                                        {new Date(booking.created_at).toLocaleDateString()}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Portfolio Management */}
                {activeTab === 'portfolio' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Portfolio Items</CardTitle>
                            <CardDescription>Manage portfolio items across video production, web development, and graphic design</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <Button
                                    onClick={() => {
                                        const newItem: PortfolioItem = {
                                            id: 'new-' + Date.now(),
                                            created_at: new Date().toISOString(),
                                            updated_at: new Date().toISOString(),
                                            title: '',
                                            category: 'Event',
                                            video_url: '',
                                            thumbnail_url: null,
                                            description: null,
                                            display_order: 0
                                        }
                                        setPortfolioItems([newItem, ...portfolioItems])
                                        setEditingPortfolio(newItem.id)
                                    }}
                                    size="sm"
                                >
                                    <Plus className="mr-2" size={16} />
                                    Add Portfolio Item
                                </Button>
                            </div>
                            {portfolioItems.length === 0 ? (
                                <p className="text-center text-muted-foreground py-8">No portfolio items yet</p>
                            ) : (
                                <DndContext
                                    sensors={sensors}
                                    collisionDetection={closestCenter}
                                    onDragEnd={handlePortfolioDragEnd}
                                >
                                    <SortableContext
                                        items={portfolioItems.map(i => i.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                            {portfolioItems.map((item) => (
                                                <SortablePortfolioItem key={item.id} item={item}>
                                                    {editingPortfolio === item.id ? (
                                                        <div className="space-y-4">
                                                            <Input
                                                                value={item.title}
                                                                onChange={(e) => setPortfolioItems(portfolioItems.map(p => p.id === item.id ? { ...p, title: e.target.value } : p))}
                                                                placeholder="Title"
                                                            />
                                                            <Textarea
                                                                value={item.description || ''}
                                                                onChange={(e) => setPortfolioItems(portfolioItems.map(p => p.id === item.id ? { ...p, description: e.target.value } : p))}
                                                                placeholder="Description"
                                                            />
                                                            <Select
                                                                value={item.category}
                                                                onValueChange={(value) => setPortfolioItems(portfolioItems.map(p => p.id === item.id ? { ...p, category: value as PortfolioItem['category'] } : p))}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {/* Video Project Categories */}
                                                                    <SelectItem value="Birthday">Birthday</SelectItem>
                                                                    <SelectItem value="Pre-shoot">Pre-shoot</SelectItem>
                                                                    <SelectItem value="Traditional">Traditional</SelectItem>
                                                                    <SelectItem value="Event">Event</SelectItem>
                                                                    <SelectItem value="Music Video">Music Video</SelectItem>
                                                                    <SelectItem value="Travel Highlights">Travel Highlights</SelectItem>
                                                                    <SelectItem value="Wedding Highlights">Wedding Highlights</SelectItem>
                                                                    <SelectItem value="Promotion Videos">Promotion Videos</SelectItem>
                                                                    {/* Web Project Categories */}
                                                                    <SelectItem value="Web Project">Web Project</SelectItem>
                                                                    <SelectItem value="Web Development">Web Development</SelectItem>
                                                                    {/* Design Project Categories */}
                                                                    <SelectItem value="Design">Design</SelectItem>
                                                                    <SelectItem value="Graphic Design">Graphic Design</SelectItem>
                                                                </SelectContent>
                                                            </Select>

                                                            {/* Thumbnail URL */}
                                                            <div className="space-y-2">
                                                                <label className="text-sm font-semibold">Thumbnail Image URL</label>
                                                                {item.thumbnail_url && (
                                                                    <div className="relative w-full aspect-video bg-grey-100 rounded border overflow-hidden">
                                                                        <img
                                                                            src={item.thumbnail_url}
                                                                            alt="Thumbnail preview"
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                    </div>
                                                                )}
                                                                <Input
                                                                    value={item.thumbnail_url || ''}
                                                                    onChange={(e) => setPortfolioItems(portfolioItems.map(p => p.id === item.id ? { ...p, thumbnail_url: e.target.value } : p))}
                                                                    placeholder="GitHub raw URL or YouTube thumbnail URL"
                                                                />
                                                            </div>

                                                            <Input
                                                                value={item.video_url || ''}
                                                                onChange={(e) => setPortfolioItems(portfolioItems.map(p => p.id === item.id ? { ...p, video_url: e.target.value } : p))}
                                                                placeholder="Video URL"
                                                            />
                                                            <div className="flex gap-2">
                                                                <Button onClick={() => {
                                                                    // Validate required fields
                                                                    if (!item.title.trim()) {
                                                                        alert('Please enter a title')
                                                                        return
                                                                    }
                                                                    if (!item.video_url.trim()) {
                                                                        alert('Please enter a video URL')
                                                                        return
                                                                    }

                                                                    if (item.id.startsWith('new-')) {
                                                                        // New item - create it
                                                                        createPortfolioItem({
                                                                            title: item.title,
                                                                            category: item.category,
                                                                            video_url: item.video_url,
                                                                            thumbnail_url: item.thumbnail_url,
                                                                            description: item.description,
                                                                            display_order: item.display_order
                                                                        }).then(() => {
                                                                            setPortfolioItems(portfolioItems.filter(p => p.id !== item.id))
                                                                            setEditingPortfolio(null)
                                                                        })
                                                                    } else {
                                                                        // Existing item - update it
                                                                        updatePortfolioItem(item)
                                                                    }
                                                                }} size="sm">
                                                                    <Save className="mr-2" size={16} />
                                                                    Save
                                                                </Button>
                                                                <Button onClick={() => {
                                                                    if (item.id.startsWith('new-')) {
                                                                        setPortfolioItems(portfolioItems.filter(p => p.id !== item.id))
                                                                    }
                                                                    setEditingPortfolio(null)
                                                                }} variant="outline" size="sm">
                                                                    <X className="mr-2" size={16} />
                                                                    Cancel
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <div className="flex items-start justify-between mb-2">
                                                                <div className="flex-1">
                                                                    <h3 className="text-sm font-semibold mb-1 line-clamp-1">{item.title}</h3>
                                                                    <Badge variant="outline" className="text-xs">{item.category}</Badge>
                                                                </div>
                                                                <div className="flex gap-1">
                                                                    <Button onClick={() => setEditingPortfolio(item.id)} variant="outline" size="icon-sm">
                                                                        <Edit size={14} />
                                                                    </Button>
                                                                    <Button onClick={() => deletePortfolioItem(item.id)} variant="outline" size="icon-sm" className="border-destructive text-destructive hover:bg-destructive/10">
                                                                        <Trash2 size={14} />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                            {item.thumbnail_url && (
                                                                <div className="w-full aspect-video bg-grey-100 rounded border overflow-hidden">
                                                                    <img
                                                                        src={item.thumbnail_url}
                                                                        alt={item.title}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </SortablePortfolioItem>
                                            ))}
                                        </div>
                                    </SortableContext>
                                </DndContext>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Testimonials Management */}
                {activeTab === 'testimonials' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Testimonials</CardTitle>
                            <CardDescription>Manage customer testimonials</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <Button
                                    onClick={() => {
                                        const newTestimonial: Testimonial = {
                                            id: 'new-' + Date.now(),
                                            created_at: new Date().toISOString(),
                                            name: '',
                                            role: '',
                                            message: '',
                                            image_url: '',
                                            is_active: true,
                                            display_order: 0
                                        }
                                        setTestimonials([newTestimonial, ...testimonials])
                                        setEditingTestimonial(newTestimonial.id)
                                    }}
                                    size="sm"
                                >
                                    <Plus className="mr-2" size={16} />
                                    Add Testimonial
                                </Button>
                            </div>

                            {testimonials.length === 0 ? (
                                <p className="text-center text-muted-foreground py-8">No testimonials yet</p>
                            ) : (
                                <DndContext
                                    sensors={sensors}
                                    collisionDetection={closestCenter}
                                    onDragEnd={handleTestimonialsDragEnd}
                                >
                                    <SortableContext
                                        items={testimonials.map(t => t.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {testimonials.map((testimonial) => (
                                                <SortableTestimonialItem key={testimonial.id} item={testimonial}>
                                                    {editingTestimonial === testimonial.id ? (
                                                        <div className="space-y-3">
                                                            <Input
                                                                value={testimonial.name}
                                                                onChange={(e) => setTestimonials(testimonials.map(t => t.id === testimonial.id ? { ...t, name: e.target.value } : t))}
                                                                placeholder="Name"
                                                            />
                                                            <Input
                                                                value={testimonial.role || ''}
                                                                onChange={(e) => setTestimonials(testimonials.map(t => t.id === testimonial.id ? { ...t, role: e.target.value } : t))}
                                                                placeholder="Role (optional)"
                                                            />
                                                            <Textarea
                                                                value={testimonial.message}
                                                                onChange={(e) => setTestimonials(testimonials.map(t => t.id === testimonial.id ? { ...t, message: e.target.value } : t))}
                                                                placeholder="Testimonial message"
                                                                rows={3}
                                                            />
                                                            <div className="space-y-2">
                                                                <label className="text-sm font-semibold">Profile Image URL</label>
                                                                {testimonial.image_url && (
                                                                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-grey-300 mx-auto">
                                                                        <img
                                                                            src={testimonial.image_url}
                                                                            alt={testimonial.name}
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                    </div>
                                                                )}
                                                                <Input
                                                                    value={testimonial.image_url}
                                                                    onChange={(e) => setTestimonials(testimonials.map(t => t.id === testimonial.id ? { ...t, image_url: e.target.value } : t))}
                                                                    placeholder="Google Drive image URL"
                                                                />
                                                                <p className="text-xs text-muted-foreground">Use a Google Drive or direct image URL</p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={testimonial.is_active}
                                                                    onChange={(e) => setTestimonials(testimonials.map(t => t.id === testimonial.id ? { ...t, is_active: e.target.checked } : t))}
                                                                    className="w-4 h-4"
                                                                />
                                                                <label className="text-sm">Active (visible on website)</label>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    onClick={() => {
                                                                        // Validate required fields
                                                                        if (!testimonial.name.trim()) {
                                                                            alert('Please enter a name')
                                                                            return
                                                                        }
                                                                        if (!testimonial.message.trim()) {
                                                                            alert('Please enter a testimonial message')
                                                                            return
                                                                        }
                                                                        if (!testimonial.image_url.trim()) {
                                                                            alert('Please enter an image URL')
                                                                            return
                                                                        }

                                                                        if (testimonial.id.startsWith('new-')) {
                                                                            // New testimonial - create it
                                                                            createTestimonial({
                                                                                name: testimonial.name,
                                                                                role: testimonial.role,
                                                                                message: testimonial.message,
                                                                                image_url: testimonial.image_url,
                                                                                is_active: testimonial.is_active,
                                                                                display_order: testimonial.display_order
                                                                            }).then(() => {
                                                                                // Remove the temporary one from state
                                                                                setTestimonials(testimonials.filter(t => t.id !== testimonial.id))
                                                                                setEditingTestimonial(null)
                                                                            }).catch(() => {
                                                                                // Error already handled in createTestimonial
                                                                            })
                                                                        } else {
                                                                            // Existing testimonial - update it
                                                                            updateTestimonial(testimonial)
                                                                        }
                                                                    }}
                                                                    size="sm"
                                                                >
                                                                    <Save className="mr-2" size={16} />
                                                                    Save
                                                                </Button>
                                                                <Button onClick={() => {
                                                                    if (testimonial.id.startsWith('new-')) {
                                                                        // Cancel new testimonial - remove from state
                                                                        setTestimonials(testimonials.filter(t => t.id !== testimonial.id))
                                                                    }
                                                                    setEditingTestimonial(null)
                                                                }} variant="outline" size="sm">
                                                                    <X className="mr-2" size={16} />
                                                                    Cancel
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <div className="flex items-start justify-between mb-2">
                                                                <div className="flex-1">
                                                                    <div className="flex items-center gap-2 mb-2">
                                                                        {testimonial.image_url && (
                                                                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-grey-300">
                                                                                <img
                                                                                    src={testimonial.image_url}
                                                                                    alt={testimonial.name}
                                                                                    className="w-full h-full object-cover"
                                                                                />
                                                                            </div>
                                                                        )}
                                                                        <div>
                                                                            <h3 className="text-sm font-semibold line-clamp-1">{testimonial.name}</h3>
                                                                            {testimonial.role && (
                                                                                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{testimonial.message}</p>
                                                                    <Badge variant={testimonial.is_active ? 'default' : 'outline'} className="text-xs">
                                                                        {testimonial.is_active ? 'Active' : 'Inactive'}
                                                                    </Badge>
                                                                </div>
                                                                <div className="flex gap-1">
                                                                    <Button onClick={() => setEditingTestimonial(testimonial.id)} variant="outline" size="icon-sm">
                                                                        <Edit size={14} />
                                                                    </Button>
                                                                    <Button onClick={() => deleteTestimonial(testimonial.id)} variant="outline" size="icon-sm" className="border-destructive text-destructive hover:bg-destructive/10">
                                                                        <Trash2 size={14} />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </SortableTestimonialItem>
                                            ))}
                                        </div>
                                    </SortableContext>
                                </DndContext>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
