"use client";

import styled from "styled-components";
import Image from "next/image";

const ProductsContainer = styled.div`
  background-color: #FFFFFF;
  width: 100%;
  max-width: 430px;
  padding: 7% 5%;
  display: block;
`;

const ProductContainer = styled.div`
  width: 100%;
  margin-top: 5%;
  display: grid;
  grid-template-columns: repeat(2, 48%);
  gap: 4%;
`;

const ProductCards = styled.div`
  background-color: #EDEDED;
  display: flex;
  flex-direction: column;
  width: 100%;
  aspect-ratio: 1.5;
  justify-content: space-between;
  position: relative;
`;

const ProductsPhoto = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background-color: #D9D9D9;
  position: relative; /* ✅ 재고 위치 고정을 위해 relative 추가 */
  padding: 5% 6%;
`;

/* ✅ 재고 정보를 오른쪽 정렬 */
const StockSection = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  position: absolute;
  bottom: 5%;
  right: 2%; 
  justify-content: flex-end; 
  font-size: 12px;
  font-family: "Pretendard", sans-serif ;
  color: #2C3264;
`;

const StockBadge = styled.div`
  background-color: #2C3264;
  color: #FFFFFF;
  font-size: 10px;
  padding: 2px 6px;
`;

const ProductInfo = styled.div`
  font-family: "Pretendard";
  padding: 5% 5%;
`;

const Company = styled.div`
  font-size: 100%;
  font-weight: bold;
  color: #000000;
`;

const ProductName = styled.div`
  font-size: 100%;
  color: #8A8A8A;
  margin-top: 2%;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 3%;
  padding: 5%;
`;

const Price = styled.div`
  font-size: 110%;
  color: #111111;
`;

const WishlistIcon = styled(Image)`
  width: 12%;
  height: auto;
`;

export default function Products() {
  return (
    <ProductsContainer>
      <ProductContainer>
        {[...Array(6)].map((_, index) => (
          <ProductCards key={index}>
            <ProductInfo>
              <Company>이능호 세라믹스튜디오</Company>
              <ProductName>달항아리 세트</ProductName>
            </ProductInfo>
            <ProductsPhoto>
              <StockSection>
                <p>재고</p>
                <StockBadge>2개</StockBadge>
              </StockSection>
            </ProductsPhoto>
            <PriceContainer>
              <Price>79,000</Price>
            </PriceContainer>
          </ProductCards>
        ))}
      </ProductContainer>
    </ProductsContainer>
  );
}
