"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const GNBContainer = styled.header`
  background-color: #FFFFFF;
  max-width: 430px; /* 최대 너비 유지 */
  margin-top: 10px;
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

const TextBox =styled.div`
    display: block;
    justify-contents: center;
    margin-right: -50px;
`;

const TitleText = styled.div`
  font-size: 1.125rem; /* 18px */
  font-family: "Pretendard";
  align-self: center;
`;

const SubText = styled.div`
  font-size: 14px;
  font-family: "Pretendard";
  justify-self: center;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;         /* 아이콘 사이 간격 */
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

export default function InfoTab() {
  return (
    <GNBContainer>
      <Navbar>
        <Upsection>
          <Link href="/">
            <LeftArrow src="/images/nav-arrow-left.svg" alt="뒤로가기" width={20} height={40} />
          </Link>
          <TextBox>
            <TitleText>이능호 세라믹스튜디오</TitleText>
            <SubText>달항아리</SubText>
          </TextBox>
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
      </Navbar>
    </GNBContainer>
  );
}
