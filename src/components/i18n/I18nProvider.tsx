import React, { useEffect, useState } from "react";
import { I18nProvider as LinguiI18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import { I18nContext } from "./I18nContext";

// import plural rules for all locales
import { en } from "make-plural/plurals";
import { LocaleEnum } from "types/i18n";

i18n.loadLocaleData({
  en: { plurals: en },
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState(LocaleEnum.English);

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
        setLocale,
      }}
    >
      <LinguiI18nProvider i18n={i18n}>{children}</LinguiI18nProvider>
    </I18nContext.Provider>
  );
};
