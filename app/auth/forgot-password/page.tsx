import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm'

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        {/* Background blobs similar to login page for consistency */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" />
        </div>
        
        <div className="relative z-10 w-full flex justify-center">
            <ForgotPasswordForm />
        </div>
    </div>
  )
}
