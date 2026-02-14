'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'
import { useState, useEffect } from 'react'
import Card from '@/components/ui/Card'

interface AnalyticsChartsProps {
  overviewData: {
    name: string
    value: number
    color: string
  }[]
  growthData: {
    name: string
    rsvps: number
  }[]
}

export default function AnalyticsCharts({ overviewData, growthData }: AnalyticsChartsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card variant="dark-glass" className="h-[400px] border-white/5 animate-pulse">
          <div className="flex flex-col h-full items-center justify-center space-y-4">
            <div className="w-12 h-12 bg-white/5 rounded-2xl" />
            <span className="text-slate-500 font-medium">Synchronizing Data...</span>
          </div>
        </Card>
        <Card variant="dark-glass" className="h-[400px] border-white/5 animate-pulse">
          <div className="flex flex-col h-full items-center justify-center space-y-4">
            <div className="w-12 h-12 bg-white/5 rounded-2xl" />
            <span className="text-slate-500 font-medium">Mapping Trends...</span>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card variant="dark-glass" className="p-8 border-white/5" title="RSVP Overview">
        <div className="h-[320px] w-full min-w-0 mt-6 font-sans">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={overviewData} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                width={80}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)',
                  padding: '12px 16px',
                  fontSize: '12px',
                  color: '#fff'
                }}
                itemStyle={{ color: '#fff', fontWeight: 700 }}
              />
              <Bar
                dataKey="value"
                barSize={32}
                shape={(props: any) => {
                  const { x, y, width, height, payload } = props;
                  const radius = 6;
                  return (
                    <path
                      d={`
                        M${x},${y} 
                        L${x + width - radius},${y} 
                        Q${x + width},${y} ${x + width},${y + radius} 
                        L${x + width},${y + height - radius} 
                        Q${x + width},${y + height} ${x + width - radius},${y + height} 
                        L${x},${y + height} 
                        Z
                      `}
                      fill={payload.color}
                      className="drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                    />
                  );
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card variant="dark-glass" className="p-8 border-white/5" title="Activity Trends">
        <div className="h-[320px] w-full min-w-0 mt-6 font-sans">
          {growthData.length > 1 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData} margin={{ left: -20, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)',
                    padding: '12px 16px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="rsvps"
                  stroke="#3b82f6"
                  strokeWidth={4}
                  dot={{ fill: '#3b82f6', strokeWidth: 3, r: 5, stroke: '#030712' }}
                  activeDot={{ r: 8, strokeWidth: 0, fill: '#60a5fa' }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center border border-white/5">
                <span className="text-2xl text-slate-700">📊</span>
              </div>
              <p className="text-slate-500 font-medium text-center max-w-[180px]">
                Not enough data for high-resolution trends yet
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
