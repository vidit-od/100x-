import {countAtom} from '../store/atom/count'
import {useRecoilValue} from 'recoil'

export function Counter(){
    let count = useRecoilValue(countAtom);
    return <div style={{margin:'20px'}}>
        {count}
    </div>
}