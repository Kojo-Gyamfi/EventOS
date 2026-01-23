
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { CalendarDays, Users, TrendingUp, Plus } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import EventCard from '@/components/dashboard/EventCard'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) return null

  // Fetch user stats
  const events = await db.event.findMany({
    where: { userId: session.user.id },
    include: {
        _count: {
            select: { rsvps: true }
        }
    },
    orderBy: { createdAt: 'desc' },
    take: 5 
  })

  // Calculate generic stats
  const totalEvents = await db.event.count({ where: { userId: session.user.id } })
  
  const totalRSVPs = events.reduce((acc: number, curr: any) => acc + (curr._count?.rsvps || 0), 0) // Approximation based on recent events for now, proper would be aggregation

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Welcome back, {session.user.name}</p>
        </div>
        <Link href="/dashboard/events/new">
          <Button className="gap-2 shadow-blue-500/25">
            <Plus className="w-5 h-5" />
            Create New Event
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="elevated" className="flex items-center gap-4 border-l-4 border-blue-500">
           <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
             <CalendarDays className="w-6 h-6" />
           </div>
           <div>
             <p className="text-sm font-medium text-slate-500">Total Events</p>
             <p className="text-2xl font-bold text-slate-900">{totalEvents}</p>
           </div>
        </Card>
        
        <Card variant="elevated" className="flex items-center gap-4 border-l-4 border-emerald-500">
           <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
             <Users className="w-6 h-6" />
           </div>
           <div>
             <p className="text-sm font-medium text-slate-500">Total RSVPs</p>
             <p className="text-2xl font-bold text-slate-900">{totalRSVPs}</p>
           </div>
        </Card>

        <Card variant="elevated" className="flex items-center gap-4 border-l-4 border-violet-500">
           <div className="p-3 bg-violet-50 rounded-lg text-violet-600">
             <TrendingUp className="w-6 h-6" />
           </div>
           <div>
             <p className="text-sm font-medium text-slate-500">Active Now</p>
             <p className="text-2xl font-bold text-slate-900">
                {events.filter((e: any) => new Date(e.date) > new Date()).length}
             </p>
           </div>
        </Card>
      </div>

      {/* Recent Events Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
           <h2 className="text-xl font-bold text-slate-900">Recent Events</h2>
           <Link href="/dashboard/events" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
             View All
           </Link>
        </div>

        {events.length === 0 ? (
          <Card className="text-center py-12 bg-slate-50 border-dashed border-2 border-slate-200">
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <CalendarDays className="w-8 h-8 text-slate-300" />
             </div>
             <h3 className="text-lg font-medium text-slate-900 mb-1">No events yet</h3>
             <p className="text-slate-500 mb-6">Create your first event to get started</p>
             <Link href="/dashboard/events/new">
               <Button variant="outline">Create Event</Button>
             </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event: any) => (
               <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
