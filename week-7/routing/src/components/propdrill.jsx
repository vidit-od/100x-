import { useContext } from "react"
import Count from "./count"
import { CountContext } from "../context";

export function PropDrill(){
    return <div className="child">
        <PropDrill2/>
    </div>
}
export function PropDrill2(){
    const {count,setCount} = useContext(CountContext);
    return <div className="child">
        <Count count={count} setCount={setCount}/>
    </div>
}