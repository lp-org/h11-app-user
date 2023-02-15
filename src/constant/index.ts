import { t } from "@lingui/macro";
import { LocaleEnum } from "types/i18n";

export const languages = [
  { text: t({ id: "English" }), code: LocaleEnum.English },
  { text: t({ id: "Melayu" }), code: LocaleEnum.Melayu },
  { text: t({ id: "Mandarin" }), code: LocaleEnum.Mandarin },
];
