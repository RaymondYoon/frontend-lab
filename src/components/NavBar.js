import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

const NavBar = () => {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get("/auth/userinfo");
        setNickname(response.data.nickname); // ✅ 닉네임 설정
      } catch (error) {
        console.error("사용자 정보를 불러오지 못했습니다.", error);
      }
    };

    if (localStorage.getItem("token")) {
      fetchUserInfo();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ 토큰 삭제
    setNickname(""); // ✅ 닉네임 초기화
    window.location.reload(); // ✅ 새로고침
  };

  return (
    <nav>
      <Link to="/">홈</Link>
      {nickname ? (
        <>
          <span>안녕하세요, {nickname}님!</span>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      ) : (
        <>
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
