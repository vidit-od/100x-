import { useEffect, useState } from "react";
import axios from 'axios';


export function GithubComponent(){
    const github_key = process.env.REACT_APP_GITHUB_KEY    
    const [user,setUser] = useState('vidit-od')
    const [data,setData] = useState('');
    
    async function GetData(){
        const response = await axios.get(`https://api.github.com/users/${user}`,{
            headers:{
                Authorization : `Bearer ${github_key}`
            }
        })  
        setData(response.data) 
    }

    useEffect(()=>{
        GetData();
    },[]);

    return<div> 
        <div className="search">
            <input type="text" onChange={(e)=>{setUser(e.target.value)}}/>
            <input type="button" value="search" onClick={()=>GetData()}/>
        </div>
        <div className="githubcard">
            <div className="profile_pic">
                <img src= {data.avatar_url} />
            </div>
            <div className="stats">
                <div className="id">{data.login}
                <a href={data.html_url} target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M227.7 11.7c15.6-15.6 40.9-15.6 56.6 0l216 216c15.6 15.6 15.6 40.9 0 56.6l-216 216c-15.6 15.6-40.9 15.6-56.6 0l-216-216c-15.6-15.6-15.6-40.9 0-56.6l216-216zm87.6 137c-4.6-4.6-11.5-5.9-17.4-3.5s-9.9 8.3-9.9 14.8v56H224c-35.3 0-64 28.7-64 64v48c0 13.3 10.7 24 24 24s24-10.7 24-24V280c0-8.8 7.2-16 16-16h64v56c0 6.5 3.9 12.3 9.9 14.8s12.9 1.1 17.4-3.5l80-80c6.2-6.2 6.2-16.4 0-22.6l-80-80z"/></svg></a>

                </div>
                <div className="cols">
                    <div className="col followers">
                        <p>Followers</p>
                        {data.followers}
                    </div>
                    <div className="col following">
                        <p>Following</p>
                        {data.following}
                    </div>
                    <div className="col repos">
                        <p>Public Repos</p>
                        {data.public_repos}
                    </div>
                </div>
            </div>
        </div>
    </div>
}