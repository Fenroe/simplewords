export const getWordLength = (max: number, min: number) => {
  const wordLength: number = Math.round(Math.random() * (max - min) + min);
  return wordLength as number;
};
