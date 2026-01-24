import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { forgotPasswordSchema } from '@/lib/validators'
import { generatePasswordResetToken } from '@/lib/tokens'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validatedData = forgotPasswordSchema.safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const { email } = validatedData.data

    const existingUser = await db.user.findUnique({
      where: { email }
    })

    if (!existingUser) {
        // Technically we should fake success to prevent email enumeration,
        // but for now I'll just return success 200 even if user not found, 
        // OR return a generic message.
        // Let's pretend we sent it.
        console.log(`[Forgot Password] User not found for email: ${email}`)
        return NextResponse.json({ success: true, message: 'Reset email sent if account exists' })
    }

    const verificationToken = await generatePasswordResetToken(email)
    
    // Send password reset email asynchronously (don't wait for it)
    const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${verificationToken.token}`
    
    // Send email in background without blocking the response
    const { sendPasswordResetEmail } = await import('@/lib/email')
    sendPasswordResetEmail(email, verificationToken.token)
      .then(() => {
        console.log('✅ Password reset email sent successfully to:', email)
        console.log('Reset Link:', resetLink)
      })
      .catch((emailError) => {
        console.error('❌ Failed to send password reset email:', emailError)
        console.log('Fallback - Reset Link for', email, ':', resetLink)
      })

    // Respond immediately without waiting for email
    return NextResponse.json({ 
      success: true, 
      message: 'If your email exists in our system, you will receive a password reset link shortly.' 
    })

  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
