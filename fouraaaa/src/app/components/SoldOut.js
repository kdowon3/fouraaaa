"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import useProductStore from "../../store";

// SoldoutContainer: 최대 너비 430px, 원래 402×333px 비율(≈1.206) 유지
const SoldoutContainer = styled.div`
  background-color: #FFFFFF;
  width: 100%;
  max-width: 430px;
  aspect-ratio: 402 / 333;
  padding: 7% 5%; /* 30px ≒7%, 20px ≒5% (430px 기준) */
  display: block;
`;

// Upsection: 컨테이너 너비의 약 90%, 높이는 약 7.2%
const Upsection = styled.div`
  width: 90%;
  height: 7.2%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleText = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #000000;
`;

const Arrow = styled(Image)`
  width: 3.3%;
  height: auto;
  margin-left: 2.3%;
`;

const ProductContainer = styled.div`
  width: 100%;
  margin-top: 5%;
  display: flex;
  gap: 10px;
  overflow-x: auto; /* 가로 스크롤 가능 */
  white-space: nowrap;

  /* 스크롤바 숨기기 */
  -ms-overflow-style: none;  /* IE, Edge */
  scrollbar-width: none;  /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리 */
  }
`;


const ProductCards = styled.div`
  width: 37%;
  display: flex;
  flex-direction: column;
`;

const ProductsPhoto = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background-color: #EDEDED;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled(Image)`
  width: 80%;
  height: auto;
`;

const ProductInfo = styled.div`
  width: 83%;
  display: block;
  margin-top: 2%;
`;

const Company = styled.div`
  width: 100%;
  font-size: 13px;
  font-family: 'Pretendard';
  font-weight: bold;
  color: #000000;
`;

const ProductName = styled.div`
  width: 72%;
  font-size: 14px;
  font-family: 'Pretendard';
  color: #8A8A8A;
`;

const Price = styled.div`
  width: 72%;
  font-size: 14px;
  font-family: 'Pretendard';
  color: #111111;
  margin-top: 2%;
`;

export default function Soldout() {
  const soldoutProducts = useProductStore((state) => state.soldoutProducts);
  const setSoldoutProducts = useProductStore((state) => state.setSoldoutProducts);

  useEffect(() => {
    fetch("http://localhost:8000/api/products/") // ✅ 전체 상품을 가져와서 필터링
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ API 응답 데이터:", data.results || data);
        setSoldoutProducts(data.results || []); // ✅ 필터링하여 Zustand 상태 업데이트
      })
      .catch((error) => console.error("❌ API 호출 오류:", error));
  }, [setSoldoutProducts]);


  return (
    <SoldoutContainer>
      <Upsection>
        <TitleText>품절 임박 상품</TitleText>
        <Arrow src="/images/right-arrow.png" alt="화살표" width={14} height={14} />
      </Upsection>
      <ProductContainer>
        {soldoutProducts?.map((product) => (
          <ProductCards key={product.id}>
            <ProductsPhoto>
              {product.image_url ? (
                <ProductImage src={product.image_url} alt={product.name} width={120} height={120} />
              ) : (
                <span>이미지 없음</span>
              )}
            </ProductsPhoto>
            <ProductInfo>
              <Company>{product.author}</Company>
              <ProductName>{product.name}</ProductName>
              <Price>{product.price ? `${product.price.toLocaleString()} 원` : "가격 미정"}</Price>
            </ProductInfo>
          </ProductCards>
        ))}
      </ProductContainer>
    </SoldoutContainer>
  );
}
