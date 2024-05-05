import { useState } from "react";

export function Signin({onSignin}){
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    
    async function Signin(){
        const response = await fetch('http://localhost:3000/signin', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                username: Username,
                password: Password,
            },
        }) 
        const json = await response.json();
        localStorage.setItem('token',json);
        setUsername('');
        setPassword('');
        if(typeof onSignin === 'function'){
            onSignin();
        }
        alert(`your token saved to localstorage`);
    }
    return <div className="signin">
        Signin <br/>
        <hr />
        username : 
        <input type="text" onChange={(e) => {setUsername(e.target.value)}}/> <br/>
        password :
        <input type="text" onChange={(e)=> { setPassword(e.target.value)}}/> <br/>
        <input type="button" value="Signin" onClick={Signin}/> 
    </div>
}