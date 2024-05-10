import { useState } from 'react'
import './App.css'
import TodoInput from './component/todoinput'
import { Todolist } from './component/todolist'
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <div className='todo-container'>
        <RecoilRoot>
          <TodoInput/>
          <Todolist/>
        </RecoilRoot>
    </div>
  )
}

export default App
