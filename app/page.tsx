export default function Home() {
  return (
    <main className="min-h-screen grid place-items-center p-8">
      <div className="max-w-xl text-center grid gap-4">
        <h1 className="text-3xl font-semibold">Framer Motion</h1>
        <p className="opacity-80">A tiny slide deck with live, interactive demos.</p>
        <a
          href="/slides"
          className="inline-block rounded-md bg-black text-white px-4 py-2 hover:opacity-90"
        >
          Open Slides
        </a>
      </div>
    </main>
  );
}
