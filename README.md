# Wordle Simulator

A simple Wordle clone built with React + TypeScript + Vite.
Test your word-guessing skills, just like the popular game, but right in your browser!

# Features

- Random 5-letter word chosen each game

- Type guesses using your keyboard (letters, Enter, Backspace)

- Correct letters in the correct spot are marked green

- Correct letters in the wrong spot are marked yellow

- Incorrect letters are marked gray

- Modal popup congratulates you if you win

- If you lose, you’ll see the correct word revealed

- “Play again” button to start a fresh game

# Getting Started

1. Clone the repo
   git clone https://github.com/your-username/wordle-simulator.git
   cd wordle-simulator

2. Install dependencies
   npm install

3. Start the development server
   npm run dev

Now open http://localhost:5173
in your browser.

# How to Play

Type any 5-letter word guess using your keyboard.

Press Enter to submit.

The tiles will light up:

- Green = correct letter in the correct spot

- Yellow = correct letter in the wrong spot

- Gray = letter not in the word

You have 6 attempts to guess the word.

Win →  popup congratulates you.

Lose →  popup shows the correct word.

# Tech Stack

- React 18 with hooks

- TypeScript for type safety

- Vite for fast dev/build

- CSS for styling (easy to customize)

📂 Project Structure
```src/
├─ App.tsx # Main game logic
├─ App.css # Styles for tiles, board, modal
└─ ...
```

# Customization

- Change word length → edit WORD_LENGTH in App.tsx.

- Change number of guesses → adjust Array(6).fill(null).

- Style tiles and modal → edit App.css.

# Contributing

Pull requests are welcome! If you’d like to add new features (like on-screen keyboard, score tracking, or animations), feel free to fork and submit a PR.

# License

This project is open source and available under the MIT License
