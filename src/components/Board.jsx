import { Box } from "./Box";

export const Board = ({ board, onClick }) => {
  return (
    <div className="grid grid-cols-3 gap-3 min-w-max mt-10">
      {board.map((value, idx) => (
        <Box
          key={idx}
          value={value}
          onClick={() => value === null && onClick(idx)}
        />
      ))}
    </div>
  );
};
