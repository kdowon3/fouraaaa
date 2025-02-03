"use client";

import styled from "styled-components";
import Image from "next/image";

const EditionContainer = styled.div`
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

export default function TenEdition() {
  return (
    <EditionContainer>
      <Upsection>
        <TitleText>10개 이하 에디션</TitleText>
        <Arrow src="/images/right-arrow.png" alt="화살표" width={14} height={14} />
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
