import { t } from "@lingui/macro";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useScanHistoryStore } from "store/useScanHistoryStore";
import { LanguageString } from "types/i18n";
import {
  Blockchain,
  BlockchainResponse,
  QrInfo,
  QrInfoResponse,
  VerifyQrInfo,
  VerifyQrInfoResponse,
} from "types/qrCode";
import { request } from "utils/request";
import { requestV2 } from "utils/request";
import { usePopUpMessage } from "./notification";
import { useLanguage } from "./useLanguage";

export function useBlockchainList() {
  const { getString } = useLanguage();
  return useQuery({
    queryKey: ["blockchainList"],
    queryFn: async (): Promise<Blockchain[]> => {
      const blockchains = (
        await request.get<AxiosResponse<BlockchainResponse[]>>(
          `/blockchain/showall`
        )
      ).data.data;
      return blockchains.map((payload) => getResponse(payload, getString));
    },
  });
}

// export function useGetBlockchainInfo(code: string) {
//   return useQuery({
//     queryKey: ["blockchainInfo", code],
//     queryFn: async (): Promise<BlockchainQrInfo> =>
//       await (
//         await request.get(`/blockchain/show/${code}`)
//       ).data.data,
//   });
// }

interface BlockchainAddPayload {
  bc_pbth_code: string;
}

export function useAddBlockchainInfo() {
  const popUpMsg = usePopUpMessage();
  return useMutation(async (payload: BlockchainAddPayload) => {
    const res = await requestV2.post(`/blockchain/add`, payload);
    if (res.data.code === 200) {
      popUpMsg(
        t({ id: "Print request has successfully been sent!" }),
        "success"
      );
      return res;
    } else {
      popUpMsg(res.data.message, "error");
      throw new Error(res.data.message);
    }
  });
}

export function useGetQrInfoByBatchId(code: string) {
  const { getString } = useLanguage();
  return useQuery({
    queryFn: async (): Promise<QrInfo> => {
      const qrInfo = (
        await requestV2.get<AxiosResponse<QrInfoResponse>>(
          `/blockchain/getqrinfo/${code}`
        )
      ).data.data;
      const {
        bc_count,
        bc_pbth_code,
        bc_pbth_expiry_date,
        bc_pbth_manufactured_date,
        bc_prd_code,
        bc_prd_flavour,
        bc_prd_ingredients,
        bc_prd_name,
      } = qrInfo;
      return {
        bc_count,
        bc_pbth_code,
        bc_pbth_expiry_date,
        bc_pbth_manufactured_date,
        bc_prd_code,
        bc_prd_flavour: getString(bc_prd_flavour),
        bc_prd_ingredients: getString(bc_prd_ingredients),
        bc_prd_name: getString(bc_prd_name),
      };
    },
  });
}

interface ResponseTypes {
  code: number;
  message: string;
}

export function useScanResult(code: string) {
  const popUpMsg = usePopUpMessage();
  const dispatchAddScanHistory = useScanHistoryStore(
    (state) => state.addScanHistory
  );
  const queryClient = new QueryClient();
  const { getString } = useLanguage();
  return useQuery({
    queryKey: ["scanResult", code],
    queryFn: async (): Promise<VerifyQrInfo | null> => {
      if (code) {
        const res = await requestV2.get<
          AxiosResponse<VerifyQrInfoResponse> & ResponseTypes
        >(`/blockchain/verify/${code}`);

        if (res.data.code !== 200) {
          popUpMsg(res.data.message, "error");
          throw new Error(res.data.message);
        }
        const verifyData = res.data.data;

        const {
          bc_qr_code_image,
          bc_pbth_code,
          bc_pbth_expiry_date,
          bc_pbth_manufactured_date,
          bc_prd_category,
          bc_prd_code,
          bc_prd_flavour,
          bc_prd_image,
          bc_prd_ingredients,
          bc_prd_keep_it_fresh,
          bc_prd_name,
          bc_prd_nutrition_json,
          bc_prd_storage_instructions,
          bc_prd_type,
          bc_qr_code,
        } = verifyData;

        return {
          bc_qr_code_image,
          bc_pbth_code,
          bc_pbth_expiry_date,
          bc_pbth_manufactured_date,
          bc_prd_code,
          bc_prd_image,
          bc_qr_code,
          bc_prd_category: getString(bc_prd_category),
          bc_prd_flavour: getString(bc_prd_flavour),
          bc_prd_ingredients: getString(bc_prd_ingredients),
          bc_prd_keep_it_fresh: getString(bc_prd_keep_it_fresh),
          bc_prd_name: getString(bc_prd_name),
          bc_prd_nutrition_json: getString(bc_prd_nutrition_json),
          bc_prd_storage_instructions: getString(bc_prd_storage_instructions),
          bc_prd_type: getString(bc_prd_type),
        };
      } else {
        popUpMsg("Url not available", "error");
      }
      return null;
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.removeQueries({ queryKey: ["scanHistory"] });
        dispatchAddScanHistory(data);
      }
    },
    enabled: !!code,
  });
}

function getResponse(
  payload: BlockchainResponse,
  get: (p: LanguageString) => string
) {
  const {
    bc_pbth_code,
    bc_pbth_expiry_date,
    bc_pbth_manufactured_date,
    bc_qr_code,
    bc_prd_code,
    // Not required language

    bc_prd_flavour,
    bc_prd_ingredients,
    bc_prd_name,
  } = payload;

  return {
    bc_pbth_code,
    bc_pbth_expiry_date,
    bc_pbth_manufactured_date,
    bc_qr_code,
    bc_prd_code,

    bc_prd_flavour: get(bc_prd_flavour),
    bc_prd_ingredients: get(bc_prd_ingredients),
    bc_prd_name: get(bc_prd_name),
  };
}
