
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Calendar, MapPin, Clock } from 'lucide-react'
import { db } from '@/lib/db'
import { formatDate, formatDateTime } from '@/lib/utils'
import RSVPForm from '@/components/forms/RSVPForm'

export default async function PublicEventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const event = await db.event.findFirst({
    where: { slug },
  })

  if (!event) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <div className="relative h-[300px] md:h-[400px] w-full bg-slate-900 overflow-hidden">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900 opacity-90" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{event.title}</h1>
                <div className="flex flex-wrap items-center gap-6 text-lg font-medium text-blue-100">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <span>{formatDateTime(event.date)}</span>
                    </div>
                     {event.location && (
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            <span>{event.location}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">About this Event</h2>
                    <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">
                        {event.description || 'No description provided.'}
                    </p>
                </div>
            </div>

            {/* Sidebar / RSVP */}
            <div className="lg:col-span-1">
                <div className="sticky top-8">
                    <RSVPForm eventId={event.id} eventName={event.title} />
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
