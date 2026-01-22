import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { rsvpSchema } from '@/lib/validators'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // Validation
    const { name, email, eventId } = body
    
    // Check if event exists
    const event = await db.event.findUnique({
        where: { id: eventId }
    })

    if (!event) {
        return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    // Check if duplicate RSVP
    const existingRSVP = await db.rSVP.findFirst({
        where: {
            eventId,
            email,
        }
    })

    if (existingRSVP) {
        return NextResponse.json({ error: 'You have already registered for this event' }, { status: 400 })
    }

    // Create RSVP
    const rsvp = await db.rSVP.create({
        data: {
            name,
            email,
            eventId,
            status: 'CONFIRMED'
        }
    })

    return NextResponse.json(rsvp, { status: 201 })
  } catch (error) {
    console.error('RSVP error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
