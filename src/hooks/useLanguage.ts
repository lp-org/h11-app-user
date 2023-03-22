import { useCallback } from "react";
import { useAppStateWithLs } from "store";
import { LanguageString } from "types/i18n";

export const useLanguage = () => {
  const lang = useAppStateWithLs((state) => state.locale);
  const getString = useCallback(
    (payload?: LanguageString) => {
      return payload ? payload[lang] || payload["en"] || "" : "";
    },
    [lang]
  );

  const setLangRequest = useCallback(
    (payload: string) => {
      return { [lang]: payload };
    },
    [lang]
  );
  return { getString, setLangRequest, lang };
};

export const useLanguageNutritionFacts = () => {
  const lang = useAppStateWithLs((state) => state.locale);
};
