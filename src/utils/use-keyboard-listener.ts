import { useEffect } from "react";

export type TKeyEventCallback = (x: string) => void;

export const useKeyboardListener = (onKeyUp: TKeyEventCallback) => {
  useEffect(() => {
    const handleCallback = (x: KeyboardEvent) => onKeyUp(x.key);

    window.addEventListener("keyup", handleCallback);

    return () => window.removeEventListener("keyup", handleCallback);
  }, [onKeyUp]);
};
