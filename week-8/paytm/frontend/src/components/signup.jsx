import { useState ,useRef, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios';

export function Signup(){
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const [error, setError] = useState('')
    const Errorbox = useRef();

    useEffect(()=>{
        const jwttoken = localStorage.getItem('token');
        if(jwttoken){
            const success = checkToken(jwttoken);
            if(success) navigate('/dashboard') 
        }
    },[])

    const checkToken = async(token)=>{
        const response = await axios.get('http://localhost:3000/api/v1/user/',{
            headers:{
                'Content-Type': 'application/json',
                'token': token
            }
        });
        return response.data.status
    }
    const showError = async()=>{ 
        if (Errorbox.current) {
            Errorbox.current.style.transform = 'translateY(0%)';
        }
        await setTimeout(()=>{
            Errorbox.current.style.transform = 'translateY(-100%)';
        },5000)
    }

    const createUser = async()=>{
        try{
            const response = await axios.post('http://localhost:3000/api/v1/user/signup',{
                    username: email,
                    firstname: firstName,
                    lastname: lastName,
                    password: password
            })
            const token = response.data.token
            localStorage.setItem('token',`Bearer ${token}`);
            navigate('/dashboard')

        }
        catch(err){
            setError(err.response.data.msg)
            showError()
        }
    }

    return <div className="bg-grey-200 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 p-10 rounded-lg max-w-xl overflow-hidden">
        <div className="absolute bg-white w-full left-0 top-0 p-3 text-red-800 h-1/4 flex justify-center items-center -translate-y-full transition-translate duration-200" ref={Errorbox}>{error}</div>
        <div className="text-center font-bold text-2xl mb-3">Signup</div>
        <div className="text-center font-thin mb-6">Enter your Information to create an <br/>account</div>
        <div className="w-full">
            <div className="">
                <div className="text-md font-bold mb-1">First Name</div>
                <input type="text" className = "w-full py-3 px-2 text-sm outline-none rounded-md"  onChange={(e)=>{setFirstName(e.target.value)}}/>
            </div>            
            <div className="">
                <div className="text-md font-bold mb-1">Last Name</div>
                <input type="text" className = "w-full py-3 px-2 text-sm outline-none rounded-md"  onChange={(e)=>{setLastName(e.target.value)}}/>
            </div>
            <div className="">
                <div className="text-md font-bold mb-1">Email</div>
                <input type="text" className = "w-full py-3 px-2 text-sm outline-none rounded-md" onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className="">
                <div className="text-md font-bold mb-1">Password</div>
                <input type="text" className = "w-full py-3 px-2 text-sm outline-none rounded-md mb-5" onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>

            <input type="button" value="Signup" className="bg-black text-white py-3 w-1/2 translate-x-1/2 rounded-2xl" onClick={createUser}/>

            <div className="text-center">Already have an account? <Link to = "/signin" className='underline text-red-800'>Login</Link></div>
        </div>
    </div>
}