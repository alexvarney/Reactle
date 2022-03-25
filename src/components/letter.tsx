import { useMemo } from "react";
import { useGameContext } from "../utils/use-game-context";

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

    const word = Array.from(state.previous[row]);

    if (word[letter] === state.target.charAt(letter)) {
      return "valid";
    }

    if (Array.from(state.target).includes(word[letter])) {
      return "misplace";
    }
    return "invalid";
  }, [isCurrent, value, state.previous, state.target, isPrevious, letter, row]);

  return <span className={`letter letter--${letterState}`}>{value}</span>;
};
