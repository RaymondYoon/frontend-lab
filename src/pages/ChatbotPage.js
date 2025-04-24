import React, { useState } from "react";
import axios from "axios";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // ✅ 토큰 가져오기

      const res = await axios.post("http://localhost:8080/api/chatbot/ask", input, {
        headers: {
          "Content-Type": "text/plain",
          Authorization: `Bearer ${token}` // ✅ 인증 추가
        }
      });

      setMessages([...newMessages, { role: "assistant", content: res.data }]);
    } catch (error) {
      console.error("GPT 응답 실패", error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "죄송해요, GPT 서버 응답에 실패했어요." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <h2>GPT 챗봇</h2>
      <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", minHeight: "200px" }}>
        {messages.map((msg, idx) => (
          <p key={idx} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
            <strong>{msg.role === "user" ? "나" : "GPT"}:</strong> {msg.content}
          </p>
        ))}
        {loading && <p>GPT가 생각 중이에요...</p>}
      </div>

      <div style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="무엇이 궁금한가요?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{ width: "80%", padding: "0.5rem" }}
        />
        <button onClick={sendMessage} style={{ padding: "0.5rem", marginLeft: "0.5rem" }}>
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatbotPage;
