import React, { Suspense, useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes ,useNavigate} from 'react-router-dom'
import Hello1 from './components/hello1'
import Hello2 from './components/hello2'
import { PropDrill, PropDrill2 } from './components/propdrill'
import { CountContext } from './context'

const MyLazy = React.lazy(()=> import("./components/hello3"))
function App() {
  const [count , setCount] = useState(0)
  return (
    <div>
      <div className="navbar">
        This is the Top navbar that never rerenders
      </div>
      <BrowserRouter>
        <Buttons/>
        <Routes>
          <Route path='/' element = {<Hello1/>}/>
          <Route path='/hello2' element = {<Hello2/>}/>
          <Route path='/hello3' element={<Suspense fallback='Loading...'><MyLazy/></Suspense>}/>
        </Routes>
      </BrowserRouter>
      
      <CountContext.Provider  value = {{count,setCount}}>
        <PropDrill/>
      </CountContext.Provider>
    </div>
  )
}

function Buttons(){
  const navigate = useNavigate();
  return <div className="buttons">
    <input type="button" value="Hello1" onClick={()=>{navigate('/')}}/>
    <input type="button" value="Hello2" onClick={()=>{navigate('/hello2')}}/>
    <input type="button" value="Hello3" onClick={()=>{navigate('/hello3')}}/>
  </div>
}
export default App
