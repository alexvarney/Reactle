import { useCallback, useReducer } from "react";
import { useKeyboardListener } from "./use-keyboard-listener";
import { WORD_LENGTH } from "./constants";
import VALID_WORDS from "./words-list/valid-words.json";

interface IGameStateAction {
  type: "append" | "backspace" | "confirm";
  value?: string;
}

interface IGameState {
  previous: string[];
  current: string;
}

export const initialGameState: IGameState = {
  previous: [],
  current: "",
};

const stateReducer = (state: IGameState, action: IGameStateAction) => {
  switch (action.type) {
    case "append":
      return {
        ...state,
        current:
          state.current.length < WORD_LENGTH
            ? state.current + action.value
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
        !(VALID_WORDS as Record<string, number>)[state.current]
      )
        return state;

      return {
        previous: [...state.previous, state.current],
        current: "",
      };
  }
};

export const useGameState = () => {
  const [state, dispatch] = useReducer(stateReducer, initialGameState);

  const onKeyUp = useCallback((event: KeyboardEvent) => {
    dispatch({
      type: "append",
      value: event.key.toLowerCase(),
    });
  }, []);

  const onBackspace = useCallback(() => {
    dispatch({ type: "backspace" });
  }, []);
  const onEnter = useCallback(() => {
    dispatch({ type: "confirm" });
  }, []);

  useKeyboardListener(onKeyUp, onBackspace, onEnter);

  return state;
};
