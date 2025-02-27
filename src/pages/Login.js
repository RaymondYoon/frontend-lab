import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/Auth.css";

const Login = ({ setNickname }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", formData);
      localStorage.setItem("token", response.data.token); // ✅ 토큰 저장
      alert("로그인 성공!");

      // ✅ 로그인 후 사용자 정보 가져오기
      const userResponse = await api.get("/auth/userinfo", {
        headers: { Authorization: `Bearer ${response.data.token}` }
      });

      setNickname(userResponse.data.nickname); // ✅ 상태 즉시 업데이트
      navigate("/");
    } catch (error) {
      alert("로그인 실패: " + (error.response?.data?.message || "오류 발생"));
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">로그인</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="이메일" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="비밀번호" value={formData.password} onChange={handleChange} required />
        <button type="submit" className="auth-button">로그인</button>
      </form>
    </div>
  );
};

export default Login;
