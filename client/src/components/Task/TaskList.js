import { useEffect, useState } from "react"
import  AddTask from "./AddTask"
import { NavLink, useNavigate} from "react-router-dom"


const Task = () =>{
  
    const URL = `http://localhost:8000/api`
    const [tasks,setTasks] = useState([])
    const navigate = useNavigate()
   

     const fetchTask = async () =>{
        let data;
        try{
          let response = await fetch(`${URL}/task`)
          if(response){
            data = await response.json()
            setTasks(data.response)
          }
        }catch(err){
            console.error(err);
        }
     }

     const handleDelete = async (e,task) =>{
        e.preventDefault();
      let id = task.id;
      try{
        let response = await fetch(`${URL}/task/${id}`,{
          method:'DELETE',
        })
        if(response){
          fetchTask()
        }
        else
        throw new Error('something wrong with delete!')
      }catch(error){
        console.error(error);
      }
     }

    useEffect(()=>{
        fetchTask()
    },[])

    const printTask = () =>{
      return(
        <div>
        <div className="flex  justify-center ">
          <table className={`table-auto border-separate border-spacing-20 border border-slate-500   `}>
            <thead>
              <tr>
              <th class="">Title</th>
              <th class="">Description</th>
              <th class="">dueDate</th>
             
              </tr>
            </thead>
            <tbody>
              {
                tasks.map((task,ind)=>{
                  
               return( <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.dueDtate}</td>
                    <td><NavLink to={`/expenses/update/${task.id}`}><button className="bg-blue-400 text-white font-bold rounded-md p-1">Edit</button></NavLink></td>
                    <td><button className="bg-red-600 text-white font-bold rounded-md p-1" onClick={(e)=>handleDelete(e,task)}>Delete</button></td>
                   </tr>
               )
                })
              }
            </tbody>
          </table>
        </div>
        <div className="flex justify-center">
      <NavLink to='/expenses/add'> <button  className="text-5xl font-bold text-green-700">+</button> </NavLink> 
        </div>
        </div>
      )
    }

    return(
        <div className={`g-green-30b0 h-screen `}>
         { printTask()}
        </div>
    )
}

export default Task;