import Link from 'next/link'
import Card from '@/components/ui/Card'
import { User, Calendar } from 'lucide-react'

interface ActivityItem {
  id: string
  name: string
  email: string
  eventName: string
  eventSlug: string
  status: string
  createdAt: Date
}

export default function RecentActivity({ activities }: { activities: ActivityItem[] }) {
  if (activities.length === 0) {
    return (
      <Card variant="dark-glass" title="Recent Activity" className="border-white/5">
        <div className="text-center py-12 text-slate-500 font-medium italic">
          No orbital activity detected yet.
        </div>
      </Card>
    )
  }

  return (
    <Card variant="dark-glass" title="Recent Activity" className="h-full border-white/5 p-8">
      <div className="space-y-8 mt-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-5 group items-start">
            <div className="flex-shrink-0">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${activity.status === 'CONFIRMED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                  activity.status === 'DECLINED' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                    'bg-blue-500/10 text-blue-500 border-blue-500/20'
                }`}>
                <User className="w-5 h-5" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate transition-colors group-hover:text-blue-400">
                {activity.name}
              </p>
              <p className="text-sm text-slate-500 truncate font-medium">
                {activity.email}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
                <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${activity.status === 'CONFIRMED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                    activity.status === 'DECLINED' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                      'bg-blue-500/10 text-blue-500 border-blue-500/20'
                  }`}>
                  {activity.status}
                </span>
                <span className="text-slate-700">•</span>
                <Link href={`/dashboard/events/${activity.eventSlug}`} className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5 font-bold truncate max-w-[140px]">
                  <Calendar className="w-3 h-3" />
                  {activity.eventName}
                </Link>
                <span className="text-slate-700">•</span>
                <span className="text-slate-500 font-bold whitespace-nowrap">
                  {new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
                    -Math.round((new Date().getTime() - new Date(activity.createdAt).getTime()) / (1000 * 60 * 60 * 24)),
                    'day'
                  ).replace('0 days ago', 'Today')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
