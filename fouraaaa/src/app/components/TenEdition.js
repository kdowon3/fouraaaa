"use client";

import styled from "styled-components";
import Image from "next/image";

const EditionContainer = styled.div`
  background-color: #FFFFFF;
  width: 402px;
  height: 891px;
  padding: 30px 20px;
  display: block;
`;

const Upsection = styled.div`
  width: 362px;
  height: 24px;
  display: flex;
  align-items: center;
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
  width: 362px;
  height: 787px;
  background-color: #FFFFFF;
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2개씩 한 줄에 배치 */
  gap: 10px; /* 카드 사이 간격 */
`;

const ProductCards = styled.div`
  width: 177px;
  height: 257px;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProductsPhoto = styled.div`
  width: 150px;
  height: 150px;
  background-color: #EDEDED;
`;

const ProductInfo = styled.div`
  width: 125px;
  height: 64px;
  font-family: "Pretendard";
`;

const Company = styled.div`
  font-size: 14px;
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
  margin-top: 10px;
`;

export default function TenEdition() {
  return (
    <EditionContainer>
      <Upsection>
        <TitleText>10개 이하 에디션</TitleText>
        <Arrow src="/images/right-arrow.png" alt='화살표'width={14} height={14}/>
      </Upsection>
      <ProductContainer>
        {[...Array(6)].map((_, index) => (
          <ProductCards key={index}>
            <ProductsPhoto />
            <ProductInfo>
              <Company>이능호 세라믹스튜디오</Company>
              <ProductName>달항아리 세트</ProductName>
              <Price>79,000</Price>
            </ProductInfo>
          </ProductCards>
        ))}
      </ProductContainer>
    </EditionContainer>
  );
}
