import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

// ✅ 공통 API 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ JWT 토큰을 자동으로 포함하는 함수
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
