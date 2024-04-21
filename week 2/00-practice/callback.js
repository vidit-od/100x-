function example(cb){
    // async logic
    let sum = 0
    setTimeout(function(){
        console.log("hello 3")
    },1000)

    // log
    cb("hello 1")
}

async function main(){
    example(function(value){
        console.log("hello 0")
        console.log(value)
        console.log("hello 2")
        
    });
}

main();

// we are calling main 
// in main we are calling a function example 
// example takes any function as one of its parameter 
// the function we chose to feed as input prints hello 0 , value that we put in , hello 2

// order of execution 
// 1. main
// 2. example()
// 3. sees the async logic -> gives it to web api
// 4. runs cb(hello 1) => value == hello 1 
// 5. when web api's work is done , it sends the output to callback queue irrespective of the state of main stack 
// 6. when main stack is complete; event loop is activated which pulls one item from callback queue