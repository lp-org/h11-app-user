import { useQuery } from "@tanstack/react-query";

import { Product } from "types/product";
import { request } from "utils/request";

export function useProductList() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> =>
      (await request.get("/product/showall")).data.data,
  });
}

export function useGetProductById(code: string) {
  return useQuery({
    queryKey: ["product", code],
    queryFn: async (): Promise<Product> =>
      (await request.get(`/product/show/${code}`)).data.data,
  });
}

export function useGetProductId() {
  return useQuery({
    queryFn: async (): Promise<string> =>
      (await request.get(`/product/getproductcode`)).data.data.New_Product_Code,
  });
}
