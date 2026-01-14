"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Card } from "./card"
import { Header } from "./header"
import { GameOverModal } from "./game-over-modal"

const ICONS_6X6 = [
  "🚀",
  "🎮",
  "🎯",
  "🎨",
  "🎭",
  "🎪",
  "🌟",
  "🔥",
  "💎",
  "🍀",
  "🌈",
  "⚡",
  "🎸",
  "🎹",
  "🎺",
  "🎻",
  "🥁",
  "🎤",
]

const ICONS_4X4 = ["🚀", "🎮", "🎯", "🎨", "🌟", "🔥", "💎", "🍀"]

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

      {showCombo && combo > 1 && (
        <div className="flex justify-center mt-4 animate-bounce">
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
            {combo}x Combo!
          </span>
        </div>
      )}

      <div className={`grid gap-2 sm:gap-3 mt-6 ${difficulty === "6x6" ? "grid-cols-6" : "grid-cols-4"}`}>
        {cards.map((card) => (
          <Card
            key={card.id}
            icon={card.icon}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            disabled={isChecking}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>

      {isGameOver && (
        <GameOverModal moves={moves} time={time} isNewBest={isNewBest} combo={combo} onRestart={handleRestart} />
      )}
    </div>
  )
}
