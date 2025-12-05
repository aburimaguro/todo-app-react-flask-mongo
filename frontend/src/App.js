import { useState, useEffect } from "react";
import "./App.css";

const API = "http://127.0.0.1:5000";

function App() {
  const [screen, setScreen] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // -----------------------------
  // AUTH
  // -----------------------------
  const login = async () => {
    const res = await fetch(API + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) setScreen("tasks");
  };

  const register = async () => {
    await fetch(API + "/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    setScreen("login");
  };

  // -----------------------------
  // TASKS
  // -----------------------------
  const loadTasks = async () => {
    const res = await fetch(API + `/tasks?username=${username}`);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    if (screen === "tasks") loadTasks();
  }, [screen]);

  const addTask = async () => {
    await fetch(API + "/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, title: newTask }),
    });
    setNewTask("");
    loadTasks();
  };

  const toggleTask = async (t) => {
    await fetch(API + "/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        old_title: t.title,
        new_title: t.title,
        completed: !t.completed,
      }),
    });
    loadTasks();
  };

  const deleteTask = async (t) => {
    await fetch(API + "/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, title: t.title }),
    });
    loadTasks();
  };

  // -----------------------------
  // UI
  // -----------------------------
  if (screen === "login")
    return (
      <div className="card">
        <h2>Login</h2>
        <input placeholder="username" onChange={e => setUsername(e.target.value)} />
        <input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
        <button onClick={login}>Login</button>
        <button onClick={() => setScreen("register")}>Register</button>
      </div>
    );

  if (screen === "register")
    return (
      <div className="card">
        <h2>Create Account</h2>
        <input placeholder="username" onChange={e => setUsername(e.target.value)} />
        <input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
        <button onClick={register}>Register</button>
        <button onClick={() => setScreen("login")}>Back</button>
      </div>
    );

  return (
    <div className="app">
      <div className="task-container">
        <h2>{username}'s Tasks</h2>

        <div className="add-row">
          <input value={newTask} placeholder="New task..."
                 onChange={e => setNewTask(e.target.value)} />
          <button onClick={addTask}>Add</button>
        </div>

        <ul>
          {tasks.map(t => (
            <li key={t.title} className={t.completed ? "done" : ""}>
              <span onClick={() => toggleTask(t)}>{t.title}</span>
              <button className="delete-btn" onClick={() => deleteTask(t)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

