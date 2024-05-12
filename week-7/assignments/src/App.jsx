import './App.css'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import { ProfileComponent } from './components/profile_component'
import { Navbar } from './components/navbar'
import { BackgroundChange } from './components/background'
import { RecoilRoot} from 'recoil'
import { Main } from './components/main'
import { ParagraphGenerator } from './components/paragraph'
import { GithubComponent } from './components/github'

function App() {
  return (
    <RecoilRoot>
    <Main>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/profile_component' element={<ProfileComponent/>}/>
          <Route path='/background_change' element={<BackgroundChange/>}/>
          <Route path='/paragraph_generator' element={<ParagraphGenerator/>}/>
          <Route path='/github_card' element = {<GithubComponent />}/>
        </Routes>
      </BrowserRouter>
    </Main>
    </RecoilRoot>
  )
}

export default App

function Landing(){
  return <div>
      Use the Top Navbar to open Assignments of Week 7    
    </div>
}