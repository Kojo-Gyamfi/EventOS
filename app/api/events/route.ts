import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { eventSchema } from '@/lib/validators'
import { generateSlug } from '@/lib/utils'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = eventSchema.parse(body)

    // Generate unique slug
    let slug = generateSlug(validatedData.title)
    const existingEvent = await db.event.findFirst({
        where: { slug }
    })
    
    // Simple collision handling
    if (existingEvent) {
        slug = `${slug}-${Date.now()}`
    }

    const event = await db.event.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        date: new Date(validatedData.date),
        location: validatedData.location,
        capacity: validatedData.capacity,
        imageUrl: validatedData.imageUrl,
        slug,
        userId: session.user.id,
      },
    })

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error('Create event error:', error)
    return NextResponse.json(
      { error: 'Something went wrong detected ' + error },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const events = await db.event.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        _count: {
          select: { rsvps: true },
        },
      },
      orderBy: {
        date: 'asc',
      },
    })

    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
