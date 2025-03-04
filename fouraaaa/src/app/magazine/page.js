"use client";
// Next.js 13+ App Router에서, Firebase 클라이언트 SDK 사용 시 "use client"

import { useEffect, useState } from "react";
import { db } from "@/config/firebase"; // Firebase 초기화 import 경로
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

export default function MagazinePage() {
  // 1) 상태: 제목, 본문내용, 사진URL 입력
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // 2) 상태: 매거진 목록
  const [magazineList, setMagazineList] = useState([]);

  // Firestore에서 magazine 컬렉션 문서를 가져오는 함수
  const fetchMagazines = async () => {
    try {
      const q = query(collection(db, "magazine"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMagazineList(items);
    } catch (error) {
      console.error("매거진 목록 불러오기 오류:", error);
    }
  };

  // 컴포넌트 마운트 시 magazine 목록 조회
  useEffect(() => {
    fetchMagazines();
  }, []);

  // Firestore에 새 매거진 문서 추가
  const handleAddMagazine = async () => {
    if (!title || !content) {
      alert("제목과 본문내용을 입력해주세요!");
      return;
    }

    try {
      await addDoc(collection(db, "magazine"), {
        title,
        content,
        imageUrl,
        createdAt: new Date(),
      });
      alert("매거진이 등록되었습니다!");

      // 입력 폼 초기화
      setTitle("");
      setContent("");
      setImageUrl("");

      // 등록 후 목록 갱신
      fetchMagazines();
    } catch (error) {
      console.error("매거진 등록 오류:", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Magazine Page</h1>

      {/* 매거진 등록 폼 */}
      <div style={{ marginBottom: 20 }}>
        <h2>매거진 작성</h2>
        <div>
          <label>제목: </label>
          <input
            type="text"
            value={title}
            placeholder="예) 멋진 여행 이야기"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>본문내용: </label>
          <textarea
            rows={4}
            value={content}
            placeholder="본문 내용을 적어주세요"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <label>사진 URL: </label>
          <input
            type="text"
            value={imageUrl}
            placeholder="예) https://example.com/myimage.jpg"
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button onClick={handleAddMagazine}>매거진 등록</button>
      </div>

      {/* 매거진 목록 표시 */}
      <div>
        <h2>매거진 목록</h2>
        {magazineList.length === 0 ? (
          <p>아직 작성된 매거진이 없습니다.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {magazineList.map((item) => (
              <li
                key={item.id}
                style={{ border: "1px solid #ccc", marginBottom: 10, padding: 10 }}
              >
                <h3>{item.title}</h3>
                <p>{item.content}</p>
                {item.imageUrl && (
                  <div>
                    <img
                      src={item.imageUrl}
                      alt="magazine-img"
                      style={{ maxWidth: "300px", height: "auto" }}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
