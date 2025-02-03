"use client";

import styled from "styled-components";
import Image from "next/image";

const RecommendContainer = styled.div`
  background-color: #FFFFFF;
  width: 100%;
  max-width: 430px;
  padding: 5%;  /* 약 20~22px 정도 */
  display: block;
`;

const TitleText = styled.div`
  font-size: 17px;
  font-weight: bold;
  color: #111111;
`;

const RecommendProducts = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 15px;  /* 필요에 따라 % 단위로도 변경 가능 */
  display: flex;
  justify-content: space-between;
  gap: 2.5%;  /* 5개 카드 사이의 간격 */
`;

const ProductCards = styled.div`
  width: 15.7%;  /* 원래 63px/402px ≒ 15.7% */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductsPhotoContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background-color: #D9D9D9;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const PhotoImage = styled(Image)`
  position: absolute;
  width: 70%;
  height: auto;
  z-index: 2;
`;

const RecommendText = styled.div`
  font-size: 12px;
  font-family: 'Pretendard';
  color: #111111;
  text-align: center;
  word-break: break-word;
  white-space: normal;
  width: 100%;
  margin-top: 5px;
`;

export default function Recommend() {
  return (
    <RecommendContainer>
      <TitleText>추천 기획전</TitleText>
      <RecommendProducts>
        <ProductCards>
          <ProductsPhotoContainer>
            <PhotoImage src="/images/recommend.png" alt="상품" width={46} height={43} />
          </ProductsPhotoContainer>
          <RecommendText>신작품</RecommendText>
        </ProductCards>
        <ProductCards>
          <ProductsPhotoContainer>
            <PhotoImage src="/images/recommend.png" alt="상품" width={46} height={43} />
          </ProductsPhotoContainer>
          <RecommendText>
            10개 이하 <br /> 에디션
          </RecommendText>
        </ProductCards>
        <ProductCards>
          <ProductsPhotoContainer>
            <PhotoImage src="/images/recommend.png" alt="상품" width={46} height={43} />
          </ProductsPhotoContainer>
          <RecommendText>도자</RecommendText>
        </ProductCards>
        <ProductCards>
          <ProductsPhotoContainer>
            <PhotoImage src="/images/recommend.png" alt="상품" width={46} height={43} />
          </ProductsPhotoContainer>
          <RecommendText>유리</RecommendText>
        </ProductCards>
        <ProductCards>
          <ProductsPhotoContainer>
            <PhotoImage src="/images/recommend.png" alt="상품" width={46} height={43} />
          </ProductsPhotoContainer>
          <RecommendText>아트 퍼니처</RecommendText>
        </ProductCards>
      </RecommendProducts>
    </RecommendContainer>
  );
}
