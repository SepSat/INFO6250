"use strict";
module.exports = compare; 
function compare( word, guess ) {  
  const upperWord = word.toUpperCase();
  const upperGuess = guess.toUpperCase();
  const wordLetter = { };
  for (let letter of upperWord){
    if (wordLetter[letter]){
      wordLetter[letter] = wordLetter[letter] + 1;
    } else {
      wordLetter[letter] = 1;
    }
  }
  let commonNumber = 0;
  for (let letter of upperGuess){
    if (wordLetter[letter] && wordLetter[letter] > 0){
      commonNumber = commonNumber + 1;
      wordLetter[letter] = wordLetter[letter] - 1;
    }
  }
  return commonNumber;
}