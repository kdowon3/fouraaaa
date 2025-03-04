"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const Background = styled.div`
  width: 100%;
  height: auto;
  max-width: 430px; /* 최대 너비 유지 */
  background: linear-gradient(to bottom, #FFFFFF 0%, #CECECE 64%, #FFFFFF 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Description_Title=styled.div`
    width: 100%
    padding: 20px 0px;
    font-family: "Pretendard";
    font-size: 20px;
    font-weight: bold;
    align-self: flex-start;
    margin-left: 20px;
`;

const ImageSection= styled.div`
    width: 100%;
    height: 600px;
    margin-top: 20px;
    background-color: #000000;
`;

const MoreButton= styled.div`
    width: 319px;
    height: 52px;
    padding: 20px 0px;
    background-color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    gap: 8px;
    font-family: "Pretendard";
    font-size: 15px;
`;

export default function Detail() {
    return (
        <Background>
            <Description_Title>작품 설명</Description_Title>
            <ImageSection></ImageSection>
            <MoreButton>작품 설명 더보기 <img src="/images/arrow-down.png" alt="아래" width={12} height={12}/></MoreButton>
        </Background>
    );
  }