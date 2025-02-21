import React, { useState } from 'react';

const CreatePost = ({ addPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
      <h2>새 게시글 작성</h2>
      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <textarea
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        style={{ width: '100%', padding: '10px', height: '100px', marginBottom: '10px' }}
      />
      <button type="submit" style={{ padding: '10px 20px' }}>게시글 등록</button>
    </form>
  );
};

export default CreatePost;
