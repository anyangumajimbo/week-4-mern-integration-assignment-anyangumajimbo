import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Posts from "./pages/Posts";
import CreatePost from "./pages/create";
import EditPost from "./pages/edit";
import Auth from "./pages/Auth";

function App() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("username");
    if (token && user) {
      setUsername(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername("");
    navigate("/auth");
  };

  return (
    <div className="p-4">
      <nav className="mb-4 flex justify-between items-center">
        <div className="space-x-4">
          <Link to="/posts" className="text-blue-600 hover:underline">View Posts</Link>
          <Link to="/create" className="text-green-600 hover:underline">Create Post</Link>
        </div>

        <div>
          {username ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-700 text-sm">Hello, {username}</span>
              <button
                onClick={handleLogout}
                className="text-red-600 text-sm hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/auth" className="text-blue-600 text-sm hover:underline">
              Login / Register
            </Link>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<p>Welcome to the MERN Blog App. Click "View Posts" to get started.</p>} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
