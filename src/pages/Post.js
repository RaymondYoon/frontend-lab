import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/posts/${id}`)
      .then(response => {
        setPost(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('게시글을 불러오는 데 실패했습니다.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="post-details">
      {post ? (
        <>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </>
      ) : (
        <div>게시글을 찾을 수 없습니다.</div>
      )}
    </div>
  );
};

export default Post;
