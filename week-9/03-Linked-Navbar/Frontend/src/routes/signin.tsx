import axios from "axios";
import { useRef, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

export function Signin(){

    // state variables
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
    const [toggle, setToggle] = useState(true);
    
    // ref elements
    const passwordBTN = useRef<HTMLButtonElement | null>(null);
    const passwordINPUT = useRef<HTMLInputElement | null>(null);
    const errorMSG = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // password svg's 
    const show_icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-1">
    <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
    </svg>`

    const hide_icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" classname="size-1">
    <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
    <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
    <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
    </svg>`

    // show / hide password logic
    const togglepass = ()=>{
        if(toggle && passwordINPUT.current && passwordBTN.current){
            passwordINPUT.current.type = 'text';
            setToggle(false);
            passwordBTN.current.innerHTML = hide_icon;
        }
        else if(passwordINPUT.current && passwordBTN.current){
            passwordINPUT.current.type = 'password';
            setToggle(true);
            passwordBTN.current.innerHTML = show_icon;
        }
    }

    // close error message pop up 
    const closeMSG = ()=>{
        if(errorMSG.current) errorMSG.current.style.transform = 'translateX(-50%) translateY(100%)'
    }

    // password show / hide logic
    useEffect(()=>{
        if(password.length === 0 && passwordBTN.current){
            passwordBTN.current.style.opacity = '0';
            passwordBTN.current.style.pointerEvents = 'none';
        }
        else if(passwordBTN.current){
            passwordBTN.current.style.opacity = '1';
            passwordBTN.current.style.pointerEvents = 'all';
        }
    },[password])

    // check DB and navigate to landing page logic
    const login = async()=>{    
        try{
            const response = await axios.post("http://localhost:3000/user/signin",{
                username:email,
                password:password
                
            })
            localStorage.setItem('token','Bearer '+ response.data.token);
            navigate('/');
        }
        catch{
            if(errorMSG.current) errorMSG.current.style.transform = 'translateX(-50%) translateY(-40%)'
        }
 
    }

    return (
    <div className="w-full h-full absolute overflow-hidden top-0 left-0">
        <div className="w-full bg-white h-16 flex items-center px-4 justify-between shadow-md">
            <div className="flex items-center font-semibold text-2xl text-blue-500"> 
                Linked
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="" className="fill-blue-500 w-8 h-8" focusable="false">
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                </svg>
            </div>
            <Link to='/signup'>
            <button className="border-2 border-blue-500 text-blue-500 py-1 px-4 rounded-full hover:bg-blue-500 transition-all duration-200 hover:text-white">
                Signup
            </button>
            </Link>
        </div>

        <div className="w-full p-5">
            <div className="text-center font-medium text-2xl mt-8 mb-8">Make the most of your professional life
            </div>
        
            <div className="w-3/4 m-auto font-medium text-gray-600">

            <div className="">
                <div className="">Email </div>
                <input type="text" className="outline-2 p-2 border-2 w-full rounded-md text-sm font-normal" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>

            <div className="">
                <div className="">Password </div>
                <div className="relative overflow-hidden">

                <input type="password"  className="outline-2 p-2 border-2 w-full rounded-md text-sm font-normal" value={password} onChange={(e)=>setPassword(e.target.value)} ref={passwordINPUT} maxLength={50}/>

                <button className="absolute h-full right-3 top-0 w-6 justify-center items-center" ref={passwordBTN} onClick={togglepass}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="">
                    <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
                    </svg>
                </button>
                </div>
            </div>
            <div className="w-full text-center">
                <button className="w-2/4 m-auto text-center bg-blue-500 p-2 mt-6 rounded-lg text-white" onClick={login}>
                Sign in 
                </button>
                <div className="mt-2">
                    Don't have an account ? <Link to='/signup' className="hover:underline text-blue-500">Signup</Link>
                </div>
            </div>
            </div>
        </div>

        <div className="absolute shadow-3xl p-5 bottom-0 left-1/2 w-3/4 text-center -translate-x-1/2 flex justify-center items-center rounded-lg bg-white transition-all duration-200 translate-y-full" ref={errorMSG}>

            <div className="flex justify-between w-full">
                <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fill-white bg-red-700 rounded-full">
                <path fillRule="evenodd" d="m6.72 5.66 11.62 11.62A8.25 8.25 0 0 0 6.72 5.66Zm10.56 12.68L5.66 6.72a8.25 8.25 0 0 0 11.62 11.62ZM5.105 5.106c3.807-3.808 9.98-3.808 13.788 0 3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788Z" clipRule="evenodd" />
                </svg>

                <div className="ml-5">Invalid Input / Email Pre-Occupied</div>
                </div>
                <button onClick={closeMSG}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fill-red-700">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>

                </button>
            </div>

        </div>
</div>
)
}