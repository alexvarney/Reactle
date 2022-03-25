import { useMemo } from "react";
import { useGameState } from "../utils/use-game-state";

type LetterStates = "empty" | "current" | "valid" | "misplace" | "invalid";

export const Letter: React.FC<{ row: number; letter: number }> = ({
  row,
  letter,
}) => {
  const gameState = useGameState();
  const isPrevious = gameState.previous.length > row;
  const isCurrent = gameState.previous.length === row;

  const value = useMemo(() => {
    if (isPrevious) {
      return gameState.previous[row]?.charAt(letter) ?? "";
    } else if (isCurrent) {
      return gameState.current.charAt(letter);
    }

    return "";
  }, [isPrevious, isCurrent, gameState, letter, row]);

  const state: LetterStates = useMemo(() => {
    if (isCurrent && !!value) return "current";

    if (isPrevious) {
      const word = Array.from(gameState.previous[row]);

      if (word[letter] === gameState.target.charAt(letter)) {
        return "valid";
      }

      if (Array.from(gameState.target).includes(word[letter])) {
        console.log(`misplace: ${word[letter]}`);

        return "misplace";
      }

      return "invalid";
    }

    return "empty";
  }, [
    isCurrent,
    value,
    gameState.previous,
    gameState.target,
    isPrevious,
    letter,
    row,
  ]);

  return (
    <div className={`letter letter--${state}`}>
      <span>{value}</span>
    </div>
  );
};
