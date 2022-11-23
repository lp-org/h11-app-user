import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useHistory } from "react-router";
import { useProductStore } from "store";
import { AddProductProps, Product } from "types/product";
import { request } from "utils/request";

export function useProductList() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> =>
      (await request.get("/product/showall")).data.data,
  });
}

export function useAddProduct() {
  const history = useHistory();

  return useMutation(
    async (payload: AddProductProps) =>
      await request.post("/product/add", payload),
    {
      onSuccess: () => history.push("/product"),
    }
  );
}

export function useGetProductById(code: string) {
  return useQuery({
    queryFn: async (): Promise<Product> =>
      (await request.get(`/product/show/${code}`)).data.data,
  });
}
