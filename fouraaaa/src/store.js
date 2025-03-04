import { create } from "zustand";

// ✅ Zustand Store 생성
const useProductStore = create((set) => ({
  product: null,
  sameAuthorProducts: [],
  loading: false, // ✅ 로딩 상태 추가

  setProduct: (data) => set({ product: data, loading: false }), // ✅ 로딩 완료
  setSameAuthorProducts: (data) => set({ sameAuthorProducts: data }),
  setLoading: (state) => set({ loading: state }), // ✅ 로딩 상태 업데이트
}));

export default useProductStore;
