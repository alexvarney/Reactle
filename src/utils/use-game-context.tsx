import { createContext, useContext } from "react";
import { useGameState, initialGameState } from "./use-game-state";

const GameContext = createContext(initialGameState);

export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameContextProvider: React.FC = ({ children }) => {
  const state = useGameState();

  return <GameContext.Provider value={state}>{children}</GameContext.Provider>;
};
