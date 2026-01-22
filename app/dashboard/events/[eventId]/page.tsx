
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
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{event.title}</h1>
        <div className="flex items-center gap-4 text-sm text-slate-500">
             <span>{new Date(event.date).toLocaleDateString()}</span>
             <span>•</span>
             <span>{event.location || 'Online'}</span>
        </div>
      </div>

       <div className="grid gap-8">
          {/* We can use a client component wrapper for tabs or just render form for now. 
              The plan mentioned AttendeeList. Let's create it.
          */}
          <EventForm initialData={event} isEditing />
          
          <div className="border-t border-slate-200 pt-8">
             <h2 className="text-xl font-bold text-slate-900 mb-4">Guest List</h2>
             <AttendeeList rsvps={event.rsvps} />
          </div>
       </div>
    </div>
  )
}
