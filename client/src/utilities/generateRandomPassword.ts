type CharactersArray = string[];

// Lowercase letters array
const lowercaseLetters: CharactersArray = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode("a".charCodeAt(0) + i)
);

// Uppercase letters array
const uppercaseLetters: CharactersArray = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode("A".charCodeAt(0) + i)
);

// Digits array
const digits: CharactersArray = Array.from({ length: 10 }, (_, i) =>
  i.toString()
);

// Special characters array
const specialCharacters: CharactersArray = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "+",
  "-",
  "=",
  "{",
  "}",
  "[",
  "]",
  "|",
  ";",
  ":",
  "<",
  ">",
  ",",
  ".",
  "/",
  "?",
];

export const generateRandomPassword = (
  length: number,
  uppercase: boolean,
  numbers: boolean,
  special: boolean
) => {
  // collect the arrays to draw from into another array
  const masterArray: CharactersArray[] = [lowercaseLetters];
  if (uppercase === true) masterArray.push(uppercaseLetters);
  if (numbers === true) masterArray.push(digits);
  if (special === true) masterArray.push(specialCharacters);
  // go through each array and select a random character from each
  let passwordCharacters: CharactersArray = [];
  for (let array of masterArray) {
    const character: string = array[Math.floor(Math.random() * array.length)];
    passwordCharacters.push(character);
  }
  // for the remainder of the length (length - characters) we can do the same as above but randomly
  const remainingLength: number = length - passwordCharacters.length;
  for (let i = 0; i < remainingLength; i++) {
    const array = masterArray[Math.floor(Math.random() * masterArray.length)];
    const character: string = array[Math.floor(Math.random() * array.length)];
    passwordCharacters.push(character);
  }
  // at the end, randomize the characters array and then join it
  let currentIndex: number = passwordCharacters.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [passwordCharacters[currentIndex], passwordCharacters[randomIndex]] = [
      passwordCharacters[randomIndex],
      passwordCharacters[currentIndex],
    ];
  }

  const password = passwordCharacters.join("");
  // return the joined array
  return password;
};
