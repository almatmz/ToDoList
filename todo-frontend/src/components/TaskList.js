import React, { useEffect, useState } from "react";
import API from "../api";
import "../App.css";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      alert("Failed to fetch tasks");
    }
  };

  const handleAddTask = async () => {
    if (!taskText) return;
    try {
      await API.post("/tasks", { title: taskText });
      setTaskText("");
      fetchTasks();
    } catch (err) {
      alert("Failed to add task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setEditedText(task.title);
  };

  const handleUpdate = async (id) => {
    try {
      await API.put(`/tasks/${id}`, { title: editedText });
      setEditingTaskId(null);
      setEditedText("");
      fetchTasks();
    } catch (err) {
      alert("Failed to update task");
    }
  };

  const handleToggleCompleted = async (task) => {
    try {
      await API.put(`/tasks/${task.id}`, {
        title: task.title,
        completed: !task.completed,
      });
      fetchTasks();
    } catch (err) {
      alert("Failed to toggle completion");
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
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button onClick={() => handleUpdate(task.id)}>Save</button>
                <button onClick={() => setEditingTaskId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span onClick={() => handleToggleCompleted(task)}>
                  {task.title}
                </span>
                <div>
                  <button onClick={() => handleEdit(task)}>Edit</button>
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
