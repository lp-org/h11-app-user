import { useMutation, useQuery } from "@tanstack/react-query";
import { useScanHistoryStore } from "store/useScanHistoryStore";
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
  bc_prd_image: string;
  bc_prd_category: string;
  bc_prd_type: string;
  bc_prd_instruction: string;
  bc_prd_keep_it_fresh: string;
  bc_nutrition_json: string;
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

export function useScanResult(code: string) {
  const dispatchAddScanHistory = useScanHistoryStore(
    (state) => state.addScanHistory
  );
  return useQuery({
    queryKey: ["scanResult", code],
    queryFn: async (): Promise<QrInfo | null> => {
      if (code) {
        const { data } = (await request.get(`/blockchain/verify/${code}`)).data;

        return data;
      }
      return null;
    },
    onSuccess: (data) => {
      if (data) dispatchAddScanHistory(data);
    },
    enabled: !!code,
  });
}
