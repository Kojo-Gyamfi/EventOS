import { Calendar, Users, MapPin, Clock, Eye, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'

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
    <Card className="hover:shadow-md transition-shadow duration-300 flex flex-col h-full overflow-hidden p-0">
      {/* Event Image or Placeholder */}
      <div className="h-48 bg-slate-100 relative group">
        {event.imageUrl ? (
          <img 
            src={event.imageUrl} 
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
            <Calendar className="w-12 h-12 text-blue-200" />
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full px-3 py-1 text-xs font-bold text-blue-700 shadow-sm">
           {event._count?.rsvps || 0} RSVPs
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">
          {event.title}
        </h3>
        
        <div className="space-y-2 text-sm text-slate-600 mb-6 flex-1">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>{formatDate(event.date)}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mt-auto">
          <Link href={`/events/${event.slug}`} target="_blank" className="flex-1">
            <Button variant="outline" className="w-full gap-2" size="sm" title="View Public Page">
              <Eye className="w-4 h-4" />
              View
            </Button>
          </Link>
          <Link href={`/dashboard/events/${event.id}`} className="flex-1">
            <Button variant="outline" className="w-full gap-2" size="sm" title="Edit Event">
              <Edit className="w-4 h-4" />
              Edit
            </Button>
          </Link>
          {onDelete && (
            <Button 
              variant="outline" 
              size="sm" 
              className="px-3 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300"
              onClick={() => onDelete(event.id)}
              title="Delete Event"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
