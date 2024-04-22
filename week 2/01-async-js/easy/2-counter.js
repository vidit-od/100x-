let i =1;
prints()
function prints(){
    console.log(i)
    i++;
    setTimeout(prints,1000);
}

//setTimeout is an async function so other logics wont work like using a while loop 
// as with while loop we will keep on feeding input to stack 
// thus keep on sending input to callback queue 
// but js thread is never empty .... hence event handler has no work 

// to make this solution we have to call the function again reccursively 