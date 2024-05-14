import {atom,selector, atomFamily, selectorFamily} from 'recoil'
import axios from 'axios';
import { promise } from 'zod';


export const todosAtom = atom({
    key:"todosAtom",
    default: selector({
        key:'todosatomselector',
        get: async()=>{
            const res = await axios.get("http://localhost:3000/todos")
            await new Promise( r => setTimeout(r,5000)) 
            return res.data
        }
    })
})