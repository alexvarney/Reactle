import { NUM_GUESSES, WORD_LENGTH } from "../../utils/constants";
import { Letter } from "./letter";

export const GameGrid = () => {
  return (
    <div className="main-grid">
      {Array.from({ length: NUM_GUESSES }).map((_, idx) => (
        <WordRow key={idx} index={idx} />
      ))}
    </div>
  );
};

export const WordRow: React.FC<{ index: number }> = ({ index }) => {
  return (
    <div className="word-row">
      {Array.from({ length: WORD_LENGTH }).map((_, letterIndex) => (
        <Letter
          key={`${index}-${letterIndex}`}
          rowIdx={index}
          letterIdx={letterIndex}
        />
      ))}
    </div>
  );
};
