"use client";

import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("/auth/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();

        // 역할에 따라 다른 페이지로 이동
        if (data.role === "admin") {
          window.location.href = "/"; // 운영자 대시보드
        } else {
          window.location.href = "/"; // 일반 사용자 채팅 페이지
        }
      } else {
        const error = await res.json();
        setMessage(`로그인 실패: ${error.message}`);
      }
    } catch (err) {
      setMessage(`네트워크 오류: ${err.message}`);
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>로그인</button>
      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
}
