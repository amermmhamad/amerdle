import "./App.css";
import { useEffect, useState } from "react";

const API_URL = "/wordle";
const WORD_LENGTH = 5;

export default function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState<(string | null)[]>(
    Array(6).fill(null)
  );
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameResult, setGameResult] = useState<"win" | "lose" | null>(null);

  useEffect(() => {
    const handleType = (event: KeyboardEvent) => {
      if (isGameOver) return;

      if (event.key === "Enter") {
        if (currentGuess.length !== WORD_LENGTH) return;

        const newGuesses = [...guesses];
        const insertAt = newGuesses.findIndex((val) => val === null);
        newGuesses[insertAt] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");

        const isCorrect = solution === currentGuess.toLowerCase();
        if (isCorrect) {
          setIsGameOver(true);
          setGameResult("win");
          return;
        }

        const noSlotsLeft = newGuesses.every((g) => g !== null);
        if (noSlotsLeft) {
          setIsGameOver(true);
          setGameResult("lose");
        }
        return;
      }

      if (event.key === "Backspace") {
        setCurrentGuess((g) => g.slice(0, -1));
        return;
      }

      if (currentGuess.length >= WORD_LENGTH) return;

      const isLetter = /^[a-z]$/i.test(event.key);
      if (isLetter) {
        setCurrentGuess((g) => g + event.key.toLowerCase());
      }
    };

    window.addEventListener("keydown", handleType);
    return () => window.removeEventListener("keydown", handleType);
  }, [currentGuess, guesses, isGameOver, solution]);

  useEffect(() => {
    const fetchWord = async () => {
      const response = await fetch(API_URL);
      const words: string[] = await response.json();
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setSolution(randomWord.toLowerCase());
    };
    fetchWord();
  }, []);

  const resetGame = () => {
    setGuesses(Array(6).fill(null));
    setCurrentGuess("");
    setIsGameOver(false);
    setGameResult(null);
    (async () => {
      const response = await fetch(API_URL);
      const words: string[] = await response.json();
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setSolution(randomWord.toLowerCase());
    })();
  };

  const currentRow = guesses.findIndex((val) => val === null);

  return (
    <>
      <h1 className="title">Amerdle</h1>
      <div className="board">
        {guesses.map((guess, i) => {
          const isCurrentGuess = i === currentRow;
          return (
            <Line
              key={i}
              guess={isCurrentGuess ? currentGuess : guess ?? ""}
              isFinal={!isCurrentGuess && guess != null}
              solution={solution}
            />
          );
        })}

        {isGameOver && (
          <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="modal">
              {gameResult === "win" ? (
                <h2>Congratulations! You guessed the word!</h2>
              ) : (
                <h2>Woops, try again. The correct word was “{solution}”.</h2>
              )}
              <div style={{ marginTop: 12 }}>
                <button onClick={resetGame}>Play again</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );

  function Line({
    guess,
    isFinal,
    solution,
  }: {
    guess: string;
    isFinal: boolean;
    solution: string;
  }) {
    const tiles = [];

    for (let i = 0; i < WORD_LENGTH; i++) {
      const char = guess[i];
      let className = "tile";

      if (isFinal) {
        if (char === solution[i]) {
          className += " correct";
        } else if (char && solution.includes(char)) {
          className += " close";
        } else {
          className += " incorrect";
        }
      }

      tiles.push(
        <div key={i} className={className}>
          {char}
        </div>
      );
    }

    return <div className="line">{tiles}</div>;
  }
}
