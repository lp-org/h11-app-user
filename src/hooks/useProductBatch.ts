import { useMutation, useQuery } from "@tanstack/react-query";

import { useHistory } from "react-router";
import { useProductStore } from "store";
import { AddProductBatchProps, ProductBatch } from "types/productBatch";
import { request } from "utils/request";

interface ProductBatchInfo {
  pbth_code: string;
  pbth_expiry_date: string;
  pbth_manufactured_date: string;
}

export function useProductBatchList() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<ProductBatch[]> =>
      (await request.get("/product_batch/showall")).data.data,
  });
}

export function useAddProduct() {
  const history = useHistory();
  const dispatchClearTempProductSetup = useProductStore(
    (state) => state.clearTempProductSetup
  );
  return useMutation(
    async (payload: AddProductBatchProps) =>
      await request.post("/product_batch/add", payload),
    {
      onSuccess: () => {
        history.push("/productBatch");
        dispatchClearTempProductSetup();
      },
    }
  );
}

export function useGetProductById(code: string) {
  return useQuery({
    queryFn: async (): Promise<ProductBatch> =>
      (await request.get(`/product_batch/show/${code}`)).data.data,
  });
}

export function useGetProducBatchCodeByProductId(code: string) {
  return useQuery({
    queryKey: ["productBatchId", code],
    queryFn: async (): Promise<ProductBatchInfo> =>
      (await request.get(`/product_batch/getbatchinfo/${code}`)).data.data,
    enabled: !!code,
  });
}
