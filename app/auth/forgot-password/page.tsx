'use client'

import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { LayoutDashboard, ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 bg-[#030712] overflow-hidden">
      {/* Mesh Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-dot-pattern opacity-10"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-indigo-600/20 rounded-full blur-[120px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[480px] relative z-10"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 group mb-8">
            <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_8px_20px_-4px_rgba(59,130,246,0.4)] transition-transform group-hover:scale-110 group-hover:rotate-3">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <span className="font-black text-3xl tracking-tight text-white">
              Event<span className="text-blue-500">OS</span>
            </span>
          </Link>
        </div>

        <ForgotPasswordForm />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Link href="/auth/login" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 font-bold text-sm transition-colors group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Return to Authentication
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
