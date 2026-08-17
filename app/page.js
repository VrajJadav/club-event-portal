export default function Home() {
  return (
    <main className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold">Club Events</h1>

      <div className="mt-6 flex gap-4">
        <a href="/login" className="underline">
          Log In
        </a>

        <a href="/signup" className="underline">
          Sign Up
        </a>
      </div>
    </main>
  );
}