export const ScoreBoard = ({ scores, xPlaying }) => {
  const { xScore, oScore, drawScore } = scores;
  return (
    <div className="flex bg-white shadow gap-3 items-center mt-10 rounded">
      <div
        className={`text-lg font-bold py-3 px-4 border-b-4 transition-colors ${
          xPlaying
            ? " border-red-500 text-red-500"
            : "border-transparent text-black"
        }`}
      >
        X = {xScore}
      </div>
      <div
        className={`text-lg font-bold py-3 px-4 border-b-4 border-white text-black`}
      >
        Draw = {drawScore}
      </div>
      <div
        className={`text-lg font-bold py-3 px-4 border-b-4 transition-colors ${
          !xPlaying
            ? " border-blue-500 text-blue-500"
            : "border-transparent text-black"
        }`}
      >
        O = {oScore}
      </div>
    </div>
  );
};
