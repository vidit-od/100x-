import { useState } from "react"

export function AddTodo({}){
  const [title, setTitle] = useState('');
  const [Desc, setDesc] = useState('');
  
  async function Add(){
    const response = await fetch("http://localhost:3000/todos",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({title: title,description: Desc})
    })
     const msg = await response.json();
     console.log(msg)
  }  
  
  return (
    <div>
            <input type="text" value = {title} onChange={(e) => {setTitle(e.target.value)}}/> <br />
            <input type="text" value={Desc} onChange={(e) => {setDesc(e.target.value)}}/> <br />
            <button onClick={Add}>Add todo</button>
    </div>
  )
} 