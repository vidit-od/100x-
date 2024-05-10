import './App.css'
import { PropDrill } from './components/propdrill1'
import { RecoilRoot } from 'recoil'
function App() {
  return (
    <div>
      <RecoilRoot>
        <PropDrill/>
      </RecoilRoot>
    </div>
  )
}

export default App
