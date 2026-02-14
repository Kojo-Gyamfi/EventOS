
import EventForm from '@/components/forms/EventForm'

export default function NewEventPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Create Event</h1>
        <p className="text-lg text-slate-400 mt-2 font-medium">
          Host your next sequence and accept RSVPs seamlessly.
        </p>
      </div>

      <EventForm />
    </div>
  )
}
