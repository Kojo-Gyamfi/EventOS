
import EventForm from '@/components/forms/EventForm'

export default function NewEventPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Create Event</h1>
        <p className="text-slate-500 mt-1">
            Host your next event and accept RSVPs seamlessly.
        </p>
      </div>

      <EventForm />
    </div>
  )
}
