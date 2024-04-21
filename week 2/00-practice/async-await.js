//promise in itself is not that clean 
// but it lets us use async await calls 
// this makes the code very comprehensable 

main();
function example(){
    let p = new Promise(function(resolve){ 
        // async logic 
        setTimeout(function(){
            console.log('hello 3')
        },1000)

        resolve('hello 1')
    })

    return p;
}
async function main(){
    const value = await example();
    console.log('hello 0')
    console.log(value);
    console.log('hello 2')
}

// in the end all three (callback , promise, async-await )are same 
