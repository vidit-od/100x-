import { countAtom } from "../store/atom/count"
import { useSetRecoilState } from "recoil"

export function CounterButtons(){
    const setCount = useSetRecoilState(countAtom);
    return <div className="buttons" style={{width:'200px', display:'flex', justifyContent:'space-between', margin:'20px'}}>
        <input type="button" value="<<" onClick={() => setCount(c => c-1)}/>
        <input type="button" value=">>" onClick={() => setCount(c => c+1)}/>
    </div>
}