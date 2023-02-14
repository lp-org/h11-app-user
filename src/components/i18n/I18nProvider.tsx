import React, { useEffect, useState } from "react";
import { I18nProvider as LinguiI18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import { I18nContext } from "./I18nContext";
import { en, ms } from "make-plural/plurals";
// import plural rules for all locales

import { useAppState } from "store";
i18n.loadLocaleData({
  en: { plurals: en },
  ms: { plurals: ms },
});
export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const locale = useAppState((state) => state.locale);

  useEffect(() => {
    // Dynamically load the catalogs
    import(`../../locales/${locale}/messages`).then((module) => {
      const messages = module.messages;

      i18n.load(locale, messages);
      i18n.activate(locale);
    });
  }, [locale]);

  return (
    <I18nContext.Provider
      value={{
        locale,
      }}
    >
      <LinguiI18nProvider i18n={i18n}>{children}</LinguiI18nProvider>
    </I18nContext.Provider>
  );
};
