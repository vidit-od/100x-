import { useRecoilStateLoadable} from 'recoil';
import { todosAtom } from "../store/atoms/todo";
import { useEffect } from 'react';
import { useState } from 'react';
import axios from  'axios'

export function Todolist(){
    const [todos, settodos] = useRecoilStateLoadable(todosAtom);
    if(todos.state === 'loading'){
        return <div>
            Loading ... 
        </div>
    }
    const updateTodo = async(TodoId)=>{
        const response = await axios(`http://localhost:3000/todos`,
        {
            method:'PUT',
            headers:{
                id: TodoId,
                "Content-Type":"application/json"
            },
        })
        refresh();
    }
    const refresh = async()=>{
        const res = await axios.get("http://localhost:3000/todos")
        settodos(res.data)
    }
    return <div>
        {todos.contents.map(function (todo){
            return <div className="todo" key={todo._id}>
                <h1>{todo.Title}</h1>
                <h2>{todo.Description}</h2>
                <input type="button" onClick={() => {updateTodo(todo._id)}} value={(todo.Completed == true ? 'Done': "Mark as Done")}/>
                </div>
        })}
    </div>
}