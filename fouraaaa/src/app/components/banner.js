"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";


const BannerContainer = styled.div`
  background-color: #000000;
  width: 402px;
  height: 402px;
`;
const BannerPhoto=styled.div`
    width: 362px;
    height: 402px;
    background-color: #659197;
    justify-self: center;
`;

export default function Banner() {
    return (
      <BannerContainer>
        <BannerPhoto></BannerPhoto>
      </BannerContainer>
    );
  }