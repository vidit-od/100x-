/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    // Your code here
    str = str.toLowerCase()
    let words = str.split(" ")
    let total = 0;
    words.forEach(element => {
      for(let i =0; i<element.length;i++){
        if(element[i] == 'a' || element[i] == 'e' || element[i] == 'i' || element[i] == 'o' || element[i] == 'u' ){
          total++;
        }
      }
    });

    return total;
}

module.exports = countVowels;