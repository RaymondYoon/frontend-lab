import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:8080/auth/userinfo", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUserId(response.data.id))
        .catch((error) => console.error("사용자 정보를 불러오지 못했습니다.", error));
    }

    fetchPosts();
  }, []);

  const fetchPosts = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/posts",
      {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("게시글을 불러오지 못했습니다.", error));
  };

  const handlePayment = (postId) => {
    console.log("결제할 postId:", postId);

    const token = localStorage.getItem("token");

    axios
      .post(
        `http://localhost:8080/payment/request/${postId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log("결제 API 응답:", response.data); // 응답 확인

        const { tid, next_redirect_pc_url } = response.data; // 백엔드 응답 구조 확인 후 정확한 키 사용

        if (!next_redirect_pc_url || !tid) {
          console.error("응답 오류:", response.data);
          alert("결제 URL 또는 거래 ID가 없습니다.");
          return;
        }

        // tid 저장
        localStorage.setItem("tid", tid);

        // 결제창 열기
        window.open(next_redirect_pc_url, "_blank");

        // 일정 시간 후 게시글 상태 업데이트
        setTimeout(fetchPosts, 5000);
      })
      .catch((error) => {
        console.error("결제 요청 실패:", error.response ? error.response.data : error);
        alert("결제 요청에 실패했습니다.");
      });
};



  return (
    <div className="container">
      <aside className="left-sidebar"></aside>

      <div className="content-wrapper">
        <main className="main-content">
          <h1 className="board-title">게시판</h1>
          <Link to="/create-post" className="create-post-button">
            새 게시글 작성
          </Link>

          <div className="posts-container">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="post-item">
                  <h2>
                    <Link to={`/post/${post.id}`} className="post-title">
                      {post.title}
                    </Link>
                  </h2>
                  <p>{post.content.substring(0, 100)}...</p>

                  {userId && userId !== post.userId && !post.paidByUser && (
                    <button onClick={() => handlePayment(post.id)} className="pay-button">
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
