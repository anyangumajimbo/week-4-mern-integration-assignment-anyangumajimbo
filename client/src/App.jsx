import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Posts from "./pages/Posts";

function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4">
          <Link to="/posts" className="text-blue-600 hover:underline">
            View Posts
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<p>Welcome to the MERN Blog App. Click "View Posts" to get started.</p>} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
