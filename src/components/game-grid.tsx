import { NUM_GUESSES, WORD_LENGTH } from "../utils/constants";
import { Letter } from "./letter";

export const GameGrid = () => {
  return (
    <div className="main-grid">
      {Array.from({ length: NUM_GUESSES }).map((_, idx) => (
        <WordRow index={idx} />
      ))}
    </div>
  );
};

export const WordRow: React.FC<{ index: number }> = ({ index }) => {
  return (
    <p className="word-row">
      {Array.from({ length: WORD_LENGTH }).map((_, letterIndex) => (
        <Letter row={index} letter={letterIndex} />
      ))}
    </p>
  );
};
