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
        toast.error(result.error || 'Something went wrong')
        return
      }

      toast.success(isEditing ? "Event updated successfully" : "Event created successfully")
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">
            {isEditing ? 'Edit Event' : 'Create New Event'}
          </h2>
          <p className="text-sm text-slate-500">
            {isEditing
              ? 'Update your event details below'
              : 'Fill in the details to publish your event'
            }
          </p>
        </div>



        <div className="space-y-4">
          <Input
            label="Event Title"
            placeholder="e.g. Annual Tech Conference 2024"
            error={errors.title?.message}
            {...register('title')}
          />

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px] text-slate-900"
              placeholder="Describe your event..."
              {...register('description')}
            />
            {errors.description?.message && (
              <p className="text-sm text-red-600 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Date & Time"
              type="datetime-local"
              error={errors.date?.message}
              {...register('date')}
            />

            <Input
              label="Capacity (Optional)"
              type="number"
              placeholder="e.g. 100"
              icon={<Users className="w-4 h-4" />}
              error={errors.capacity?.message}
              {...register('capacity')}
            />
          </div>

          <Input
            label="Location (Optional)"
            placeholder="e.g. Convention Center, Hall A"
            icon={<MapPin className="w-4 h-4" />}
            {...register('location')}
          />

          <Input
            label="Cover Image URL (Optional)"
            placeholder="https://..."
            icon={<ImageIcon className="w-4 h-4" />}
            error={errors.imageUrl?.message}
            {...register('imageUrl')}
          />
        </div>

        <div className="pt-4 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
          >
            {isEditing ? 'Save Changes' : 'Create Event'}
          </Button>
        </div>
      </form>
    </Card>
  )
}
