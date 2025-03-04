"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; 
import { useState, useEffect } from "react";
import styled from "styled-components";
import useProductStore from "@/store";


const Background = styled.div`
  width: 100%;
  height: auto;
  max-width: 430px; /* 최대 너비 유지 */
  background: linear-gradient(to bottom, #FFFFFF 0%, #CECECE 64%, #FFFFFF 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MoveText =styled.div`
  font-size: 15px;
  font-family: "Pretendard";
  color: #777777;
`;

const ProductImg =styled.div`
  margin-top: 20px;
  width: 402px;
  height: 402px;
  padding: 0px 40px;

`;

const Icon_180= styled(Image)`
    width: 24px;
    height: 24px;
    align-self: flex-end;
    margin-top: 2%;
    margin-right: 8%;

`;

const DetailInfo= styled.div`
    width: 100%;
    height: 97px;
    padding: 46px 30px 20px 30px;
    font-family: "Pretendard";
    font-size: 15px;
    display: flex;
    justify-content: space-between;
`;
const Divider1=styled.div`
    width: 20px;
    height: 30px;
    background-color: #2C3264;
`;

const Divider2=styled.div`
    width: 12px;
    height: 30px;
    background-color: #2C3264;

`;

const Divider3= styled.div`
    width: 37px;
    height: 30px;
    background-color: #2C3264;
`;

const Divider4= styled.div`
    width: 12px;
    height: 30px;
    background-color: #2C3264;

`;

const Divider5=styled.div`
    width: 20px;
    height: 30px;
    background-color: #2C3264;
`;


const PriceSection=styled.div`
    width: 209px;
    height: 229px;
    padding: 50px 30px 80px 30px;
    display: block;
    margin-right: auto;
`;

const Price=styled.div`
    font-family: "Pretendard";
    font-size: 20px;
    margin-bottom: 15px;
`;

const SubText=styled.div`
    font-family: "Pretendard";
    font-size: 10px;
    color: #777777;
    margin-bottom: 15px;
`;


const Purchase=styled.button`
    padding: 9px 21px;
    background-color: #2C3264;
    width: 114px;
    height: 34px;
    color: #FFFFFF;
    font-family:"Pretendard";
    font-size: 15px;
    display: flex; 
    align-items: center;
    justify-content: center;
`;


const ProductInfo =styled.div`
    width: 100%;
    height: 107px;
    padding: 20px 30px;
`;


const Box = styled.div`
    justify-content: space-between;
    display: flex;
`;

const InfoBox =styled.div`
    width: 104px;
    height: 39px;
    display: block;
    gap: 8px;
`;


const ProductInfo_Title = styled.div`
    font-family: "Pretendard";
    font-size: 14px;
    font-weight: bold;
`;

const ProductInfo_Sub = styled.div`
    font-family: "Pretendard";
    font-size: 12px;
    color: #777777;
`;

const MorInfo = styled.div`
    font-family: "Pretendard";
    font-size: 10px;
    color: #777777;
    margin-top: 15px;
`;


const Orderguide = styled.div`
    width: 100%;
    height: 300px;
    padding: 80px 20px;
    font-family: "Pretendard";
`;


const BigText =styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Content = styled.div`
  font-size: 13px;
  display: flex;
  align-items: center; 
  width: 100%; 
  margin-top: 10px;
  cursor: pointer; 
`;


const Arrow = styled(Image)`
  width: 8px;
    height: 8px;
    margin-left: 10px;
    flex-shrink: 0; 

`;

const Description_Title=styled.div`
    width: 100%
    padding: 20px 0px;
    font-family: "Pretendard";
    font-size: 20px;
    font-weight: bold;
    align-self: flex-start;
    margin-left: 20px;

`;

export default function InfoTab() {
    const router = useRouter();
    const { product, loading } = useProductStore();

    return (
        <Background>
            <MoveText>좌우로 움직여보세요</MoveText>
            <ProductImg>
                {product?.image_url ? (
                    <Image 
                        src={product.image_url} 
                        alt="상품 이미지" 
                        width={402} 
                        height={402} 
                        style={{ objectFit: "contain" }} 
                    />
                ) : (
                    <span style={{ color: "#fff" }}>이미지 없음</span>
                )}
            </ProductImg>
             <Icon_180 src="/images/icon_180.png" width={24} height={24} alt="아이콘"/>
            <DetailInfo>
                <Divider1/>남은 수량<Divider2/>{product ? product.stock : "불러오는 중..."}<Divider3/>총 생산량<Divider4/>{product?.total_production !== undefined ? product.total_production : "불러오는 중..."}<Divider5/>
            </DetailInfo>
            <PriceSection>
            <Price>
                    {product?.price !== null && product?.price !== undefined
                        ? `${Number(product.price).toLocaleString()} 원`
                    : "가격 미정"}
            </Price>
                <SubText>재생산 되지 않는 작품입니다.</SubText>
                <Purchase>구매하기</Purchase>
            </PriceSection>
            <ProductInfo>
                <Box>
                <InfoBox>
                    <ProductInfo_Title>크기</ProductInfo_Title>
                    <ProductInfo_Sub>
                        {product ? `${Math.round(product.width)}(W) x ${Math.round(product.height)}(H)` : "불러오는 중..."}
                    </ProductInfo_Sub>              
                </InfoBox>
                <InfoBox>
                    <ProductInfo_Title>소재</ProductInfo_Title>
                    <ProductInfo_Sub>{product?.material ?? "소재 정보 없음"}</ProductInfo_Sub>
                </InfoBox>
                <InfoBox>
                    <ProductInfo_Title>구성품</ProductInfo_Title>
                    <ProductInfo_Sub>항아리 1개</ProductInfo_Sub>
                </InfoBox>
                </Box>
                <MorInfo>자세한 측정 방법 및 소재는 작품 설명 하단을 참고해주시길 바랍니다.</MorInfo>
            </ProductInfo>
            <Orderguide>
                <BigText>구매 안내</BigText>
                <Content>구매 전 유의사항
                    <Arrow src="/images/right-arrow.png" width={8} height={8} alt="화살표"/>
                </Content>
                <Content>배송 안내
                <Arrow src="/images/right-arrow.png" width={8} height={8} alt="화살표"/>
                </Content>
                <Content>교환 및 반품
                <Arrow src="/images/right-arrow.png" width={8} height={8} alt="화살표"/>
                </Content>
                <Content>제품 문의
                <Arrow src="/images/right-arrow.png" width={8} height={8} alt="화살표"/>
                </Content>
            </Orderguide>
        </Background>
    );
  }
  