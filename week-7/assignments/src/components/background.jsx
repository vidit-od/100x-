import { useSetRecoilState } from "recoil"
import { coloratom } from "../store/atom/recoil"


export function BackgroundChange(){
    const changecolour = useSetRecoilState(coloratom);
    return <div className="background_buttons">
            <input type="button" value="Red" style={{backgroundColor:'red'}} onClick={()=> changecolour('red')}/>
            <input type="button" value="Yellow"  style={{backgroundColor:'yellow'}} onClick={()=> changecolour('yellow')}/>
            <input type="button" value="black"  style={{backgroundColor:'black'}} onClick={()=> changecolour('black')}/>
            <input type="button" value="Purple"  style={{backgroundColor:'purple'}} onClick={()=> changecolour('purple')}/>
            <input type="button" value="green "  style={{backgroundColor:'green'}} onClick={()=> changecolour('green')}/>
            <input type="button" value="blue"  style={{backgroundColor:'blue'}} onClick={()=> changecolour('blue')}/>
            <input type="button" value="default" onClick={()=> changecolour('#242424')}/>
        </div>
}