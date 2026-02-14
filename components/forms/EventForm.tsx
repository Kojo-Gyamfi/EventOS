'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, MapPin, ImageIcon, Users } from 'lucide-react'
import { eventSchema, type EventInput, type EventFormInput } from '@/lib/validators'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { toast } from 'react-toastify';

interface EventFormProps {
  initialData?: any // TODO: Type properly with Prisma types
  isEditing?: boolean
}

export default function EventForm({ initialData, isEditing = false }: EventFormProps) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormInput>({
    resolver: zodResolver(eventSchema),
    defaultValues: initialData ? {
      ...initialData,
      date: initialData.date ? new Date(initialData.date).toISOString().slice(0, 16) : '',
    } : undefined
  })

  const onSubmit = async (data: EventFormInput) => {
    setIsLoading(true)
    setError('')

    try {
      const url = isEditing
        ? `/api/events/${initialData.id}`
        : '/api/events'

      const method = isEditing ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Something went wrong')
        return
      }

      router.push('/dashboard')
      toast("Event created successfully")
      router.refresh()
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card variant="dark-glass" className="max-w-3xl mx-auto p-10 md:p-12 border-white/5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <div className="space-y-3">
          <h2 className="text-3xl font-black text-white tracking-tight">
            {isEditing ? 'Sync Event' : 'Initialize Sequence'}
          </h2>
          <p className="text-slate-400 font-medium text-lg">
            {isEditing
              ? 'Adjust your event parameters'
              : 'Configure your next orbital gathering'
            }
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-bold animate-shake">
            {error}
          </div>
        )}

        <div className="space-y-8">
          <Input
            label="Event Title"
            placeholder="e.g. Annual Tech Conference 2024"
            variant="dark"
            error={errors.title?.message}
            {...register('title')}
          />

          <div className="space-y-2">
            <label className="block text-sm font-black text-slate-400 uppercase tracking-widest ml-1">
              Event Intel
            </label>
            <textarea
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all min-h-[160px] text-base font-medium resize-none hover:border-white/20"
              placeholder="Describe your event objective..."
              {...register('description')}
            />
            {errors.description?.message && (
              <p className="text-xs text-rose-400 mt-2 font-bold ml-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Temporal Window"
              type="datetime-local"
              variant="dark"
              error={errors.date?.message}
              {...register('date')}
            />

            <Input
              label="Maximum Occupancy"
              type="number"
              variant="dark"
              placeholder="e.g. 100"
              icon={<Users className="w-4 h-4" />}
              error={errors.capacity?.message}
              {...register('capacity')}
            />
          </div>

          <Input
            label="Geographic Coordinates"
            placeholder="e.g. Convention Center, Hall A"
            variant="dark"
            icon={<MapPin className="w-4 h-4" />}
            {...register('location')}
          />

          <Input
            label="Visual Signature (URL)"
            placeholder="https://..."
            variant="dark"
            icon={<ImageIcon className="w-4 h-4" />}
            error={errors.imageUrl?.message}
            {...register('imageUrl')}
          />
        </div>

        <div className="pt-8 flex items-center justify-end gap-5">
          <Button
            type="button"
            variant="outline"
            className="px-8 rounded-2xl border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-10 rounded-2xl shadow-2xl shadow-blue-500/20"
            isLoading={isLoading}
          >
            {isEditing ? 'Save Changes' : 'Launch Event'}
          </Button>
        </div>
      </form>
    </Card>
  )
}
