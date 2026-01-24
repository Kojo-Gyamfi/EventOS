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
    
    // In a real app, send email here.
    // For now, log the reset URL to console.
    const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${verificationToken.token}`
    
    console.log('==============================================')
    console.log(`[Forgot Password] Reset Link for ${email}:`)
    console.log(resetLink)
    console.log('==============================================')

    return NextResponse.json({ success: true, message: 'Reset email sent' })

  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
