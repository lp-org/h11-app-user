import { AddProductProps, Product } from "types/product";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BearState {
  recentProducts: Product[];
  addRecentProduct: (payload: AddProductProps) => void;
  tempProductSetup1: AddProductProps | null;
  tempProductSetup2: any | null;
  setTempProductSetup1: (payload: AddProductProps) => void;
  clearTempProductSetup1: () => void;
}

export const useProductStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        recentProducts: [],
        tempProductSetup1: null,
        tempProductSetup2: null,
        addRecentProduct: (payload) =>
          set((state) => ({
            recentProducts: [
              ...state.recentProducts,
              {
                ...payload,
                prd_code: `P${String(state.recentProducts.length).padStart(
                  4,
                  "0"
                )}`,
                prd_keep_it_fresh: "",
                prd_nutrition_json: "",
                prd_storage_instructions: "",
              },
            ],
          })),
        setTempProductSetup1: (payload) =>
          set((state) => ({
            tempProductSetup1: { ...payload },
          })),

        clearTempProductSetup1: () =>
          set((state) => ({
            tempProductSetup1: null,
          })),
      }),
      {
        name: "products-storage",
      }
    )
  )
);
