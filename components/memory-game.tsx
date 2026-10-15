"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Card } from "./card"
import { Header } from "./header"
import { GameOverModal } from "./game-over-modal"
import {
  Anchor, Bird, Cherry, Cloud, Crown, Fish, Flame, Flower2, Ghost, Heart, Leaf, Moon, Music, Rocket,
  Snowflake, Star, Sun, Umbrella, Zap, type LucideIcon,
} from "lucide-react"

// Each pair is a Lucide icon with its own colour (no emoji, so every OS renders it the same).
const PIECES: Record<string, { label: string; Icon: LucideIcon; color: string }> = {
  rocket: { label: "Rocket", Icon: Rocket, color: "#e8613d" },
  anchor: { label: "Anchor", Icon: Anchor, color: "#2563a8" },
  cherry: { label: "Cherry", Icon: Cherry, color: "#c0283f" },
  crown: { label: "Crown", Icon: Crown, color: "#b7791f" },
  fish: { label: "Fish", Icon: Fish, color: "#0f8a8a" },
  ghost: { label: "Ghost", Icon: Ghost, color: "#6b46c1" },
  leaf: { label: "Leaf", Icon: Leaf, color: "#2f855a" },
  music: { label: "Music note", Icon: Music, color: "#d53f8c" },
  bird: { label: "Bird", Icon: Bird, color: "#c05621" },
  cloud: { label: "Cloud", Icon: Cloud, color: "#3182ce" },
  heart: { label: "Heart", Icon: Heart, color: "#e53e3e" },
  moon: { label: "Moon", Icon: Moon, color: "#4c51bf" },
  star: { label: "Star", Icon: Star, color: "#d69e2e" },
  sun: { label: "Sun", Icon: Sun, color: "#dd6b20" },
  umbrella: { label: "Umbrella", Icon: Umbrella, color: "#805ad5" },
  zap: { label: "Lightning bolt", Icon: Zap, color: "#b7791f" },
  flower: { label: "Flower", Icon: Flower2, color: "#b83280" },
  snowflake: { label: "Snowflake", Icon: Snowflake, color: "#2b6cb0" },
}

const ICONS_6X6 = Object.keys(PIECES)
const ICONS_4X4 = ICONS_6X6.slice(0, 8)

export type Difficulty = "4x4" | "6x6"

interface CardType {
  id: number
  icon: string
  isFlipped: boolean
  isMatched: boolean
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function createCards(difficulty: Difficulty): CardType[] {
  const icons = difficulty === "6x6" ? ICONS_6X6 : ICONS_4X4
  const pairs = [...icons, ...icons]
  const shuffled = shuffleArray(pairs)
  return shuffled.map((icon, index) => ({
    id: index,
    icon,
    isFlipped: false,
    isMatched: false,
  }))
}

export default function MemoryGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>("6x6")
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [time, setTime] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [bestScore, setBestScore] = useState<number | null>(null)
  const [combo, setCombo] = useState(0)
  const [showCombo, setShowCombo] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const previousBestRef = useRef<number | null>(null)

  const totalPairs = difficulty === "6x6" ? 18 : 8

