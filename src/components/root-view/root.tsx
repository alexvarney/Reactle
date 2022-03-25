import "./style.css";
import { useGameState } from "../../utils/use-game-state";

const Root = () => {
  const inputState = useGameState();

  return (
    <div className="App">
      {inputState.previous.map((value) => (
        <p>{value}</p>
      ))}
      <p>{inputState.current}</p>
    </div>
  );
};

export default Root;
