"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

// SoldoutContainer: 최대 너비 430px, 원래 402×333px 비율(≈1.206)을 유지
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
`;

// TitleText: 글씨 크기는 그대로 사용
const TitleText = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #000000;
`;

// Arrow: 14px, 10px, 8px를 각각 약 3.3%, 2.3%, 1.9%로 변환
const Arrow = styled(Image)`
  width: 3.3%;
  height: auto;
  margin-left: 2.3%;
  margin-top: 1.9%;
`;

// ProductContainer: 너비 100%, margin-top 약 5%
const ProductContainer = styled.div`
  width: 100%;
  margin-top: 5%;
  margin-left: auto;
  display: flex;
`;

// ProductCards: 원래 150px ≒ 37% (150/402)로 설정
const ProductCards = styled.div`
  width: 37%;
  display: flex;
  flex-direction: column;

`;

// ProductsPhoto: ProductCards 전체 너비, 정사각형 유지
const ProductsPhoto = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background-color: #EDEDED;
`;

// ProductInfo: ProductCards의 너비의 약 83% (125/150)
const ProductInfo = styled.div`
  width: 83%;
  display: block;
  margin-top: 2%;
  margin-left: 0%;
`;

// 내부 텍스트들: ProductInfo나 ProductCards의 너비에 맞게 비율로 설정
const Company = styled.div`
  width: 100%;
  font-size: 13px;
  font-family: 'Pretendard';
  font-weight: bold;
  color: #000000;
`;
const ProductName = styled.div`
  width: 72%;  /* 약 108px/150px */
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
  return (
    <SoldoutContainer>
        <Upsection>
            <TitleText>품절 임박 상품</TitleText>
            <Arrow src="/images/right-arrow.png" alt="화살표" width={14} height={14} />
        </Upsection>
        <ProductContainer>
            <ProductCards>
                <ProductsPhoto />
                <ProductInfo>
                    <Company>이능호 세라믹스튜디오</Company>
                    <ProductName>달항아리 세트</ProductName>
                    <Price>79,000</Price>
                </ProductInfo>
            </ProductCards>
        </ProductContainer>
    </SoldoutContainer>
  );
}
