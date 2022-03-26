import { NUM_GUESSES, WORD_LENGTH, TCompletionState } from "./constants";
import { LetterStates, getLetterState } from "./use-letter-state";
import { IGameState } from "./use-game-state";

const getEmoji = (value: LetterStates) => {
  switch (value) {
    case "valid":
      return "🟩";

    case "misplace":
      return "🟨";

    case "invalid":
      return "⬛";

    default:
      return "";
  }
};

export const getEmojiView = (
  state: IGameState,
  completionState: TCompletionState,
  puzzleNum: number
) => {
  const grid = state.previous.map((_, rowIndex) => {
    return Array.from({ length: WORD_LENGTH }).map((__, letterIndex) =>
      getEmoji(getLetterState(state, rowIndex, letterIndex))
    );
  });

  return grid.reduce((acc, curr) => {
    return acc + curr.join("") + "\n";
  }, `Reactle #${puzzleNum} (${completionState === "solved" ? state.previous.length : "x"}/${NUM_GUESSES})\n`);
};
