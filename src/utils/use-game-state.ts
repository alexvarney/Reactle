import { useCallback, useReducer } from "react";
import { useKeyboardListener } from "./use-keyboard-listener";
import { WORD_LENGTH } from "./constants";

interface IGameStateAction {
  type: "append" | "backspace" | "confirm";
  value?: string;
}

interface IGameState {
  previous: string[];
  current: string;
}

const initialGameState: IGameState = {
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
      if (state.current.length !== WORD_LENGTH) return state;

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
