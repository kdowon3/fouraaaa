"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const GNBContainer = styled.header`
  background-color: #E1EAF4;
  padding: 15px 20px;
`;

const Navbar = styled.nav`
  display: block;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-family: 'Pretendard';  
`;
const Upsection = styled.div`
  display: flex;
  padding: 15px 0px;
  margin-left: 0px;
`;
const StyledLogo = styled(Image)`
  width: 79px; /* 원하는 크기로 조절 */
  height: 25px;
`;
const ShoppingCart = styled(Image)`
  width: 24px;
  height: 24px;
  margin-left: 217px;
`;
const MyPage = styled(Image)`
  width: 24px;
  height: 24px;
  margin-left: 20px;
`;
const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Divider1 = styled.div`
  width: 19px;
  height: 30px;
  background-color: #2C3264;
`;
const Divider2 = styled.div`
  width: 30px;
  height: 30px;
  background-color: #2C3264;
`;
const Divider3 = styled.div`
  width: 63px;
  height: 30px;
  background-color: #2C3264;
`;
const Divider4 = styled.div`
  width: 98px;
  height: 30px;
  background-color: #2C3264;
`;
const StyledLink = styled(Link)`
  font-size: 14px;
  color: #000000;
  text-decoration: none;

  &:hover {
    color: #0070f3;
  }
`;

export default function HomeNav() {
  return (
    <GNBContainer>
      <Navbar>
        <Upsection>
          <StyledLogo src="/images/logo.png" alt="Logo" width={79} height={25} />
          <Link href="/">
            <ShoppingCart src="/images/shoppingcart.png" alt="장바구니" width={24} height={24} />
          </Link>
          <Link href="/">
            <MyPage src="/images/mypage.png" alt="마이페이지" width={24} height={24} />
          </Link>
        </Upsection>
        <NavLinks>
          <Divider1 />
          <StyledLink href="/">홈</StyledLink>
          <Divider2 />
          <StyledLink href="/shop">쇼핑</StyledLink>
          <Divider3 />
          <StyledLink href="/magazine">매거진</StyledLink>
          <Divider4 />
        </NavLinks>
      </Navbar>
    </GNBContainer>
  );
}