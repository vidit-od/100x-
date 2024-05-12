import { get } from 'mongoose'
import {atom, selector} from 'recoil'

export const coloratom = atom({
    key:'coloratom',
    default:'#242424'
})
