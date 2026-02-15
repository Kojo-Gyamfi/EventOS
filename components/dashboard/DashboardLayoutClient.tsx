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
    <div className="min-h-screen bg-[#030712] flex overflow-hidden font-sans relative">
      {/* Global Mesh Gradients for Dashboard */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -80, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[120px]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-dot-pattern opacity-10" />
      </div>

      <AnimatePresence>
        {/* Mobile sidebar backdrop */}
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop & Tablet */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-72 bg-slate-950/40 border-r border-white/5 transition-all duration-300 lg:translate-x-0 lg:static backdrop-blur-2xl",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-14 flex items-center px-4 border-b border-white/5">
            <Link href="/dashboard" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-8 h-8 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-[0_5px_15px_-3px_rgba(59,130,246,0.4)]"
              >
                <LayoutDashboard className="w-4 h-4 text-white" />
              </motion.div>
              <span className="font-extrabold text-xl tracking-tight text-white leading-none">
                Event<span className="text-blue-500">OS</span>
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-2 min-h-0">
            {/* Hide Create Event button on mobile to save space */}
            <div className="hidden lg:block">
              <Link href="/dashboard/events/new" onClick={() => setIsSidebarOpen(false)}>
                <Button className="w-full shadow-2xl shadow-blue-500/10 rounded-2xl py-4" variant="primary">
                  <Plus className="w-4 h-4 mr-1" />
                  Create Event
                </Button>
              </Link>
            </div>

            <div className="space-y-0.5">
              <p className="px-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Menu
              </p>
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={cn(
                      "group flex items-center gap-2 px-2.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 relative",
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <item.icon className={cn("w-4 h-4 transition-all duration-200", isActive ? "text-white" : "text-slate-300 group-hover:text-blue-400 group-hover:scale-110")} />
                    <span>{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-blue-600 rounded-lg -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* User Profile */}
          <div className="p-3 border-t border-white/5 bg-white/2 shrink-0">
            <div
              className="flex items-center gap-2 px-1.5 py-1.5 mb-2 group cursor-pointer"
              onClick={() => {
                setIsSidebarOpen(false)
                router.push('/dashboard/profile')
              }}
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-600/10 to-indigo-600/10 flex items-center justify-center text-blue-500 font-bold text-sm border border-white/5 shadow-sm transition-transform group-hover:scale-105">
                  {session?.user?.name?.[0] || 'U'}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 border border-slate-950 rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">
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
              className="flex w-full items-center justify-center gap-2 px-3 py-2 text-sm font-bold text-white bg-red-500/10 hover:bg-red-500 border border-red-500/20 hover:border-red-500 rounded-lg transition-all group shadow-lg shadow-red-500/5 hover:shadow-red-500/20"
            >
              <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        {/* Mobile Header */}
        <header className="lg:hidden h-20 bg-slate-950/60 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-40">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white italic">
              EventOS
            </span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-3 bg-white/5 text-white hover:bg-white/10 rounded-xl transition-colors relative w-12 h-12 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-5 flex flex-col items-center justify-center">
              <motion.span
                animate={isSidebarOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
                className="w-5 h-0.5 bg-white rounded-full absolute"
              />
              <motion.span
                animate={isSidebarOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-5 h-0.5 bg-white rounded-full absolute"
              />
              <motion.span
                animate={isSidebarOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
                className="w-5 h-0.5 bg-white rounded-full absolute"
              />
            </div>
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto w-full max-w-(--breakpoint-2xl) mx-auto relative z-10">
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
