import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get(`http://localhost:8080/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setPost(response.data);
      })
      .catch(() => {
        setError('게시글을 불러오는데 실패했습니다.');
      });
  }, [id]);

  if (!post) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="post-details">
      <h1>
        {post.title} <span style={{ fontSize: '1rem', color: 'white' }}>({post.nickname})</span>
      </h1>
      <p>{post.content}</p>
    </div>
  );
};

export default Post;
