import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import RegisterButton from '@/components/RegisterButton'

export default async function EventPage({ params }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()

  if (!event) {
    return <p className="max-w-2xl mx-auto mt-10 p-6">Event not found.</p>
  }

  const { data: existingRegistration } = await supabase
    .from('registrations')
    .select('id')
    .eq('event_id', id)
    .eq('user_id', user.id)
    .single()

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="text-gray-500 mt-1">
        {new Date(event.event_date).toLocaleString()}
      </p>
      <p className="mt-4">{event.description}</p>

      <div className="mt-6">
        <RegisterButton
          eventId={event.id}
          alreadyRegistered={!!existingRegistration}
        />
      </div>
    </div>
  )
}