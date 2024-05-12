import { useState } from "react"
import { arr } from "../assets/words";
import { resolve } from "tsconfig";

export function ParagraphGenerator(){
    const [count, setCount ] = useState(0);
    const [currcount, currsetCount ] = useState(0);
    const [words,setWords] = useState('');

    const generate = async()=>{
        let arr = ''
        setWords('');
        for(let i =0; i<count; i++){
            arr = arr + ' ' + getRandomWord()
            setWords(arr);
            currsetCount(i+1);
            await new Promise(resolve => setTimeout(resolve,100))
        }
    }

    return <div className="paragraph_generator">
        <div className="input_bar">
            <input type="number" onChange={(e) => {setCount(e.target.value)}}/>
            <input type="button" value="Generate" onClick={()=> generate()}/>
        </div>
        <div className="display">
            {words}
            <div className="currcount">{currcount}</div>
        </div>
    </div>
}

function getRandomWord(){
    const num = Math.floor(Math.random()* arr.length);
    return arr[num];
}