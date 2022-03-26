import { useCallback, useReducer, useMemo } from "react";
import { useKeyboardListener } from "./use-keyboard-listener";
import { WORD_LENGTH, NUM_GUESSES } from "./constants";
import VALID_WORDS from "./words-list/valid-words.json";

export interface IGameStateAction {
  type: "append" | "backspace" | "confirm" | "set-target";
  value?: string;
}

export interface IUseGameStateActions {
  setTarget: (value: string) => void;
  handleKeyEvent: (key: string) => void;
}

export interface IGameState {
  target: string;
  previous: string[];
  current: string;
}

export const initialGameState: IGameState = {
  previous: [],
  current: "",
  target: "",
};

const stateReducer = (state: IGameState, action: IGameStateAction) => {
  switch (action.type) {
    case "append":
      return {
        ...state,
        current:
          state.current.length < WORD_LENGTH
            ? state.current + action.value?.toLowerCase()
            : state.current,
      };
    case "backspace":
      return {
        ...state,
        current: state.current.slice(0, -1),
      };
    case "confirm":
      if (
        state.current.length !== WORD_LENGTH ||
        !(VALID_WORDS as Record<string, number>)[state.current] ||
        state.previous.includes(state.current)
      )
        return state;

      return {
        ...state,
        previous: [...state.previous, state.current],
        current: "",
      };
    case "set-target":
      return {
        ...state,
        target: action.value?.toLowerCase() ?? "",
      };
  }
};

export const useGameState = () => {
  const [state, dispatch] = useReducer(stateReducer, initialGameState);

  const isComplete =
    state.previous.includes(state.target) ||
    state.previous.length === NUM_GUESSES;

  const onKeyUp = useCallback(
    (key: string) => {
      if (!isComplete) {
        dispatch({
          type: "append",
          value: key.toLowerCase(),
        });
      }
    },
    [isComplete]
  );

  const onBackspace = useCallback(() => {
    if (!isComplete) dispatch({ type: "backspace" });
  }, [isComplete]);
  const onEnter = useCallback(() => {
    if (!isComplete) dispatch({ type: "confirm" });
  }, [isComplete]);

  const setTarget = useCallback(
    (value: string) => {
      if (!isComplete) dispatch({ type: "set-target", value });
    },
    [isComplete]
  );

  const handleKeyEvent = useKeyboardListener(onKeyUp, onBackspace, onEnter);

  const actions: IUseGameStateActions = useMemo(
    () => ({
      setTarget,
      handleKeyEvent,
    }),
    [setTarget, handleKeyEvent]
  );

  return { state, actions };
};
