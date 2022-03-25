import { createContext, useContext } from "react";
import {
  useGameState,
  initialGameState,
  IGameStateAction,
} from "./use-game-state";

const GameContext = createContext(initialGameState);

const GameDispatch = createContext(
  ((x) => null) as React.Dispatch<IGameStateAction>
);

export const useGameContext = () => {
  return useContext(GameContext);
};

export const useDispatch = () => {
  return useContext(GameDispatch);
};

export const GameContextProvider: React.FC = ({ children }) => {
  const { state, dispatch } = useGameState();

  return (
    <GameContext.Provider value={state}>
      <GameDispatch.Provider value={dispatch}>{children}</GameDispatch.Provider>
    </GameContext.Provider>
  );
};
