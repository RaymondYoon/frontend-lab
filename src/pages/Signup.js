import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css"; // 스타일 적용

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nickname: "",
    birthdate: "",
    gender: "MALE",
    phoneNumber: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/auth/signup", formData);
      alert("회원가입 성공! 로그인 해주세요.");
      navigate("/login");
    } catch (error) {
      alert("회원가입 실패: " + (error.response?.data?.message || "오류 발생"));
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">회원가입</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="이메일" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="비밀번호" value={formData.password} onChange={handleChange} required />
        <input type="text" name="nickname" placeholder="닉네임" value={formData.nickname} onChange={handleChange} required />
        <input type="text" name="birthdate" placeholder="생년월일 (YYYYMMDD)" value={formData.birthdate} onChange={handleChange} required />
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="MALE">남성</option>
          <option value="FEMALE">여성</option>
        </select>
        <input type="text" name="phoneNumber" placeholder="전화번호" value={formData.phoneNumber} onChange={handleChange} required />
        <button type="submit" className="auth-button">회원가입</button>
      </form>
    </div>
  );
};

export default Signup;
