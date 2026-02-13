'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, TrendingUp, Users, ArrowRight, CheckCircle2 } from "lucide-react"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as any
    }
  }
}

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col bg-slate-50 overflow-x-hidden pt-20">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-slate-50/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">
              Event<span className="text-blue-600">OS</span>
            </span>
          </div>

          <Link href="/auth/login">
            <Button variant="ghost" className="font-bold text-slate-600 hover:text-blue-600">
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      {/* Premium Background Pattern */}
      <div className="fixed inset-0 bg-dot-pattern opacity-40 pointer-events-none" />

      {/* Decorative Gradients */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10 pb-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-6xl w-full text-center space-y-12"
        >
          {/* Logo Badge */}
          <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl shadow-sm">
            <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-[10px] text-white font-bold">OS</div>
            <span className="text-sm font-bold text-slate-900">EventOS 2.0 is live</span>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={item} className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Orchestrate <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">Unforgettable</span> <br className="hidden md:block" />
              Experiences.
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
              The all-in-one platform to plan, organize, and execute professional events with elite analytics and seamless collaboration.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
            <Link href="/auth/register">
              <Button variant="primary" className="h-16 px-10 rounded-2xl text-lg shadow-2xl shadow-blue-500/25 gap-3">
                Start Hosting Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" className="h-16 px-10 rounded-2xl text-lg border-2 bg-white/50 backdrop-blur-sm">
                Sign In
              </Button>
            </Link>
          </motion.div>

          {/* Visual Divider / Social Proof */}
          <motion.div variants={item} className="pt-12 text-slate-400 text-sm font-bold uppercase tracking-widest flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              Trusted by Creative Event Organizers
            </div>
            <div className="hidden sm:block w-px h-4 bg-slate-200" />
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Elite Analytics Included
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 pb-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: 'Smart Planning',
                desc: 'Create and manage events with intuitive scheduling tools and real-time adjustments.',
                icon: Calendar,
                color: 'blue'
              },
              {
                title: 'Elite Analytics',
                desc: 'Track attendance, engagement, and performance metrics with precision dashboards.',
                icon: TrendingUp,
                color: 'indigo'
              },
              {
                title: 'Seamless Collaboration',
                desc: 'Coordinate with your team in real-time effortlessly with shared permissions.',
                icon: Users,
                color: 'emerald'
              }
            ].map((f, i) => (
              <Card
                key={i}
                className="group relative overflow-hidden p-10 border-0 shadow-2xl shadow-slate-200/50 rounded-[40px] hover:-translate-y-2 transition-transform duration-500"
              >
                <div className={`w-16 h-16 rounded-[24px] bg-${f.color}-50 flex items-center justify-center text-${f.color}-600 mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner`}>
                  <f.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{f.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
                <div className={`absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-${f.color}-100 opacity-20 blur-3xl`} />
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-slate-200/60 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-8">
          <p className="text-slate-400 text-sm font-bold text-center">
            © {new Date().getFullYear()} EventOS Inc.
          </p>
        </div>
      </footer>
    </main>
  )
}
