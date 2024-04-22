let fs = require('fs');

fs.readFile('a.txt','utf8',function(err,data){
    data = data.trim()
    let data_arr = data.split(" ");
    let ans = ""
    for(let i = 0; i< data_arr.length ; i++){
        if(data_arr[i] != ''){
            ans += data_arr[i] + ' '
        }
    }
    fs.writeFile("a.txt", ans,function(){
        console.log('updation complete !!')
    })
})






// let new_data = ""
//     for(let i = 0; i< data.length; i++){
//         if(data[i] != ' '){
//             new_data.push(data[i])
//         }
//         else if(data[i] == ' ' && new_data[new_data.length-1] != ' '){
//             new_data.push(data[i])
//         }
//     }
