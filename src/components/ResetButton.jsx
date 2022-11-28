export const ResetButton = ({ resetBoard, setScores }) => {
  return (
    <div className="mt-10 flex gap-4">
      <button
        className={`px-4 py-2 font-bold bg-blue-600 text-white text-3xl rounded`}
        onClick={resetBoard}
      >
        Reset Board
      </button>
      <button
        className={`px-4 py-2 font-bold bg-blue-600 text-white text-3xl rounded`}
        onClick={() => {
          resetBoard();
          localStorage.removeItem("scores");
          setScores({ xScore: 0, oScore: 0, drawScore: 0 });
        }}
      >
        Reset Score
      </button>
    </div>
  );
};
