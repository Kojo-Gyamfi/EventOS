'use client'

import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginInput } from '@/lib/validators'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, Mail, Lock, ArrowLeft, Loader2 } from 'lucide-react'
import Loading from '@/components/ui/Loading'

const container = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as any,
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 }
}

export default function LoginPage() {
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
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        setError('The credentials you entered are incorrect.')
        toast.error('Invalid credentials')
      } else {
        toast.success("Welcome back to EventOS!")
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-[480px] relative z-10"
    >
      <Card variant="dark-glass" className="p-10 md:p-12 border-white/10 rounded-[40px]">
        <motion.div variants={item} className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 group mb-8">
            <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_8px_20px_-4px_rgba(59,130,246,0.4)] transition-transform group-hover:scale-110 group-hover:rotate-3">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <span className="font-black text-3xl tracking-tight text-white">
              Event<span className="text-blue-500">OS</span>
            </span>
          </Link>
          <h1 className="text-3xl font-black text-white tracking-tight">Welcome Back</h1>
          <p className="text-slate-400 font-medium mt-2">Elite event orchestration starts here.</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-bold flex items-center gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <motion.div variants={item}>
            <Input
              label="Enter Email"
              type="email"
              variant="dark"
              placeholder="name@company.com"
              icon={<Mail className="w-5 h-5" />}
              error={errors.email?.message}
              className="rounded-2xl"
              {...register('email')}
            />
          </motion.div>

          <motion.div variants={item}>
            <Input
              label="Secure Password"
              type="password"
              variant="dark"
              placeholder="••••••••"
              showPasswordToggle
              icon={<Lock className="w-5 h-5" />}
              error={errors.password?.message}
              className="rounded-2xl"
              {...register('password')}
              helperText={
                <span className="flex justify-end mt-1">
                  <Link href="/auth/forgot-password" title="Recover account" className="text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-wider">
                    Forgot Credentials?
                  </Link>
                </span>
              }
            />
          </motion.div>

          <motion.div variants={item} className="pt-2">
            <Button
              type="submit"
              variant="primary"
              className="w-full h-14 rounded-2xl text-lg shadow-xl shadow-blue-500/20"
              isLoading={isLoading}
            >
              Launch Dashboard
            </Button>
          </motion.div>
        </form>

        <motion.div variants={item} className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-slate-500 font-medium text-sm">
            New to the platform?{' '}
            <Link href="/auth/register" className="text-blue-500 hover:text-blue-400 font-bold decoration-2 underline-offset-4 hover:underline transition-all">
              Create Elite Account
            </Link>
          </p>
        </motion.div>
      </Card>

      <motion.div variants={item} className="mt-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 font-bold text-sm transition-colors group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Return to Headquarters
        </Link>
      </motion.div>
    </motion.div>
  )
}
