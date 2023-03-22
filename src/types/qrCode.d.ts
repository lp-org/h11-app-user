import { LanguageString } from "./i18n";

export interface QrInfoResponse {
  bc_count: number;
  bc_prd_code: string;
  bc_prd_name: LanguageString;
  bc_prd_flavour: LanguageString;
  bc_prd_ingredients: LanguageString;
  bc_pbth_code: string;
  bc_pbth_manufactured_date: string;
  bc_pbth_expiry_date: string;
}
export interface QrInfo {
  bc_count: number;
  bc_prd_code: string;
  bc_prd_name: string;
  bc_prd_flavour: string;
  bc_prd_ingredients: string;
  bc_pbth_code: string;
  bc_pbth_manufactured_date: string;
  bc_pbth_expiry_date: string;
}

export interface BlockchainResponse {
  bc_pbth_code: string;
  bc_pbth_expiry_date: string;
  bc_pbth_manufactured_date: string;
  bc_prd_code: string;
  bc_prd_flavour: LanguageString;
  bc_prd_ingredients: LanguageString;
  bc_prd_name: LanguageString;
  bc_qr_code: string;
}

export interface Blockchain {
  bc_pbth_code: string;
  bc_pbth_expiry_date: string;
  bc_pbth_manufactured_date: string;
  bc_prd_code: string;
  bc_prd_flavour: string;
  bc_prd_ingredients: string;
  bc_prd_name: string;
  bc_qr_code: string;
}

export interface VerifyQrInfoResponse {
  bc_qr_code: string;
  bc_prd_code: string;
  bc_prd_name: LanguageString;
  bc_prd_flavour: LanguageString;
  bc_prd_ingredients: LanguageString;
  bc_pbth_code: string;
  bc_pbth_manufactured_date: string;
  bc_pbth_expiry_date: string;
  bc_prd_image: string;
  bc_prd_category: LanguageString;
  bc_prd_type: LanguageString;
  bc_prd_storage_instructions: LanguageString;
  bc_prd_keep_it_fresh: LanguageString;
  bc_prd_nutrition_json: LanguageString;
  bc_qr_code_image: string;
  pbth_bc_count: number;
}

export interface VerifyQrInfo {
  bc_qr_code: string;
  bc_prd_code: string;
  bc_prd_name: string;
  bc_prd_flavour: string;
  bc_prd_ingredients: string;
  bc_pbth_code: string;
  bc_pbth_manufactured_date: string;
  bc_pbth_expiry_date: string;
  bc_prd_image: string;
  bc_prd_category: string;
  bc_prd_type: string;
  bc_prd_storage_instructions: string;
  bc_prd_keep_it_fresh: string;
  bc_prd_nutrition_json: string;
  bc_qr_code_image: string;
  pbth_bc_count: number;
}
