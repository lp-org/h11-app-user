import { products } from "mock/makeData";
import { AddProductProps, Product } from "types/product";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BearState {
  products: Product[];
  addProduct: (payload: AddProductProps) => void;
}

export const useProductStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        products: products,
        addProduct: (payload) =>
          set((state) => ({
            products: [
              ...state.products,
              {
                ...payload,
                prd_code: `P${String(state.products.length).padStart(4, "0")}`,
                prd_keep_it_fresh: "",
                prd_nutrition_info: "",
                prd_storage_instructions: "",
              },
            ],
          })),
      }),
      {
        name: "products-storage",
      }
    )
  )
);
