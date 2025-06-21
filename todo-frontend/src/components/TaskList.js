import React, { useEffect, useState } from "react";
import API from "../api";
import "../App.css";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/api/tasks");
      setTasks(res.data);
    } catch (err) {
      alert("Failed to fetch tasks");
    }
  };

  const handleAddTask = async () => {
    if (!taskText) return;
    try {
      await API.post("/api/tasks", { text: taskText });
      setTaskText("");
      fetchTasks();
    } catch (err) {
      alert("Failed to add task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      alert("Failed to delete task");
    }
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
            {task.text}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
