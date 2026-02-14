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
        <div className="space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 pb-4 border-b border-white/5">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Events</h1>
                    <p className="text-lg text-slate-400 mt-2 font-medium">Manage your security perimeter and event portfolio.</p>
                </div>

                <div className="flex items-center gap-5">
                    <div className="flex items-center bg-white/5 p-1.5 rounded-2xl border border-white/5 shadow-inner backdrop-blur-xl">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={cn(
                                "p-3 rounded-xl transition-all duration-300",
                                viewMode === 'grid' ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-slate-500 hover:text-white"
                            )}
                        >
                            <LayoutGrid className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            className={cn(
                                "p-3 rounded-xl transition-all duration-300",
                                viewMode === 'table' ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-slate-500 hover:text-white"
                            )}
                        >
                            <List className="w-5 h-5" />
                        </button>
                    </div>

                    <Link href="/dashboard/events/new">
                        <Button className="gap-2 shadow-2xl shadow-blue-500/20 px-8 py-7 rounded-2xl" variant="primary">
                            <Plus className="w-5 h-5" />
                            <span className="text-lg font-bold">Create Event</span>
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
                            className="col-span-full py-24 text-center glass-effect rounded-[40px] border-white/5 border-dashed"
                        >
                            <div className="w-24 h-24 bg-white/5 text-slate-500 rounded-[32px] flex items-center justify-center mx-auto mb-8 border border-white/5">
                                <CalendarDays className="w-12 h-12" />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-3 tracking-tight">No events discovered yet</h3>
                            <p className="text-slate-400 mb-10 max-w-sm mx-auto font-medium leading-relaxed">Ready to synchronize your first audience? Start by creating your first event today.</p>
                            <Link href="/dashboard/events/new">
                                <Button variant="primary" className="rounded-2xl px-10 h-14 shadow-2xl shadow-blue-500/20">
                                    Initialize First Sequence
                                </Button>
                            </Link>
                        </motion.div>
                    )}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-950/40 backdrop-blur-2xl rounded-[40px] border border-white/5 overflow-hidden shadow-2xl"
                >
                    {/* Note: EventTable might need its own updates for perfect consistency, but its container is now glass */}
                    <EventTable events={initialEvents} onDelete={handleDelete} />
                </motion.div>
            )}
        </div>
    )
}
