import { useEffect, useRef, useState } from "react";
import { Board } from "./components/Board";
import { ResetButton } from "./components/ResetButton";
import { ScoreBoard } from "./components/ScoreBoard";

import x from "./assets/x.png";
import o from "./assets/o.png";

function App() {
  const WIN_CONDITION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const [scores, setScores] = useState(() => {
    const savedItem = localStorage.getItem("scores");
    const parsedItem = JSON.parse(savedItem);
    return parsedItem || { xScore: 0, oScore: 0, drawScore: 0 };
  });

  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(scores));
  }, [scores]);

  const handleBoxClick = (boxIdx) => {
    const updatedBoard = board.map((value, idx) => {
      if (idx == boxIdx) {
        return xPlaying ? "X" : "O";
      } else {
        return value;
      }
    });

    const winner = checkWinner(updatedBoard);

    if (winner) {
      if (winner === "O") {
        let { oScore } = scores;
        oScore += 1;
        setScores({ ...scores, oScore });
      } else if (winner === "X") {
        let { xScore } = scores;
        xScore += 1;
        setScores({ ...scores, xScore });
      } else {
        let { drawScore } = scores;
        drawScore += 1;
        setScores({ ...scores, drawScore });
      }
    }

    setBoard(updatedBoard);
    setXPlaying(!xPlaying);
  };

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITION.length; i++) {
      const [x, y, z] = WIN_CONDITION[i];

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        // console.log(board[x]); CHECK WINNER
        setGameOver(true);
        gameOverModal(board[x]);
        return board[x];
      }
    }
    if (!board.some((el) => el === null)) {
      //CHECK DRAW
      setGameOver(true);
      gameOverModal("draw");
      return "draw";
    }
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  };

  const gameOverModal = (winner) => {
    modalRef.current.showModal();
    winnerRef.current = winner;
  };

  const winnerRef = useRef();
  const modalRef = useRef();

  return (
    <div className="grid place-items-center">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard={resetBoard} setScores={setScores} />
      <dialog id="modal" ref={modalRef} className="overflow-hidden">
        <div className="flex justify-center flex-1 w-[300px] min-h-[150px]">
          {winnerRef?.current !== "draw" && (
            <div className="flex flex-col justify-center items-center gap-4">
              {winnerRef?.current === "O" && <img className="w-16" src={o} />}
              {winnerRef?.current === "X" && <img className="w-16" src={x} />}
              <p className="font-bold text-2xl">Wins The Game</p>
            </div>
          )}
          {winnerRef?.current === "draw" && (
            <p className="grid place-items-center text-5xl font-bold">
              It's a TIE
            </p>
          )}
        </div>
        <div className="flex justify-center mt-1">
          <button
            className="px-4 py-2 font-bold bg-blue-600 text-white text-3xl rounded"
            onClick={() => {
              resetBoard();
              modalRef.current.close();
            }}
          >
            Play Again
          </button>
        </div>
      </dialog>
    </div>
  );
}

export default App;
