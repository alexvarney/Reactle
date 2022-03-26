import COMMON_WORDS from "./words-list/common-words.json";
import { daysBetween } from "./time-utils";

import { INITIAL_DATE } from "./constants";

export const getInitialWord = (time = new Date(Date.now())) => {
  const words = Object.keys(COMMON_WORDS);

  const elapsedDays = daysBetween(INITIAL_DATE, time);

  const selectedWord = words[elapsedDays];

  return selectedWord;
};
