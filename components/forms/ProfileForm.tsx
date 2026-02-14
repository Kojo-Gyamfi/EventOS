'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileSchema, type ProfileInput } from '@/lib/validators'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { User } from 'lucide-react'

interface ProfileFormProps {
    initialData: {
        name: string | null
        email: string
    }
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm<ProfileInput>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: initialData.name || '',
        },
    })

    const onSubmit = async (data: ProfileInput) => {
        setIsLoading(true)

        try {
            const response = await fetch('/api/user/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error('Failed to update profile')
            }

            toast.success('Profile updated successfully')
            router.refresh()
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card variant="dark-glass" className="p-8 border-white/5">
            <div className="flex items-center gap-2 mb-8">
                <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <User className="w-5 h-5 text-blue-500" />
                </div>
                <h2 className="text-xl font-bold text-white">Personal Information</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Input
                    label="Account Email (Protected)"
                    value={initialData.email}
                    disabled
                    variant="dark"
                    className="cursor-not-allowed opacity-70"
                />

                <Input
                    label="Elite Identifier"
                    placeholder="Your Name"
                    variant="dark"
                    error={errors.name?.message}
                    {...register('name')}
                />

                <div className="pt-2">
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        disabled={!isDirty || isLoading}
                        className="w-full sm:w-auto"
                    >
                        Save Changes
                    </Button>
                </div>
            </form>
        </Card>
    )
}
