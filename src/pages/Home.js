import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import "../styles/Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts")
      .then(response => setPosts(response.data))
      .catch(error => console.error("게시글을 불러오지 못했습니다.", error));
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
      </div>

      {/* ✅ 푸터 유지 */}
      <footer className="footer">
        <p>LAB | 이용약관 | 개인정보처리방침 | 서비스 운영정책</p>
        <p>Copyright © LAB Corp. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
