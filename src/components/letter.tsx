import { useMemo } from "react";
import { useGameContext } from "../utils/use-game-context";

type LetterStates = "empty" | "current" | "valid" | "misplace" | "invalid";

export const Letter: React.FC<{ row: number; letter: number }> = ({
  row,
  letter,
}) => {
  const state = useGameContext();

  const { previous, current, target } = state;

  const isPrevious = state.previous.length > row;
  const isCurrent = state.previous.length === row;

  console.log(previous, current, target);

  const value = useMemo(() => {
    if (isPrevious) {
      return state.previous[row]?.charAt(letter) ?? "";
    } else if (isCurrent) {
      return state.current.charAt(letter);
    }

    return "";
  }, [isPrevious, isCurrent, state, letter, row]);

  const letterState: LetterStates = useMemo(() => {
    console.log(state.target);

    if (isCurrent && !!value) return "current";

    if (isPrevious) {
      const word = Array.from(state.previous[row]);

      if (word[letter] === state.target.charAt(letter)) {
        return "valid";
      }

      if (Array.from(state.target).includes(word[letter])) {
        console.log(`misplace: ${word[letter]}`);

        return "misplace";
      }

      return "invalid";
    }

    return "empty";
  }, [isCurrent, value, state.previous, state.target, isPrevious, letter, row]);

  return (
    <div className={`letter letter--${letterState}`}>
      <span>{value}</span>
    </div>
  );
};
