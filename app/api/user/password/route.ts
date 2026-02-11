import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { compare, hash } from 'bcryptjs'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { changePasswordSchema } from '@/lib/validators'

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.email) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const body = await req.json()
        const { currentPassword, newPassword } = changePasswordSchema.parse(body)

        const user = await db.user.findUnique({
            where: {
                email: session.user.email,
            },
        })

        if (!user || !user.password) {
            return new NextResponse('User not found', { status: 404 })
        }

        const isPasswordValid = await compare(currentPassword, user.password)

        if (!isPasswordValid) {
            return new NextResponse('Invalid current password', { status: 400 })
        }

        const hashedPassword = await hash(newPassword, 12)

        await db.user.update({
            where: {
                email: session.user.email,
            },
            data: {
                password: hashedPassword,
            },
        })

        return new NextResponse('Password updated successfully', { status: 200 })
    } catch (error) {
        if (error instanceof Error) {
            return new NextResponse(error.message, { status: 400 })
        }
        return new NextResponse('Internal Error', { status: 500 })
    }
}
