import { useMemo } from "react";
import { useGameContext } from "../utils/use-game-context";
import { getAllIndexes } from "../utils/get-all-indexes";

type LetterStates = "empty" | "current" | "valid" | "misplace" | "invalid";

export const Letter: React.FC<{ row: number; letter: number }> = ({
  row,
  letter,
}) => {
  const state = useGameContext();

  const isPrevious = state.previous.length > row;
  const isCurrent = state.previous.length === row;

  const value = useMemo(() => {
    if (isPrevious) {
      return state.previous[row]?.charAt(letter) ?? "";
    } else if (isCurrent) {
      return state.current.charAt(letter);
    }

    return "";
  }, [isPrevious, isCurrent, state, letter, row]);

  const letterState: LetterStates = useMemo(() => {
    if (isCurrent && !!value) return "current";

    if (!isPrevious) return "empty";

    const guessedWord = Array.from(state.previous[row]);
    const targetWord = Array.from(state.target);

    const guessedLetter = guessedWord[letter];
    const targetLetter = targetWord[letter];

    if (targetLetter === guessedLetter) {
      return "valid";
    }

    if (targetWord.includes(guessedLetter)) {
      //letter is in word but we didn't put it in the right place... we need to determine if we are missing a valid instance of this letter or not -> if we already put the guessed letter in the right place

      const validIndexes = getAllIndexes(
        targetWord,
        (value) => value === guessedLetter
      );

      if (validIndexes.every((index) => guessedWord[index] === guessedLetter)) {
        return "invalid";
      }

      return "misplace";
    }

    return "invalid";
  }, [isCurrent, value, state.previous, state.target, isPrevious, letter, row]);

  return <span className={`letter letter--${letterState}`}>{value}</span>;
};
