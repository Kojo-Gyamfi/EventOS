import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { profileSchema } from '@/lib/validators'

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.email) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const body = await req.json()
        const { name } = profileSchema.parse(body)

        const updatedUser = await db.user.update({
            where: {
                email: session.user.email,
            },
            data: {
                name,
            },
        })

        return NextResponse.json(updatedUser)
    } catch (error) {
        if (error instanceof Error) {
            return new NextResponse(error.message, { status: 400 })
        }
        return new NextResponse('Internal Error', { status: 500 })
    }
}
