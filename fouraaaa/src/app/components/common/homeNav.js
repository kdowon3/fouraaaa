"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const GNBContainer = styled.header`
  background-color: #E1EAF4;
  padding: 15px 20px;
`;

const Navbar = styled.nav`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-family: 'Pretendard';
`;

const Upsection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
`;

const StyledLogo = styled(Image)`
  width: 79px; /* 기존 로고 크기 유지 */
  height: 25px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;         /* 아이콘 사이 간격 */
  flex-shrink: 0;
  margin-right: 5%;  /* 오른쪽 끝 여백: NavLinks와 동일하게 */
`;

const ShoppingCart = styled(Image)`
  width: 24px;
  height: 24px;
`;

const MyPage = styled(Image)`
  width: 24px;
  height: 24px;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

// Divider들의 width를 % 단위로 변경 (약 4.5%, 7%, 14.7%, 22.8%)
const Divider1 = styled.div`
  width: 6.5%;
  height: 30px;
  background-color: #2C3264;
`;
const Divider2 = styled.div`
  width: 9.5%;
  height: 30px;
  background-color: #2C3264;
`;
const Divider3 = styled.div`
  width: 17.2%;
  height: 30px;
  background-color: #2C3264;
`;
const Divider4 = styled.div`
  width: 25.3%;
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
          <IconWrapper>
            <Link href="/">
              <ShoppingCart
                src="/images/shoppingcart.png"
                alt="장바구니"
                width={24}
                height={24}
              />
            </Link>
            <Link href="/">
              <MyPage
                src="/images/mypage.png"
                alt="마이페이지"
                width={30}
                height={30}
              />
            </Link>
          </IconWrapper>
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
