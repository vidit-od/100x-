export function Logout({onLogout}){
    function logout(){
        if(typeof onLogout === 'function'){
            onLogout();
        }
        localStorage.removeItem('token');
    }
    return<div>
        <input type="button" value="logout" onClick={logout}/>
    </div>
}