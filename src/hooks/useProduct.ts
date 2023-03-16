import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { environment } from "environment/environment";
import { useHistory } from "react-router";
import { useProductStore } from "store/useProductStore";
import { LanguageString } from "types/i18n";
import {
  AddProductProps,
  AddProductRequestProps,
  Product,
  ProductResponse,
} from "types/product";
import { requestV2 as request } from "utils/request";
import { usePopUpMessage } from "./notification";
import { useLanguage } from "./useLanguage";

export function useProductList() {
  const { getString } = useLanguage();
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const res = await request.get<AxiosResponse<ProductResponse[]>>(
        "/product/showall"
      );
      const products = res.data.data;
      const result = products.map((payload) => getResponse(payload, getString));
      return result;
    },
  });
}

export function useAddProduct() {
  const history = useHistory();
  const popUpMsg = usePopUpMessage();
  const uploadImage = useUploadProductImage();
  const dispatchClearTempProductSetup = useProductStore(
    (state) => state.clearTempProductSetup
  );
  const { setLangRequest } = useLanguage();
  return useMutation(
    async (payload: AddProductProps) => {
      const prd_image = payload.prd_image;
      delete payload["prd_image"];
      const res = await request.post<
        any,
        AxiosResponse<any, any>,
        AddProductRequestProps
      >("/product/add", processPayload(payload, setLangRequest));
      if (res.data.code === 200) {
        if (prd_image?.substring(0, 4) === "blob") {
          uploadImage.mutate({
            id: payload.prd_code,
            filebody: prd_image,
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
  const { setLangRequest } = useLanguage();
  return useMutation(
    async ({ id, payload }: { id: string; payload: AddProductProps }) => {
      if (payload.prd_image?.substring(0, 4) === "blob") {
        uploadImage.mutate({ id, filebody: payload.prd_image });
        //@ts-ignore
        delete payload["prd_image"];
      }

      const res = await request.post<
        any,
        AxiosResponse<any, any>,
        AddProductRequestProps
      >(`/product/edit/${id}`, processPayload(payload, setLangRequest));

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
  const { getString } = useLanguage();
  return useQuery({
    queryKey: ["product", code],
    queryFn: async (): Promise<Product> => {
      const product = (
        await request.get<AxiosResponse<ProductResponse>>(
          `/product/show/${code}`
        )
      ).data.data;
      return getResponse(product, getString);
    },
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

function processPayload(
  payload: AddProductProps,
  set: (p: string) => LanguageString
) {
  const {
    prd_category,
    prd_flavour,
    prd_ingredients,
    prd_keep_it_fresh,
    prd_name,
    prd_nutrition_json,
    prd_storage_instructions,
    prd_type,
    // Not required language
    prd_code,
    prd_image,
    prd_expiry_period,
  } = payload;

  return {
    prd_code,
    prd_image,
    prd_expiry_period,

    prd_category: set(prd_category),
    prd_flavour: set(prd_flavour),
    prd_ingredients: set(prd_ingredients),
    prd_keep_it_fresh: set(prd_keep_it_fresh),
    prd_name: set(prd_name),
    prd_nutrition_json: set(prd_nutrition_json),
    prd_storage_instructions: set(prd_storage_instructions),
    prd_type: set(prd_type),
  };
}

function getResponse(
  payload: ProductResponse,
  get: (p: LanguageString) => string
) {
  const {
    prd_category,
    prd_flavour,
    prd_ingredients,
    prd_keep_it_fresh,
    prd_name,
    prd_nutrition_json,
    prd_storage_instructions,
    prd_type,
    // Not required language
    prd_code,
    prd_image,
    prd_expiry_period,
  } = payload;

  return {
    prd_code,
    prd_image,
    prd_expiry_period,

    prd_category: get(prd_category),
    prd_flavour: get(prd_flavour),
    prd_ingredients: get(prd_ingredients),
    prd_keep_it_fresh: get(prd_keep_it_fresh),
    prd_name: get(prd_name),
    prd_nutrition_json: get(prd_nutrition_json),
    prd_storage_instructions: get(prd_storage_instructions),
    prd_type: get(prd_type),
  };
}
