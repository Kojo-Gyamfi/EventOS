import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import EventsPageClient from '@/components/dashboard/EventsPageClient'

export default async function EventsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) return null

  const events = await db.event.findMany({
    where: { userId: session.user.id },
    include: {
        _count: {
            select: { rsvps: true }
        }
    },
    orderBy: { date: 'asc' },
  })

  return <EventsPageClient events={events} />
}
