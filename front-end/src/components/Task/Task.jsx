import { useEffect, useState } from "react";
// import "./Task.css";
import Form from "../Form/Form";
import axios from "axios";

function Task() {
  const url =
  "http://localhost:3000";
    // "https://todo-using-mern-backend.onrender.com" ||
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
  const displayNewTask = (newTask) => {
    setTasks((prevTask) => [...prevTask, newTask]);
  };

  const deleteTask = (id) => {
    console.log("delete task called");
    axios
      .delete(`${url}/delete/${id}`)
      .then(() => {
        setTasks((prevTask) => prevTask.filter((data) => data._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const dateDifference = (date2) => {
    // Parse the date strings into Date objects
    const d1 = new Date();
    const d2 = new Date(date2);

    // Calculate the time difference in milliseconds
    const timeDifference = d2 - d1;

    // Convert the time difference from milliseconds to days
    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return dayDifference;
  };

  const handleEdit = (id) => {
    console.log("edit task called");
    alert("COMING SOON");
    // axios
    // .put(`${url}/update/${id}`, {task:"pari"})
    // .then(() => {setTasks((prevTask) => prevTask.filter((data) => data._id !== id));})
    // .catch(err => { console.log(`UPDATE ERR: ${err}`);})
  };

  return (
  <>
    <Form displayNewTask={displayNewTask} />
    <div className="taskHolder flex items-center justify-center mt-8">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="px-4 py-2 text-left">Task</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Edit</th>
              <th className="px-4 py-2 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((obj, idx) => {
              let diff = dateDifference(obj.dueDate);
              return (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{obj.task}</td>
                  <td className="px-4 py-2">{obj.dueDate.split("T")[0]}</td>
                  <td className="px-4 py-2">
                    <span className={
                      `inline-block px-3 py-1 rounded-full text-xs font-semibold ` +
                      (diff >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")
                    }>
                      {diff >= 0 ? `${diff} days left` : `${diff * -1} days ago`}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="text-blue-500 hover:text-blue-700 p-2 rounded transition"
                      onClick={() => handleEdit(obj._id)}
                      aria-label="Edit"
                    >
                      {/* SVG icon unchanged */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        stroke="currentColor"
                        viewBox="0 0 30 30"
                      >
                        <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
                      </svg>
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="text-red-500 hover:text-red-700 p-2 rounded transition"
                      onClick={() => deleteTask(obj._id)}
                      aria-label="Delete"
                    >
                      {/* SVG icon unchanged */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </>
);
}

export default Task;
