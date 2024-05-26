import { useEffect, useRef, useState } from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

export function Dashboard(){
    const [Switch, SetSwitch] = useState(true);
    const [filter, setFilter] = useState('')
    const [balance, setBalance] = useState(0);
    const [user, setUser] = useState({
        firstname: 'admin',
        lastname: 'admin',
    })
    const [allUsers, setAllUsers] = useState([]);

    const SettingButton = useRef();
    const BalanceButton = useRef();
    const searchIcon = useRef();
    const options = useRef();
    const navigate = useNavigate();
    const settingIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="absolute w-6 h-6">
    <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
    </svg>`;

    const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="absolute w-6 h-6">
    <path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clip-rule="evenodd" />
    </svg>`;

    const search = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
    <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z" clip-rule="evenodd" />
    </svg>`;

    const arrow = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 fill-green-700">
    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clip-rule="evenodd" />
    </svg>`;

    useEffect(()=>{
        if(filter == ''){
            searchIcon.current.style.transform = 'rotateZ(0deg)'
            searchIcon.current.innerHTML = search
        }
        else{
            searchIcon.current.style.transform = 'rotateZ(360deg)'
            searchIcon.current.innerHTML = arrow
        }
    },[filter])

    useEffect(()=>{
        getBalance();
        getAllUsers();
    },[])
    

    const getBalance = async()=>{
        try{
            const response = await axios.get('http://localhost:3000/api/v1/account/balance',{
                headers:{
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                }
            })
            setBalance(response.data.balance)
            setUser({
                firstname: response.data.userinfo.firstname,
                lastname: response.data.userinfo.lastname
            })
        }
        catch{
            localStorage.removeItem('token');
            navigate('/signin')
        }
    }
    const getAllUsers = async()=>{
        try{
            const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
            setAllUsers(response.data.users);
        }
        catch{
            localStorage.removeItem('token');
            navigate('/signin')
        }
    }
    const logout = ()=>{
        localStorage.removeItem('token');
        navigate('/signin');
    }
    const Expand = ()=>{
        if(Switch){
            BalanceButton.current.style.width = '50%'
            options.current.style.width = '40%'
            SettingButton.current.innerHTML = settingIcon
            SettingButton.current.style.width = '10%'
            SetSwitch(false);
        }
        else{
            BalanceButton.current.style.width = '80%'
            options.current.style.width='0%'
            SettingButton.current.style.width = '20%'
            SettingButton.current.innerHTML = closeIcon
            SetSwitch(true);
        }
    }

    const hello = ()=>{
        getAllUsers();
    }
    return <div>
        <div className="bg-white w-11/12 mx-auto rounded-md p-5 mt-5 mb-2">
            <div className="flex justify-between items-center">
               <div className="font-bold text-xl">Payment App </div>
               <div className="flex relative justify-center items-center">
                    <div className="mx-3 bg-gray-400 w-8 h-8 rounded-full flex justify-center items-center">{user.firstname[0].toUpperCase()}{user.lastname[0].toUpperCase()}</div>
                    <div className="flex justify-center items-center">{user.firstname} {user.lastname}</div> 
                </div>
            </div>
        </div>
        <div className="w-11/12 bg-transparent flex m-auto">
            <div className="bg-white p-5 py-2 rounded-md mt-1 mr-1 w-4/5 transition-width duration-200" ref={BalanceButton}><b>Balance :</b> {balance.toLocaleString()} INR</div>
            <div className="bg-white rounded-md mt-1 mr-1 w-0 flex justify-evenly overflow-hidden transition-width duration-200" ref={options}>
                <button className="text-red-700 w-1/2 border-r-2 transition-all duration-400 hover:bg-red-700 hover:text-white" onClick={logout}>Logout</button>
                <button className="text-purple-800 w-1/2 transition-all duration-400 hover:bg-purple-800 hover:text-white" onClick={()=>navigate('./update')}>Update</button>
            </div>
            <button className="bg-black rounded-md mt-1 text-white p-5 py-2 flex justify-center items-center transition-all duration-200 w-1/5 hover:scale-90" onClick={Expand} ref={SettingButton}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-6 h-6">
                <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
                </svg>

            </button>
        </div>

        <div className="w-11/12 bg-white rounded-md m-auto mt-3 flex pl-3">
            <button className="w-10 h-10 flex justify-center items-center bg-white rounded-full transition-all duration-200" ref={searchIcon} onClick={hello}> 
            </button>

            <input type="text" className="w-full ml-2 rounded-2xl pl-5 outline-none" placeholder="Search for a user" onChange={(e)=>{setFilter(e.target.value)}}/>
        </div>

        <div className="w-11/12 bg-white rounded-md m-auto my-3 h-full p-5 min-h-96">
            {allUsers.map((item)=>{
                return <div key={item._id} className="flex items-center justify-between my-2">
                    <div className="flex items-center">
                        <div className="w-5 h-5 bg-gray-500 flex justify-center items-center rounded-full p-4 text-white">{item.firstname[0].toUpperCase()}{item.lastname[0].toUpperCase()}</div>
                        <div className="ml-2">{item.firstname} {item.lastname}</div>
                    </div>
                    <button className="bg-black text-white px-4 py-2 rounded-lg transition-all duration-200 hover:bg-green-700" onClick={(e)=> navigate(`/send`,{state: {data: item}})}>Send</button>
                </div>
            })}
        </div>
    </div>
}