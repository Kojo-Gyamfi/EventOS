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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="RSVP Overview">
          <div className="h-[300px] w-full flex items-center justify-center bg-slate-50 rounded-lg animate-pulse">
            <span className="text-slate-400">Loading Chart...</span>
          </div>
        </Card>
        <Card title="Activity Trends">
          <div className="h-[300px] w-full flex items-center justify-center bg-slate-50 rounded-lg animate-pulse">
            <span className="text-slate-400">Loading Trends...</span>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="RSVP Overview">
        <div className="h-[300px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={overviewData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} />
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={{ fontSize: 12, fill: '#64748b' }}
                width={80}
              />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar 
                dataKey="value" 
                barSize={32}
                shape={(props: any) => {
                  const { x, y, width, height, payload } = props;
                  const radius = 4;
                  // Draw a path with rounded corners on the right side
                  // Start top-left
                  // Line to top-right (minus radius)
                  // Arc to right-side
                  // Line to bottom-right (minus radius)
                  // Arc to bottom
                  // Line to bottom-left
                  // Close
                  
                  // Ensure width is at least radius * 2 for proper rendering, or just clamp?
                  // For a simple bar chart visualization we can assume positive width.
                  
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
                    />
                  );
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="Activity Trends">
        <div className="h-[300px] w-full min-w-0">
            {growthData.length > 1 ? (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={growthData} margin={{ left: -20, right: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                            dataKey="name" 
                            tick={{ fontSize: 12, fill: '#64748b' }}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis 
                            tick={{ fontSize: 12, fill: '#64748b' }}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="rsvps" 
                            stroke="#3b82f6" 
                            strokeWidth={3}
                            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4, stroke: '#fff' }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            ) : (
                <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                    Not enough data for trends yet
                </div>
            )}
        </div>
      </Card>
    </div>
  )
}
