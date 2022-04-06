import "./style.css";
import { useEffect } from "react";
import { useActions, useGameContext } from "../../utils/use-game-context";
import { getInitialWord } from "../../utils/get-initial-word";
import GameGrid from "../grid";
import Keyboard from "../keyboard";
import Modal from "../completion-modal";

const Root = () => {
  const { setTarget, handleKeyEvent } = useActions();
  const state = useGameContext();

  useEffect(() => {
    if (!state.target?.length) {
      const word = getInitialWord();

      //TODO: remove this, come up with a determininstic (time based?) way to choose the word
      console.log(`Selecting ${word}`);

      setTarget(word);
    }
  }, [setTarget, state]);

  return (
    <div className="container">
      <Modal />
      <header>
        <h1>Reactle</h1>
      </header>
      <GameGrid />
      <Keyboard onClick={handleKeyEvent} />
    </div>
  );
};

export default Root;
