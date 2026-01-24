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
        <Card className="w-full max-w-md p-8 text-center bg-red-50 border-red-200">
            <h2 className="text-xl font-bold text-red-700">Invalid Link</h2>
            <p className="text-red-600 mt-2">
                This password reset link is invalid or missing a token.
            </p>
            <div className="pt-4">
                <Link href="/auth/forgot-password">
                    <Button variant="outline" className="w-full">
                        Request New Link
                    </Button>
                </Link>
            </div>
        </Card>
    )
  }

  if (success) {
    return (
      <Card className="w-full max-w-md p-8 text-center space-y-4">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Password Reset!</h2>
        <p className="text-slate-600">
            Your password has been successfully updated. You can now login with your new password.
        </p>
        <div className="pt-4">
            <Link href="/auth/login">
                <Button className="w-full">
                    Login Now
                </Button>
            </Link>
        </div>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Reset Password</h1>
        <p className="text-slate-600 mt-2">
          Enter your new password below.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <Input
            label="New Password"
            type="password"
            placeholder="••••••••"
            icon={<Lock className="w-4 h-4" />}
            error={errors.password?.message}
            {...register('password')}
        />

        <Input
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            icon={<Lock className="w-4 h-4" />}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
        />

        <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            isLoading={isLoading}
        >
            Reset Password
        </Button>
      </form>
    </Card>
  )
}
