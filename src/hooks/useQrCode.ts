import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "utils/request";

export interface QrInfo {
  bc_qr_code: string;
  bc_prd_code: string;
  bc_prd_name: string;
  bc_prd_flavour: string;
  bc_prd_ingredients: string;
  bc_pbth_code: string;
  bc_pbth_manufactured_date: string;
  bc_pbth_expiry_date: string;
}

export interface BlockchainQrInfo extends QrInfo {
  bc_qr_code_image: string;
}

export function useBlockchainList() {
  return useQuery({
    queryKey: ["blockchainList"],
    queryFn: async (): Promise<QrInfo[]> =>
      await (
        await request.get(`/blockchain/showall`)
      ).data.data,
  });
}

export function useGetBlockchainInfo(code: string) {
  return useQuery({
    queryKey: ["blockchainInfo", code],
    queryFn: async (): Promise<BlockchainQrInfo> =>
      await (
        await request.get(`/blockchain/show/${code}`)
      ).data.data,
  });
}

export function useAddBlockchainInfo() {
  return useMutation(
    async (payload: QrInfo) => await request.post(`/blockchain/add`, payload),
    {
      onSuccess: () => {
        console.log("printed");
      },
    }
  );
}

export function useGetQrInfoByBatchId(code: string) {
  return useQuery({
    queryFn: async (): Promise<QrInfo> =>
      (await request.get(`/blockchain/getqrinfo/${code}`)).data.data,
  });
}
