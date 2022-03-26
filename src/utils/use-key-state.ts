import { TLetters } from "./constants";
import { useGameContext } from "./use-game-context";
import { getAllIndexes } from "./get-all-indexes";

type TKeyState = "default" | "valid" | "misplace" | "invalid";

export const useKeyState = (keyValue: TLetters): TKeyState => {
  const state = useGameContext();

  const guessedLetters = new Set(
    state.previous.reduce<string[]>((acc, guessedWord) => {
      return [...acc, ...Array.from(guessedWord)];
    }, [])
  );

  const validLetters = new Set(Array.from(state.target));

  const isGuessed = guessedLetters.has(keyValue);

  if (!isGuessed) return "default";

  if (!validLetters.has(keyValue)) return "invalid";

  //indexes the key could appear
  const validIndexes = getAllIndexes(
    Array.from(state.target),
    (targetLetter) => targetLetter === keyValue
  );

  const isValid = state.previous.some((guessedWord) => {
    return Array.from(guessedWord).some(
      (guessedLetter, idx) =>
        guessedLetter === keyValue && validIndexes.includes(idx)
    );
  });

  return isValid ? "valid" : "misplace";
};
