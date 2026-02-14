'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Lock } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { resetPasswordSchema, type ResetPasswordInput } from '@/lib/validators'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'

export default function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = async (data: ResetPasswordInput) => {
    if (!token) {
      toast.error('Missing reset token. Please request a new link.')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, token }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong')
      }

      setSuccess(true)
      toast.success('Password reset successfully! You can now login.')
    } catch (err: any) {
      toast.error(err.message || 'Failed to reset password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return (
      <Card variant="dark-glass" className="w-full max-w-md p-10 text-center border-rose-500/20 bg-rose-500/10">
        <h2 className="text-2xl font-black text-rose-500 tracking-tight">Access Suspended</h2>
        <p className="text-rose-400 font-medium mt-2">
          This password reset link is invalid or has expired. Request a new sequence.
        </p>
        <div className="pt-8">
          <Link href="/auth/forgot-password">
            <Button variant="primary" className="w-full h-14 rounded-2xl">
              Request New Sequence
            </Button>
          </Link>
        </div>
      </Card>
    )
  }

  if (success) {
    return (
      <Card variant="dark-glass" className="w-full max-w-md p-10 text-center space-y-6 border-white/10">
        <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-[32px] flex items-center justify-center mx-auto">
          <Lock className="w-10 h-10 text-emerald-500" />
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight">Security Updated</h2>
        <p className="text-slate-400 font-medium">
          Your credentials have been re-calibrated. You may now proceed to authentication.
        </p>
        <div className="pt-6">
          <Link href="/auth/login">
            <Button variant="primary" className="w-full h-14 rounded-2xl shadow-xl shadow-blue-500/20">
              Proceed to Sign In
            </Button>
          </Link>
        </div>
      </Card>
    )
  }

  return (
    <Card variant="dark-glass" className="w-full max-w-md p-10 border-white/10 rounded-[40px]">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-white tracking-tight">Re-calibrate Access</h1>
        <p className="text-slate-400 font-medium mt-2">
          Enter your new security credentials below.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="New Security Password"
          type="password"
          variant="dark"
          placeholder="••••••••"
          showPasswordToggle
          icon={<Lock className="w-5 h-5" />}
          error={errors.password?.message}
          className="rounded-2xl"
          {...register('password')}
        />

        <Input
          label="Confirm Security Credentials"
          type="password"
          variant="dark"
          placeholder="••••••••"
          showPasswordToggle
          icon={<Lock className="w-5 h-5" />}
          error={errors.confirmPassword?.message}
          className="rounded-2xl"
          {...register('confirmPassword')}
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full h-14 rounded-2xl text-lg shadow-xl shadow-blue-500/20 pt-1"
          isLoading={isLoading}
        >
          Update Credentials
        </Button>
      </form>
    </Card>
  )
}