  // Initialize game
  useEffect(() => {
    setCards(createCards(difficulty))
    const storageKey = `memoryGameBestScore_${difficulty}`
    const stored = localStorage.getItem(storageKey)
    if (stored) {
      const score = Number.parseInt(stored)
      setBestScore(score)
      previousBestRef.current = score
    } else {
      setBestScore(null)
      previousBestRef.current = null
    }
  }, [difficulty])

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isGameStarted && !isGameOver) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isGameStarted, isGameOver])

  // Check for match
  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true)
      const [first, second] = flippedCards
      const firstCard = cards.find((c) => c.id === first)
      const secondCard = cards.find((c) => c.id === second)

      if (firstCard && secondCard && firstCard.icon === secondCard.icon) {
        // Match found
        setCards((prev) =>
          prev.map((card) => (card.id === first || card.id === second ? { ...card, isMatched: true } : card)),
        )
        setMatchedPairs((prev) => prev + 1)
        setCombo((prev) => prev + 1)
        setShowCombo(true)
        setTimeout(() => setShowCombo(false), 800)
        setFlippedCards([])
        setIsChecking(false)
      } else {
        // No match - flip back after delay
        setCombo(0)
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => (card.id === first || card.id === second ? { ...card, isFlipped: false } : card)),
          )
          setFlippedCards([])
          setIsChecking(false)
        }, 1000)
      }
    }
  }, [flippedCards, cards])

  // Check for game over
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setIsGameOver(true)
      const storageKey = `memoryGameBestScore_${difficulty}`
      if (previousBestRef.current === null || moves < previousBestRef.current) {
        localStorage.setItem(storageKey, moves.toString())
        setBestScore(moves)
      }
    }
  }, [cards, moves, difficulty])

  const handleCardClick = useCallback(
    (id: number) => {
      if (isChecking) return
      if (flippedCards.length >= 2) return
      const card = cards.find((c) => c.id === id)
      if (!card || card.isFlipped || card.isMatched) return

      if (!isGameStarted) setIsGameStarted(true)

      setCards((prev) => prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c)))
      setFlippedCards((prev) => [...prev, id])

      if (flippedCards.length === 1) {
        setMoves((prev) => prev + 1)
      }
    },
    [flippedCards, cards, isGameStarted, isChecking],
  )

  const handleRestart = useCallback(() => {
    setCards(createCards(difficulty))
    setFlippedCards([])
    setMoves(0)
    setMatchedPairs(0)
    setTime(0)
    setIsGameOver(false)
    setIsGameStarted(false)
    setCombo(0)
    setIsChecking(false)
  }, [difficulty])

  const handleDifficultyChange = useCallback((newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty)
    setCards(createCards(newDifficulty))
    setFlippedCards([])
    setMoves(0)
    setMatchedPairs(0)
    setTime(0)
    setIsGameOver(false)
    setIsGameStarted(false)
    setCombo(0)
    setIsChecking(false)

    const storageKey = `memoryGameBestScore_${newDifficulty}`
    const stored = localStorage.getItem(storageKey)
    if (stored) {
      const score = Number.parseInt(stored)
      setBestScore(score)
      previousBestRef.current = score
    } else {
      setBestScore(null)
      previousBestRef.current = null
    }
  }, [])

  const isNewBest = previousBestRef.current === null || moves < previousBestRef.current

  return (
    <div className="w-full max-w-2xl">
      <Header
        moves={moves}
        time={time}
        bestScore={bestScore}
        matchedPairs={matchedPairs}
        totalPairs={totalPairs}
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
        onRestart={handleRestart}
      />

      {/* keep the whole board on screen on laptops: width is capped by the viewport height */}
      <div className="relative mx-auto mt-6" style={{ maxWidth: "max(300px, min(100%, calc(100dvh - 330px)))" }}>
        <div
          className={`grid ${difficulty === "6x6" ? "grid-cols-6 gap-2 sm:gap-3" : "grid-cols-4 gap-3 sm:gap-4"}`}
          aria-label="Card board"
        >
          {cards.map((card) => {
            const piece = PIECES[card.icon]
            return (
              <Card
                key={card.id}
                label={piece.label}
                Icon={piece.Icon}
                color={piece.color}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                disabled={isChecking}
                onClick={() => handleCardClick(card.id)}
              />
            )
          })}
        </div>

        <div aria-live="polite" className="pointer-events-none absolute inset-x-0 -top-3 flex justify-center">
          {showCombo && combo > 1 && (
            <span className="toast-in toy-sm inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-1.5 font-display text-lg font-semibold text-sun">
              <Flame aria-hidden="true" className="h-5 w-5" strokeWidth={2.6} />
              {combo}× streak
            </span>
          )}
        </div>
      </div>

      <p className="mt-6 text-center text-sm font-semibold text-ink-soft">
        {isGameStarted ? "Two cards at a time. Matches stay face up." : "Tap any card to start the clock."}
      </p>

      {isGameOver && (
        <GameOverModal
          moves={moves}
          time={time}
          totalPairs={totalPairs}
          isNewBest={isNewBest}
          combo={combo}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}
