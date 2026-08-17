import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) {
    redirect('/')
  }

  const { data: registrations } = await supabase
    .from('registrations')
    .select('id, created_at, profiles(email), events(title, event_date)')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin: Event Registrations</h1>

      {!registrations || registrations.length === 0 ? (
        <p className="text-gray-500">No registrations yet.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="p-2">User</th>
              <th className="p-2">Event</th>
              <th className="p-2">Registered At</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg.id} className="border-b">
                <td className="p-2">{reg.profiles?.email}</td>
                <td className="p-2">{reg.events?.title}</td>
                <td className="p-2 text-sm text-gray-500">
                  {new Date(reg.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}