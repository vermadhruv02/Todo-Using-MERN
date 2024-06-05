import React, { useEffect, useRef, useState } from "react";
import "./Task.css";
import Form from "../Form/Form";
import axios from "axios";

function Task() {
  const url =
    // "https://todo-using-mern-backend.onrender.com" ||
    "http://localhost:4001";
  const [tasks, setTasks] = useState([]);
  const editTask = useRef(null);
  const editDate = useRef(null);

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
      <div className="taskHolder">
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Date</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((obj, idx) => {
              // console.log(obj.dueDate.split('T')[0]);
              let diff = dateDifference(obj.dueDate);
              return (
                <tr id="task" key={idx}>
                  <td>{obj.task}</td>
                  <td>{obj.dueDate.split("T")[0]}</td>
                  <td className={" " + (diff >= 0 ? "green" : "red")}>
                    {diff >= 0 ? `${diff} days left` : `${diff * -1} days ago`}
                  </td>
                  <td
                    className="edit"
                    onClick={() => {
                      handleEdit(obj._id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="100"
                      height="100"
                      stroke="currentColor"
                      viewBox="0 0 30 30"
                    >
                      <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
                    </svg>
                  </td>
                  <td
                    onClick={() => {
                      deleteTask(obj._id);
                    }}
                    className="red delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Task;
