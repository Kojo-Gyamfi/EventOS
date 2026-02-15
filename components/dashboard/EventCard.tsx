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
      variant="dark-glass"
      className="group flex flex-col h-full overflow-hidden p-0 border-white/5 hover:border-white/10 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 rounded-[32px]"
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
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-white/5 to-white/2">
            <Calendar className="w-16 h-16 text-slate-800" />
          </div>
        )}

        {/* Overlay Badge */}
        <div className="absolute top-5 right-5 z-10">
          <div className="px-4 py-2 bg-slate-950/60 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-widest text-blue-400 border border-white/10 flex items-center gap-2">
            <Users className="w-3.5 h-3.5" />
            {event._count?.rsvps || 0} RSVPs
          </div>
        </div>

        {/* Date Badge */}
        <div className="absolute bottom-5 left-5 z-10">
          <div className="p-3 bg-slate-950/60 backdrop-blur-xl rounded-2xl border border-white/10 flex flex-col items-center min-w-[54px] shadow-2xl">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-wider">
              {new Date(event.date).toLocaleString('default', { month: 'short' })}
            </span>
            <span className="text-xl font-black text-white leading-none mt-1">
              {new Date(event.date).getDate()}
            </span>
          </div>
        </div>
      </div>

      <div className="p-7 flex-1 flex flex-col relative overflow-hidden group">
        <div className="absolute inset-0 bg-linear-to-br from-white/5 to-white/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-snug group-hover:text-blue-400 transition-colors">
          {event.title}
        </h3>

        <div className="space-y-3 text-sm font-medium text-slate-400 mb-8 flex-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 border border-white/5">
              <Clock className="w-4 h-4 text-blue-400" />
            </div>
            <span>{formatDate(event.date)}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 border border-white/5">
                <MapPin className="w-4 h-4 text-blue-400" />
              </div>
              <span className="line-clamp-1">{event.location}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Link href={`/events/${event.slug}`} className="flex-1">
            <Button variant="outline" className="w-full h-11 rounded-2xl border-white/10 text-white/50 hover:border-blue-500/50 hover:bg-blue-500/5 hover:text-slate-900" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
          </Link>
          <Link href={`/dashboard/events/${event.id}`}>
            <Button variant="secondary" className="w-12 h-12 p-0 rounded-2xl flex items-center justify-center bg-slate-50 border border-white/5 text-slate500 hover:bg-white/10 hover:text-blue-400" size="sm">
              <Edit className="w-6 h-6" />
            </Button>
          </Link>
          {onDelete && (
            <Button
              variant="secondary"
              size="sm"
              className="w-12 h-12 p-0 rounded-2xl flex items-center justify-center bg-red-500/5 border border-white/5 text-red-400  hover:bg-white/10 hover:text-blue-400"
              onClick={() => onDelete(event.id)}
            >
              <Trash2 className="w-6 h-6" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
