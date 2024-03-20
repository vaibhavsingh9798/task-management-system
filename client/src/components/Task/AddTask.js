import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const AddTask = ({mode}) =>{

    const [task,setTask] = useState({title:'',description:'',dueData:new Date()})
    const [error,setError] = useState('')
    const URL = `http://localhost:8000/api`


    const navigate = useNavigate()
     const {taskId} = useParams() || null;
   
    const handleChange =  (e)=>{
        setExpense({...task,[e.target.name]:e.target.value})
        setError('')
    }

    const handleSubmit = async (e) =>{
         e.preventDefault();
         if(task.title && task.description && task.dueData){
            if(mode == 'add'){
               try{
                let response = await fetch(`${URL}/task`,{
                  method:'POST',
                  body: JSON.stringify(task),
                  headers:{'Content-Type':'application/json'}
                })
                if(response){
                    alert('expense added')
                    // navigate('/tasks')
                }else{
                  throw new Error('something wrong with add expense')
                }
               }catch(error){
                setError(error)
               }

            }else{

              try{
                let response = await fetch(`${URL}/task/${taskId}`,{
                  method:'PUT',
                  body: JSON.stringify(task),
                  headers:{'Content-Type':'application/json'}
                })
                if(response){
                    alert('task updated')
                   // navigate('/tasks')
                }else{
                  throw new Error('something wrong with update expense')
                }

              }catch(error){
               setError(error)
              }

            }
         }else{
          setError('Invalid Input Data!')
         }

         setTask({title:'',description:'',dueData:''})
    }

     useEffect(()=>{
      if(mode == 'update'){
      let task = tasks.filter((task) => task.id === taskId)
       setTask(task[0])
      
      }
     },[])

    return(
        <div className={`flex justify-center items-center h-screen bg-slate-800 text-slate-400`}>
        <form className={` shadow-md  rounded-lg px-8 pt-6 pb-8 mb-4 w-96 bg-slate-800`} onSubmit={handleSubmit}>
          
          <h2 className="text-3xl font-bold mb-6 text-center">{mode === 'add' ? 'Add Task' : 'Update Task'} </h2>
        
          <div className="mb-4">
            <label className="block  text-sm font-bold mb-2" htmlFor="title">
             Title
            </label>
            <input
              className="shadow  appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline "
              name="title"
              type="text"
              placeholder="Title"
              value={task.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block  text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              name="description"
              type="text"
              placeholder="Description"
              value={task.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block  text-sm font-bold mb-2" htmlFor="dueDtate">
              dueDtate
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              name="dueDtate"
              type="date"
              placeholder="dueDtate"
              value={task.dueData}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
           {mode === 'add' ? 'Add' : 'Update'} 
            </button>
          </div>
          <div className='mt-4'>
          {error && <p className='text-red-500 mt-2'>{error}</p>}
          </div>
         
        </form>
      </div>
    )
}

export default AddTask;