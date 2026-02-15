import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import PublicEventClient from '@/components/event/PublicEventClient'

export default async function PublicEventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const event = await db.event.findFirst({
    where: { slug },
  })

  if (!event) {
    notFound()
  }

  // Passing the plain object to the client component
  return <PublicEventClient event={JSON.parse(JSON.stringify(event))} />
}
