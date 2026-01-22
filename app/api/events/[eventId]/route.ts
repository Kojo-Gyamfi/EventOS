import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { eventSchema } from '@/lib/validators'
import { generateSlug } from '@/lib/utils'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { eventId } = await params

    const event = await db.event.findUnique({
      where: {
        id: eventId,
        userId: session.user.id,
      },
    })

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    return NextResponse.json(event)
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { eventId } = await params
    const body = await req.json()
    const validatedData = eventSchema.parse(body)

    // Check ownership
    const existingEvent = await db.event.findUnique({
      where: {
        id: eventId,
        userId: session.user.id,
      },
    })

    if (!existingEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    // Update slug if title changed (optional, maybe keep slug stable? lets keep it stable for now unless explicitly requested, actually generating new slug is fine but might break links. Let's update it.)
    let slug = existingEvent.slug
    if (validatedData.title !== existingEvent.title) {
        slug = generateSlug(validatedData.title)
        // Check collision
        const collision = await db.event.findFirst({
            where: { slug, NOT: { id: eventId } }
        })
        if (collision) {
            slug = `${slug}-${Date.now()}`
        }
    }

    const event = await db.event.update({
      where: {
        id: eventId,
      },
      data: {
        title: validatedData.title,
        description: validatedData.description,
        date: new Date(validatedData.date),
        location: validatedData.location,
        capacity: validatedData.capacity,
        imageUrl: validatedData.imageUrl,
        slug,
      },
    })

    return NextResponse.json(event)
  } catch (error) {
    console.error('Update event error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { eventId } = await params

    const event = await db.event.delete({
      where: {
        id: eventId,
        userId: session.user.id,
      },
    })

    return NextResponse.json(event)
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
