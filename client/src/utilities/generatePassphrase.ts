// Import necessary functions
import { getWordLength } from "./getWordLength";
import { fetchWordList } from "./fetchWordList";
import { selectRandomWord } from "./selectRandomWord";

// Define the function to generate a passphrase
export const generatePassphrase = (
  length: number,
  uppercase: boolean,
  numbers: boolean,
  special: boolean
) => {
  // Set constants for passphrase generation
  const passphraseMaxLength: number = 128;
  const minimumAvailableWordLength: number = 4;
  const maximumAvailableWordLength: number = 12;

  // Initialize variables
  let remainingPassphraseLength: number = passphraseMaxLength - (length - 1);
  let passphraseWords: string[] = [];

  // Loop to generate words for the passphrase
  for (let i = 0; i < length; i += 1) {
    // Set min and calculate max word length based on available space
    const min: number = minimumAvailableWordLength;
    const neededSpace: number = (length - 1 - i) * min;
    let max: number = remainingPassphraseLength - neededSpace;
    max = max > maximumAvailableWordLength ? maximumAvailableWordLength : max;

    // Get a random word from the word list
    const wordLength: number = getWordLength(max, min);
    const wordList: string[] = fetchWordList(wordLength);
    const word: string = selectRandomWord(wordList);

    // Add the word to the passphraseWords array
    passphraseWords.push(word);

    // Update the remaining passphrase length
    remainingPassphraseLength -= word.length;
  }

  if (uppercase === true) {
    passphraseWords = passphraseWords.map(
      (word) => `${word[0].toUpperCase()}${word.slice(1)}`
    );
  }

  // Join words into a passphrase, using "-" as a separator if special is true
  let passphrase: string = passphraseWords.join(special === true ? "-" : " ");

  // Add numbers to the passphrase if numbers is true
  if (numbers === true) {
    passphrase = `${length}${passphrase}${length}`;
  }

  // Return the generated passphrase
  return passphrase;
};
