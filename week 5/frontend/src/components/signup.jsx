import { useState } from "react";

export function Signup(){
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    
    async function Signup(){
        console.log(Username,Password)
        const response = await fetch('http://localhost:3000/signup', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                username: Username,
                password: Password,
            },
        }) 
        const json = await response.json();
        console.log(json);
        setUsername('');
        setPassword('');
        alert(`username ${Username} created`)
    }
    return <div className="signup">
        Signup <br/>
        <hr />
        username : 
        <input type="text" onChange={(e) => {setUsername(e.target.value)}}/> <br/>
        password :
        <input type="text" onChange={(e)=> { setPassword(e.target.value)}}/> <br/>
        <input type="button" value="create new user" onClick={Signup}/> 
    </div>
}