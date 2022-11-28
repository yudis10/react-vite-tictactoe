import x from "../assets/x.png";
import o from "../assets/o.png";

export const Box = ({ value, onClick }) => {
  return (
    <button
      className={`bg-white rounded-md p-3 shadow hover:shadow-md transition-shadow w-20 h-20 flex items-center justify-center`}
      onClick={onClick}
    >
      {value === "X" && (
        <img className="w-full h-full object-contain" src={x} />
      )}
      {value === "O" && (
        <img className="w-full h-full object-contain" src={o} />
      )}
    </button>
  );
};
