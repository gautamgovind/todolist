import React, { useState, useRef } from 'react';
import './Todo.css';

const Todo = () => {
  const myInput = useRef();
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [ todo, setTodo ] = useState('');
  const [todolist, setTodoList] = useState([]);
  const [completedasks, setCompletedasks] = useState(0);

  const addToList = ()=> {
    const id = todolist.length+1;
    setTodoList((prev)=>[
      ...prev,
      {
        id,
        task: todo,
        complete: false
      }
    ]);
    setTodo('');
    myInput.current.focus();
    console.log("LIST", todolist);
  }

  const removeItem = (e, item)=>{
    const newList = todolist.filter(listItem=> listItem.task!== item);
    setTodoList(newList);
  }

  const taskComplete = (e, item)=>{
    const newlist = [...todolist]
    newlist.map(listItem=>{
      if(listItem.id=== item.id) {
        if(e.target.checked) {
          listItem.complete = true;
          setCompletedasks(completedasks+1)
        }
        else {
          listItem.complete = false;
          setCompletedasks(completedasks-1)
        }
      }
    });
    console.log(e.target.checked, item, newlist)
    setTodoList(newlist)
  }

  const dragStart = (e, position)=>{
    dragItem.current = position;
    console.log(e.target.innerHTML)
  }

  const dragEnter = (e, position)=>{
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  }

  const drop = (e)=>{
    const copyOfList = [...todolist];
    const dragItemContent = copyOfList[dragItem.current];
    copyOfList.splice(dragItem.current, 1);
    copyOfList.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setTodoList(copyOfList);
  }
  
  return (
    <div>
      <h2>
        <span>Total Tasks: {todolist.length}</span>
        <span>Completed Tasks: {completedasks}</span>
        <span>Incomplete Tasks: {todolist.length - completedasks}</span>
      </h2>
      <div className='add-method-container'>
        <input type="text" placeholder='todo goes here..' value={todo} ref={ myInput } onChange={(e)=>setTodo(e.target.value)} />
        <button onClick={ addToList }>Add to List</button>
      </div>

      <ul className='todo-list list-container'>
        {todolist && todolist.map((item, index)=>(
          <li 
            className= {item.complete ? 'task-completed': 'task-incomplete'}
            key={index}
            draggable
            onDragStart={e=>dragStart(e, index)}
            onDragEnter={e=>dragEnter(e, index)}
            onDragEnd={drop}
          >
            <input type="checkbox" id={item.id} onClick={(e)=>taskComplete(e, item)} />
            <label htmlFor={item.id}>{item.task}</label>
            <label className='remove-item' onClick={(e)=>removeItem(e,item.task)}>X</label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todo;