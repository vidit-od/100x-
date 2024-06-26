/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/
function isAnagram(str1, str2) {
  str1 = str1.toLowerCase()
  str2 = str2.toLowerCase()
  
  if( str1.length != str2 .length){
    return false
  }
  let arr1 = []
  for(let i = 0; i< str1.length; i++){
    arr1.push(str1[i])
  }
  arr1.sort()

  let arr2 = []
  for(let i = 0; i< str1.length; i++){
    arr2.push(str2[i])
  }
  arr2.sort()

  for(let i = 0; i< str1.length; i++){
    if(arr1[i] != arr2[i]){
      return false
    }
  }

  return true;
}

module.exports = isAnagram;
