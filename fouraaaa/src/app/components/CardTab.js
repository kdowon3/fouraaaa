"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";


const CardContainer = styled.div`
  background-color: #D9D9D9;
  width: 402px;
  height: 96px;
  display: flex;
`;

const TitleText = styled.div`
    font-size: 17px;
    font-family: "Pretendard";
    font-weight: bold;
    padding: 20px 20px;
    color: #111111;
`;

const English = styled.div`
    font-size: 17px;
    font-family: "Pretendard";
    padding: 20px 20px;
    color: #8A8A8A;
`;

export default function CardTab() {
    return (
    <div>
      <CardContainer>
        <TitleText>금속</TitleText>
        <English>metal</English>
      </CardContainer>
      <CardContainer style={{ backgroundColor: "#2C3264" }}>
        <TitleText style={{ color: "#FFFFFF"}}>도자</TitleText>
        <English style={{ color: "#D9D9D9"}}>ceramic</English>
      </CardContainer>
      <CardContainer style={{ backgroundColor: "#D5E1F0" }}>
        <TitleText>유리</TitleText>
        <English>glass</English>
      </CardContainer>
    </div>    
    );
  }