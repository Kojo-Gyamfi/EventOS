import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { resetPasswordSchema } from '@/lib/validators'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { token, password, confirmPassword } = body

    if (!token) {
        return NextResponse.json({ error: 'Missing token' }, { status: 400 })
    }

    const validatedData = resetPasswordSchema.safeParse({ password, confirmPassword })

    if (!validatedData.success) {
      return NextResponse.json({ error: 'Invalid password data' }, { status: 400 })
    }

    // Verify token
    const verificationToken = await db.verificationToken.findUnique({
        where: { token },
    })

    if (!verificationToken) {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 })
    }

    const hasExpired = new Date(verificationToken.expires) < new Date()

    if (hasExpired) {
        return NextResponse.json({ error: 'Token has expired' }, { status: 400 })
    }

    // Update user password
    const hashedPassword = await bcrypt.hash(password, 12)

    await db.user.update({
        where: { email: verificationToken.identifier },
        data: { password: hashedPassword }
    })

    // Delete the used token
    await db.verificationToken.delete({
        where: { token }
    })

    return NextResponse.json({ success: true, message: 'Password updated successfully' })

  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
