import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

interface UserInterface{
    firstname: string,
    lastname: string,
    username: string,
    password: string
}

interface countInterface{
    home: number,
    connections: number,
    message: number,
    notifications: number,
}

export function Landing(){
    const navigate = useNavigate();
    const [user, setUser]= useState<UserInterface>({
        firstname: '',
        lastname: '',
        username: '',
        password: '',
    })
    const [count, setCount] = useState<countInterface>({  
        home: 0,
        connections: 0,
        message: 0,
        notifications: 0,
    });
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        tokenVerification();
    },[]) 

    
    const tokenVerification = async()=>{
        const token = localStorage.getItem('token');
        await new Promise( r => (setTimeout(r,1500)))
        const response = await axios.get('http://localhost:3000/user/',{
            headers:{
                Authorization: token,
            }
        })

        if(response.status){
            setUser({
                firstname: response.data.payload.firstname,
                lastname: response.data.payload.lastname,
                username: response.data.payload.username,
                password: response.data.payload.password,
            });
            const countData = await axios.get('http://localhost:3000/nav',{
                headers:{
                    Authorization: token,
                }
            })
            setCount({
                home: countData.data.payload.Home,
                connections: countData.data.payload.Connections,
                notifications: countData.data.payload.Notification,
                message: countData.data.payload.Messages,
            });
            setLoading(false);
        }
        else{
            navigate('/signin')
        }
        
    }

    if( loading){
        return <div className="w-full h-full absolute flex flex-col justify-center items-center">
            <div className="text-blue-500 font-bold text-6xl flex justify-center items-center">
                Linked
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="" className="fill-blue-500 w-16 h-16" focusable="false">
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                </svg>
            </div>
            <div className="w-1/2 h-1 bg-slate-300 rounded-full mt-5 overflow-hidden relative">
                <div className="w-1/3 h-full bg-blue-500 absolute transition-all duration-200 left-1/3 animate-loader"></div>
            </div>
        </div>
    }
    return (
        <div>
            <div className="w-11/12 absolute top-5 left-1/2 -translate-x-1/2 p-5 rounded-md shadow-3xl flex justify-evenly">
                <button className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                    <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                    <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                    </svg>
                    
                    {(count.home >0 )?<div className="absolute left-5 -top-2 bg-red-700 rounded-full text-white h-6 w-auto flex justify-center items-center text-xs p-2">{(count.home > 99)?"+99":count.home}</div>: null}
                </button>
                <button className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                    <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                    </svg>
                    {(count.connections >0)?<div className="absolute left-5 -top-2 bg-red-700 rounded-full text-white h-6 w-auto flex justify-center items-center text-xs p-2">{(count.connections > 99)?'+99':count.connections}</div> : null}
                </button>
                <button className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                    <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" />
                    </svg>
                    
                    {(count.message > 0)? <div className="absolute left-5 -top-2 bg-red-700 rounded-full text-white h-6 w-auto flex justify-center items-center text-xs p-2">{(count.message>99)?"+99":count.message}</div> : null}
                </button>
                <button className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                    <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd" />
                    </svg>
                    
                    {(count.notifications > 0)?<div className="absolute left-5 -top-2 bg-red-700 rounded-full text-white h-6 w-auto flex justify-center items-center text-xs p-2">{(count.notifications>99)?"+99":count.notifications}</div>: null}
                </button>
                <button className="bg-gray-600 rounded-full flex justify-center items-center text-white p-2 w-8 h-8">
                    {(user.firstname[0]?.toUpperCase())}{(user.lastname[0]?.toUpperCase())}
                </button>
                </div>
        </div>
    )
}