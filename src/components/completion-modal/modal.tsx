import { useCallback } from "react";
import { NUM_GUESSES, TCompletionState } from "../../utils/constants";
import { getEmojiView } from "../../utils/emoji-view";
import { useGameContext } from "../../utils/use-game-context";
import "./modal.css";
import { daysSinceInitial } from "../../utils/time-utils";

const useCompletionState = (): TCompletionState => {
  const state = useGameContext();

  if (state.previous.includes(state.target)) return "solved";
  if (state.previous.length === NUM_GUESSES) return "failed";
  return "incomplete";
};

export const CompletionModal: React.FC = () => {
  const state = useGameContext();
  const completionState = useCompletionState();

  const shareEmojiView = useCallback(() => {
    navigator.clipboard.writeText(
      getEmojiView(state, completionState, daysSinceInitial() + 1)
    );
  }, [state, completionState]);

  if (completionState === "incomplete") return null;

  return (
    <div className={"modal-wrapper"} data-testid="completion-modal">
      <div className="modal-inner">
        {completionState === "solved" ? (
          <SolvedModalContent />
        ) : (
          <FailedModalContent />
        )}
        <button className="modal--share-button" onClick={shareEmojiView}>
          Share
        </button>
      </div>
    </div>
  );
};

const SolvedModalContent = () => {
  const state = useGameContext();

  const numGuesses = state.previous.length;

  return (
    <>
      <h2>{numGuesses === 1 ? "Incredible!" : "Well Done!"}</h2>
      <p>
        {numGuesses === 1
          ? "You solved the puzzle in 1 guess, you absolute madlad."
          : `You solved the puzzle in ${numGuesses} guesses.`}
      </p>
    </>
  );
};

const FailedModalContent = () => {
  return (
    <>
      <h2>Nice Try!</h2>
      <p>You didn't solve the puzzle. Better luck next time.</p>
    </>
  );
};
