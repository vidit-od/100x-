import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function useTodo(){
  const [todo,setTodo] = useState([]);
  const [loading,setloading] = useState(true);

  const getData = ()=>{
    axios.get('http://localhost:3000/api/v1/user/bulk?filter=').then(res =>{
        setTodo(res.data.users);
        setloading(false);
      })
  }

  useEffect(()=>{
    getData();
    const timer = setInterval(()=>{
        getData();
    },1000) 

    return ()=>{
      clearInterval(timer);
    }
  })

  return {
    todo: todo,
    loading: loading};
}


function App() {
  const {todo,loading} = useTodo();
  if(loading){
    return <div>
        loading ...
      </div>
  }
  return (
    <>
      {todo.map(item =>{
        return <div className="" key={item._id}>
          {JSON.stringify(item)}
        </div>
      })}
    </>
  )
}

export default App
