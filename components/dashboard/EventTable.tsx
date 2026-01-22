import Link from 'next/link'
import { Edit, Trash2, Eye, MoreHorizontal } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table'
import Button from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'

interface EventTableProps {
  events: any[] // TODO: Type properly
  onDelete: (id: string) => void
}

export default function EventTable({ events, onDelete }: EventTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Event Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>RSVPs</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell className="font-medium">
              <div className="flex flex-col">
                <span className="text-slate-900 font-semibold">{event.title}</span>
                <span className="text-slate-500 text-xs">/{event.slug}</span>
              </div>
            </TableCell>
            <TableCell>{formatDate(event.date)}</TableCell>
            <TableCell>{event.location || 'Online'}</TableCell>
            <TableCell>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {event._count?.rsvps || 0}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Link href={`/events/${event.slug}`} target="_blank">
                  <Button variant="ghost" size="sm" className="h-10 w-10 p-0" title="View Public Page">  
                    <Eye className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href={`/dashboard/events/${event.id}`}>
                  <Button variant="ghost" size="sm" className="h-10 w-10 p-0" title="Edit Event">
                    <Edit className="w-5 h-5" />
                  </Button>
                </Link>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-10 w-10 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => {
                      onDelete(event.id)
                    }}
                    title="Delete Event"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
        {events.length === 0 && (
            <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                    No events found
                </TableCell>
            </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
