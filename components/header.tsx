"use client"

import { RotateCcw, Clock, MousePointerClick, Trophy, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
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

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

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
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-white text-balance">Memory Game</h1>
        <div className="flex items-center gap-2">
          <div className="flex bg-white/10 rounded-lg p-1">
            <button
              onClick={() => onDifficultyChange("4x4")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                difficulty === "4x4" ? "bg-white text-slate-900" : "text-white/70 hover:text-white"
              }`}
            >
              4x4
            </button>
            <button
              onClick={() => onDifficultyChange("6x6")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                difficulty === "6x6" ? "bg-white text-slate-900" : "text-white/70 hover:text-white"
              }`}
            >
              6x6
            </button>
          </div>
          <Button
            onClick={onRestart}
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
          >
            <RotateCcw className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Restart</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-white">
          <MousePointerClick className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-medium">{moves} Moves</span>
        </div>

        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-white">
          <Clock className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium font-mono">{formatTime(time)}</span>
        </div>

        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-white">
          <Target className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-medium">
            {matchedPairs}/{totalPairs} Pairs
          </span>
        </div>

        {bestScore !== null && (
          <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white border border-amber-500/30">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium">Best: {bestScore}</span>
          </div>
        )}
      </div>
    </div>
  )
}
