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
import { motion } from 'framer-motion'

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
      <Card variant="dark-glass" className="text-center py-16 border-emerald-500/20 bg-emerald-500/5 backdrop-blur-3xl rounded-[40px] shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="w-20 h-20 bg-emerald-500/10 rounded-[24px] flex items-center justify-center mx-auto mb-8 border border-emerald-500/20 shadow-lg shadow-emerald-500/5"
        >
          <CheckCircle className="w-10 h-10 text-emerald-400" />
        </motion.div>
        <h3 className="text-3xl font-black text-white mb-4 tracking-tight">You're confirmed!</h3>
        <p className="text-slate-400 font-medium text-lg max-w-xs mx-auto leading-relaxed">
          The sequence is initialized. <br />
          Check your inbox for the access key to <span className="text-blue-400 font-bold">{eventName}</span>.
        </p>
        <div className="mt-10 flex justify-center">
          <div className="flex gap-1.5 justify-center h-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  backgroundColor: ['#475569', '#10b981', '#475569']
                }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                className="w-1.5 h-1.5 rounded-full"
              />
            ))}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card variant="dark-glass" className="p-10 shadow-2xl border-white/5 rounded-[40px] relative overflow-hidden group">
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-600/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="mb-8 relative">
        <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
          RSVP Now
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
        </h3>
        <p className="text-slate-400 font-medium mt-1">Secure your spot for this experience</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative">
        {error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold flex items-center gap-3"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            {error}
          </motion.div>
        )}

        <Input
          label="Full Name"
          placeholder="Jane Doe"
          error={errors.name?.message}
          className="bg-white/5 border-white/5 focus:border-blue-500/50 text-white placeholder:text-slate-600"
          {...register('name')}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="jane@example.com"
          error={errors.email?.message}
          className="bg-white/5 border-white/5 focus:border-blue-500/50 text-white placeholder:text-slate-600"
          {...register('email')}
        />

        <Button
          type="submit"
          className="w-full h-14 rounded-2xl text-lg font-bold shadow-2xl shadow-blue-500/20 mt-4 group"
          isLoading={isLoading}
        >
          Confirm Attendance
        </Button>

        <p className="text-[11px] text-center text-slate-500 font-bold uppercase tracking-widest mt-6">
          Encrypted Data Transmission Enabled
        </p>
      </form>
    </Card>
  )
}
