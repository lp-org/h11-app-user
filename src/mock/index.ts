import { useMutation, useQuery } from "@tanstack/react-query";
import { useHistory } from "react-router";
import { useProductStore } from "store";
import { AddProductProps } from "types/product";

export function useProductList() {
  const products = useProductStore((state) => state.products);
  return useQuery({
    queryKey: ["products"],
    queryFn: () => products,
  });
}

export function useAddProduct() {
  const history = useHistory();
  const addProduct = useProductStore((state) => state.addProduct);
  return useMutation(async (payload: AddProductProps) => addProduct(payload), {
    onSuccess: () => history.push("/product"),
  });
}

export function useGetProductById(code: string) {
  const products = useProductStore((state) => state.products);
  return useQuery({
    queryFn: () => products.find((el) => el.prd_code === code),
  });
}
