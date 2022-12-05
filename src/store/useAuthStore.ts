import dayjs from "dayjs";
import { QrInfo } from "hooks/useQrCode";

import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface authStoreState {
  previousAuth: boolean;

  token: string;
  setToken: (token: string) => void;
  removeToken: () => void;
}

export const useAuthStore = create<authStoreState>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        previousAuth: false,

        setToken: (payload) =>
          set((state) => ({
            previousAuth: true,
            token: payload,
          })),
        removeToken: () =>
          set((state) => ({
            previousAuth: false,
            token: "",
          })),
      }),
      {
        name: "auth ",
      }
    )
  )
);
