"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";

const NewProductsContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
  max-width: 430px;
  padding: 30px 20px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const Upsection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const TitleText = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #000000;
`;

const Arrow = styled(Image)`
  width: 14px;
  height: 14px;
  margin-left: 10px;
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const ProductCards = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
`;

const ProductsPhoto = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background-color: #ededed;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled(Image)`
  width: 80%;
  height: auto;
`;

const ProductInfo = styled.div`
  width: 100%;
  margin-top: 8px;
  font-family: 'Pretendard', sans-serif;
`;

const Company = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #000000;
`;

const ProductName = styled.div`
  font-size: 14px;
  color: #8a8a8a;
  margin-top: 4px;
`;

const Price = styled.div`
  font-size: 14px;
  color: #111111;
  margin-top: 4px;
`;

export default function NewProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/products/")  // Django API 호출
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <NewProductsContainer>
      <Upsection>
        <TitleText>신작</TitleText>
        <Arrow src="/images/right-arrow.png" alt="화살표" width={14} height={14} />
      </Upsection>
      <ProductContainer>
        {products.map((product) => (
          <ProductCards key={product.id}>
            <ProductsPhoto>
              {product.image ? (
                <ProductImage src={product.image} alt={product.name} width={120} height={120} />
              ) : (
                <span>이미지 없음</span>
              )}
            </ProductsPhoto>
            <ProductInfo>
              <Company>{product.author}</Company>
              <ProductName>{product.name}</ProductName>
              <Price>{product.price ? product.price.toLocaleString() : "가격 미정"} 원</Price>
            </ProductInfo>
          </ProductCards>
        ))}
      </ProductContainer>
    </NewProductsContainer>
  );
}
