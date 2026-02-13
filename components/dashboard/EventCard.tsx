'use client'

import { Calendar, Users, MapPin, Clock, Eye, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'
import { motion } from 'framer-motion'

interface EventCardProps {
  event: {
    id: string
    title: string
    date: Date | string
    location?: string | null
    capacity?: number | null
    imageUrl?: string | null
    slug: string
    _count?: {
      rsvps: number
    }
  }
  onDelete?: (id: string) => void
}

export default function EventCard({ event, onDelete }: EventCardProps) {
  return (
    <Card
      variant="default"
      className="group flex flex-col h-full overflow-hidden p-0 border-0 bg-white hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 rounded-3xl"
    >
      {/* Event Image or Placeholder */}
      <div className="h-56 relative overflow-hidden">
        {event.imageUrl ? (
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
            <Calendar className="w-16 h-16 text-blue-200" />
          </div>
        )}

        {/* Overlay Badge */}
        <div className="absolute top-5 right-5 z-10">
          <div className="px-4 py-1.5 glass-effect rounded-full text-xs font-bold text-blue-700 shadow-xl border border-white/40 flex items-center gap-2">
            <Users className="w-3.5 h-3.5" />
            {event._count?.rsvps || 0} RSVPs
          </div>
        </div>

        {/* Date Badge */}
        <div className="absolute bottom-5 left-5 z-10">
          <div className="p-3 bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-white/40 flex flex-col items-center min-w-[50px]">
            <span className="text-xs font-bold text-blue-600 uppercase">
              {new Date(event.date).toLocaleString('default', { month: 'short' })}
            </span>
            <span className="text-xl font-black text-slate-900 leading-none mt-1">
              {new Date(event.date).getDate()}
            </span>
          </div>
        </div>
      </div>

      <div className="p-7 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
          {event.title}
        </h3>

        <div className="space-y-3 text-sm font-medium text-slate-500 mb-8 flex-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
              <Clock className="w-4 h-4" />
            </div>
            <span>{formatDate(event.date)}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="line-clamp-1">{event.location}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Link href={`/events/${event.slug}`} className="flex-1">
            <Button variant="outline" className="w-full h-11 rounded-2xl border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
          </Link>
          <Link href={`/dashboard/events/${event.id}`}>
            <Button variant="secondary" className="w-11 h-11 p-0 rounded-2xl flex items-center justify-center bg-slate-50 border-0 hover:bg-blue-50 hover:text-blue-600" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
          </Link>
          {onDelete && (
            <Button
              variant="secondary"
              size="sm"
              className="w-11 h-11 p-0 rounded-2xl flex items-center justify-center bg-rose-50 border-0 text-rose-500 hover:bg-rose-100 hover:text-rose-600"
              onClick={() => onDelete(event.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
