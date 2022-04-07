import "./style.css";
import { GameGrid } from "../grid/game-grid";

const Root = () => {
  return (
    <div className="container">
      <header>
        <h1>Reactle</h1>
      </header>
      <GameGrid />
    </div>
  );
};

export default Root;
