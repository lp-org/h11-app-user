import { Dispatch, SetStateAction } from "react";

export interface I18nContextProps {
  locale: LocaleEnum;
}

export enum LocaleEnum {
  English = "en",
  Mandarin = "cn",
  Melayu = "ms",
}
