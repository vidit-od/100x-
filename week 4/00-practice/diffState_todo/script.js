let OldState =[];
async function LoadNewState(){
    const response = await fetch('http://localhost:3000/getTodoState');
    const arr = await response.json();
    let temp = [];
    arr.forEach(elem =>{
        temp.push(elem.id)
    })
    MyReact(arr,OldState);
    console.log(document.querySelector('.container').childElementCount);
    OldState = arr;
}
// logic to find diff
function MyReact(NewState , OldState){
    let added = [];
    let deleted = [];
    let updated = [];

    NewState.forEach( element => {
        let Finder = OldState.find((elem)=> elem.id == element.id)
        if(Finder == undefined) added.push(element);
        else updated.push(element);
    });

    OldState.forEach( element =>{
        let Finder = NewState.find(elem => elem.id == element.id)
        if(Finder == undefined) deleted.push(element);
    })

    updated.forEach(element=>{
        UpdateTask(document.getElementById(element.id), element);
    })
    added.forEach(element =>{
        AddTask(element)
    })
    deleted.forEach(element=>{
        document.getElementById(element.id).remove();
    })
}

function UpdateTask(OldElement , NewElement){
    if(OldElement.Title == NewElement.Title  && OldElement.description == NewElement.description){
        return
    }
}

function AddTask(element){
    let task = document.createElement('div')
    task.setAttribute('class','task');
    task.setAttribute('id',element.id);
    let task_title = document.createElement('div');
    task_title.setAttribute('class','title');
    task_title.innerHTML = element.title
    let task_Desc = document.createElement('div');
    task_Desc.setAttribute('class','Desc');
    task_Desc.innerHTML = element.description;
    let btn = document.createElement('div')
    btn.setAttribute('class','btn');
    task.appendChild(task_title);
    task.appendChild(task_Desc);
    task.appendChild(btn);
    let input_btn = document.createElement('input');
    input_btn.type = 'button';
    input_btn.id = `btn-${element.id}`
    input_btn.value = 'Mark as Done'
    input_btn.onclick = ()=>{done(element.id)};
    btn.appendChild(input_btn)  
    document.querySelector('.container').appendChild(task);
}
function done(id){
    document.getElementById(`btn-${id}`).value= 'Done!!'
}