const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
require("dotenv").config();

app.use(express.json());

const cors = require("cors");
app.use(
  cors({
    origin: "https://to-do-list-kohl-one.vercel.app",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

module.exports = app;
