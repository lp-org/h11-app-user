import React, { useEffect } from "react";
import { I18nProvider as LinguiI18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import { I18nContext } from "./I18nContext";
import { en, ms, zh } from "make-plural/plurals";

// import plural rules for all locales

import { useAppStateWithLs } from "store";
// @ts-ignore

i18n.loadLocaleData({
  en: { plurals: en },
  ms: { plurals: ms },
  cn: { plurals: zh },
});
export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const locale = useAppStateWithLs((state) => state.locale);

  useEffect(() => {
    const load = async () => {
      try {
        // import("@lingui/remote-loader").then(async ({ remoteLoader }) => {
        const res = await fetch(
          `https://anchongkincho.github.io/locales/${locale}/messages.json`
        );

        const remoteMessages = await res.json();

        i18n.load(locale, remoteMessages);
      } catch (error) {
        // Dynamically load the catalogs
        import(`../../locales/${locale}/messages`).then((module) => {
          const messages = module.messages;
          i18n.load(locale, messages);
        });
      }
      i18n.activate(locale);
    };
    load();
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
