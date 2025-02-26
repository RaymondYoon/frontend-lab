import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import "../styles/Home.css"; // ✅ 스타일 적용

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    api.get("/posts")
      .then(response => setPosts(response.data))
      .catch(error => console.error("게시글을 불러오지 못했습니다.", error));

    const fetchUser = async () => {
      try {
        const response = await api.get("/auth/userinfo");
        setNickname(response.data.nickname);
      } catch (error) {
        console.error("사용자 정보를 불러오지 못했습니다.", error);
      }
    };

    if (localStorage.getItem("token")) {
      fetchUser();
    }
  }, []);

  return (
    <div className="container">
      <aside className="left-sidebar"></aside>

      <div className="content-wrapper">
        <main className="main-content">
          <h1 className="board-title">게시판</h1>
          <Link to="/create-post" className="create-post-button">새 게시글 작성</Link>
          
          <div className="posts-container">
            {posts.length > 0 ? (
              posts.map(post => (
                <div key={post.id} className="post-item">
                  <h2>
                    <Link to={`/post/${post.id}`} className="post-title">{post.title}</Link>
                  </h2>
                  <p>{post.content.substring(0, 100)}...</p>
                </div>
              ))
            ) : (
              <p>게시글이 없습니다.</p>
            )}
          </div>
        </main>

        <aside className="right-sidebar">
          <div className="login-box">
            {nickname ? (
              <>
                <p className="welcome-text">안녕하세요, {nickname}님!</p>
                <button onClick={() => {
                  localStorage.removeItem("token");
                  setNickname("");
                  window.location.reload();
                }} className="logout-button">로그아웃</button>
              </>
            ) : (
              <>
                <h2 className="login-title">로그인</h2>
                <Link to="/login" className="login-button">로그인</Link>
                <Link to="/signup" className="signup-button">회원가입</Link>
              </>
            )}
          </div>
        </aside>
      </div>

      {/* ✅ 푸터 추가 */}
      <footer className="footer">
        <p>LAB | 이용약관 | 개인정보처리방침 | 서비스 운영정책</p>
        <p>Copyright © LAB Corp. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
