import { LocaleEnum } from "types/i18n";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface productStateWithoutLsState {
  loading: boolean;
  setLoading: (payload: boolean) => void;
  showTab: boolean;
  setShowTab: (payload: boolean) => void;
}

interface AppStateWithLs {
  locale: LocaleEnum;
  setLocale: (payload: LocaleEnum) => void;
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

export const useAppStateWithLs = create<AppStateWithLs>()(
  devtools(
    persist(
      (set) => ({
        locale: LocaleEnum.English,
        setLocale: (payload) =>
          set((state) => ({
            locale: payload,
          })),
      }),
      { name: "app" }
    )
  )
);
