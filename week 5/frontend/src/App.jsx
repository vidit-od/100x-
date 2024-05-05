import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AddTodo } from './components/AddTodo'
import { Todolist } from './components/TodoList'
import { Signup } from'./components/signup'
import { Signin } from './components/signin'
import { Logout } from './components/logout'
import { HideContent } from './components/hidecontent'
function App() {
  const [todos,setTodos] = useState([]);
  const [verified,setVerified] = useState(false);

  useEffect(()=>{
    fetchTodo();  
    },[]);
  
  const fetchTodo = async ()=>{
    const res = await fetch("http://localhost:3000/todos")
    const json = await res.json();
    setTodos(json);
  }
  useEffect(()=>{
    const token = localStorage.getItem('token');
    fetch("http://localhost:3000/verification",{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        token: token
      }
    })
    .then(async (res)=>{
      const json = await res.json();
      if(json.msg == 'verified') setVerified(true);
    })
  },[])
  const logoutHandler = ()=>{
      setVerified(false);
  }
  const signinHandler = ()=>{
      setVerified(true);
  }
  const AddHandler = ()=>{
    fetchTodo();
  }
  return (
    <div className='main'>
        {!verified && <Signup/>}
        {!verified && <Signin onSignin = {signinHandler}/>}
        {verified && <Logout onLogout={logoutHandler} />}
        {!verified && <HideContent/>}
        <div className="container">
          <AddTodo AddHandler={AddHandler}/>
          <Todolist Alltodos = {todos} />
        </div>
    </div>
  )
}

export default App
