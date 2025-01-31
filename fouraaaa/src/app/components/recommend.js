"use client";

import styled from "styled-components";
import Image from "next/image";

const RecommendContainer = styled.div`
  background-color: #FFFFFF;
  width: 402px;
  height: 170px;
  padding: 20px 20px;
  display: block;
`;

const TitleText = styled.div`
  font-size: 17px;
  font-weight: bold;
  color: #111111; /* 글씨 색상 추가 (배경과 대비) */
`;

const RecommendProducts = styled.div`
    width: 362px;
    height: 95px;
    background-color: #FFFFFF;
    justify-self: center;
    align-self: center;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
`;

const ProductCards = styled.div`
    width: 63px;
    height: 95px;
    display: block;
`;

const ProductsPhotoContainer = styled.div`
  position: relative;
  width: 63px;
  height: 63px;
  background-color: #D9D9D9; /* 배경 색상 */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const PhotoImage = styled(Image)`
  position: absolute;
  width: 46px;
  height: 43px;
  z-index: 2; /* 이미지가 배경 위로 오도록 설정 */
`;

const RecommendText = styled.div`
    font-size: 12px;
    font-family: 'Pretendard'; 
    color: #111111;
    text-align: center; /* 중앙 정렬 */
    word-break: break-word; /* 긴 단어 줄바꿈 */
    white-space: normal; /* 텍스트가 자동으로 줄바꿈됨 */
    width: 100%; /* 부모 요소 크기에 맞춤 */
`;

export default function Recommend() {
  return (
    <RecommendContainer>
      <TitleText>추천 기획전</TitleText>
      <RecommendProducts>
        <ProductCards>
            <ProductsPhotoContainer>
                <PhotoImage src='/images/recommend.png' alt="상품" width={46} height={43} />
            </ProductsPhotoContainer>
            <RecommendText>신작품</RecommendText>
        </ProductCards>
        <ProductCards>
            <ProductsPhotoContainer>
                <PhotoImage src='/images/recommend.png' alt="상품" width={46} height={43} />
            </ProductsPhotoContainer>
            <RecommendText>10개 이하 <br/> 에디션</RecommendText>
        </ProductCards>
        <ProductCards>
            <ProductsPhotoContainer>
                <PhotoImage src='/images/recommend.png' alt="상품" width={46} height={43} />
            </ProductsPhotoContainer>
            <RecommendText>도자</RecommendText>
        </ProductCards>
        <ProductCards>
            <ProductsPhotoContainer>
                <PhotoImage src='/images/recommend.png' alt="상품" width={46} height={43} />
            </ProductsPhotoContainer>
            <RecommendText>유리</RecommendText>
        </ProductCards>
        <ProductCards>
            <ProductsPhotoContainer>
                <PhotoImage src='/images/recommend.png' alt="상품" width={46} height={43} />
            </ProductsPhotoContainer>
            <RecommendText>아트 퍼니처</RecommendText>
        </ProductCards>
        </RecommendProducts>
    </RecommendContainer>
  );
}
