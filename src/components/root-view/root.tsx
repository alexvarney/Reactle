import "./style.css";
import { useEffect } from "react";
import { GameGrid } from "../game-grid";
import { useDispatch } from "../../utils/use-game-context";

const Root = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("root useeffect");

    dispatch({
      type: "set-target",
      value: "words",
    });
  }, [dispatch]);

  return (
    <div className="container">
      <GameGrid />
    </div>
  );
};

export default Root;
