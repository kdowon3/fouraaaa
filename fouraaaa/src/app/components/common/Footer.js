"use client";

import Image from "next/image";
import styled from "styled-components";

const FooterContainer = styled.div`
  background-color: #2C3264;
  width: 100%; /* 너비 정확히 맞춤 */
  max-width: 430px;
  aspect-ratio: 402 / 205; /* 원래 402px:205px 비율 유지 */
  margin-top: 100px; /* 위쪽 마진 줄이기 */
  padding: 40px 27px; /* 패딩 조정 */
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* 텍스트가 위쪽으로 정렬되도록 설정 */
  box-sizing: border-box;
`;

const TextGroup = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 0; /* 텍스트를 위로 */
`;

const MainText = styled.div`
  font-size: 12px;
  font-weight: bold;
  font-family: "Pretendard";
  color: #FFFFFF;
  display: flex;
  gap: 10px;
`;

const EmailText = styled.div`
  margin-top: 10px;
  font-size: 12px;
  font-family: "Pretendard";
  color: #8D91B2;
`;

const LogoImgWrapper = styled.div`
  width: 33%;
  max-width: 135px;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <TextGroup>
        <MainText>
          <p>회사소개</p>
          <p>입점 문의</p>
        </MainText>
        <EmailText>
          <p>E-mail</p>
          <p>heejae.moon@fouraaaa.kr</p>
        </EmailText>
      </TextGroup>
      <LogoImgWrapper>
        <Image
          src="/images/logo_footer.png"
          alt="로고"
          layout="responsive"
          width={135}
          height={35}
        />
      </LogoImgWrapper>
    </FooterContainer>
  );
}
