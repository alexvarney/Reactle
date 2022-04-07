import { createContext, useContext } from "react";
import {
  useGameState,
  initialGameState,
  IUseGameStateActions,
} from "./use-game-state";

const GameContext = createContext(initialGameState);

const GameActions = createContext<IUseGameStateActions>({
  setTarget: (x: string) => undefined,
  handleKeyEvent: (x: string) => undefined,
});

export const useGameContext = () => {
  return useContext(GameContext);
};

export const useActions = () => {
  return useContext(GameActions);
};

export const GameContextProvider: React.FC = ({ children }) => {
  const { state, actions } = useGameState();

  return (
    <GameContext.Provider value={state}>
      <GameActions.Provider value={actions}>{children}</GameActions.Provider>
    </GameContext.Provider>
  );
};
