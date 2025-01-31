"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // 기본값: 일반 사용자
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch("/auth/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }), // role 필드 추가
      });

      if (res.ok) {
        setMessage(`${role === "admin" ? "운영자" : "사용자"} 계정 생성 성공!`);
        setUsername("");
        setPassword("");
        setRole("user"); // 기본값으로 리셋
      } else {
        const error = await res.json();
        setMessage(`회원가입 실패: ${error.message}`);
      }
    } catch (err) {
      setMessage(`네트워크 오류: ${err.message}`);
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
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
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">사용자</option>
        <option value="admin">운영자</option>
      </select>
      <br />
      <button onClick={handleRegister}>회원가입</button>
      {message && <p>{message}</p>}
    </div>
  );
}
