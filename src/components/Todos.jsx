import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";
import { useLocalStorage } from '../hooks/useLocalStorage';



const Todos = () => {
    const [newTodo,setNewTodo] = useState('')
    const [todos, setTodos] = useLocalStorage("todos", []);
    const [filteredTodo,setFilteredTodo] = useState([])
    const [activeBtn,setActiveBtn] = useState('all')
    const inputRef = useRef()


    // const setUpdatedTodoToLocalStorage = (updatedTodos)=>{
    //     localStorage.setItem('todos',JSON.stringify(updatedTodos))
    // }
    useEffect(()=>{
        handleFilterTodos(activeBtn)
    },[todos])

    const handleAddNewTodo = () =>{
        const todoId =uuidv4()
        const todo = {
            id:todoId,
            title:newTodo,
            completed:false
        }
        const updatedTodos = [...todos,todo]
        setTodos(updatedTodos)
        setNewTodo('')
        inputRef.current.focus()
        // setUpdatedTodoToLocalStorage(updatedTodos)
    }

    const handleTodoMarkAsDone = (id)=>{
        const updatedTodos = todos.map(todo=>(
            todo.id===id?{...todo,completed:!todo.completed}:todo                   
        ))
        setTodos(updatedTodos)
        // setUpdatedTodoToLocalStorage(updatedTodos)
    }

    const removeTodo = (id)=>{
        const updatedTodos = todos.filter(todo=>todo.id!==id)
        setTodos(updatedTodos)
        // setUpdatedTodoToLocalStorage(updatedTodos)
    }

    const handleFilterTodos = (filter)=>{
        setActiveBtn(filter)
        if(filter==='all'){
            setFilteredTodo(todos)
        }else if(filter==='completed'){
            const completedTodos = todos.filter(todo=>todo.completed)
            setFilteredTodo(completedTodos)
        }else{
            const pendingTodos = todos.filter(todo=>!todo.completed)
            setFilteredTodo(pendingTodos)
        }
    }

  return (
    <div>
      <h1 className='bg-green-300 text-2xl text-center'>Your Todos</h1>
      <div>
        {/* Add new todo section */}
        <div className='m-2 flex gap-2 justify-between'>
            <input
             type="text"
             ref={inputRef}
             value={newTodo}
             placeholder='Write the content here'
             onChange={(e)=>setNewTodo(e.target.value)}
             onKeyDown={(e)=>{e.key==='Enter'&&handleAddNewTodo()}}
             className='border-1 border-gray-500 p-1 rounded w-full'
            />
            {newTodo===''
            ?
                <button className='px-4 py-1 bg-gray-400 rounded-md w-[30%] lg:w-[10%]' title='Please write something for add todo' disabled>
                    ❌
                </button>
            :
                <button
                 className='px-4 py-1 bg-green-400 rounded-md w-[30%] lg:w-[10%]'
                 onClick={handleAddNewTodo} 
                >
                    Add Todo
                </button>
            }
        </div>

        {/* For rendering the todo list */}
        <div className='bg-amber-100'>
            {
                todos.length?<div className='flex justify-between px-6 gap-1 text-xs
                bg-blue-200 p-1'>
                    <div className='flex gap-1'>
                        <button className={`px-2 py-[1px] border-1 border-blue-700 rounded-2xl ${activeBtn==='all'&&'bg-blue-700 text-white'} hover:bg-blue-500 hover:text-white cursor-pointer`}
                            onClick={()=>handleFilterTodos('all')}
                        >All</button>
                        <button className={`px-2 py-[1px] border-1 border-blue-700 rounded-2xl ${activeBtn==='completed'&&'bg-blue-700 text-white'} hover:bg-blue-500 hover:text-white cursor-pointer`}
                            onClick={()=>handleFilterTodos('completed')}
                        >Completed</button>
                        <button className={`px-2 py-[1px] border-1 border-blue-700 rounded-2xl ${activeBtn==='pending'&&'bg-blue-700 text-white'} hover:bg-blue-500 hover:text-white cursor-pointer`}
                            onClick={()=>handleFilterTodos('pending')}
                        >Pending</button>
                    </div>
                    <div>
                    <div className='text-xs text-center text-gray-600 py-1'>
                        Showing <strong>{filteredTodo.length}</strong> of <strong>{todos.length}</strong> todos
                    </div>
                    </div>
                </div>:''
            }
            {!filteredTodo.length?
                <div className='text-center font-extralight text-sm p-4'>
                {!todos.length
                    ? 'No Todos Found. Please add one.'
                    : `No ${activeBtn} todos found.`}
                </div>
            :
                filteredTodo.map((todo,idx)=>{
                    return(
                        <Todo key={todo.id+idx} idx={idx} handleTodoMarkAsDone={handleTodoMarkAsDone} removeTodo={removeTodo} todo={todo}/>
                    )
                })
            }
        </div>
      </div>
    </div>
  )
}

const Todo = ({todo,idx,handleTodoMarkAsDone,removeTodo})=>{
    return(
        <div className='px-4 py-2 border-1 border-b-black flex justify-between'>
            <div className='flex gap-2'>
                <span>{idx+1}.</span>
                {
                    todo.completed?
                    <label htmlFor={todo.id} className='text-gray-400 line-through'>{todo.title}</label>
                    :
                    <label htmlFor={todo.id}>{todo.title}</label>
                }
            </div>
            <div className='flex items-center gap-2'>
                <input id={todo.id} type="checkbox"              
                 className='cursor-pointer w-4'
                 checked={todo.completed}
                 onChange={()=>handleTodoMarkAsDone(todo.id)} 
                />
                <MdDelete className='w-5 h-5' onClick={()=>removeTodo(todo.id)} />
            </div>
        </div>
    )
}

export default Todos
