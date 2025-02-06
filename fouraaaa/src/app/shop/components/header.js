"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const GNBContainer = styled.header`
  background-color: #FFFFFF;
  max-width: 430px; /* 최대 너비 유지 */
  width: 100%;
  padding: 3% 5%;
`;

const Navbar = styled.nav`
  display: flex;
  flex-direction: column;
  font-size: 0.875rem; /* 14px */
  font-family: 'Pretendard';
`;

const Upsection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3% 2%;
`;

const LeftArrow = styled(Image)`
`;

const TitleText = styled.div`
  font-size: 1.125rem; /* 18px */
  font-family: "Pretendard";
  align-self: center;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;         /* 아이콘 사이 간격 */
  flex-shrink: 0;
  margin-right: 0%;  /* 오른쪽 끝 여백: NavLinks와 동일하게 */
`;

const ShoppingCart = styled(Image)`
  width: 24px;
  height: 24px;
`;

const MyPage = styled(Image)`
  width: 24px;
  height: 24px;
`;

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2%;
  padding: 2% 3%;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 2%;
  width: 100%;
`;

const Divider = styled.div`
  height: 2rem; /* 30px */
  background-color: #C4C4C4;
`;

// Divider들의 width를 % 단위로 변경
const Divider1 = styled(Divider)`
  width: 4%;
  background-color: #2C3264;
`;
const Divider2 = styled(Divider)`
  width: 7%;
  background-color: #2C3264;
`;
const Divider3 = styled(Divider)`
  width: 9%;
`;
const Divider4 = styled(Divider)`
  width: 5%;
`;
const Divider5 = styled(Divider)`
  width: 9%;
`;
const Divider6 = styled(Divider)`
  width: 10%;
`;
const Divider7 = styled(Divider)`
  width: 20%;
`;
const Divider8 = styled(Divider)`
  width: 13%;
`;
const Divider9 = styled(Divider)`
  width: 15%;
`;

const StyledLink = styled(Link)`
  font-size: 0.875rem;
  color: #000000;
  text-decoration: none;
  font-family: "Pretendard";
  flex-grow: 1; /* 자동 크기 조정 */
  text-align: center;

  &:hover {
    color: #0070f3;
  }
`;

export default function HomeNav() {
  return (
    <GNBContainer>
      <Navbar>
        <Upsection>
          <Link href="/">
            <LeftArrow src="/images/nav-arrow-left.svg" alt="뒤로가기" width={20} height={40} />
          </Link>
          <TitleText>SHOP</TitleText>
          <IconWrapper>
            <Link href="/shop">
              <ShoppingCart
                src="/images/shoppingcart.png"
                alt="장바구니"
                width={24}
                height={24}
              />
            </Link>
            <Link href="/shop">
              <MyPage
                src="/images/mypage.png"
                alt="마이페이지"
                width={30}
                height={30}
              />
            </Link>
          </IconWrapper>
        </Upsection>
        <NavWrapper>
          <NavLinks>
            <Divider1 />
            <StyledLink href="/shop">전체</StyledLink>
            <Divider2 />
            <StyledLink href="/shop">식기</StyledLink>
            <Divider3 />
            <StyledLink href="/shop">오브제</StyledLink>
            <Divider4 />
            <StyledLink href="/shop">아트퍼니처</StyledLink>
            <Divider5 />
          </NavLinks>

          <NavLinks>
            <Divider6 />
            <StyledLink href="/shop">도자</StyledLink>
            <Divider7 />
            <StyledLink href="/shop">유리</StyledLink>
            <Divider8 />
            <StyledLink href="/shop">금속</StyledLink>
            <Divider9 />
          </NavLinks>
        </NavWrapper>
      </Navbar>
    </GNBContainer>
  );
}
