import { useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todosAtom } from "../store/atoms/todo";
import axios from "axios";

export function AddTodo(){
  const [title, setTitle] = useState('');
  const [Desc, setDesc] = useState('');
  const settodos = useSetRecoilState(todosAtom);
  
  
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
     const res = await axios.get("http://localhost:3000/todos")
     settodos(res.data);
     setTitle('');
     setDesc('');
  }  
  
  return (
    <div>
            <input type="text" value = {title} onChange={(e) => {setTitle(e.target.value)}}/> <br />
            <input type="text" value={Desc} onChange={(e) => {setDesc(e.target.value)}}/> <br />
            <button onClick={Add}>Add todo</button>
    </div>
  )
} 