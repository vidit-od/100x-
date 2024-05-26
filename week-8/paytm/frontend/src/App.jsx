import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'recoil'
import { Signup } from './components/signup'
import { Signin } from './components/signin'
import { Dashboard } from './components/dashboard'
import { Send } from './components/send'
import { Update } from './components/update'
function App() {

  return (
    <div className='bg-grey-100 w-full h-full absolute'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element= { <Signup/> } />
        <Route path='/signup' element= { <Signup/> } />
        <Route path='/signin' element= { <Signin/> } />
        <Route path='/dashboard' element = { <Dashboard/> }/>
        <Route path='/dashboard/update' element = { <Update/> }/>
        <Route path='/send' element = { <Send/> }/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
