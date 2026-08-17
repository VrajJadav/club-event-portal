'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function RegisterButton({ eventId, alreadyRegistered }) {
  const [loading, setLoading] = useState(false)
  const [registered, setRegistered] = useState(alreadyRegistered)
  const [error, setError] = useState(null)
  const router = useRouter()
  const supabase = createClient()

  async function handleRegister() {
    setLoading(true)
    setError(null)

    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase
      .from('registrations')
      .insert({ event_id: eventId, user_id: user.id })

    setLoading(false)

    if (error) {
      setError('Something went wrong. Please try again.')
    } else {
      setRegistered(true)
      router.refresh()
    }
  }

  if (registered) {
    return (
      <p className="text-green-600 font-medium">
        ✓ You're registered for this event
      </p>
    )
  }

  return (
    <div>
      <button
        onClick={handleRegister}
        disabled={loading}
        className="bg-black text-white rounded px-4 py-2 disabled:opacity-50"
      >
        {loading ? 'Registering...' : 'Register for Event'}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}