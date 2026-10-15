import MemoryGame from "@/components/memory-game"

export default function Home() {
  return (
    <main className="table-surface flex min-h-dvh flex-col items-center px-4 py-8 sm:py-12">
      <MemoryGame />
      <footer className="mt-auto pt-10 text-sm font-semibold text-ink-soft">
        Built by{" "}
        <a className="underline decoration-2 underline-offset-2 hover:text-ink" href="https://github.com/ZainAftab-dev">
          Zain Aftab
        </a>
      </footer>
    </main>
  )
}
