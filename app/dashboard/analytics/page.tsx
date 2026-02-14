import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import AnalyticsCharts from '@/components/dashboard/AnalyticsCharts'
import RecentActivity from '@/components/dashboard/RecentActivity'

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) return null

  // Fetch user events with RSVPs for analytics
  const events = await db.event.findMany({
    where: { userId: session.user.id },
    include: {
      rsvps: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  // RSVP breakdown
  const confirmedRSVPs = events.reduce((acc, curr) => acc + curr.rsvps.filter(r => r.status === 'CONFIRMED').length, 0)
  const pendingRSVPs = events.reduce((acc, curr) => acc + curr.rsvps.filter(r => r.status === 'PENDING').length, 0)
  const declinedRSVPs = events.reduce((acc, curr) => acc + curr.rsvps.filter(r => r.status === 'DECLINED').length, 0)

  // Chart Data: Overview
  const overviewData = [
    { name: 'Confirmed', value: confirmedRSVPs, color: '#10b981' }, // green-500
    { name: 'Pending', value: pendingRSVPs, color: '#3b82f6' },   // blue-500
    { name: 'Declined', value: declinedRSVPs, color: '#ef4444' } // red-500
  ]

  // Chart Data: Growth (Simulated daily trend from recent RSVPs)
  const allRSVPs = events.flatMap(e => e.rsvps)
  const rsvpsByDate = allRSVPs.reduce((acc: any, rsvp) => {
    const date = rsvp.createdAt.toISOString().split('T')[0]
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {})

  const growthData = Object.entries(rsvpsByDate)
    .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
    .slice(-7) // Last 7 days with activity
    .map(([name, rsvps]) => ({ name, rsvps: Number(rsvps) }))


  // Recent Activity Feed
  // Flatten RSVPs, sort by date desc, and take top 10
  const recentActivity = events.flatMap(event =>
    event.rsvps.map(rsvp => ({
      id: rsvp.id,
      name: rsvp.name,
      email: rsvp.email,
      status: rsvp.status,
      createdAt: rsvp.createdAt,
      eventName: event.title,
      eventSlug: event.slug
    }))
  )
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight">Analytics Dashboard</h1>
        <p className="text-lg text-slate-400 font-medium">Deep dive into your event performance</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Charts take up 2 cols */}
        <div className="xl:col-span-2">
          <AnalyticsCharts overviewData={overviewData} growthData={growthData} />
        </div>

        {/* Recent Activity takes up 1 col */}
        <div className="xl:col-span-1 h-full">
          <RecentActivity activities={recentActivity} />
        </div>
      </div>
    </div>
  )
}
