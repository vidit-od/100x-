export default function Count({count,setCount}){
    return <div style={{margin:'20px',padding:'10px',backgroundColor:'white', color:'black', borderRadius:'10px'}}>
        <input type="button" value="<<" onClick={()=>setCount(count-1)}/> 
        {count}
        <input type="button" value=">>" onClick={()=>setCount(count+1)}/>
    </div>
}