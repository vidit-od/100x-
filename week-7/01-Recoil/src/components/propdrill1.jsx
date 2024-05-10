import { Counter } from "./Counter";
import { CounterButtons} from "./CounterDisplay";
import { EvenRender } from "./EvenRender";

export function PropDrill(){
    return <div>
        Here is a Simple Counter 
        <Counter/>
        <CounterButtons/>
        <EvenRender/>
    </div>
}