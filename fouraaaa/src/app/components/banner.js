"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

// BannerContainer는 화면 너비에 따라 유동적으로 늘어나되, 최대 430px의 정사각형(1:1 비율)으로 제한합니다.
const BannerContainer = styled.div`
  background-color: #000000;
  width: 100%;
  max-width: 430px;
  aspect-ratio: 1;
  margin: 0 auto;
`;

// BannerPhoto는 부모 너비의 90%를 사용하며, 부모의 높이를 채우도록 설정했습니다.
const BannerPhoto = styled.div`
  width: 90%;
  height: 100%;
  background-color: #659197;
  margin: 0 auto;
`;

export default function Banner() {
  return (
    <BannerContainer>
      <BannerPhoto />
    </BannerContainer>
  );
}
