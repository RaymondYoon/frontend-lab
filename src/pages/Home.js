import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null); // ✅ 로그인한 사용자 ID

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ✅ 로그인한 사용자 정보 가져오기
    if (token) {
      axios.get("http://localhost:8080/auth/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => setUserId(response.data.id))
        .catch(error => console.error("사용자 정보를 불러오지 못했습니다.", error));
    }

    // ✅ 게시글 목록 가져오기
    axios.get("http://localhost:8080/posts")
      .then(response => setPosts(response.data))
      .catch(error => console.error("게시글을 불러오지 못했습니다.", error));
  }, []);

  const handlePayment = (postId) => {
    const token = localStorage.getItem("token");

    axios.post("http://localhost:8080/payment/request", { postId }, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        const { nextRedirectPcUrl } = response.data;
        window.location.href = nextRedirectPcUrl; // ✅ 카카오페이 결제창으로 이동
      })
      .catch(() => alert("결제 요청에 실패했습니다."));
  };

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

                  {/* ✅ 자기 글이 아니면서 미결제 상태인 경우만 결제 버튼 표시 */}
                  {userId && userId !== post.userId && !post.paid && (
                    <button 
                      onClick={() => handlePayment(post.id)}
                      className="pay-button"
                    >
                      결제하기
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p>게시글이 없습니다.</p>
            )}
          </div>
        </main>
      </div>

      <footer className="footer">
        <p>LAB | 이용약관 | 개인정보처리방침 | 서비스 운영정책</p>
        <p>Copyright © LAB Corp. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
