import { useRecoilValue } from "recoil"
import { coloratom } from "../store/atom/recoil"

export function Main({children}){
    const color = useRecoilValue(coloratom);
    return <div className="main" style={{backgroundColor:color}}>
        {children}
    </div>
}