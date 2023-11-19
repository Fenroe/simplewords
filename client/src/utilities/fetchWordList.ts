export const fetchWordList = async (wordLength: number) => {
  const data = await import(`@data/words/words_${wordLength}.json`);
  return data.default as string[];
};
