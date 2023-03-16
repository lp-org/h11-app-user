import { LanguageString } from "./i18n";

export type ProductBatchResponse = {
  pbth_code: string;
  pbth_expiry_date: string;
  pbth_manufactured_date: string;
  pbth_prd_code: string;
  pbth_prd_name: LanguageString;
  prd_image?: string;
};

export type ProductBatch = {
  pbth_code: string;
  pbth_expiry_date: string;
  pbth_manufactured_date: string;
  pbth_prd_code: string;
  pbth_prd_name: string;
  prd_image?: string;
};

export type AddProductBatchProps = {
  pbth_prd_name: string;
  pbth_code: string;
  pbth_expiry_date: string;
  pbth_manufactured_date: string;
  pbth_prd_code: string;
};
