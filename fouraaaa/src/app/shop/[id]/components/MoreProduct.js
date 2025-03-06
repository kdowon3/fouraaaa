"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import useProductStore from "@/store";
import { shallow } from "zustand/shallow";

const MoreProductContainer = styled.div`
  background-color: #FFFFFF;
  width: 100%;
  max-width: 430px;
  padding: 7% 5%;
  font-family: "Pretendard";
  overflow-x: auto;
`;
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
  display: flex;
  gap: 10px;
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 10px;
`;

const ProductCards = styled.div`
  min-width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 120px;
  height: 120px;
  height: auto;
  object-fit: contain;
`;

const ProductInfo = styled.div`
  width: 100%;
  margin-top: 5px;
`;

const Company = styled.div`
  font-size: 13px;
  font-weight: bold;
  color: #000000;
`;

const ProductName = styled.div`
  font-size: 14px;
  color: #8A8A8A;
`;

const Price = styled.div`
  font-size: 14px;
  color: #111111;
  margin-top: 5px;
`;

export default function SameProducer() {
  const store = useProductStore();

  const { product, sameAuthorProducts, loading, setLoading } = useMemo(() => ({
    product: store.product,
    sameAuthorProducts: store.sameAuthorProducts,
    loading: store.loading,
    setLoading: store.setLoading,
  }), [store.product, store.sameAuthorProducts, store.loading]);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/api/products/${product?.id}/same-author/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ 같은 작가 상품 데이터:", data);
        useProductStore.getState().setSameAuthorProducts(data);
      })
      .finally(() => setLoading(false));
  }, [product?.id]);

  return (
    <MoreProductContainer>
      <Upsection>
        <TitleText>{product?.author}의 다른 작품</TitleText>
        <Arrow src="/images/right-arrow.png" alt="화살표" width={14} height={14} />
      </Upsection>
      <ProductContainer>
        {loading ? (
          <p>불러오는 중...</p>
        ) : sameAuthorProducts && sameAuthorProducts.length > 0 ? (
          sameAuthorProducts.map((product) => (
            <Link key={product.id} href={`/shop/${product.id}`} passHref>
              <ProductCards>
                <ProductsPhoto>
                  {product.image_url ? (
                    <ProductImage
                      src={product.image_url}
                      alt={product.name}
                      width={120}
                      height={120}
                      unoptimized
                    />
                  ) : (
                    <span>이미지 없음</span>
                  )}
                </ProductsPhoto>
                <ProductInfo>
                  <Company>{product.author}</Company>
                  <ProductName>{product.name}</ProductName>
                  <Price>
                    {product.price !== null ? `${Number(product.price).toLocaleString()} 원` : "가격 미정"}
                  </Price>
                </ProductInfo>
              </ProductCards>
            </Link>
          ))
        ) : (
          <p>이 작가님의 다른 작품이 없습니다.</p>
        )}
      </ProductContainer>
    </MoreProductContainer>
  )
}
