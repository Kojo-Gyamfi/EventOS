
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
    <div className="max-w-5xl mx-auto space-y-12 px-4 sm:px-6 lg:px-8 pb-32">
      <div className="relative group">
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="pb-10 border-b border-white/5 relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-1 bg-blue-600 rounded-full" />
            <span className="text-xs font-black text-blue-500 uppercase tracking-[0.3em]">Management Console</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 wrap-break-word leading-none">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-sm sm:text-base font-bold text-slate-400">
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5 backdrop-blur-xl">
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] shrink-0" />
              <span className="truncate">{new Date(event.date).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5 backdrop-blur-xl">
              <span className="text-slate-300 truncate">{event.location || 'Online / Virtual'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-12 relative">
        <EventForm initialData={event} isEditing />

        <div className="pt-8 w-full max-w-full overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-8 tracking-tight">Guest List</h2>
          <AttendeeList rsvps={event.rsvps} />
        </div>
      </div>
    </div>
  )
}
