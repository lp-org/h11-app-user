import React, { useContext } from "react";
import { LocaleEnum, I18nContextProps } from "types/i18n";

const InitialState: I18nContextProps = {
  locale: LocaleEnum.English,
  setLocale: () => undefined,
};

export const I18nContext = React.createContext<I18nContextProps>(InitialState);

export const useI18nContext = (): I18nContextProps => {
  const context = useContext<I18nContextProps>(I18nContext);

  if (context === null) {
    throw new Error(
      '"useI18nContext" should be used inside a "I18nContextProvider"'
    );
  }

  return context;
};
