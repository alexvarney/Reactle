export const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
export const WORD_LENGTH = 5;
export const NUM_GUESSES = 6;
export const INITIAL_DATE = new Date("2022-03-26T00:00:00+0000");

export type TLetters =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";

export type TKeys = TLetters | "Backspace" | "Enter";
export type TCompletionState = "incomplete" | "solved" | "failed";
