import { useEffect } from "react";
import { ALPHABET } from "./constants";

export type TKeyEventCallback = (x: KeyboardEvent) => void;

export const useKeyboardListener = (onKeyUp: TKeyEventCallback) => {
  useEffect(() => {
    console.log("useKeyboardListener -- useEffect");

    const callback = (event: KeyboardEvent) => {
      if (event.key === "Backspace" || ALPHABET.includes(event.key)) {
        onKeyUp(event);
      }
    };

    window.addEventListener("keyup", callback);
    return () => window.removeEventListener("keyup", callback);
  }, [onKeyUp]);
};
