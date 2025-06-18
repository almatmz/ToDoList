import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setTasks(res.data);
  };

  const handleAddTask = async () => {
    if (!taskText) return;
    await axios.post(
      "http://localhost:5000/tasks",
      { text: taskText },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    setTaskText("");
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="task-container">
      <h2>My Tasks</h2>
      <div className="task-input">
        <input
          type="text"
          value={taskText}
          placeholder="Enter new task"
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <ul className="task-list">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>

        {tasks.map((task) => (
          <li key={task.id}>
            {task.text}{" "}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
