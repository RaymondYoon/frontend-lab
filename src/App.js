// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreatePostPage from "./pages/CreatePostPage";
import { initFireworks } from "./utils/fireworks"; // 🎇 추가
import "./styles/App.css";

function App() {
  useEffect(() => {
    initFireworks(); // 앱이 실행될 때 한 번만 호출
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-post" element={<CreatePostPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
