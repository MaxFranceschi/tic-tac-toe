import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameStatus, setGameStatus] = useState("Player X's turn");

  // Function to handle cell click
  const handleClick = (index) => {
    if (board[index] || checkWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext); // Toggle player turn
  };

  // Check for winner
  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Vertical
      [0, 4, 8], [2, 4, 6]              // Diagonal
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  // Effect to check winner or tie after every board change
  useEffect(() => {
    const winner = checkWinner(board);
    if (winner) {
      setGameStatus(`${winner} wins!`);
    } else if (board.every(cell => cell !== null)) {
      setGameStatus("It's a tie!");
    } else {
      setGameStatus(isXNext ? "Player X's turn" : "Player O's turn");
    }
  }, [board, isXNext]); // Dependency array to run this effect after board or player change

  // Function to reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameStatus("Player X's turn");
  };

  // Render the Tic-Tac-Toe board
  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <button
            key={index}
            className="cell"
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>
      <div className="game-status">{gameStatus}</div>
      <button className="reset-btn" onClick={resetGame}>
        Restart Game
      </button>
    </div>
  );
}

export default App;
