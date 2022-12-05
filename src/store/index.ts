import create from "zustand";
import { devtools } from "zustand/middleware";

interface productStateWithoutLsState {
  loading: boolean;
  setLoading: (payload: boolean) => void;
}

export const useAppState = create<productStateWithoutLsState>()(
  devtools((set) => ({
    loading: false,
    setLoading: (payload) =>
      set((state) => ({
        loading: payload,
      })),
  }))
);
