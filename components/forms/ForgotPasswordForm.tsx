'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/lib/validators'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'

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
      toast.success('Password reset link sent! It may take 1-2 minutes to arrive. Check your spam folder if you don\'t see it.', {
        autoClose: 6000 // Show for 6 seconds instead of default 5
      })
    } catch (err: any) {
      toast.error(err.message || 'Failed to send reset link. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="w-full max-w-md p-8 text-center space-y-4">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Mail className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Check your email</h2>
        <p className="text-slate-600">
            If an account exists with that email, we've sent you instructions to reset your password.
        </p>
        <div className="pt-4">
            <Link href="/auth/login">
                <Button variant="outline" className="w-full">
                    Back to Login
                </Button>
            </Link>
        </div>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Forgot Password</h1>
        <p className="text-slate-600 mt-2">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
            label="Email Address"
            placeholder="you@example.com"
            type="email"
            icon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            {...register('email')}
        />

        <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            isLoading={isLoading}
        >
            Send Reset Link
        </Button>

        <div className="text-center pt-2">
            <Link href="/auth/login" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Back to Login
            </Link>
        </div>
      </form>
    </Card>
  )
}
