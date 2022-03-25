import COMMON_WORDS from "./words-list/common-words.json";

export const getInitialWord = () => {
  const words = Object.keys(COMMON_WORDS);

  const randomWordIndex = Math.floor(Math.random() * words.length + 1);

  const selectedWord = words[randomWordIndex];

  return selectedWord;
};
