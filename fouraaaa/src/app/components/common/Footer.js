"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const FooterContainer = styled.div`
  background-color: #2C3264;
  width: 402px;
  height: 205px;
  margin-top: 100px;
  padding: 30px 27px;
  display: flex;
  justify-content: space-between;
`;

const TextGroup = styled.div`
    width: 141px;
    height: 67px;
    display: block;
`;

const MainText = styled.div`
    width: 141px;
    height: 14px;
    font-size: 12px;
    font-weight: bold;
    font-family: "Pretendard";
    color: #FFFFFF;
    display: flex;
    gap: 20px;
`;

const EmailText =styled.div`
    margin-top: 21px;
    width: 141px;
    height: 32px;
    color: #8D91B2;
    font-family: "Pretendard";
    display: block;
    gap: 4px;
`;

const LogoImg = styled(Image)`
    width: 135px;
    height: 35px;
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
        <LogoImg src={'/images/logo_footer.png'} alt="로고" width={135} height={35} />
      </FooterContainer>
    );
}
