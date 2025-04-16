import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const ChatListPage = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/chat/rooms")
      .then(res => setChatRooms(res.data))
      .catch(err => console.error("채팅방 목록 조회 실패:", err));
  }, []);

  const handleEnterChat = (roomId) => {
    navigate(`/chat/room/${roomId}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>💬 채팅 목록</h2>
      {chatRooms.length === 0 ? (
        <p>참여한 채팅방이 없습니다.</p>
      ) : (
        chatRooms.map(room => (
          <div key={room.roomId} style={{ marginBottom: "15px" }}>
            <strong>{room.otherNickname}</strong><br />
            <span>{room.lastMessage}</span><br />
            {room.unreadCount > 0 && (
              <span style={{ color: "red" }}>{room.unreadCount}개의 안 읽은 메시지</span>
            )}
            <button onClick={() => handleEnterChat(room.roomId)} style={{ marginLeft: "10px" }}>
              입장
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatListPage;
