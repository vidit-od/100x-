import { useNavigate } from "react-router-dom"


export function Navbar({children}){
    const navigate = useNavigate();
    return <div className="navbar">
        {children}
        <input type="button" value="Home" onClick={()=> navigate('/')}/>
        <input type="button" value="Assignment 1" onClick={()=> navigate('/profile_component')}/>
        <input type="button" value="Assignment 2" onClick={()=> navigate('/background_change')}/>
        <input type="button" value="Assignment 3" onClick={()=> navigate('/paragraph_generator')}/>
        <input type="button" value="Assignment 4" onClick={()=> navigate('/github_card')}/>
        <input type="button" value="Assignment 5" onClick={()=> navigate('/otp')}/>
    </div>
}