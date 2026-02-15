'use client'

import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { LayoutDashboard, ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  return (
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
  )
}
