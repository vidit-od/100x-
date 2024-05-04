import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AddTodo } from './components/AddTodo'
import { Todolist } from './components/TodoList'

function App() {
  const [todos,setTodos] = useState([]);

  fetch("http://localhost:3000/todos")
   .then(async function(res) {
     const json = await res.json();
     setTodos(json);
   })
  return (
    <div className='container'>
        <AddTodo/>
        <Todolist Alltodos = {todos}/>
    </div>
  )
}

export default App
