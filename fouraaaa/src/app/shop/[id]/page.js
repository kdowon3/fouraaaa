"use client";
import { useParams } from "next/navigation"; 
import styles from "./page.module.css"
import Footer from "../../components/common/Footer";
import DetailNav from "./components/header";
import InfoTab from "./components/Info";
import Detail from "./components/detail";
import SameProducer from "./components/MoreProduct";
import useProductStore from "@/store";
import { useEffect, useState } from "react";


export default function ProductPage() {
  const { id } = useParams();
  const { setProduct, setSameAuthorProducts, setLoading } = useProductStore();

  useEffect(() => {
    if (!id) return;

    const fetchProductData = async () => {
      try {
        setLoading(true); // ✅ 로딩 시작
        const response = await fetch(`http://localhost:8000/api/products/${id}/`);
        if (!response.ok) throw new Error("상품 데이터를 불러올 수 없습니다.");
        const data = await response.json();

        console.log("✅ 상품 데이터:", data);
        setProduct(data.product); // ✅ 상품 정보 저장
        setSameAuthorProducts(data.same_author_products || []); // ✅ 같은 작가 상품 저장
      } catch (error) {
        console.error("❌ 상품 데이터 로딩 오류:", error);
      } finally {
        setLoading(false); // ✅ 로딩 완료
      }
    };

    fetchProductData();
  }, [id, setProduct, setSameAuthorProducts, setLoading]);

  return (
    <div className={styles.container}> 
      <DetailNav />
      <InfoTab /> 
      <Detail />
      <SameProducer />
      <Footer />
    </div>
  );
}