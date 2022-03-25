import "./style.css";
import { useEffect } from "react";
import { GameGrid } from "../game-grid";
import { useDispatch } from "../../utils/use-game-context";
import COMMON_WORDS from "../../utils/words-list/common-words.json";

const Root = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const words = Object.keys(COMMON_WORDS);

    const randomWordIndex = Math.floor(Math.random() * words.length + 1);

    const selectedWord = words[randomWordIndex];

    //TODO: remove this, come up with a determininstic (time based?) way to choose the word
    console.log(`Selecting ${selectedWord}`);

    dispatch({
      type: "set-target",
      value: selectedWord,
    });
  }, [dispatch]);

  return (
    <div className="container">
      <GameGrid />
    </div>
  );
};

export default Root;
