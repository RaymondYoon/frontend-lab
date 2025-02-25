import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import CreatePost from "../components/CreatePost";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    // 게시글 목록 불러오기
    api.get("/posts")
      .then(response => setPosts(response.data))
      .catch(error => console.error("게시글을 불러오지 못했습니다.", error));

    // 로그인한 사용자 정보 불러오기
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

  // ✅ 게시글 추가 함수 정의
  const addPost = async (newPost) => {
    try {
      const response = await api.post("/posts", newPost);
      setPosts(prevPosts => [response.data, ...prevPosts]); // 새 게시글 추가
    } catch (error) {
      console.error("게시글 추가 실패:", error);
    }
  };

  return (
    <div>
      <h1>게시판</h1>
      {nickname && <h2>안녕하세요, {nickname}님!</h2>}

      {/* ✅ addPost를 CreatePost에 전달 */}
      <CreatePost addPost={addPost} />

      <div>
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id}>
              <h2>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </h2>
              <p>{post.content.substring(0, 100)}...</p>
            </div>
          ))
        ) : (
          <p>게시글이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
