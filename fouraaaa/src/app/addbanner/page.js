"use client";
import { useState, useRef } from "react";
import { uploadImage } from "../../config/uploadImage"; // ✅ uploadImage 함수 가져오기

export default function BannerAdd() {
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null); // 파일 입력 초기화용 ref

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image) {
      setMessage("❌ 제목과 이미지를 입력하세요.");
      return;
    }

    setUploading(true);

    try {
      const downloadURL = await uploadImage(image);
      if (!downloadURL) {
        setMessage("❌ 이미지 업로드 실패");
        setUploading(false);
        return;
      }

      console.log("✅ Firebase Storage URL:", downloadURL);

      // ✅ `order` 값을 숫자로 변환
      const orderValue = order ? parseInt(order, 10) : 0;

      const requestData = {
        title,
        order: orderValue,
        image_url: downloadURL,
      };

      console.log("✅ 서버로 보낼 데이터:", requestData);

      const response = await fetch("http://localhost:8000/api/banner/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      console.log("✅ 응답 상태 코드:", response.status);

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      let data;
      try {
        data = await response.json(); // ✅ JSON 파싱 시 예외 처리
        console.log("✅ 서버 응답 데이터:", data);
      } catch (jsonError) {
        throw new Error("❌ JSON 변환 오류 (서버가 HTML을 반환했을 가능성이 있음)");
      }

      setMessage("✅ 배너 등록 완료!");
      setTitle("");
      setOrder("");
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = ""; // ✅ 파일 입력 초기화
    } catch (error) {
      console.error("❌ 서버 요청 실패:", error);
      setMessage(`❌ 서버 요청 실패: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>배너 등록</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>순서:</label>
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          />
        </div>
        <div>
          <label>이미지:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            ref={fileInputRef} // 파일 입력 초기화
            required
          />
        </div>
        <button type="submit" disabled={uploading}>
          {uploading ? "업로드 중..." : "배너 추가"}
        </button>
      </form>
    </div>
  );
}
