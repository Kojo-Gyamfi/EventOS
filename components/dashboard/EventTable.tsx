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
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow className="border-b border-slate-100 hover:bg-transparent">
            <TableHead className="py-5 px-6 text-slate-400 font-bold uppercase tracking-wider text-[10px]">Event Details</TableHead>
            <TableHead className="py-5 px-6 text-slate-400 font-bold uppercase tracking-wider text-[10px]">Date & Time</TableHead>
            <TableHead className="py-5 px-4 text-slate-400 font-bold uppercase tracking-wider text-[10px]">Location</TableHead>
            <TableHead className="py-5 px-4 text-slate-400 font-bold uppercase tracking-wider text-[10px]">Attendees</TableHead>
            <TableHead className="py-5 px-6 text-right text-slate-400 font-bold uppercase tracking-wider text-[10px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id} className="group border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
              <TableCell className="py-5 px-6">
                <div className="flex flex-col">
                  <span className="text-slate-900 font-bold group-hover:text-blue-600 transition-colors">{event.title}</span>
                  <span className="text-slate-400 text-xs mt-0.5 font-medium">/{event.slug}</span>
                </div>
              </TableCell>
              <TableCell className="py-5 px-6 font-medium text-slate-600">
                {formatDate(event.date)}
              </TableCell>
              <TableCell className="py-5 px-4 font-medium text-slate-500">
                {event.location || (
                  <span className="text-blue-500 bg-blue-50 px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-tight">Virtual</span>
                )}
              </TableCell>
              <TableCell className="py-5 px-4">
                <div className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 shadow-xs">
                  {event._count?.rsvps || 0} RSVPs
                </div>
              </TableCell>
              <TableCell className="py-5 px-6 text-right">
                <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/events/${event.slug}`} target="_blank">
                    <Button variant="secondary" size="sm" className="h-9 w-9 p-0 rounded-xl bg-slate-100 border-0 hover:bg-blue-100 hover:text-blue-600 transition-all">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/dashboard/events/${event.id}`}>
                    <Button variant="secondary" size="sm" className="h-9 w-9 p-0 rounded-xl bg-slate-100 border-0 hover:bg-indigo-100 hover:text-indigo-600 transition-all">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-9 w-9 p-0 rounded-xl bg-slate-100 border-0 text-rose-500 hover:bg-rose-100 hover:text-rose-600 transition-all"
                    onClick={() => onDelete(event.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {events.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-20 text-slate-500 font-medium">
                No events discovered yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
