import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function HomePage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: true })

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-8">Upcoming Club Events</h1>

      {!events || events.length === 0 ? (
        <p className="text-gray-500">No events yet. Check back soon!</p>
      ) : (
        <div className="flex flex-col gap-4">
          {events.map((event) => (
            <div key={event.id} className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-500 text-sm">
                {new Date(event.event_date).toLocaleString()}
              </p>
              <p className="mt-2">{event.description}</p>
              <div className="mt-4">
                {user ? (
                  <Link
                    href={`/events/${event.id}`}
                    className="text-blue-600 underline"
                  >
                    View & Register
                  </Link>
                ) : (
                  <p className="text-sm text-gray-400">
                    <Link href="/login" className="underline">Log in</Link> to register
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}