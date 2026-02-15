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
        <TableHeader className="bg-white/5">
          <TableRow className="border-b border-white/5 hover:bg-transparent">
            <TableHead className="py-6 px-6 text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Event Details</TableHead>
            <TableHead className="py-6 px-6 text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Date & Time</TableHead>
            <TableHead className="py-6 px-4 text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Location</TableHead>
            <TableHead className="py-6 px-4 text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Attendees</TableHead>
            <TableHead className="py-6 px-6 text-right text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id} className="group border-b border-white/5 hover:bg-white/2 transition-colors">
              <TableCell className="py-6 px-6">
                <div className="flex flex-col">
                  <span className="text-white font-bold group-hover:text-blue-400 transition-colors text-base">{event.title}</span>
                  <span className="text-slate-500 text-xs mt-1 font-bold tracking-tight">/{event.slug}</span>
                </div>
              </TableCell>
              <TableCell className="py-6 px-6 font-bold text-slate-400">
                {formatDate(event.date)}
              </TableCell>
              <TableCell className="py-6 px-4 font-bold text-slate-500">
                {event.location || (
                  <span className="text-blue-400 bg-blue-500/10 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">Virtual</span>
                )}
              </TableCell>
              <TableCell className="py-6 px-4">
                <div className="inline-flex items-center px-4 py-1.5 rounded-xl text-xs font-black bg-white/5 text-slate-300 border border-white/10 shadow-lg">
                  {event._count?.rsvps || 0} RSVPs
                </div>
              </TableCell>
              <TableCell className="py-6 px-6 text-right">
                <div className="flex items-center justify-end gap-2 px-1">
                  <Link href={`/events/${event.slug}`} target="_blank">
                    <Button variant="secondary" size="sm" className="h-13 w-13 p-0 rounded-2xl bg-white/10 border border-white/10 text-white hover:text-slate-900 hover:bg-blue-600 hover:border-blue-500 transition-all shadow-xl">
                      <Eye className="w-12 h-12" />
                    </Button>
                  </Link>
                  <Link href={`/dashboard/events/${event.id}`}>
                    <Button variant="secondary" size="sm" className="h-13 w-13 p-0 rounded-2xl bg-white/10 border border-white/10 text-white hover:text-slate-900 hover:bg-indigo-600 hover:border-indigo-500 transition-all shadow-xl">
                      <Edit className="w-12 h-12" />
                    </Button>
                  </Link>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-13 w-13 p-0 rounded-2xl bg-white/5 border border-white/10 text-white hover:text-slate-900 hover:bg-rose-600 hover:border-rose-500 transition-all shadow-xl"
                    onClick={() => onDelete(event.id)}
                  >
                    <Trash2 className="w-12 h-12" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {events.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-24 text-slate-500 font-bold italic">
                No orbital signatures detected.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
