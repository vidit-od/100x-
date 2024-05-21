import axios from "axios";
import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function Signin(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
    const navigate = useNavigate();
    const signup = async()=>{
        try{
            const response = await axios.post('http://localhost:3000/api/v1/user/signin',{
                username: email,
                password: password
            }).catch(err=>{
                console.clear();
            })
            localStorage.setItem('token',`Bearer ${response.data.token}`);
            navigate('/dashboard');
        }
        catch(error){
            errorMsg.current.style.transform = 'translateY(0%)'
            setPassword('');
            setTimeout(()=>{
                errorMsg.current.style.transform ='translateY(-100%)'
                
            },5000)
        }
    }
    const errorMsg = useRef();
    return <div className="bg-grey-200 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 p-10 rounded-lg max-w-xl overflow-hidden">
        <div className="absolute bg-white w-full left-0 top-0 flex justify-center items-center h-1/3 text-center -translate-y-full transition-all duration-300" ref={errorMsg}>Incorrect <br /> Email or Password</div>
        <div className="text-center font-bold text-2xl mb-3">Sign In</div>
        <div className="text-center font-thin mb-6">Enter your Information to Login <br/>to your account</div>
        <div className="w-full">
            <div className="">
                <div className="text-md font-bold mb-1">Email</div>
                <input type="text" className = "w-full py-3 px-2 text-sm outline-none rounded-md" value = {email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className="">
                <div className="text-md font-bold mb-1">Password</div>
                <input type="text" className = "w-full py-3 px-2 text-sm outline-none rounded-md mb-5" value={password} onChange={(e)=> {setPassword(e.target.value)}}/>
            </div>

            <input type="button" value="Signup" className="bg-black text-white py-3 w-1/2 translate-x-1/2 rounded-2xl" onClick={signup}/>

            <div className="text-center">Don't have an account? <Link to = "/signup" className="underline text-red-800">Signup</Link></div>
        </div>
    </div>
}