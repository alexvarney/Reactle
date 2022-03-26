import "./style.css";
import { useEffect } from "react";
import GameGrid from "../grid";
import { useActions } from "../../utils/use-game-context";
import { getInitialWord } from "../../utils/get-initial-word";
import Keyboard from "../keyboard";
const Root = () => {
  const { setTarget, handleKeyEvent } = useActions();

  useEffect(() => {
    const word = getInitialWord();

    //TODO: remove this, come up with a determininstic (time based?) way to choose the word
    console.log(`Selecting ${word}`);

    setTarget(word);
  }, [setTarget]);

  return (
    <div className="container">
      <header>
        <h1>Reactle</h1>
      </header>
      <GameGrid />
      <Keyboard onClick={handleKeyEvent} />
    </div>
  );
};

export default Root;
