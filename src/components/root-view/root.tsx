import "./style.css";
import { useEffect } from "react";
import { GameGrid } from "../game-grid";
import { useDispatch } from "../../utils/use-game-context";
import { getInitialWord } from "../../utils/get-initial-word";

const Root = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const word = getInitialWord();

    //TODO: remove this, come up with a determininstic (time based?) way to choose the word
    console.log(`Selecting ${word}`);

    dispatch({
      type: "set-target",
      value: word,
    });
  }, [dispatch]);

  return (
    <div className="container">
      <GameGrid />
    </div>
  );
};

export default Root;
