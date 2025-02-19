"use client";

import { useState } from "react";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    category: "식기",
    material: "도자",
    total_production: 0,
    order_quantity: 0,
    description: "",
  });

  const categories = ["식기", "오브제", "아트퍼니처"];
  const materials = ["도자", "유리", "금속"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("상품이 성공적으로 등록되었습니다!");
      setFormData({
        name: "",
        author: "",
        category: "식기",
        material: "도자",
        total_production: 0,
        order_quantity: 0,
        description: "",
      });
    } else {
      alert("상품 등록에 실패했습니다.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>상품 등록</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px", // 🔥 입력 필드 간 간격 추가
        }}
      >
        <label>상품명:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <label>작가:</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <label>종류:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <label>재료:</label>
        <select
          name="material"
          value={formData.material}
          onChange={handleChange}
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        >
          {materials.map((mat) => (
            <option key={mat} value={mat}>{mat}</option>
          ))}
        </select>

        <label>총 생산량:</label>
        <input
          type="number"
          name="total_production"
          value={formData.total_production}
          onChange={handleChange}
          required
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <label>주문량:</label>
        <input
          type="number"
          name="order_quantity"
          value={formData.order_quantity}
          onChange={handleChange}
          required
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <label>설명:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            minHeight: "80px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#2C3264",
            color: "#fff",
            fontSize: "16px",
            borderRadius: "5px",
            cursor: "pointer",
            border: "none",
            marginTop: "10px",
          }}
        >
          등록
        </button>
      </form>
    </div>
  );
}
