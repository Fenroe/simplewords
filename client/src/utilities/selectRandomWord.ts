export const selectRandomWord = (wordList: string[]) => {
  const length: number = wordList.length;
  const randomIndex: number = Math.floor(Math.random() * (length - 1));
  return wordList[randomIndex] as string;
};
