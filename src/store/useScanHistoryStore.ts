import dayjs from "dayjs";
import { QrInfo } from "hooks/useQrCode";

import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface QrInfoWithKey extends QrInfo {
  key: number;
  timestamp: number;
}

interface scanHistoryState {
  scanHistoryList: QrInfoWithKey[];

  addScanHistory: (payload: QrInfo) => void;
  removeScanHistoryById: (keys: number[]) => void;
  clearScanHistory: () => void;
}

export const useScanHistoryStore = create<scanHistoryState>()(
  devtools(
    persist(
      (set) => ({
        scanHistoryList: [],
        addScanHistory: (payload) =>
          set((state) => ({
            scanHistoryList: [
              ...state.scanHistoryList,
              {
                ...payload,
                key: state.scanHistoryList.length,
                timestamp: dayjs().unix(),
              },
            ],
          })),
        removeScanHistoryById: (keys) =>
          set((state) => ({
            scanHistoryList: state.scanHistoryList.filter(
              (el) => !keys.includes(el.key)
            ),
          })),
        clearScanHistory: () =>
          set((state) => ({
            scanHistoryList: [],
          })),
      }),
      {
        name: "products-scan-storage",
      }
    )
  )
);
