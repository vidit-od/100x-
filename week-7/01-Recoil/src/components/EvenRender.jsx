import { useRecoilValue } from "recoil"
import { countSelector } from "../store/atom/count";

export function EvenRender(){
    const isEven = useRecoilValue(countSelector);
    return <div>
        {isEven? 'is Odd': 'is Even'}
    </div>
}