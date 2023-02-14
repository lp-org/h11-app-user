import { LocaleEnum } from "types/i18n";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface productStateWithoutLsState {
  loading: boolean;
  setLoading: (payload: boolean) => void;
  showTab: boolean;
  setShowTab: (payload: boolean) => void;
  locale: LocaleEnum;
  setLocale: (payload: LocaleEnum) => void;
}

export const useAppState = create<productStateWithoutLsState>()(
  devtools((set) => ({
    loading: false,
    showTab: false,
    locale: LocaleEnum.English,
    setLocale: (payload) =>
      set((state) => ({
        locale: payload,
      })),
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
