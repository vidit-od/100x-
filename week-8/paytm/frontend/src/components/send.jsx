import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom";

export function Send(){
    const [amount ,setAmount]= useState(0);
    const location = useLocation();
    const user = location.state?.data;
    const notification = useRef();

    useEffect(()=>{

        if(parseInt(amount)<0){
            setAmount(0);
        }
        else{
            setAmount(parseInt(amount));
        }
    },[amount])


    const transaction = async()=>{
        let temp ;
        try{
            const response = await axios.post('http://localhost:3000/api/v1/account/transfer',{
                amount: amount,
                to: user.username,
            },{
                headers:{
                    "Content-Type":'application/json',
                    token : localStorage.getItem('token')
                },
            })
            temp = generateMsg(response.data.msg,true);
            notification.current.style.backgroundColor = 'rgb(74 222 128 / var(--tw-bg-opacity))'
        }
        catch(error){
            console.clear();
            temp = generateMsg(error.response.data.msg,false);
            
            notification.current.style.backgroundColor = 'rgb(239 68 68 / var(--tw-bg-opacity))'
        }
        
        notification.current.style.transform = 'translateY(5%) translateX(-50%)'
        notification.current.innerHTML = temp;
        setTimeout(()=>{
            notification.current.style.transform = 'translateY(-100%) translateX(-50%)'
        },5000)
    }

    const generateMsg = (txt,status)=>{
        if(status){
            return `<div class="">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="ml-5">${txt}</div>`
        }
        else{
            return `<div className="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                </svg>
                </div>
                <div className="">${txt}</div>`
        }
    }
    return <div className="">
    <div className="bg-red-500 w-11/12 absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full rounded-md p-5 transition-all duration-200 z-0 flex justify-center items-center" ref={notification}>
        msg
    </div>
    <div className="bg-white w-11/12 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md p-5">
        <div className="w-full text-center font-bold text-2xl mb-12">Send Money</div>
        <div className="flex items-center mb-3">
            <div className="bg-green-400 w-10 h-10 flex justify-center items-center rounded-full text-white mr-2">{user.firstname[0]}{user.lastname[0]}</div>
            <div className="text-xl font-semibold">{user.firstname} {user.lastname}</div>
        </div>
        <div className="ml-2 font-semibold text-sm">Amount (in RS)</div>
        <input type="number" name="" id="" className="bg-white rounded-md p-2 outline-none mt-2 border-black border w-full mb-3" placeholder="Enter Amount" onChange={(e)=>{setAmount(e.target.value)}} min={0} value={amount}/> <br />
        <button className="bg-green-400 p-2 mt-3 rounded-md w-full text-white" onClick={transaction}>
            Initiate Transfer
        </button>
    </div>
    </div>
}