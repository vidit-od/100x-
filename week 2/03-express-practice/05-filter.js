// Define an input array
const input = [1, 2, 3, 4, 5];

// Define a function to check if a number is even
function filter_logic(i) {
    // If the number is even, return true
    if (i % 2 == 0) {
        return true;
    } else {
        // If the number is odd, return false
        return false;
    }
}

// Use the built-in filter method to filter the input array based on the filter_logic function
let ans = input.filter(filter_logic);

// Print the result of filtering using the built-in filter method
console.log(ans);

// Define a custom filter function
function myFilter(arr, filter_logic) {
    // Initialize an empty array to store the filtered elements
    let ans = [];
    // Loop through each element in the input array
    for (let i = 0; i < arr.length; i++) {
        // Check if the filter_logic function returns true for the current element
        if (filter_logic(arr[i])) {
            // If true, push the element to the result array
            ans.push(arr[i]);
        }
    }
    // Return the filtered result array
    return ans;
}

// Call the custom filter function and print the result
console.log(myFilter(input, filter_logic));
