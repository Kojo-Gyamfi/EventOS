'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Plus, LayoutGrid, List } from 'lucide-react'
import Button from '@/components/ui/Button'
import EventCard from '@/components/dashboard/EventCard'
import EventTable from '@/components/dashboard/EventTable'

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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Events</h1>
          <p className="text-slate-500 mt-1">Manage your upcoming and past events.</p>
        </div>
        
        <div className="flex items-center gap-2">
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1">
                <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
                >
                    <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded-md transition-colors ${viewMode === 'table' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
                >
                    <List className="w-5 h-5" />
                </button>
            </div>
            
            <Link href="/dashboard/events/new">
                <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Create Event
                </Button>
            </Link>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {initialEvents.map(event => (
                <EventCard key={event.id} event={event} />
            ))}
             {initialEvents.length === 0 && (
                <div className="col-span-full text-center py-12 text-slate-500 bg-white rounded-xl border border-dashed border-slate-300">
                    <p>No events found. Create your first one!</p>
                </div>
            )}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden text-slate-900">
            <EventTable events={initialEvents} onDelete={handleDelete} />
        </div>
      )}
    </div>
  )
}
