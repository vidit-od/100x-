import { useState } from "react";

export function Todolist({Alltodos}){
    async function UpdateTodo(TodoId){
        const response = await fetch(`http://localhost:3000/todos/${TodoId}`,
        {
            method:'PUT',
            headers:{
                "Content-Type":"application/json"
            }
        })
        const msg = await response.json();
        console.log( msg);
    }
    
    return <div>
        {Alltodos.map(function (todo){
            return <div>
                <h1>{todo.Title}</h1>
                <h2>{todo.Description}</h2>
                <input type="button" onClick={(e) => {UpdateTodo(todo._id)}} value={(todo.Completed == true ? 'Done': "Mark as Done")}/>
                </div>
        })}
    </div>
}