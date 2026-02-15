import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { CalendarDays, Users, TrendingUp, Plus, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import EventCard from '@/components/dashboard/EventCard'
import { cn } from '@/lib/utils'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) return null

  // Fetch user stats with more granular data
  const events = await db.event.findMany({
    where: { userId: session.user.id },
    include: {
      _count: {
        select: { rsvps: true }
      }
    },
    orderBy: { createdAt: 'desc' },
  })

  // Calculate detailed stats
  const totalEvents = events.length
  const totalRSVPs = events.reduce((acc, curr) => acc + (curr._count?.rsvps || 0), 0)

  // Recent 4 events for the list
  const recentEvents = events.slice(0, 4)

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-lg text-slate-400 mt-2 font-medium">
            Welcome back, <span className="text-blue-500 font-bold">{session.user.name}</span>. Here's what's happening.
          </p>
        </div>
        <Link href="/dashboard/events/new">
          <Button className="gap-2 shadow-2xl shadow-blue-500/20 px-8 py-7 rounded-2xl" variant="primary">
            <Plus className="w-5 h-5" />
            <span className="text-lg">Create New Event</span>
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            label: 'Total Events',
            value: totalEvents,
            icon: CalendarDays,
            color: 'text-blue-500',
            glow: 'bg-blue-500/10',
          },
          {
            label: 'Total RSVPs',
            value: totalRSVPs,
            icon: Users,
            color: 'text-indigo-500',
            glow: 'bg-indigo-500/10',
          },
          {
            label: 'Active Events',
            value: events.filter((e) => new Date(e.date) > new Date()).length,
            icon: TrendingUp,
            color: 'text-emerald-500',
            glow: 'bg-emerald-500/10',
          }
        ].map((stat) => (
          <Card
            key={stat.label}
            variant="dark-glass"
            className={cn("relative overflow-hidden border-white/5 p-8 rounded-[40px] group hover:-translate-y-1 transition-all duration-300")}
          >
            <div className="flex items-center gap-6 relative z-10">
              <div className={cn("w-14 h-14 rounded-3xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 border border-white/5", stat.glow)}>
                <stat.icon className={cn("w-7 h-7", stat.color)} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">{stat.label}</p>
                <p className="text-4xl font-black text-white mt-1 tracking-tight">{stat.value}</p>
              </div>
            </div>
            <div className={cn("absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-10 blur-3xl", stat.glow)} />
          </Card>
        ))}
      </div>

      {/* Recent Events Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-2xl font-black text-white tracking-tight">Recent Events</h2>
          <Link href="/dashboard/events" className="group flex items-center gap-2 text-slate-300 hover:text-white font-bold text-sm bg-white/5 hover:bg-white/10 py-2.5 px-5 rounded-xl transition-all border border-white/5">
            View All
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {recentEvents.length === 0 ? (
          <Card variant="dark-glass" className="flex flex-col items-center justify-center py-24 rounded-[40px] border-white/5 border-dashed">
            <div className="w-24 h-24 bg-white/5 text-slate-500 rounded-[32px] flex items-center justify-center mb-6 border border-white/5">
              <CalendarDays className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No events found</h3>
            <p className="text-slate-500 mb-10 max-w-sm text-center font-medium">Ready to host your next big thing? Start by creating your first event today.</p>
            <Link href="/dashboard/events/new">
              <Button variant="primary" className="rounded-2xl px-10 h-14 shadow-2xl shadow-blue-500/20">Create Your First Event</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {recentEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
