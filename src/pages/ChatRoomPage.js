import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import api from "../api/api";

let stompClient = null;

const ChatRoomPage = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const [nickname, setNickname] = useState("");
  const messageEndRef = useRef();

  useEffect(() => {
    // 사용자 닉네임 가져오기
    api.get("/auth/userinfo").then(res => setNickname(res.data.nickname));

    // 채팅 메시지 불러오기
    api.get(`/chat/room/${roomId}/messages`)
      .then(res => setMessages(res.data))
      .catch(err => console.error(err));

    // WebSocket 연결
    connectSocket();

    // 언마운트 시 연결 종료
    return () => {
      if (stompClient) stompClient.deactivate();
    };
  }, []);

  const connectSocket = () => {
    const token = localStorage.getItem("token");
    const socket = new SockJS(`http://localhost:8080/ws-chat?token=${token}`);

    stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        stompClient.subscribe("/topic/chat", (message) => {
          const msg = JSON.parse(message.body);
          if (msg.roomId.toString() === roomId.toString()) {
            setMessages(prev => [...prev, msg]);
          }
        });
      },
      debug: (str) => console.log("[STOMP DEBUG]", str),
    });

    stompClient.activate();
  };

  const sendMessage = () => {
    if (!inputMsg.trim()) return;
    stompClient.publish({
      destination: "/app/chat/message",
      body: JSON.stringify({
        roomId: roomId,
        message: inputMsg
      }),
    });
    setInputMsg("");
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>실시간 채팅방</h2>
      <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "20px" }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.senderNickname === nickname ? "right" : "left",
              marginBottom: "10px"
            }}
          >
            <strong>{msg.senderNickname}</strong>
            <p style={{ display: "inline-block", padding: "8px", borderRadius: "8px", background: "#f0f0f0" }}>
              {msg.message}
            </p>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <input
        type="text"
        value={inputMsg}
        onChange={(e) => setInputMsg(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="메시지를 입력하세요"
        style={{ width: "80%", marginRight: "10px" }}
      />
      <button onClick={sendMessage}>전송</button>
    </div>
  );
};

export default ChatRoomPage;
