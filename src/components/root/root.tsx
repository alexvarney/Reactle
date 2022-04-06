import "./style.css";
import { Letter } from "../grid/letter";

const Root = () => {
  return (
    <div className="container">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia,
        enim?
      </p>
      <Letter value="A" />
      <Letter value="B" letterState="current" />
      <Letter value="C" letterState="misplace" />
      <Letter value="D" letterState="invalid" />
      <Letter value="E" letterState="valid" />
    </div>
  );
};

export default Root;
