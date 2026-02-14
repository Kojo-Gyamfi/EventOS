import { Suspense } from 'react'
import { motion } from 'framer-motion'
import ResetPasswordForm from '@/components/forms/ResetPasswordForm'

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 bg-[#030712] overflow-hidden">
      {/* Mesh Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-indigo-600/20 rounded-full blur-[120px]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-dot-pattern opacity-10" />
      </div>

      <div className="relative z-10 w-full flex justify-center max-w-[480px]">
        <Suspense fallback={<div className="text-white font-medium">Synchronizing Secure Channel...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  )
}
