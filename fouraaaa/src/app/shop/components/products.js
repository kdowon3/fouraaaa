"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link"

const ProductsContainer = styled.div`
  background-color: #FFFFFF;
  width: 100%;
  max-width: 430px;
  padding: 0 5% 7% 5%;
  display: block;
  position: relative;
`;

const FilterNav = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
  padding: 10px 5%;
  border-radius: 5px;
  position: sticky;
  margin-bottom: 10px;
  background-color: white;
  margin-top: 0px;  
  z-index: 10;
`;

const FilterButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})`
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-family: 'Pretendard';
  background: ${(props) => (props.isActive ? "#2C3264" : "#EDEDED")};
  color: ${(props) => (props.isActive ? "#FFFFFF" : "#000000")};
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  gap: 5px;
`;

const DetailNav = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isVisible",
})`
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
  align-items: center;
  width: 100%;
  margin-top: 5px;
  justify-content: space-between;
  padding: 10px 5%;
  background-color: white;
  position: relative;
  z-index: 9;
`;


const DetailNavItem = styled.button`
  background: #FFFFFF;
  color: #000000;
  border: none;
  font-size: 14px;
  font-family: 'Pretendard';
  cursor: pointer;
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
`;

// ✅ Divider 복구
const Divider1 = styled.div`
  width: 8px;
  height: 30px;
  background-color: #2C3264;
`;

const Divider2 = styled.div`
  width: 155px;
  height: 30px;
  background-color: #2C3264;
`;

const Divider3 = styled.div`
  width: 78px;
  height: 30px;
  background-color: #2C3264;
`;

const Divider4 = styled.div`
  width: 133px;
  height: 30px;
  background-color: #2C3264;
`;

const ProductContainer = styled.div`
  width: 100%;
  margin-top: ${({ hasActiveFilter }) => (hasActiveFilter ? "50px" : "0px")};
  transition: margin-top 0.3s ease;
  display: grid;
  grid-template-columns: repeat(2, 48%);
  gap: 4%;
`;

const ProductCards = styled.div`
  background-color: #EDEDED;
  display: flex;
  flex-direction: column;
  width: 100%;
  aspect-ratio: 1.5;
  justify-content: space-between;
  position: relative;
`;

const ProductsPhoto = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background-color: #D9D9D9;
  position: relative;
  padding: 5% 6%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled(Image)`
  width: 80%;
  height: auto;
`;

const StockSection = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  position: absolute;
  bottom: 5%;
  right: 2%;
  justify-content: flex-end;
  font-size: 12px;
  font-family: "Pretendard", sans-serif;
  color: #2C3264;
`;

const StockBadge = styled.div`
  background-color: #2C3264;
  color: #FFFFFF;
  font-size: 10px;
  padding: 2px 6px;
`;

const ProductInfo = styled.div`
  font-family: "Pretendard";
  padding: 5% 5%;
`;

const Company = styled.div`
  font-size: 100%;
  font-weight: bold;
  color: #000000;
`;

const ProductName = styled.div`
  font-size: 100%;
  color: #8A8A8A;
  margin-top: 2%;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 3%;
  padding: 5%;
`;

const Price = styled.div`
  font-size: 110%;
  color: #111111;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 45%;
  gap: 10px;
`;

const PageButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "active", // ✅ active 속성 필터링
})`
  background-color: ${(props) => (props.active ? "#2C3264" : "#EDEDED")};
  color: ${(props) => (props.active ? "#FFFFFF" : "#000000")};
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  font-size: 14px;
`;


