"use client";

import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Slider from "react-slick"; // ✅ react-slick 사용
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

// 배너 컨테이너 (1:1 비율 유지)
const BannerContainer = styled.div`
 // ✅ 배경 그라데이션 적용 (80% 현재 색상, 20% 흰색)
  background: linear-gradient(to bottom, #E1EAF4 80%, #ffffff 20%);
  width: 100%;
  max-width: 430px;
  aspect-ratio: 1 / 1;
  margin: 0 auto;
  height: auto;
`;


// 배너 슬라이드 아이템
const SlideItem = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  transform: scale(${(props) => (props.$active ? 1 : 0.95)});
`;

// 페이지네이션 (네모 모양)
const PaginationContainer = styled.div`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
`;

// 페이지네이션 개별 버튼 (active 속성을 CSS에서만 처리)
const Dot = styled.div`
  width: ${({ $active }) => ($active ? "13px" : "5px")};
  height: 9px;
  background-color: rgba(255, 255, 255, 0.4); // ✅ ffffff + 40% 투명도
  opacity: 1; // ✅ 투명도는 background-color에서 처리
  border-radius: 2px;
  cursor: pointer;
  transition: width 0.2s ease-in-out;
`;

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0); // 현재 슬라이드 상태
  const sliderRef = useRef(null); 

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/banners/");
        if (!response.ok) {
          throw new Error(`서버 오류: ${response.status}`);
        }
        const data = await response.json();
        setBanners(data.banners);
      } catch (error) {
        console.error("❌ 배너 불러오기 실패:", error);
      }
    };
    

    fetchBanners();
  }, []);

  const settings = {
    dots: false, // ✅ 기본 도트 비활성화 (커스텀 페이지네이션 사용)
    infinite: true,
    speed: 500,
    slidesToShow: 1, // ✅ 한 번에 하나의 배너만 표시
    slidesToScroll: 1,
    autoplay: false,
    accessibility: false, // ✅ `aria-hidden` 오류 해결
    adaptiveHeight: true,
    centerMode: true, // ✅ 양옆 슬라이드 일부 보이게 설정
    centerPadding: "8%",
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex), // ✅ 현재 슬라이드 업데이트
  };

  // ✅ Dot 클릭 시 해당 슬라이드로 이동 (이제 정상 작동)
  const goToSlide = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
      setCurrentSlide(index); // ✅ 현재 슬라이드 상태도 업데이트
    }
  };

  
  return (
    <BannerContainer>
      <Slider ref={sliderRef} {...settings}>
        {banners.length > 0 ? (
          banners.map((banner, index) => (
            <SlideItem key={banner.id} $active={index === currentSlide} tabIndex={index === currentSlide ? 0 : -1}>
              <Image
                src={banner.image_url}
                alt={`배너 ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
              <PaginationContainer>
              {banners.map((_, index) => (
                <Dot
                  key={index}
                  $active={index === currentSlide} // ✅ $active로 변경하여 스타일 내부에서만 처리
                  onClick={() => goToSlide(index)}
                />
              ))}
            </PaginationContainer>
            </SlideItem>
              
          ))
          
        ) : (
          <SlideItem>
            <div style={{ color: "#fff", textAlign: "center", paddingTop: "50%" }}>
              배너 로딩 중...
            </div>
          </SlideItem>
        )}
      </Slider>
    </BannerContainer>
  );
}
