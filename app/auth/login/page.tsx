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
import { toast } from 'react-toastify';
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Redirect to dashboard if already logged in
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
        setError('Invalid email or password')
      } else {
        router.push('/dashboard')
        toast("Log in Successfully");
        router.refresh()
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-40 h-40 bg-blue-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-white rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-40 right-1/3 w-36 h-36 bg-blue-200 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        {/* Wave patterns */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="rgba(255,255,255,0.1)" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>


      <Card variant="dark" className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h1 className="bg-gradient-to-r from-blue-700 to-sky-500 text-transparent bg-clip-text text-4xl font-extrabold mb-2">
            EventOS
          </h1>
          <p className="text-slate-300">Log in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
              {error}
            </div>
          )}

          <Input
            label="Email"
            type="email"
            placeholder="user@example.com"
            variant="dark"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            variant="dark"
            showPasswordToggle
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
            error={errors.password?.message}
            {...register('password')}
            helperText={
              <Link href="/auth/forgot-password" className="text-sm text-slate-300 hover:text-white transition-colors">
                Forgot password?
              </Link>
            }
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={isLoading}
          >
            Log In
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-slate-300">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-slate-400 hover:text-slate-300 transition-colors">
            ← Back to home
          </Link>
        </div>
      </Card>
    </div>
  )
}
