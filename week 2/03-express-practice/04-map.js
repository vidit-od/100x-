// input
const input = [1,2,3,4,5]

// transform function
function transform(i){
    return i*2;
}
// map is a method() for any array 
let ans = input.map(transform);
console.log(ans)

// replicating the logic of map with a global function 
console.log(myMap(input,transform));

// global function logic 
function myMap(arr,transform_fn){
    for(let i =0; i<arr.length; i++){
        arr[i] = transform_fn(arr[i]);
    }

    return arr; 
}
