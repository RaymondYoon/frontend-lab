import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreatePost from './CreatePost';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error("Error fetching posts:", error));
  }, []);

  const addPost = (newPost) => {
    axios.post('http://localhost:8080/posts', newPost)
      .then(response => setPosts(prevPosts => [response.data, ...prevPosts]))
      .catch(error => console.error("Error adding post:", error));
  };

  const deletePost = (id) => {
    axios.delete(`http://localhost:8080/posts/${id}`)
      .then(() => setPosts(prevPosts => prevPosts.filter(post => post.id !== id)))
      .catch(error => console.error("Error deleting post:", error));
  };

  return (
    <div className="App">
      <nav className="nav-links">
        <Link to="/login">로그인</Link>
        <Link to="/signup">회원가입</Link>
      </nav>

      <h1 className="board-title">게시판</h1>

      <CreatePost addPost={addPost} />

      <div className="posts-container">
        {posts.length > 0 ? posts.map(post => (
          <div key={post.id} className="post-item">
            <h2>
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </h2>
            <p>{post.content.substring(0, 100)}...</p>
            <button onClick={() => deletePost(post.id)} style={{ marginTop: '10px' }}>
              삭제
            </button>
          </div>
        )) : <p>게시글이 없습니다.</p>}
      </div>
    </div>
  );
};

export default Home;
