import { useRef, useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil";
import { todos } from "../store/atom/todos";

export default function TodoInput(){
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [todo, setTodos] = useRecoilState(todos)
    const ref = useRef();

    return <div className="todo-Input">
        <div className="heading"> Add New Todos Here</div>
        <div className="field"> 
            <p>Title</p>
            <input type="text" value={title} ref={ref} onChange={(e)=>{setTitle(e.target.value)}}/>
        </div>
        <div className="field">
            <p>Description</p>
            <input type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
        </div>
        <input type="button" value="Add Todo" onClick={()=>{
            setTodos([...todo,{title:title,description:description}])
            setTitle('')
            setDescription('')
            ref.current.focus();
        }}/>
    </div>
}