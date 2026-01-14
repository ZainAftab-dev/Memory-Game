"use client"

interface CardProps {
  icon: string
  isFlipped: boolean
  isMatched: boolean
  disabled?: boolean
  onClick: () => void
}

export function Card({ icon, isFlipped, isMatched, disabled, onClick }: CardProps) {
  const isRevealed = isFlipped || isMatched
  const isDisabled = isRevealed || disabled

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      aria-label={isRevealed ? `Card showing ${icon}` : "Hidden card"}
      className={`aspect-square perspective-1000 ${isDisabled && !isRevealed ? "opacity-90" : ""}`}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isRevealed ? "rotate-y-180" : ""
        }`}
      >
        {/* Front (hidden) */}
        <div
          className={`absolute inset-0 backface-hidden rounded-lg sm:rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg flex items-center justify-center transition-all duration-200 ${
            isRevealed
              ? "pointer-events-none"
              : isDisabled
                ? "cursor-not-allowed"
                : "cursor-pointer hover:shadow-indigo-500/30 hover:scale-105 hover:from-indigo-400 hover:to-purple-500"
          }`}
        >
          <span className="text-white/30 text-xl sm:text-3xl font-bold select-none">?</span>
        </div>

        {/* Back (revealed) */}
        <div
          className={`absolute inset-0 backface-hidden rotate-y-180 rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center text-2xl sm:text-4xl transition-all duration-300 ${
            isMatched ? "bg-gradient-to-br from-emerald-400 to-green-500 shadow-emerald-500/30 scale-95" : "bg-white"
          }`}
        >
          <span className="select-none" role="img" aria-label={icon}>
            {icon}
          </span>
        </div>
      </div>
    </button>
  )
}
