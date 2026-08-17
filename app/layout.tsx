import './globals.css'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'

export const metadata = {
  title: 'Club Event Portal',
  description: 'Discover and register for club events',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <html lang="en">
      <body>
        <nav className="border-b p-4 flex justify-between items-center max-w-2xl mx-auto mt-4">
          <Link href="/" className="font-bold text-lg">Club Events</Link>
          <div className="flex gap-4 items-center text-sm">
            {user ? (
              <>
                <span className="text-gray-500">{user.email}</span>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link href="/login" className="underline">Log In</Link>
                <Link href="/signup" className="underline">Sign Up</Link>
              </>
            )}
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}