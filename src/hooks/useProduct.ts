import { Photo } from "@capacitor/camera";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { environment } from "environment/environment";
import { useHistory } from "react-router";
import { useProductStore } from "store/useProductStore";
import { AddProductProps, Product } from "types/product";
import { request } from "utils/request";
import { usePopUpMessage } from "./notification";

export function useProductList() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> =>
      (await request.get("/product/showall")).data.data,
    cacheTime: 0.5 * 60 * 1000,
  });
}

export function useAddProduct() {
  const history = useHistory();
  const popUpMsg = usePopUpMessage();
  const uploadImage = useUploadProductImage();
  const dispatchClearTempProductSetup = useProductStore(
    (state) => state.clearTempProductSetup
  );
  return useMutation(
    async (payload: AddProductProps) => {
      const res = await request.post("/product/add", payload);
      if (res.data.code === 200) {
        if (payload.prd_image?.substring(0, 4) === "blob") {
          uploadImage.mutate({
            id: payload.prd_code,
            filebody: payload.prd_image,
          });
          //@ts-ignore
          delete payload["prd_image"];
        }
        popUpMsg("Product have been successfully created!", "success");
        return res;
      } else {
        popUpMsg(res.data.message, "error");
        throw new Error(res.data.message);
      }
    },
    {
      onSuccess: () => {
        history.push("/product");
        dispatchClearTempProductSetup();
      },
    }
  );
}

export function useEditProduct() {
  const history = useHistory();
  const queryClient = useQueryClient();
  const popUpMsg = usePopUpMessage();
  const uploadImage = useUploadProductImage();
  return useMutation(
    async ({ id, payload }: { id: string; payload: AddProductProps }) => {
      console.log(payload.prd_image?.substring(0, 3));
      if (payload.prd_image?.substring(0, 4) === "blob") {
        uploadImage.mutate({ id, filebody: payload.prd_image });
        //@ts-ignore
        delete payload["prd_image"];
      }

      const res = await request.post(`/product/edit/${id}`, payload);

      if (res.data.code === 200) {
        queryClient.invalidateQueries(["products"]);
        queryClient.invalidateQueries(["product", id]);
        popUpMsg("Product have been successfully updated!", "success");
        return res;
      } else {
        popUpMsg(res.data.message, "error");
        throw new Error(res.data.message);
      }
    },
    {
      onSuccess: () => {
        history.replace("/product");
      },
    }
  );
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

export function useUploadProductImage() {
  const { fileLimit } = environment;
  return useMutation(
    async ({ id, filebody }: { id: string; filebody: string }) => {
      if (filebody) {
        const fileExt = "png";
        const filename = `${Math.random()}.${fileExt}`;

        const res = await fetch(filebody);
        const blob = await res.blob();
        if (blob.size > fileLimit) {
          throw new Error("File size exceeded");
        }
        const formData = new FormData();
        formData.append("multiPartFile", blob, filename);
        return request.post(`/product/upload/${id}`, formData);
      }
    }
  );
}
