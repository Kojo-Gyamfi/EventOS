'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { changePasswordSchema, type ChangePasswordInput } from '@/lib/validators'
import { toast } from 'react-toastify'
import { Lock } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'

export default function PasswordChangeForm() {
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ChangePasswordInput>({
        resolver: zodResolver(changePasswordSchema),
    })

    const onSubmit = async (data: ChangePasswordInput) => {
        setIsLoading(true)

        try {
            const response = await fetch('/api/user/password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const error = await response.text()
                throw new Error(error || 'Failed to update password')
            }

            toast.success('Password updated successfully')
            reset()
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Lock className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Secure Password</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="Current Password"
                    type="password"
                    placeholder="••••••••"
                    showPasswordToggle
                    error={errors.currentPassword?.message}
                    {...register('currentPassword')}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="New Password"
                        type="password"
                        placeholder="••••••••"
                        showPasswordToggle
                        error={errors.newPassword?.message}
                        {...register('newPassword')}
                    />

                    <Input
                        label="Confirm New Password"
                        type="password"
                        placeholder="••••••••"
                        showPasswordToggle
                        error={errors.confirmPassword?.message}
                        {...register('confirmPassword')}
                    />
                </div>

                <div className="pt-2">
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        className="w-full sm:w-auto"
                    >
                        Update Password
                    </Button>
                </div>
            </form>
        </Card>
    )
}
