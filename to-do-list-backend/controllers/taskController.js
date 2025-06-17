const pool = require("../config/db");

exports.getTasks = async (req, res) => {
  const userId = req.user.id;
  const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [
    userId,
  ]);
  res.json(result.rows);
};

exports.createTask = async (req, res) => {
  const userId = req.user.id;
  const { title } = req.body;
  const result = await pool.query(
    "INSERT INTO tasks (user_id, title) VALUES ($1, $2) RETURNING *",
    [userId, title]
  );
  res.status(201).json(result.rows[0]);
};

exports.updateTask = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { title, completed } = req.body;

  const result = await pool.query(
    "UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
    [title, completed, id, userId]
  );
  res.json(result.rows[0]);
};

exports.deleteTask = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  await pool.query("DELETE FROM tasks WHERE id = $1 AND user_id = $2", [
    id,
    userId,
  ]);
  res.json({ message: "Task deleted" });
};
