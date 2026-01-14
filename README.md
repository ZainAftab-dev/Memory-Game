
# Memory Game (Concentration) – React

A fully functional and interactive **Memory Card Matching Game** built using **React**. The game challenges players to match pairs of cards with the least number of moves and in the shortest time possible. It includes smooth animations, multiple difficulty levels, and score tracking.

## Features

### Core Gameplay

* Interactive **memory matching game**
* Cards are initially hidden and shuffled randomly
* Click to flip cards and reveal symbols
* Matching pairs remain visible
* Non-matching pairs flip back after a short delay
* Game ends when all pairs are matched

### Game Modes

* **Easy Mode**: 4x4 grid (16 cards)
* **Medium Mode**: 6x6 grid (36 cards)

### Tracking & Feedback

* Move counter to track player performance
* Live timer to measure completion time
* “You Win” message when the game is completed
* Restart button to reset the game at any time

### Visuals & UI

* Smooth card flip animations using CSS
* Responsive layout for desktop and mobile
* Highlighted matched cards for visual feedback
* Clean and modern UI design

### Bonus Features

* Best score stored using `localStorage`
* Difficulty selection before starting the game
* Well-structured and reusable components

## Tech Stack

* **React** (Functional Components)
* **React Hooks**: `useState`, `useEffect`
* **CSS** for animations and layout
* **JavaScript (ES6+)**

No external APIs and no backend required.

## Project Structure

```
src/
│
├── components/
│   ├── MemoryGame.jsx        # Main game logic and state
│   ├── Card.jsx              # Individual card component
│   ├── Header.jsx            # Displays moves, timer, difficulty
│   └── GameOverModal.jsx     # Game completion modal
│
├── styles/
│   ├── Card.css
│   ├── MemoryGame.css
│   └── Modal.css
│
├── App.jsx
├── index.js
└── index.css
```

## How the Game Works

1. Cards are shuffled randomly at the start of each game.
2. The player clicks two cards to reveal them.
3. If the cards match:

   * They remain visible
   * They are marked as matched
4. If they do not match:

   * They flip back after a short delay
5. Each pair attempt increases the move counter.
6. The timer starts on the first move.
7. The game ends when all pairs are matched.

## Installation & Setup

### Prerequisites

* Node.js installed
* npm installed

### Steps to Run

```bash
# Clone the repository
git clone https://github.com/your-username/memory-game-react.git

# Navigate to the project folder
cd memory-game-react

# Install dependencies
npm install

# Start the development server
npm start
```

The app will run on:

```
http://localhost:3000
```

## Difficulty Levels

| Level  | Grid Size | Total Cards |
| ------ | --------- | ----------- |
| Easy   | 4 x 4     | 16          |
| Medium | 6 x 6     | 36          |

## Future Improvements

* Add Hard mode (8x8 grid)
* Add sound effects for flips and matches
* Add animations for winning celebration
* Add leaderboard support
* Add dark mode

## Author

**Zain Aftab**

* GitHub: [https://github.com/ZainAftab-dev](https://github.com/ZainAftab-dev)
* Email: [zainaftab589@gmail.com](mailto:zainaftab589@gmail.com)

## License

This project is open-source and available under the **MIT License**.


