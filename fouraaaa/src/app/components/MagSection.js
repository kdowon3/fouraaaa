"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const MagContainer = styled.div`
  background-color: #2C3264;
  width: 100%;
  max-width: 430px;
  padding: 7% 5%; /* 최대 430px 기준: 약 30px와 20px에 해당 */
  box-sizing: border-box;
`;

const TitleText = styled.div`
  font-size: 17px;
  font-family: "Pretendard";
  font-weight: bold;
  color: #FFFFFF;
`;

const SubText = styled.div`
  font-size: 13px;
  font-family: "Pretendard";
  color: #FFFFFF;
  margin-top: 2%; /* 약 8~9px 정도 */
`;

const Contents = styled.div`
  width: 100%;
  margin-top: 5%; /* 약 20px */
  display: flex;
  gap: 2%; /* 카드들 사이의 간격 */
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

const ContentsImg = styled(Image)`
  width: 30%;             /* 카드의 너비: 최대 430px의 30% ≒ 129px */
  aspect-ratio: 130 / 161; /* 원본 이미지 비율 유지 */
  object-fit: cover;
`;

export default function MagSection() {
  return (
    <MagContainer>
      <TitleText>옻칠이 달라지면 어떤 베리언트가 가능할까</TitleText>
      <SubText>매거진 보러가기</SubText>
      <Contents>
        <ContentsImg src="/images/content1.png" alt="콘텐츠" width={130} height={161} />
        <ContentsImg src="/images/content2.png" alt="콘텐츠" width={130} height={161} />
        <ContentsImg src="/images/content1.png" alt="콘텐츠" width={130} height={161} />
        <ContentsImg src="/images/content2.png" alt="콘텐츠" width={130} height={161} />
      </Contents>
    </MagContainer>
  );
}
