import { useEffect } from "react"
import axios from 'axios';
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { useRef } from "react";
export function Update(){
    
    const [firstname , setFirstname] = useState('');
    const [lastname , setLastname] = useState('');
    const [password , setPassword] = useState('');

    const oldfirstname = ''
    const oldlastname = ''
    const oldpassword = ''
    useEffect(()=>{
        tokenVerification();
    },[])

    const tokenVerification = async()=>{
        const response = await axios.get('http://localhost:3000/api/v1/user',{
            headers: {
                token: localStorage.getItem('token')
            }
        })
        setFirstname(response.data.user.firstname);
        setLastname(response.data.user.lastname);
        setPassword(response.data.user.password);
    }
    const navigate = useNavigate();
    const errorMsg = useRef();

    const UpdateInfo = async()=>{
        try{
            const response = await axios.put('http://localhost:3000/api/v1/user',{
                firstname,
                lastname,
                password
            },{
                headers:{
                    token: localStorage.getItem('token')
                },
            })
            navigate('/dashboard');
        }
        catch{
            errorMsg.current.style.transform = 'translateX(-50%) translateY(10%)'
        }
    }

    return (
    <div className="w-full h-full relative">
    <button className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-200 p-5 rounded-md " onClick={()=> navigate('/dashboard')}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
        <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
        </svg>
    </button>
    
    <div className="bg-grey-200 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 p-10 rounded-lg max-w-xl overflow-hidden shadow-2xl">
        <div className="text-center font-bold text-2xl my-8"> Update Information </div>
        <div className="flex flex-col justify-center items-center w-full">
            <div className="w-3/4 font-medium mt-2"> 
                Firstname <br />
                <input type="text" className="w-full p-2 rounded-md outline-none font-normal text-sm" value={firstname} onChange={(e)=>setFirstname(e.target.value)}/>
            </div>
            <div className="w-3/4 font-medium mt-2"> 
                Lastname<br />
                <input type="text" className="w-full p-2 rounded-md outline-none font-normal text-sm" value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
            </div>
            <div className="w-3/4 font-medium mt-2"> 
                Password<br />
                <input type="text" className="w-full p-2 rounded-md outline-none font-normal text-sm" placeholder="New Password" onChange={(e)=>setPassword(e.target.value)}/>
            </div>

            <button className="w-1/2 bg-grey-100 mt-5 rounded-md p-2 font-medium border-2 border-black" onClick={UpdateInfo}>Submit changes</button>
        </div>

    </div>
        <div className="absolute top-0 left-1/2 bg-white w-3/4 text-center p-5 -translate-x-1/2 -translate-y-full transition-all duration-200 rounded-md shadow-2xl" ref={errorMsg}>Error processing the request</div>
    </div>
    )
} 