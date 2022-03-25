import { useEffect } from "react";
import { ALPHABET } from "./constants";

export type TKeyEventCallback = (x: KeyboardEvent) => void;

export const useKeyboardListener = (
  onKeyUp: TKeyEventCallback,
  onBackspace: TKeyEventCallback,
  onConfirm: TKeyEventCallback
) => {
  useEffect(() => {
    const callback = (event: KeyboardEvent) => {
      if (event.key === "Backspace") {
        onBackspace(event);
      } else if (event.key === "Enter") {
        onConfirm(event);
      } else if (ALPHABET.includes(event.key)) {
        onKeyUp(event);
      }
    };

    window.addEventListener("keyup", callback);
    return () => window.removeEventListener("keyup", callback);
  }, [onKeyUp]);
};
