import { useMemo } from "react";
import { useGameContext } from "./use-game-context";
import { IGameState } from "./use-game-state";
import { getAllIndexes } from "./get-all-indexes";

export type LetterStates =
  | "empty"
  | "current"
  | "valid"
  | "misplace"
  | "invalid";

export const getLetterValue = (
  state: IGameState,
  rowIdx: number,
  letterIdx: number
) => {
  const isPrevious = state.previous.length > rowIdx;
  const isCurrent = state.previous.length === rowIdx;
  if (isPrevious) {
    return state.previous[rowIdx]?.charAt(letterIdx) ?? "";
  } else if (isCurrent) {
    return state.current.charAt(letterIdx);
  }

  return "";
};

export const getLetterState = (
  state: IGameState,
  rowIdx: number,
  letterIdx: number
): LetterStates => {
  const value = getLetterValue(state, rowIdx, letterIdx);

  const isPrevious = state.previous.length > rowIdx;
  const isCurrent = state.previous.length === rowIdx;
  if (isCurrent && !!value) return "current";

  if (!isPrevious) return "empty";

  const guessedWord = Array.from(state.previous[rowIdx]);
  const targetWord = Array.from(state.target);

  const guessedLetter = guessedWord[letterIdx];
  const targetLetter = targetWord[letterIdx];

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
};

export const useLetterState = (rowIdx: number, letterIdx: number) => {
  const state = useGameContext();

  return useMemo(() => {
    const value = getLetterValue(state, rowIdx, letterIdx);
    const letterState = getLetterState(state, rowIdx, letterIdx);

    return { value, letterState };
  }, [state, rowIdx, letterIdx]);
};
