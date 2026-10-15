"use client"

import { useEffect, useRef } from "react"
import { RotateCcw, Star, Flame } from "lucide-react"
import { formatTime } from "./header"

interface GameOverModalProps {
  moves: number
  time: number
  totalPairs: number
  isNewBest: boolean
  combo: number
  onRestart: () => void
}

function getPerformanceRating(moves: number, totalPairs: number): { stars: number; message: string } {
  const ratio = moves / totalPairs // 1.0 = every pair found on the first try
  if (ratio <= 1.5) return { stars: 3, message: "Perfect memory" }
  if (ratio <= 2.5) return { stars: 2, message: "Great job" }
  return { stars: 1, message: "Keep practising" }
}

export function GameOverModal({ moves, time, totalPairs, isNewBest, combo, onRestart }: GameOverModalProps) {
  const rating = getPerformanceRating(moves, totalPairs)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    buttonRef.current?.focus()
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/55 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="win-title"
        className="toy toast-in w-full max-w-sm rounded-3xl bg-paper p-7 text-center"
      >
        <div className="flex justify-center gap-2" aria-label={`${rating.stars} out of 3 stars`} role="img">
          {[1, 2, 3].map((star) => (
            <Star
              key={star}
              aria-hidden="true"
              strokeWidth={2.4}
              className={`h-11 w-11 ${star <= rating.stars ? "fill-sun text-ink" : "fill-transparent text-ink/25"}`}
            />
          ))}
        </div>

        <h2 id="win-title" className="mt-4 font-display text-4xl font-semibold text-ink">
          You found them all
        </h2>
        <p className="mt-1 font-semibold text-ink-soft">
          {rating.message}
          {isNewBest ? ", and a new best score" : ""}.
        </p>

        <dl className="mt-6 grid grid-cols-2 gap-3">
          <div className="toy-sm rounded-2xl bg-table/50 px-3 py-3">
            <dt className="text-sm font-bold text-ink-soft">Moves</dt>
            <dd className="font-display text-3xl font-semibold tabular-nums text-ink">{moves}</dd>
          </div>
          <div className="toy-sm rounded-2xl bg-table/50 px-3 py-3">
            <dt className="text-sm font-bold text-ink-soft">Time</dt>
            <dd className="font-display text-3xl font-semibold tabular-nums text-ink">{formatTime(time)}</dd>
          </div>
        </dl>

        {combo > 1 && (
          <p className="mt-4 inline-flex items-center gap-2 font-bold text-ink">
            <Flame aria-hidden="true" className="h-5 w-5 text-coral-deep" strokeWidth={2.6} />
            Final streak: {combo}×
          </p>
        )}

        <button
          ref={buttonRef}
          type="button"
          onClick={onRestart}
          className="toy toy-press mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-coral font-display text-lg font-semibold text-ink"
        >
          <RotateCcw aria-hidden="true" className="h-5 w-5" strokeWidth={2.6} />
          Play again
        </button>
      </div>
    </div>
  )
}
