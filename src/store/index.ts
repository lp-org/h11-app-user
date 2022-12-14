import create from "zustand";
import { devtools } from "zustand/middleware";

interface productStateWithoutLsState {
  loading: boolean;
  setLoading: (payload: boolean) => void;
  showTab: boolean;
  setShowTab: (payload: boolean) => void;
}

export const useAppState = create<productStateWithoutLsState>()(
  devtools((set) => ({
    loading: false,
    showTab: false,
    setLoading: (payload) =>
      set((state) => ({
        loading: payload,
      })),
    setShowTab: (payload) =>
      set((state) => ({
        showTab: payload,
      })),
  }))
);
