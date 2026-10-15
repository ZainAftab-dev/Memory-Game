"use client"

import type { LucideIcon } from "lucide-react"

interface CardProps {
  label: string
  Icon: LucideIcon
  color: string
  isFlipped: boolean
  isMatched: boolean
  disabled?: boolean
  onClick: () => void
}

export function Card({ label, Icon, color, isFlipped, isMatched, disabled, onClick }: CardProps) {
  const isRevealed = isFlipped || isMatched
  const isDisabled = isRevealed || disabled

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-label={isMatched ? `${label}, matched` : isRevealed ? label : "Hidden card"}
      className={`group aspect-square perspective-1000 rounded-2xl ${isDisabled ? "cursor-default" : "cursor-pointer"}`}
    >
      <div
        className={`relative h-full w-full transition-transform duration-500 ease-out transform-style-3d ${
          isRevealed ? "rotate-y-180" : ""
        }`}
      >
        {/* back of the card (face down) */}
        <div
          className={`card-back toy absolute inset-0 backface-hidden rounded-2xl transition-transform duration-150 ${
            isDisabled ? "" : "group-hover:-translate-y-0.5"
          }`}
        />

        {/* face of the card */}
        <div
          className={`toy absolute inset-0 flex items-center justify-center rounded-2xl backface-hidden rotate-y-180 ${
            isMatched ? "match-pop bg-sun" : "bg-paper"
          }`}
        >
          <Icon
            aria-hidden="true"
            strokeWidth={2.4}
            className="h-1/2 w-1/2"
            style={{ color }}
          />
        </div>
      </div>
    </button>
  )
}
