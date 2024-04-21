// promisified version of callback.js 
main();

function example(){
    let p = new Promise(function(resolve){
        // async logic
        let sum = 0
        setTimeout(function(){
            console.log("hello 3")
        },1000)

        resolve("hello 1")
    });

    return p;
}

function main(){
    example().then(function(value){
        console.log('hello 0');
        console.log(value);
        console.log('hello 2');
    });
}


// note : promis is just a syntactic sugar  i.e under the hood it is still using callbacks ;
// promisify the code makes us free from callback hell 
// callback hell : state where a callback calls another callback and loop goes on. this makes the code very unbareable to read and thus promisis were introduced 

// in the above example is a function 
// this function returns a promise

// for any promise syntax is 
// let name = new Promise(function(resolve){
//      content of promise 
// })
// return name; coz in the end our function must return the promise 

// promise has 3 states : 1) pending 
//                        2) fulfilled 
//                        3) rejected 