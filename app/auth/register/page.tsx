'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterInput } from '@/lib/validators'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, User, Mail, Lock, ShieldCheck, ArrowLeft } from 'lucide-react'

const container = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 }
}

export default function RegisterPage() {
  const router = useRouter()
  const { status } = useSession()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [status, router])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Registration failed. Please try again.')
        toast.error(result.error || 'Registration failed')
        return
      }

      toast.success("Account created! Please sign in.")
      router.push('/auth/login?registered=true')
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 bg-slate-50 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px] -ml-40 -mt-40" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-400/10 rounded-full blur-[120px] -mr-40 -mb-40" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-[540px] relative z-10"
      >
        <Card variant="glass" className="p-10 md:p-12 shadow-2xl border-white/40 shadow-slate-200/50 rounded-[40px]">
          <motion.div variants={item} className="text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-3 group mb-8">
              <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <span className="font-black text-3xl tracking-tight text-slate-900">
                Event<span className="text-blue-600">OS</span>
              </span>
            </Link>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create Elite Account</h1>
            <p className="text-slate-500 font-medium mt-2">Join the future of event orchestration.</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold flex items-center gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <motion.div variants={item}>
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="John Doe"
                  icon={<User className="w-5 h-5" />}
                  error={errors.name?.message}
                  className="rounded-2xl"
                  {...register('name')}
                />
              </motion.div>

              <motion.div variants={item}>
                <Input
                  label="Enter Email"
                  type="email"
                  placeholder="name@company.com"
                  icon={<Mail className="w-5 h-5" />}
                  error={errors.email?.message}
                  className="rounded-2xl"
                  {...register('email')}
                />
              </motion.div>
            </div>

            <motion.div variants={item}>
              <Input
                label="Secure Password"
                type="password"
                placeholder="••••••••"
                showPasswordToggle
                icon={<Lock className="w-5 h-5" />}
                error={errors.password?.message}
                className="rounded-2xl"
                {...register('password')}
              />
            </motion.div>

            <motion.div variants={item}>
              <Input
                label="Confirm Security Password"
                type="password"
                placeholder="••••••••"
                showPasswordToggle
                icon={<ShieldCheck className="w-5 h-5" />}
                error={errors.confirmPassword?.message}
                className="rounded-2xl"
                {...register('confirmPassword')}
              />
            </motion.div>

            <motion.div variants={item} className="pt-4">
              <Button
                type="submit"
                variant="primary"
                className="w-full h-14 rounded-2xl text-lg shadow-xl shadow-blue-500/20"
                isLoading={isLoading}
              >
                Create Account
              </Button>
            </motion.div>
          </form>

          <motion.div variants={item} className="mt-10 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-500 font-medium text-sm">
              Already have an elite account?{' '}
              <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-bold decoration-2 underline-offset-4 hover:underline transition-all">
                Sign In
              </Link>
            </p>
          </motion.div>
        </Card>

        <motion.div variants={item} className="mt-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold text-sm transition-colors group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Return to Headquarters
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
