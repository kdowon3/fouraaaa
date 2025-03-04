"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import useProductStore from "@/store";

const GNBContainer = styled.header`
  background-color: #FFFFFF;
  max-width: 430px;
  margin-top: 10px;
  width: 100%;
  padding: 3% 5%;
`;

const Navbar = styled.nav`
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  font-family: 'Pretendard';
`;

const Upsection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3% 2%;
`;

const LeftArrow = styled(Image)``;

const TextBox = styled.div`
  display: block;
  text-align: center;
  margin-right: -50px;
`;

const TitleText = styled.div`
  font-size: 1.125rem;
  font-family: "Pretendard";
  font-weight: bold;
`;

const SubText = styled.div`
  font-size: 14px;
  font-family: "Pretendard";
  color: #555;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-shrink: 0;
`;

const ShoppingCart = styled(Image)`
  width: 24px;
  height: 24px;
`;

const MyPage = styled(Image)`
  width: 24px;
  height: 24px;
`;

function InfoTab() {
  const router = useRouter();
  const { product, loading } = useProductStore(); // ✅ Zustand에서 상품 정보 가져오기

  return (
    <GNBContainer>
      <Navbar>
        <Upsection>
          <LeftArrow
            src="/images/nav-arrow-left.svg"
            alt="뒤로가기"
            width={20}
            height={40}
            onClick={() => router.back()}
          />
          <TextBox>
            {loading ? (
              <>
                <TitleText>불러오는 중...</TitleText>
                <SubText>상품명 불러오는 중...</SubText>
              </>
            ) : (
              <>
                <TitleText>{product?.author || "작가명 없음"}</TitleText>
                <SubText>{product?.name || "상품명 없음"}</SubText>
              </>
            )}
          </TextBox>
          <IconWrapper>
            <Link href="/shop">
              <ShoppingCart src="/images/shoppingcart.png" alt="장바구니" width={24} height={24} />
            </Link>
            <Link href="/shop">
              <MyPage src="/images/mypage.png" alt="마이페이지" width={30} height={30} />
            </Link>
          </IconWrapper>
        </Upsection>
      </Navbar>
    </GNBContainer>
  );
}

// ✅ Next.js에서 SSR 방지
export default dynamic(() => Promise.resolve(InfoTab), { ssr: false });
