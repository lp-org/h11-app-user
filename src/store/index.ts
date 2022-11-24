import { AddProductProps, Product } from "types/product";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BearState {
  recentProducts: Product[];
  addRecentProduct: (payload: AddProductProps) => void;
  tempProductSetup: AddProductProps | null;

  setTempProductSetup: (payload: AddProductProps) => void;
  clearTempProductSetup: () => void;
}

interface productStateWithoutLsState {
  tempProductEdit: AddProductProps | null;

  setTempProductEdit: (payload: AddProductProps) => void;
  clearTempProductEdit: () => void;
}

export const useProductStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        recentProducts: [],
        tempProductSetup: null,

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
        setTempProductSetup: (payload) =>
          set((state) => ({
            tempProductSetup: { ...payload },
          })),

        clearTempProductSetup: () =>
          set((state) => ({
            tempProductSetup: null,
          })),
      }),
      {
        name: "products-storage",
      }
    )
  )
);

export const useProductWithoutLsStore = create<productStateWithoutLsState>()(
  devtools((set) => ({
    tempProductEdit: null,

    setTempProductEdit: (payload) =>
      set((state) => ({
        tempProductEdit: { ...payload },
      })),

    clearTempProductEdit: () =>
      set((state) => ({
        tempProductEdit: null,
      })),
  }))
);
