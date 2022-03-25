import "./style.css";
import { useState, useCallback } from "react";
import { useKeyboardListener } from "../../utils/use-keyboard-listener";
import { WORD_LENGTH } from "../../utils/constants";

const Root = () => {
  const [inputState, setInputState] = useState("");

  const onKeyUp = useCallback((event: KeyboardEvent) => {
    setInputState((prev) => {
      if (event.key === "Backspace") return prev.slice(0, -1);
      if (prev.length < WORD_LENGTH) return prev + event.key;
      return prev;
    });
  }, []);

  useKeyboardListener(onKeyUp);

  return (
    <div className="App">
      <p>{inputState}</p>
    </div>
  );
};

export default Root;
