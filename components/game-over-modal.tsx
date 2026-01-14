"use client"

import { Trophy, RotateCcw, Sparkles, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GameOverModalProps {
  moves: number
  time: number
  isNewBest: boolean
  combo: number
  onRestart: () => void
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

function getPerformanceRating(moves: number, totalPairs: number): { stars: number; message: string } {
  const perfectMoves = totalPairs // Best case: match every pair on first try
  const ratio = moves / perfectMoves

  if (ratio <= 1.5) return { stars: 3, message: "Perfect Memory!" }
  if (ratio <= 2.5) return { stars: 2, message: "Great Job!" }
  return { stars: 1, message: "Keep Practicing!" }
}

export function GameOverModal({ moves, time, isNewBest, combo, onRestart }: GameOverModalProps) {
  // Assuming 18 pairs for 6x6 or calculate based on moves
  const rating = getPerformanceRating(moves, 18)

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Trophy className="w-16 h-16 sm:w-20 sm:h-20 text-amber-400" />
              {isNewBest && <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-pulse" />}
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">You Win!</h2>
            {isNewBest && <p className="text-amber-400 font-medium animate-pulse">New Best Score!</p>}
          </div>

          <div className="flex justify-center gap-1">
            {[1, 2, 3].map((star) => (
              <span
                key={star}
                className={`text-3xl transition-all duration-500 ${
                  star <= rating.stars ? "opacity-100 scale-100" : "opacity-30 scale-90"
                }`}
                style={{ animationDelay: `${star * 150}ms` }}
              >
                ⭐
              </span>
            ))}
          </div>
          <p className="text-white/80 text-sm">{rating.message}</p>

          <div className="grid grid-cols-2 gap-3 py-4">
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-white/60 text-xs mb-1">Moves</p>
              <p className="text-xl font-bold text-white">{moves}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-white/60 text-xs mb-1">Time</p>
              <p className="text-xl font-bold text-white font-mono">{formatTime(time)}</p>
            </div>
          </div>

          {combo > 1 && (
            <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg px-4 py-2 border border-orange-500/30">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-white font-medium">Max Combo: {combo}x</span>
            </div>
          )}

          <Button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-6 text-lg rounded-xl transition-all duration-200 shadow-lg hover:shadow-indigo-500/30"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
          </Button>
        </div>
      </div>
    </div>
  )
}
