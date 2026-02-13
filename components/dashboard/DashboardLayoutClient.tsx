'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  CalendarDays,
  LogOut,
  Menu,
  Plus,
  BarChart3,
  User,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import { toast } from 'react-toastify'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Events', href: '/dashboard/events', icon: CalendarDays },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
]

export default function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden font-sans">
      <AnimatePresence>
        {/* Mobile sidebar backdrop */}
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop & Tablet */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-72 bg-white border-r border-slate-200 transition-all duration-300 lg:translate-x-0 lg:static glass-effect",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-20 flex items-center px-8 border-b border-slate-100">
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-[0_5px_15px_-3px_rgba(59,130,246,0.4)]"
              >
                <LayoutDashboard className="w-5 h-5 text-white" />
              </motion.div>
              <span className="font-extrabold text-2xl tracking-tight text-slate-900">
                Event<span className="text-blue-600">OS</span>
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-8 overflow-y-auto">
            <div>
              <Link href="/dashboard/events/new">
                <Button className="w-full shadow-xl shadow-blue-500/20 rounded-2xl py-6" variant="primary">
                  <Plus className="w-5 h-5 mr-1" />
                  Create Event
                </Button>
              </Link>
            </div>

            <div className="space-y-1.5">
              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
                Main Menu
              </p>
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-2xl transition-all duration-200 relative",
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5 transition-transform duration-200 group-hover:scale-110", isActive ? "text-white" : "text-slate-400 group-hover:text-blue-600")} />
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-blue-600 rounded-2xl -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* User Profile */}
          <div className="p-6 border-t border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3 px-2 py-3 mb-4 group cursor-pointer" onClick={() => router.push('/dashboard/profile')}>
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold text-lg border border-white shadow-sm transition-transform group-hover:scale-105">
                  {session?.user?.name?.[0] || 'U'}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">
                  {session?.user?.name || 'User'}
                </p>
                <p className="text-[11px] font-medium text-slate-500 truncate">
                  {session?.user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={async () => {
                await signOut({ redirect: false })
                toast.success("Logged out successfully")
                router.push('/auth/login')
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 rounded-2xl hover:bg-red-50 transition-all group"
            >
              <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-dot-pattern">
        {/* Mobile Header */}
        <header className="lg:hidden h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-40">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 italic">
              EventOS
            </span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-3 bg-slate-100 text-slate-900 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto w-full max-w-(--breakpoint-2xl) mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-6 md:p-10 lg:p-12 pb-24"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
