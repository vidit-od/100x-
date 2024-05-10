import { get } from 'mongoose';
import {atom , selector} from 'recoil'

export const countAtom = atom({
    key:'countAtom',
    default:0
});

export const countSelector = selector({
    key:'countSelector',
    get:({get})=>{
        const count = get(countAtom);
        return count%2;
    }
})

