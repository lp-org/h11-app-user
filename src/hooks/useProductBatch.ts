import { useMutation, useQuery } from "@tanstack/react-query";
import { useHistory } from "react-router";
import { AddProductBatchProps, ProductBatch } from "types/productBatch";
import { request } from "utils/request";
import { usePopUpMessage } from "./notification";

interface ProductBatchInfo {
  pbth_code: string;
  pbth_expiry_date: string;
  pbth_manufactured_date: string;
}

export function useProductBatchList() {
  return useQuery({
    queryKey: ["productBatchList"],
    queryFn: async (): Promise<ProductBatch[]> =>
      (await request.get("/product_batch/showall")).data.data,
  });
}

export function useAddProductBatch() {
  const history = useHistory();
  const popUpMsg = usePopUpMessage();
  return useMutation(
    async (payload: AddProductBatchProps) => {
      const res = await request.post("/product_batch/add", payload);
      if (res.data.code === 200) {
        popUpMsg("Product batch have been successfully created!", "success");
        return res;
      } else {
        popUpMsg(res.data.message, "error");
        throw new Error(res.data.message);
      }
    },
    {
      onSuccess: () => {
        history.replace("/productBatch");
      },
    }
  );
}

export function useGetProductBatchById(code: string) {
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
