import React, { useEffect, useState } from "react";
import "./Task.css";
import Form from "../Form/Form";
import axios from "axios";

function Task() {

  const url = "http://localhost:3000";
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getAllTasks();
  }, []);

  // TO GET ALL THE TASKS FROM DB
  const getAllTasks = () => {
    axios
      .get(`${url}/allTask`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((err) => {
        console.log(`Get all task Error: ${err}`);
      });
  };
  // TO DISPLAY NEWLY ADDED TASK
  const displayNewTask = (newTask)=>{
    setTasks((prevTask) => [...prevTask , newTask])
  }

  const deleteTask = (id)=>{
    console.log('delete task called');
    // console.log(id);
    axios.delete(`${url}/delete/${id}`)
    .then(()=>{
      setTasks((prevTask) => prevTask.filter(data =>( data._id !== id)))
    })
    .catch(err => console.log(err));
  }
  function dateDifference( date2) {
    // Parse the date strings into Date objects
    const d1 = new Date();
    const d2 = new Date(date2);

    // Calculate the time difference in milliseconds
    const timeDifference = d2 - d1;

    // Convert the time difference from milliseconds to days
    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return dayDifference;
}

  return (
    <>
    <Form displayNewTask={displayNewTask}/>
    <div className="taskHolder">
      <table>
        <tr>
          <th>Task</th>
          <th>Date</th>
          <th>Status</th>
          <th>Edit</th>
          <th>delete</th>
        </tr>

        {tasks.map((obj, idx) => {
          // console.log(obj.dueDate.split('T')[0]);
          let diff =  dateDifference(obj.dueDate);
          return <tr id="task" key={idx}>
            <td>{obj.task}</td>
            <td>{obj.dueDate.split('T')[0]}</td>
            <td className={' '+ (diff>=0 ? 'green' : 'red' )}>{(diff >= 0 ? `${diff} days left` : `${diff*(-1)} days ago`)}</td>
            <td>Edit</td>
            <td onClick={()=>{deleteTask(obj._id)}} className='red delete' >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
            </td>
          </tr>
        })}
      </table>
    </div>
    </>
  );
}

export default Task;
