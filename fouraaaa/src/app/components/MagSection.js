"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";


const MagContainer = styled.div`
  background-color: #2C3264;
  width: 402px;
  height: 288px;
  padding: 30px 20px;
  display: block;
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
    margin-top: 7px;
`;

const Contents = styled.div`
    width: 382px;
    height: 161px;
    margin-left: auto;
    margin-top: 20px;
    display: flex;
    gap: 10px;
    overflow-x: auto; /* 가로 스크롤 활성화 */
    overflow-y: hidden; /* 세로 스크롤 제거 */
    white-space: nowrap; /* 내부 요소들이 줄바꿈되지 않도록 설정 */
    -ms-overflow-style: none;  /* IE, Edge에서 스크롤바 숨기기 */
    scrollbar-width: none;  /* Firefox에서 스크롤바 숨기기 */
    
    &::-webkit-scrollbar {
        display: none; /* 크롬, 사파리에서 스크롤바 숨기기 */
    }
`;



const ContentsImg = styled(Image)`
    width: 130px;
    height: 161px;
`;

export default function MagSection() {
    return (
    <div>
      <MagContainer>
        <TitleText>옻칠이 달라지면 어떤 베리언트가 가능할까</TitleText>
        <SubText>매거진 보러가기</SubText>
        <Contents>
            <ContentsImg src={ '/images/content1.png' } alt="콘텐츠" width={130} height={161}/>
            <ContentsImg src={ '/images/content2.png' } alt="콘텐츠" width={130} height={161}/>
            <ContentsImg src={ '/images/content1.png' } alt="콘텐츠" width={130} height={161}/>
            <ContentsImg src={ '/images/content2.png' } alt="콘텐츠" width={130} height={161}/>

        </Contents>
      </MagContainer>
    </div>    
    );
  }