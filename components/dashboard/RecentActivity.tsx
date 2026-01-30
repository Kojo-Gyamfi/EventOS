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
      <Card title="Recent Activity">
        <div className="text-center py-8 text-slate-500 text-sm">
          No recent activity to show.
        </div>
      </Card>
    )
  }

  return (
    <Card title="Recent Activity" className="h-full">
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4">
            <div className="mt-1 flex-shrink-0">
               <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                   activity.status === 'CONFIRMED' ? 'bg-green-100 text-green-600' :
                   activity.status === 'DECLINED' ? 'bg-red-100 text-red-600' :
                   'bg-blue-100 text-blue-600'
               }`}>
                 <User className="w-4 h-4" />
               </div>
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-sm font-medium text-slate-900 truncate">
                 {activity.name}
               </p>
               <p className="text-sm text-slate-500 truncate">
                 {activity.email}
               </p>
               <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium uppercase ${
                       activity.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                       activity.status === 'DECLINED' ? 'bg-red-100 text-red-700' :
                       'bg-blue-100 text-blue-700'
                  }`}>
                    {activity.status}
                  </span>
                  <span>•</span>
                  <Link href={`/dashboard/events/${activity.eventSlug}`} className="hover:text-blue-600 transition-colors flex items-center gap-1 truncate max-w-[150px]">
                     <Calendar className="w-3 h-3" />
                     {activity.eventName}
                  </Link>
                  <span>•</span>
                  <span>
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
