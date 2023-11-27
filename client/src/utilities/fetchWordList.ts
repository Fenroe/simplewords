import { wordsMap } from "@/data/words";

export const fetchWordList = (wordLength: number) => {
  const wordList = wordsMap.get(wordLength);
  return wordList as string[];
};
