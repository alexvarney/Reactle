import { useEffect, useCallback } from "react";
import { ALPHABET, TKeys } from "./constants";

export type TKeyEventCallback = (x: TKeys) => void;

export const useKeyboardListener = (
  onKeyUp: TKeyEventCallback,
  onBackspace: TKeyEventCallback,
  onConfirm: TKeyEventCallback
) => {
  const keyHandler = useCallback(
    (key: string) => {
      if (key === "Backspace") {
        onBackspace(key);
      } else if (key === "Enter") {
        onConfirm(key);
      } else if (ALPHABET.includes(key.toLowerCase())) {
        onKeyUp(key.toLowerCase() as TKeys);
      }
    },
    [onKeyUp, onConfirm, onBackspace]
  );

  useEffect(() => {
    const handleCallback = (x: KeyboardEvent) => keyHandler(x.key);

    window.addEventListener("keyup", handleCallback);
    return () => window.removeEventListener("keyup", handleCallback);
  }, [keyHandler]);

  return keyHandler;
};
