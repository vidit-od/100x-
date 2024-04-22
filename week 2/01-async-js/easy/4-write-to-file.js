const fs = require('fs');
const readline = require('readline');

// used to promisify 
const { promisify } = require('util');
// we wrapped fs.writefile to writefileasync which is a promisified function 
const writeFileAsync = promisify(fs.writeFile);

// describe where to read from and where to give output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let file_path = 'a.txt';
console.log("Enter Data:");

// take input 
rl.on('line', async function(input) {
    // trim extra spaces 
    input = input.trim();
    // use await to call the prmisified fs.writeFile 
    await writeFileAsync(file_path, input);
    console.log(`Contents of ${file_path} changed to: ${input} successfully!!`);
    rl.close();
});
