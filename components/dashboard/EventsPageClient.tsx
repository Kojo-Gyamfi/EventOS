'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Plus, LayoutGrid, List, CalendarDays } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import EventCard from '@/components/dashboard/EventCard'
import EventTable from '@/components/dashboard/EventTable'

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
}

export default function EventsPageClient({ events: initialEvents }: { events: any[] }) {
    const router = useRouter()
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
    const [isDeleting, setIsDeleting] = useState<string | null>(null)

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return

        setIsDeleting(id)
        try {
            const res = await fetch(`/api/events/${id}`, { method: 'DELETE' })
            if (res.ok) {
                router.refresh()
            } else {
                alert('Failed to delete event')
            }
        } catch (err) {
            alert('Something went wrong')
        } finally {
            setIsDeleting(null)
        }
    }

    return (
        <div className="space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Events</h1>
                    <p className="text-slate-500 mt-2 font-medium">Manage your upcoming and past events efficiently.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={cn(
                                "p-2.5 rounded-xl transition-all duration-300",
                                viewMode === 'grid' ? "bg-white text-blue-600 shadow-md" : "text-slate-500 hover:text-slate-900"
                            )}
                        >
                            <LayoutGrid className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            className={cn(
                                "p-2.5 rounded-xl transition-all duration-300",
                                viewMode === 'table' ? "bg-white text-blue-600 shadow-md" : "text-slate-500 hover:text-slate-900"
                            )}
                        >
                            <List className="w-5 h-5" />
                        </button>
                    </div>

                    <Link href="/dashboard/events/new">
                        <Button className="gap-2 shadow-xl shadow-blue-500/10 py-6" variant="primary">
                            <Plus className="w-5 h-5" />
                            <span className="font-bold">Create Event</span>
                        </Button>
                    </Link>
                </div>
            </div>

            {viewMode === 'grid' ? (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8"
                >
                    {initialEvents.map(event => (
                        <motion.div key={event.id} variants={item}>
                            <EventCard event={event} onDelete={handleDelete} />
                        </motion.div>
                    ))}
                    {initialEvents.length === 0 && (
                        <motion.div
                            variants={item}
                            className="col-span-full py-24 text-center glass-effect rounded-[32px] border-2 border-dashed border-slate-200"
                        >
                            <div className="w-20 h-20 bg-blue-50 text-blue-400 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                <CalendarDays className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No events discovered yet</h3>
                            <p className="text-slate-500 mb-8 max-w-sm mx-auto">Start by creating your first event to reach out to your audience and manage attendees.</p>
                            <Link href="/dashboard/events/new">
                                <Button variant="outline" className="rounded-2xl border-2">
                                    Get Started Now
                                </Button>
                            </Link>
                        </motion.div>
                    )}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200/50"
                >
                    <EventTable events={initialEvents} onDelete={handleDelete} />
                </motion.div>
            )}
        </div>
    )
}
