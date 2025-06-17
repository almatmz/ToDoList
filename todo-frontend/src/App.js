import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={loggedIn ? <TaskList /> : <Navigate to="/login" />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login onLogin={() => setLoggedIn(true)} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
