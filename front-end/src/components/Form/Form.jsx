import React, { useState } from 'react'
import axios from 'axios'
import './Form.css';

function Form({displayNewTask} ) {
  
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');

  const url ="https://todo-using-mern-backend.onrender.com" ||  'http://localhost:3000'
  
  const addTask = (e)=>{
    e.preventDefault();

    console.log(task + date);
    axios.post(`${url}/addTask`, {task, date})
    .then( (res)=>{
      // console.log(`RESPONSE: ${res}`);
      displayNewTask(res.data);
      setTask('');
      setDate('');
    }).catch( err => {
      console.log(`ERROR: ${err}`);
    })
  };
  
  return (
    <div className='form'>
        <form  >
          <div className="innerForm">
            <input type="text" placeholder='task'  value={task} onChange={(e)=>{setTask(e.target.value)}} required/>
            <input type="date" value={date} onChange={(e)=>{setDate(e.target.value)}} required/>
            <input type="submit" value="Add Task" onClick={addTask}/>
            </div>
        </form>
    </div>
  )
}


export default Form
