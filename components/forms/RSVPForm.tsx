'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { rsvpSchema, type RSVPInput, type RSVPFormInput } from '@/lib/validators'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { CheckCircle } from 'lucide-react'
import { toast } from 'react-toastify';

interface RSVPFormProps {
  eventId: string
  eventName: string
}

export default function RSVPForm({ eventId, eventName }: RSVPFormProps) {
  const router = useRouter()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RSVPFormInput>({
    resolver: zodResolver(rsvpSchema),
  })

  const onSubmit = async (data: RSVPFormInput) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, eventId }),
      })

      if (!response.ok) {
        throw new Error('Failed to register')
      }

      setSuccess(true)
      toast("RSVP saved successfully")

      // Redirect and refresh after a short delay to allow success state to show
      setTimeout(() => {
        router.push('/dashboard/events')
        router.refresh()
      }, 2000)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="text-center py-12 bg-green-50 border border-green-200">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">You're going!</h3>
        <p className="text-green-700">
          Thanks for registering for {eventName}.<br />
          We've sent a confirmation email to your inbox.
        </p>
      </Card>
    )
  }

  return (
    <Card className="p-8 shadow-xl border-t-4 border-blue-600">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900">RSVP Now</h3>
        <p className="text-slate-500">Secure your spot for this event</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}

        <Input
          label="Full Name"
          placeholder="Jane Doe"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="jane@example.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <Button
          type="submit"
          className="w-full"
          size="lg"
          isLoading={isLoading}
        >
          Confirm Attendance
        </Button>

        <p className="text-xs text-center text-slate-400 mt-4">
          By registering, you agree to share your information with the event organizers.
        </p>
      </form>
    </Card>
  )
}
