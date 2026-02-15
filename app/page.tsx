'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, TrendingUp, Users, ArrowRight, CheckCircle2, Sparkles } from "lucide-react"
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
    <main className="relative min-h-screen w-full flex flex-col bg-[#030712] overflow-x-hidden pt-20">
      {/* Animated Mesh Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -80, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-indigo-600/20 rounded-full blur-[150px]"
        />
        <div className="absolute inset-0 bg-dot-pattern opacity-10" />
      </div>

      {/* Sticky Header with Glass Effect */}
      <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-slate-950/40 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-[0_8px_20px_-4px_rgba(59,130,246,0.4)]"
            >
              <Calendar className="w-5 h-5 text-white" />
            </motion.div>
            <span className="font-extrabold text-2xl tracking-tight text-white">
              Event<span className="text-blue-500">OS</span>
            </span>
          </Link>

          <Link href="/auth/login">
            <Button variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:border-white/30 rounded-xl font-bold backdrop-blur-xl shadow-lg">
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20 pb-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-6xl w-full text-center space-y-12"
        >
          {/* Badge with Glass Effect */}
          <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg shadow-blue-500/5">
            <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-slate-300">EventOS 2.0 is live</span>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={item} className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight leading-[1.1]">
              Orchestrate <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-indigo-500">Unforgettable</span> <br className="hidden md:block" />
              Experiences.
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
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
              <Button variant="outline" className="h-16 px-10 rounded-2xl text-lg border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all">
                Sign In
              </Button>
            </Link>
          </motion.div>

          {/* Social Proof */}
          <motion.div variants={item} className="pt-12 text-slate-400 text-sm font-bold uppercase tracking-widest flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              Trusted by Creative Event Organizers
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Elite Analytics Included
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section with Glass Cards */}
      <section className="relative z-10 px-6 pb-32">
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
                variant="dark-glass"
                className="group relative overflow-hidden p-10 border-white/5 rounded-[40px] hover:-translate-y-2 transition-all duration-500 shadow-2xl"
              >
                {/* Icon with Glow */}
                <div className={`w-16 h-16 rounded-[24px] bg-${f.color}-600/10 border border-${f.color}-500/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-${f.color}-500/5`}>
                  <f.icon className={`w-8 h-8 text-${f.color}-400`} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">{f.title}</h3>
                <p className="text-slate-400 font-medium leading-relaxed">{f.desc}</p>

                {/* Hover Glow Effect */}
                <div className={`absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-${f.color}-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer with Glass Effect */}
      <footer className="relative z-10 px-6 py-12 border-t border-white/5 bg-slate-950/40 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-500 text-sm font-bold">
            © {new Date().getFullYear()} EventOS Inc.
          </p>
        </div>
      </footer>
    </main>
  )
}
