import './App.css'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import { Signup } from './routes/signup'
import { Signin } from './routes/signin'
import { Landing } from './routes/landing'
function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Landing/> }/>
        <Route path='/signup' element={ <Signup/> }/>
        <Route path='/signin' element={ <Signin/> }/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
