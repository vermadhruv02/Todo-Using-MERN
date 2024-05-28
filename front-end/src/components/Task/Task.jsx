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

    return dayDifference-1;
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
          {/* <th>Edit</th> */}
          <th>delete</th>
        </tr>

        {tasks.map((obj, idx) => {
          // console.log(obj.dueDate.split('T')[0]);
          let diff =  dateDifference(obj.dueDate);
          return <tr id="task" key={idx}>
            <td>{obj.task}</td>
            <td>{obj.dueDate.split('T')[0]}</td>
            <td className={' '+ (diff>=0 ? 'green' : 'red' )}>{(diff >= 0 ? `${diff} days left` : `${diff*(-1)} days ago`)}</td>
            {/* <td>Edit</td> */}
            <td onClick={()=>{deleteTask(obj._id)}} className='red' >delete</td>
          </tr>
        })}
      </table>
    </div>
    </>
  );
}

export default Task;
