import  { useState } from 'react'
import axios from 'axios'
// import './Form.css';

function Form({displayNewTask} ) {
  
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');

  const url = 
  import.meta.env.VITE_API_URL || 
  'http://localhost:3000';
  console.log(url);
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
  <div className="form flex items-center justify-center min-h-[200px]">
    <form className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
      <div className="innerForm flex flex-col gap-4">
        <input
          type="text"
          placeholder="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <input
          type="submit"
          value="Add Task"
          onClick={addTask}
          className="bg-blue-500 text-white font-semibold rounded-md px-4 py-2 hover:bg-blue-600 transition cursor-pointer"
        />
      </div>
    </form>
  </div>
)
}


export default Form
