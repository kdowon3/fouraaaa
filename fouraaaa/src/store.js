import { create } from "zustand";

const useProductStore = create((set) => ({
  products: [], // 전체 상품
  soldoutProducts: [], // 품절 상품 (stock < 5)
  tenEditionProducts: [], // 한정판 상품 (stock < 10)
  sameAuthorProducts: [],
  newProducts: [], // 신작 상품 (등록 7일 이내)
  loading: false, // ✅ 로딩 상태 추가

  setProduct: (data) => set({ product: data }),
  setProducts: (data) => set({ products: data, loading: false }), // 전체 상품 설정
  setSoldoutProducts: (data) => set({ soldoutProducts: data.filter(p => p.stock < 5) }),
  setTenEditionProducts: (data) => set({ tenEditionProducts: data.filter(p => p.stock < 10) }),
  setNewProducts: (data) => set({
    newProducts: data.filter(p => {
      const createdDate = new Date(p.created_at);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return createdDate >= sevenDaysAgo;
    })
  }),
  setSameAuthorProducts: (data) => set({ sameAuthorProducts: data }), // ✅ 같은 작가 상품 저장

  setLoading: (status) => set({ loading: status }), // ✅ 로딩 상태 업데이트 추가
}));

export default useProductStore;
