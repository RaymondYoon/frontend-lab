import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/CreatePostPage.css"; // ✅ 스타일 적용

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    try {
      await api.post("/posts", { title, content });
      alert("게시글이 등록되었습니다!");
      navigate("/");
    } catch (error) {
      console.error("게시글 추가 실패:", error);
      alert("게시글 작성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="create-post-container">
      <h1 className="create-post-heading">새 게시글 작성</h1>
      <form onSubmit={handleSubmit} className="create-post-form">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="create-post-input"
        />
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="create-post-textarea"
        />
        <button type="submit" className="create-post-button">게시글 등록</button>
      </form>
    </div>
  );
};

export default CreatePostPage;
