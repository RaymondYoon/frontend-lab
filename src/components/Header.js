import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = ({ nickname, setNickname, toggleDarkMode, isDarkMode }) => {
  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ 토큰 삭제
    setNickname(""); // ✅ 즉시 상태 반영
  };

  return (
    <header className={`header ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="header-left">
        <Link to="/" className="home-button">R</Link>
        <span className="nickname">{nickname ? nickname : "Guest"}</span>
      </div>
      <div className="header-right">
        <button onClick={toggleDarkMode} className="dark-mode-btn">
          {isDarkMode ? "☀️" : "🌙"}
        </button>
        {nickname ? (
          <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
        ) : (
          <>
            <Link to="/login" className="auth-btn">로그인</Link>
            <Link to="/signup" className="auth-btn">회원가입</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
