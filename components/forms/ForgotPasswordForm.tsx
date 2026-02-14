'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/lib/validators'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { motion, AnimatePresence } from 'framer-motion'

export default function ForgotPasswordForm() {
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsLoading(true)
    setSuccess(false)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong')
      }

      setSuccess(true)
      toast.success('Recovery link transmitted. Check your inbox.')
    } catch (err: any) {
      toast.error(err.message || 'Failed to send recovery link.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <Card variant="dark-glass" className="p-10 md:p-12 text-center space-y-6 border-white/10 rounded-[40px]">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-[32px] flex items-center justify-center mx-auto"
        >
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </motion.div>

        <div className="space-y-2">
          <h2 className="text-3xl font-black text-white tracking-tight">Transmission Successful</h2>
          <p className="text-slate-400 font-medium">
            Elite recovery instructions have been sent to your primary email address.
          </p>
        </div>

        <div className="pt-6">
          <Link href="/auth/login">
            <Button variant="primary" className="w-full h-14 rounded-2xl shadow-xl shadow-blue-500/20">
              Return to Mission Operations
            </Button>
          </Link>
        </div>
      </Card>
    )
  }

  return (
    <Card variant="dark-glass" className="p-10 md:p-12 border-white/10 rounded-[40px]">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-white tracking-tight">Recover Access</h1>
        <p className="text-slate-400 font-medium mt-2">
          Enter your registered email to initiate the secure recovery sequence.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Input
          label="Enter Registered Email"
          variant="dark"
          placeholder="name@company.com"
          type="email"
          icon={<Mail className="w-5 h-5" />}
          error={errors.email?.message}
          className="rounded-2xl"
          {...register('email')}
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full h-14 rounded-2xl text-lg shadow-xl shadow-blue-500/20 gap-3"
          isLoading={isLoading}
        >
          Initiate Recovery
          <ArrowRight className="w-5 h-5" />
        </Button>
      </form>
    </Card>
  )
}
