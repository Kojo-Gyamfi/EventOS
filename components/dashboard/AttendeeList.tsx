'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { formatDate } from '@/lib/utils'

interface AttendeeListProps {
  rsvps: any[]
}

export default function AttendeeList({ rsvps }: AttendeeListProps) {
  if (rsvps.length === 0) {
    return (
      <div className="text-center py-16 bg-white/5 rounded-[32px] border border-white/5 backdrop-blur-xl">
        <p className="text-slate-500 font-bold italic">No orbital invitations accepted yet.</p>
      </div>
    )
  }

  return (
    <div className="bg-slate-950/40 backdrop-blur-2xl rounded-[32px] border border-white/5 overflow-hidden shadow-2xl">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow className="border-b border-white/5 hover:bg-transparent">
            <TableHead className="py-5 px-6 text-slate-500 font-black uppercase tracking-widest text-[10px]">Name</TableHead>
            <TableHead className="py-5 px-6 text-slate-500 font-black uppercase tracking-widest text-[10px]">Email Address</TableHead>
            <TableHead className="py-5 px-6 text-slate-500 font-black uppercase tracking-widest text-[10px]">Status</TableHead>
            <TableHead className="py-5 px-6 text-slate-500 font-black uppercase tracking-widest text-[10px]">Registered</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rsvps.map((rsvp) => (
            <TableRow key={rsvp.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
              <TableCell className="py-6 px-6 font-bold text-white">{rsvp.name}</TableCell>
              <TableCell className="py-6 px-6 font-medium text-slate-400">{rsvp.email}</TableCell>
              <TableCell className="py-6 px-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${rsvp.status === 'CONFIRMED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                    rsvp.status === 'DECLINED' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                      'bg-amber-500/10 text-amber-500 border-amber-500/20'
                  }`}>
                  {rsvp.status}
                </span>
              </TableCell>
              <TableCell className="py-6 px-6 font-bold text-slate-500">{formatDate(rsvp.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
