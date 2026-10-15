"use client"

import { RotateCcw, Footprints, Timer, Layers, Trophy } from "lucide-react"
import type { Difficulty } from "./memory-game"

interface HeaderProps {
  moves: number
  time: number
  bestScore: number | null
  matchedPairs: number
  totalPairs: number
  difficulty: Difficulty
  onDifficultyChange: (difficulty: Difficulty) => void
  onRestart: () => void
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

const SIZES: { value: Difficulty; label: string }[] = [
  { value: "4x4", label: "4 × 4" },
  { value: "6x6", label: "6 × 6" },
]

export function Header({
  moves,
  time,
  bestScore,
  matchedPairs,
  totalPairs,
  difficulty,
  onDifficultyChange,
  onRestart,
}: HeaderProps) {
  const progress = totalPairs ? (matchedPairs / totalPairs) * 100 : 0

  return (
    <header className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-5xl font-semibold leading-none tracking-tight text-ink sm:text-6xl">
            Memory
          </h1>
          <p className="mt-2 text-base font-semibold text-ink-soft">Find every pair in as few moves as you can.</p>
        </div>

        <div className="flex items-center gap-3">
          <div role="radiogroup" aria-label="Board size" className="toy-sm flex rounded-full bg-paper p-1">
            {SIZES.map((size) => {
              const active = difficulty === size.value
              return (
                <button
                  key={size.value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => onDifficultyChange(size.value)}
                  className={`min-h-11 rounded-full px-4 font-display text-base font-semibold transition-colors ${
                    active ? "bg-ink text-sun" : "text-ink hover:bg-table/60"
                  }`}
                >
                  {size.label}
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={onRestart}
            className="toy-sm toy-press flex min-h-11 items-center gap-2 rounded-full bg-coral px-4 font-display text-base font-semibold text-ink"
          >
            <RotateCcw aria-hidden="true" className="h-5 w-5" strokeWidth={2.6} />
            Restart
          </button>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat icon={<Footprints className="h-5 w-5" strokeWidth={2.4} aria-hidden="true" />} label="Moves" value={moves} />
        <Stat
          icon={<Timer className="h-5 w-5" strokeWidth={2.4} aria-hidden="true" />}
          label="Time"
          value={formatTime(time)}
        />
        <div className="toy-sm rounded-2xl bg-paper px-4 py-3">
          <dt className="flex items-center gap-1.5 text-sm font-bold text-ink-soft">
            <Layers className="h-5 w-5" strokeWidth={2.4} aria-hidden="true" />
            Pairs
          </dt>
          <dd className="mt-1 font-display text-2xl font-semibold tabular-nums text-ink">
            {matchedPairs}
            <span className="text-ink-soft">/{totalPairs}</span>
          </dd>
          <div
            className="mt-2 h-2 overflow-hidden rounded-full bg-table"
            role="progressbar"
            aria-label="Pairs found"
            aria-valuemin={0}
            aria-valuemax={totalPairs}
            aria-valuenow={matchedPairs}
          >
            <div className="h-full rounded-full bg-coral transition-[width] duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <Stat
          icon={<Trophy className="h-5 w-5" strokeWidth={2.4} aria-hidden="true" />}
          label="Best"
          value={bestScore ?? "–"}
          hint={bestScore === null ? "No record yet" : "fewest moves"}
          highlight
        />
      </dl>
    </header>
  )
}

function Stat({
  icon,
  label,
  value,
  hint,
  highlight,
}: {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
  hint?: string
  highlight?: boolean
}) {
  return (
    <div className={`toy-sm rounded-2xl px-4 py-3 ${highlight ? "bg-sun" : "bg-paper"}`}>
      <dt className="flex items-center gap-1.5 text-sm font-bold text-ink-soft">
        {icon}
        {label}
      </dt>
      <dd className="mt-1 font-display text-2xl font-semibold tabular-nums text-ink">{value}</dd>
      {hint && <dd className="text-xs font-semibold text-ink-soft">{hint}</dd>}
    </div>
  )
}
