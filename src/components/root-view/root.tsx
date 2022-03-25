import "./style.css";

import { useGameContext } from "../../utils/use-game-context";

const Root = () => {
  const inputState = useGameContext();

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
