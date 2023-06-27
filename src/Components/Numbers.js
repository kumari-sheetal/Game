import React, { useState } from "react";
import swal from "sweetalert";
import "./Num.css";

const getRandomNumber = () => Math.floor(Math.random() * 100) + 1;

const Numbers = () => {
  const [randomNumber, setRandomNumber] = useState(getRandomNumber());
  const [userGuess, setUserGuess] = useState("");
  const [turns, setTurns] = useState(0);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(null);
  const [showPlayAgain, setShowPlayAgain] = useState(false);

  const handleGuess = () => {
    const guess = parseInt(userGuess);

    if (isNaN(guess) || guess < 1 || guess > 100) {
      setMessage("Please enter a valid number between 1 and 100.");
      return;
    }

    setTurns((prevTurns) => prevTurns + 1);

    if (guess === randomNumber) {
      const scoreValue = 100 - turns;
      setMessage(
        `Congratulations! You guessed the number in ${turns} turns! 🎉`
      );
      setScore(scoreValue);
      swal({
        title: "You won the game!",
        text: `Congratulations! You guessed the number in ${turns} turns! 🎉`,
        icon: "success",
        buttons: {
          ok: {
            text: "OK",
            value: "ok",
          },
        },
      }).then((value) => {
        if (value === "ok") {
          setShowPlayAgain(true);
        }
      });
    } else if (guess < randomNumber) {
      setMessage("Your guess was too low. Try again.");
    } else {
      setMessage("Your guess was too high. Try again.");
    }

    setUserGuess("");
  };

  const resetGame = () => {
    setRandomNumber(getRandomNumber());
    setUserGuess("");
    setTurns(0);
    setMessage("");
    setScore(null);
    setShowPlayAgain(false);
  };

  return (
    <div className="container mt-5">
      <div className="center-card">
        <div className="card">
          <h1>Number Guessing Game</h1>
          <label htmlFor="guess-input">Enter your guess:</label>
          <input
            type="number"
            id="guess-input"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
          />
          {showPlayAgain ? (
            <button
              onClick={resetGame}
              style={{ margin: "11px", fontWeight: "bold" }}
            >
              Play Again
            </button>
          ) : (
            <button
              onClick={handleGuess}
              style={{ margin: "11px", fontWeight: "bold" }}
            >
              Guess
            </button>
          )}
          <p id="message" className={score !== null ? "alert" : ""}>
            {message}
          </p>
          {score !== null && <p id="score">Your score is {score}.</p>}
          {score !== null && <p className="celebration-emoji">🎉</p>}
        </div>
      </div>
    </div>
  );
};

export default Numbers;
