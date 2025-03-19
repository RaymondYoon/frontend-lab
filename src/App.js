import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreatePostPage from "./pages/CreatePostPage";
import Header from "./components/Header";
import PaymentSuccess from "./pages/PaymentSuccess";
import { initFireworks } from "./utils/fireworks"; 
import "./styles/App.css";

function App() {
  const [nickname, setNickname] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // ✅ 사용자 정보 가져오기 (로그인/로그아웃 반영)
  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/userinfo", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      if (response.ok) {
        const data = await response.json();
        setNickname(data.nickname);
      } else {
        setNickname(""); // 로그아웃 시 상태 초기화
      }
    } catch (error) {
      console.error("사용자 정보를 불러오지 못했습니다.", error);
      setNickname(""); // 오류 발생 시 상태 초기화
    }
  };

  useEffect(() => {
    initFireworks(); // ✅ 폭죽 효과 실행
    fetchUser(); // ✅ 로그인 정보 가져오기

    // ✅ 다크 모드 설정 불러오기
    const darkModePref = localStorage.getItem("darkMode");
    if (darkModePref === "enabled") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDarkMode ? "disabled" : "enabled");
  };

  return (
    <Router>
      <div className={`app-container ${isDarkMode ? "dark-mode" : ""}`}>
        <Header nickname={nickname} setNickname={setNickname} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setNickname={setNickname} />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
