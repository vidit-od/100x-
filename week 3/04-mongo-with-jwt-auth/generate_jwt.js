const crypto = require('crypto');
const fs = require('fs');

function GenerateSecrate(length){
    return crypto.randomBytes(length).toString('hex');
}

let pass = GenerateSecrate( 64 );
pass = `module.exports = "`+pass+`";`
fs.writeFile("./jwttoken.js", pass, (err,data)=>{
    console.log("jwt token generated")
})