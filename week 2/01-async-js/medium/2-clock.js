
function print_time(){
    const curr_time = new Date();

    console.log(`current time : ${curr_time.getHours()}:${curr_time.getMinutes()}:${curr_time.getSeconds()}`)
}

setInterval(print_time,10);