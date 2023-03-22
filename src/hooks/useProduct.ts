import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { LanguageString } from "types/i18n";

import { PaginationProps, Product, ProductResponse } from "types/product";
import { request } from "utils/request";
import { useLanguage } from "./useLanguage";

export function useProductList() {
  const { getString } = useLanguage();
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<
      {
        result: Product[];
      } & PaginationProps
    > => {
      const res = await request.get<
        AxiosResponse<ProductResponse[]> & PaginationProps
      >("/product/showall");
      const { totalPages, totalElements, nextCursor } = res.data;
      const products = res.data.data;
      const result = products.map((payload) => getResponse(payload, getString));

      return { result, totalPages, totalElements, nextCursor };
    },
    getNextPageParam: ({ nextCursor, totalElements, totalPages }) => ({
      nextCursor,
      totalElements,
      totalPages,
    }),
  });
}

interface useProductPaginationProps {
  keyword?: string | null;
  type?: string;
  size?: number;
}

export function useProductPagination({
  keyword = "",
  type = "active",
  size = 5,
}: useProductPaginationProps = {}) {
  let page = 0;
  let url = "/product/showall-active";
  if (type === "archived") {
    url = "/product/showall-archived";
  }
  if (keyword) {
    if (type === "active") {
      url = "/product/search-active-products";
    } else {
      url = "/product/search-archived-products";
    }
  }
  const { getString, lang } = useLanguage();
  return useInfiniteQuery({
    queryKey: ["products", page, keyword, type],
    queryFn: async ({
      pageParam,
    }): Promise<
      {
        result: Product[];
      } & PaginationProps
    > => {
      let res;
      if (keyword) {
        res = await request.post<
          AxiosResponse<ProductResponse[]> & PaginationProps
        >(
          url,
          {
            language_code: lang,
            keyword,
          },
          { params: { page: pageParam?.page || 0, size } }
        );
      } else {
        res = await request.get<
          AxiosResponse<ProductResponse[]> & PaginationProps
        >(url, { params: { page: pageParam?.page || 0, size } });
      }

      const { totalPages, totalElements, nextCursor } = res.data;
      const products = res.data.data;
      const result = products.map((payload) => getResponse(payload, getString));

      return { result, totalPages, totalElements, nextCursor };
    },
    getNextPageParam: ({ nextCursor, totalElements, totalPages }) =>
      nextCursor
        ? {
            page: page + 1,
            nextCursor,
            totalElements,
            totalPages,
          }
        : undefined,
  });
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
    prd_archived,
  } = payload;

  return {
    prd_code,
    prd_image,
    prd_expiry_period,
    prd_archived,
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
