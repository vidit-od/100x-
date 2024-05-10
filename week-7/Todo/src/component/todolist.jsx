import { selector, useRecoilValue,useSetRecoilState } from "recoil"
import { todos, filter, filterSelector } from "../store/atom/todos"

export function Todolist(){
    let todo = useRecoilValue(filterSelector);
    const setFilter = useSetRecoilState(filter); 
    
    return <div className="todo-list">
        <div className="heading">
            <p>Todo List</p>
            <input type="text" name="" id="" placeholder="filter" onChange={(e)=>setFilter(e.target.value)}/>
        </div>
        <div className="content">
        {todo.map((item,index)=>{
            return <div key={index} className="item">
                <div className="first">
                    <p>{index}</p>
                </div>
                <div className="second">
                    <div className="field">
                        <p>Title</p>
                        {item.title}
                    </div>
                    <div className="field">
                        <p>Description</p>
                        {item.description}
                    </div>
                </div>
            </div>
        })}
        </div>
    </div>
}