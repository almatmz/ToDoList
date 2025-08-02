# 📝 To-Do List Web Application

This is a full-stack **To-Do List** web application built with **React (frontend)** and **Node.js + Express + PostgreSQL (backend)**. The application allows users to register, log in, and manage their personal tasks securely using JWT authentication.

---

## 📂 Project Structure

To-Do-List/

├── to-do-list-backend/ # Node.js backend with Express & PostgreSQL

└── todo-frontend/ # React frontend using Axios & React Router

## ⚙️ Backend

### 🧱 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT for Authentication
- bcrypt for Password Hashing

### 🔐 Features

- User registration and login
- JWT-based authentication middleware
- Task CRUD operations (Create, Read, Update, Delete)
- PostgreSQL database integration

💻 Frontend

🧱 Tech Stack

- React.js

- Axios

- React Router DOM

- Custom CSS

🌟 Features

- Register and login pages

- Authentication token stored in localStorage

- View, add, update, delete tasks

- Logout functionality

- Responsive and clean UI

📮 API Endpoints
Auth

- POST /api/auth/register – Register new user

- POST /api/auth/login – Login and receive JWT token

Tasks (protected)

- GET /api/tasks – Get all tasks for logged-in user

- POST /api/tasks – Add new task

- PUT /api/tasks/:id – Update task title or status

- DELETE /api/tasks/:id – Delete a task

✅ To-Do Features

- Register/Login functionality

- Secure token-based authentication

- Create, edit, and delete tasks

- Logout

- Clean UI/UX design

## 🌐 Live Website

👉 **Try it now:**  
[https://to-do-list-one-flax-62.vercel.app](https://to-do-list-one-flax-62.vercel.app)

> You can register, log in, and start managing your personal task list.
