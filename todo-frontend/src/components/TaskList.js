import { useEffect, useState } from "react";
import API from "../api";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const loadTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const createTask = async () => {
    if (!text.trim()) return;
    await API.post("/tasks", { text });
    setText("");
    loadTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      <h2>Your Tasks</h2>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New task"
      />
      <button onClick={createTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
