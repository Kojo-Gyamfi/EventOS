
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import EventForm from '@/components/forms/EventForm'
import AttendeeList from '@/components/dashboard/AttendeeList'

export default async function EventPage({ params }: { params: Promise<{ eventId: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return null

  const { eventId } = await params

  const event = await db.event.findUnique({
    where: {
      id: eventId,
      userId: session.user.id,
    },
    include: {
      rsvps: {
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  if (!event) {
    notFound()
  }

  // Serializable event for client component (dates to strings if needed, but react-hook-form handles Date object in defaultValues sometimes, but safer to serialize)
  // Actually EventForm handles string conversion.

  return (
    <div className="max-w-4xl mx-auto space-y-12 px-4 sm:px-6 lg:px-8">
      <div className="pb-8 border-b border-white/5">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 break-words">{event.title}</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm sm:text-base font-bold text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] shrink-0" />
            <span className="truncate">{new Date(event.date).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <span className="text-slate-400 truncate">{event.location || 'Online / Virtual'}</span>
        </div>
      </div>

      <div className="grid gap-12">
        <EventForm initialData={event} isEditing />

        <div className="pt-8 w-full max-w-full overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-8 tracking-tight">Guest List</h2>
          <AttendeeList rsvps={event.rsvps} />
        </div>
      </div>
    </div>
  )
}
