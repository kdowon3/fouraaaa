"use client";

import { useRouter } from "next/navigation"; 
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const GNBContainer = styled.header`
  background-color: #FFFFFF;
  max-width: 430px;
  width: 100%;
  padding: 3% 5%;
  margin-bottom: 0;
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

const TitleText = styled.div`
  font-size: 1.125rem;
  font-family: "Pretendard";
  align-self: center;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

export default function Header() {
  const router = useRouter();

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
          <TitleText>SHOP</TitleText>
          <IconWrapper>
            <Link href="/shop">
              <Image src="/images/shoppingcart.png" alt="장바구니" width={24} height={24} />
            </Link>
            <Link href="/shop">
              <Image src="/images/mypage.png" alt="마이페이지" width={24} height={24} />
            </Link>
          </IconWrapper>
        </Upsection>
      </Navbar>
    </GNBContainer>
  );
}
