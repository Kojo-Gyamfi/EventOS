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
        <div className="max-w-4xl mx-auto space-y-10">
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600 rounded-2xl shadow-2xl shadow-blue-500/20">
                        <Settings className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Account Settings</h1>
                </div>
                <p className="text-lg text-slate-400 font-medium ml-1">Manage your security profile and personal synchronization.</p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <ProfileForm initialData={{ name: user.name ?? '', email: user.email ?? '' }} />
                <PasswordChangeForm />
            </div>
        </div>
    )
}
