"use client";

import { useState } from "react";
import { uploadImage } from "@/config/uploadImage"; // Firebase Storage 업로드 함수
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    category: "식기",
    material: "도자",
    total_production: 0,
    width: "",
    height: "",
    components: "",
    price: "",
    description: "",
    image: null, // 🔥 이미지 파일 추가
  });

  const categories = ["식기", "오브제", "아트퍼니처"];
  const materials = ["도자", "유리", "금속"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = "";
    if (formData.image) {
      imageUrl = await uploadImage(formData.image); // Firebase Storage에 업로드 후 URL 가져오기
    }

    const response = await fetch("http://localhost:8000/api/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        image_url: imageUrl, // ✅ Firebase Storage에서 가져온 이미지 URL 저장
        components: formData.components.split(","), // ✅ JSON 배열로 변환
      }),
    });

    if (response.ok) {
      alert("상품이 성공적으로 등록되었습니다!");
      router.push("/shop"); // 상품 목록 페이지로 이동
    } else {
      alert("상품 등록에 실패했습니다.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>상품 등록</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <label>상품명:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>작가:</label>
        <input type="text" name="author" value={formData.author} onChange={handleChange} required />

        <label>종류:</label>
        <select name="category" value={formData.category} onChange={handleChange}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <label>재료:</label>
        <select name="material" value={formData.material} onChange={handleChange}>
          {materials.map((mat) => (
            <option key={mat} value={mat}>{mat}</option>
          ))}
        </select>

        <label>총 생산량:</label>
        <input type="number" name="total_production" value={formData.total_production} onChange={handleChange} required />

        <label>가로 (cm):</label>
        <input type="number" name="width" value={formData.width} onChange={handleChange} required />

        <label>세로 (cm):</label>
        <input type="number" name="height" value={formData.height} onChange={handleChange} required />

        <label>구성품 (쉼표로 구분):</label>
        <input type="text" name="components" value={formData.components} onChange={handleChange} required />

        <label>가격:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />

        <label>설명:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>상품 이미지:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} required />

        <button type="submit" style={{ padding: "10px", backgroundColor: "#2C3264", color: "#fff" }}>
          등록
        </button>
      </form>
    </div>
  );
}