export default function Products() {
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    material: "",
    is_new: false,
    low_stock: false,
  });

  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null); // 🔥 DetailNav 필터 토글 상태 추가
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [selectedFilters, page]);

  const fetchProducts = async () => {
    try {
      const queryParams = new URLSearchParams();

      if (selectedFilters.category) queryParams.append("category", selectedFilters.category);
      if (selectedFilters.material) queryParams.append("material", selectedFilters.material);
      if (selectedFilters.is_new) queryParams.append("is_new", "true");
      if (selectedFilters.low_stock) queryParams.append("low_stock", "true");
      queryParams.append("page", page);

      const queryString = queryParams.toString();
      const url = `http://localhost:8000/api/products/${queryString ? `?${queryString}` : ""}`;

      console.log("🔗 Fetching:", url);
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.results || [] );
      setTotalPages(Math.max(1, Math.ceil((data.count || 0) / 8)));
    } catch (error) {
      console.error("상품 데이터 로딩 오류:", error);
    }
  };

  const toggleFilter = (filter) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const handleCategorySelect = (category) => {
    setSelectedFilters((prev) => ({
      ...prev,
      category: prev.category === category ? "" : category,
    }));
    setActiveFilter(null);
  };

  const handleMaterialSelect = (material) => {
    setSelectedFilters((prev) => ({
      ...prev,
      material: prev.material === material ? "" : material,
    }));
    setActiveFilter(null);
  };

  return (
    <ProductsContainer>
      <FilterNav>
        <FilterButton isActive={selectedFilters.category} onClick={() => setActiveFilter("category")}>
          종류
        </FilterButton>
        <FilterButton isActive={selectedFilters.material} onClick={() => setActiveFilter("material")}>
          재료
        </FilterButton>
        <FilterButton isActive={selectedFilters.is_new} onClick={() => toggleFilter("is_new")}>
          신작
        </FilterButton>
        <FilterButton isActive={selectedFilters.low_stock} onClick={() => toggleFilter("low_stock")}>
          재고 10개 이하
        </FilterButton>
      </FilterNav>
      {/* 🔥 종류 DetailNav */}
      <DetailNav isVisible={activeFilter === "category"}>
        <Divider1 />
        <DetailNavItem selected={selectedFilters.category === "식기"} onClick={() => handleCategorySelect("식기")}>
          식기
        </DetailNavItem>
        <Divider1 />
        <DetailNavItem selected={selectedFilters.category === "오브제"} onClick={() => handleCategorySelect("오브제")}>
          오브제
        </DetailNavItem>
        <Divider1 />
        <DetailNavItem selected={selectedFilters.category === "아트퍼니처"} onClick={() => handleCategorySelect("아트퍼니처")}>
          아트퍼니처
        </DetailNavItem>
        <Divider2 />
      </DetailNav>

      {/* 🔥 재료 DetailNav */}
      <DetailNav isVisible={activeFilter === "material"}>
        <Divider1 />
        <DetailNavItem selected={selectedFilters.material === "도자"} onClick={() => handleMaterialSelect("도자")}>
          도자
        </DetailNavItem>
        <Divider1 />
        <DetailNavItem selected={selectedFilters.material === "유리"} onClick={() => handleMaterialSelect("유리")}>
          유리
        </DetailNavItem>
        <Divider1 />
        <DetailNavItem selected={selectedFilters.material === "금속"} onClick={() => handleMaterialSelect("금속")}>
          금속
        </DetailNavItem>
        <Divider2 />
      </DetailNav>
      <ProductContainer>
        {products.map((product) => (
          <ProductCards key={product.id}>
          <Link href={`/shop/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <ProductInfo>
                <Company>{product.author}</Company>
                <ProductName>{product.name}</ProductName>
              </ProductInfo>
              <ProductsPhoto>
                {product.image_url ? (
                  <Image 
                    src={product.image_url} 
                    alt={product.name} 
                    width={120} 
                    height={120} 
                    unoptimized 
                  />
                ) : (
                  <span>이미지 없음</span>
                )}
              </ProductsPhoto>
              <StockSection>
                <p>재고</p>
                <StockBadge>{product.stock}개</StockBadge> 
              </StockSection>
              <PriceContainer>
                <Price>{product.price ? `${product.price.toLocaleString()} 원` : "가격 미정"}</Price>
              </PriceContainer>
          </Link>
        </ProductCards>
        ))}
      </ProductContainer>
      <PaginationContainer>
        <PageButton disabled={page === 1} onClick={() => setPage(page - 1)}>이전</PageButton>
        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton key={index} active={index + 1 === page} onClick={() => setPage(index + 1)}>
            {index + 1}
          </PageButton>
        ))}
        <PageButton disabled={page === totalPages} onClick={() => setPage(page + 1)}>다음</PageButton>
      </PaginationContainer>
    </ProductsContainer>
  );
}
