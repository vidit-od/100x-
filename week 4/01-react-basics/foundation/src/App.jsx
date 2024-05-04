import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { set } from 'mongoose'

function App() {
  const [title, SetTitle] = useState('')
  const [description, SetDesc] = useState('')
  const [tasks, SetTask] = useState([]);
  const [id, SetId] = useState(1);
  
  
  const AddTodo = ()=>{
    if(!title || !description){
      alert('input fields cannot be empty');
      return
    }
    SetId(id+1);
    const NewTask = {
      'title': title,
      'description':description,
      'id':id,
      'status': 'Pending'
    }
    SetTask([...tasks, NewTask])
    SetTitle('')
    SetDesc('');
  }
  
  const TaskComplete = function(id){
    const newList = tasks.map((task)=>{
      if(task.id === id) {
        return {...task,'status':'Done'};
      }
      return task
    })
    SetTask(newList);
  }

  return (
    <div className='background'>
        <div className="Todo">
        <div className="title">Todo List</div>
        <div className="Field">
          <div className="tag"> Title</div>
          <input type="text"  name = 'Task' id='Task' value={title} onChange={(e) => SetTitle(e.target.value)}/>
        </div>
        <div className="Field">
          <div className="tag">Description</div>
          <input type="text" name='Description' id='Description' value={description} onChange={(e) =>{ SetDesc(e.target.value)}}/>
        </div>
        <div className="Field button">
          <button onClick={AddTodo}>
            Add todo
          </button>
        </div>
        </div>
        <div className="List">
          <div className="header">Task List</div>
          <div className="container">
          {tasks.map((task,index) =>(
            <div className="task" id={task.id} key={index}>
              <div className="TaskTitle">{task.title}</div>
              <div className="TaskDesc">{task.description}</div>
              <input type="button" value={task.status === 'Done' ? 'Done!!' : 'Mark as Done' } onClick={(e) => {TaskComplete(task.id)} }/>
              <input type="button" value='update' onClick={(e) => {UpdateTask(task.id)} }/>
            </div>
          ))}
        </div>
        </div>
    </div>
  )
}

export default App
