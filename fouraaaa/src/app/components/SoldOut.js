"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const SoldoutContainer = styled.div`
  background-color: #FFFFFF;
  width: 402px;
  height: 333px;
  padding: 30px 20px;   
  display: block;
`;
const Upsection = styled.div`
    width: 362px;
    height: 24px;
    display: flex;
`;
const TitleText = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #000000; /* 글씨 색상 추가 (배경과 대비) */
`;

const Arrow = styled(Image)`
    width: 14px;
    height: 14px;
    margin-left: 10px;
    margin-top: 8px;
`;

const ProductContainer = styled.div`
    width: 382px;
    height: 229px;
    background-color: #FFFFFF;
    justify-self: flex-end;
    margin-top: 20px;
    margin-left: auto;
    display: flex;
`;

const ProductCards = styled.div`
    width: 150px;
    height: 229px;
    background-color: #FFFFFF;
    display: block;
`;

const ProductsPhoto = styled.div`
    width: 150px;
    height: 150px;
    background-color: #EDEDED;
`;

const ProductInfo = styled.div`
    width: 125px;
    height: 64px;
    display: block;
`;

const Company = styled.div`
    width: 125px;
    height: 17px;
    font-size: 14px;
    font-family: 'Pretendard';
    font-weight: bold;
    color: #000000;
`;
const ProductName = styled.div`
    width: 108px;
    height: 16px;
    font-size: 14px;
    font-family: 'Pretendard';
    color: #8A8A8A;
`;
const Price = styled.div`
    width: 108px;
    height: 18px;
    font-size: 14px;
    font-family: 'Pretendard';
    color: #111111;
    margin-top: 10px;
`;

export default function Soldout() {
  return (
    <SoldoutContainer>
        <Upsection>
            <TitleText>품절 임박 상품</TitleText>
            <Arrow src="/images/right-arrow.png" alt='화살표'width={14} height={14}/>
        </Upsection>
        <ProductContainer>
            <ProductCards>
                <ProductsPhoto></ProductsPhoto>
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
