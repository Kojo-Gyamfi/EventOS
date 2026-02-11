import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import ProfileForm from '@/components/forms/ProfileForm'
import PasswordChangeForm from '@/components/forms/PasswordChangeForm'
import { Settings } from 'lucide-react'

export default async function ProfilePage() {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        redirect('/auth/login')
    }

    const user = session.user

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
                        <Settings className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Account Settings</h1>
                </div>
                <p className="text-slate-500 font-medium ml-1">Manage your personal information and security preferences.</p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <ProfileForm initialData={{ name: user.name ?? '', email: user.email ?? '' }} />
                <PasswordChangeForm />
            </div>
        </div>
    )
}
