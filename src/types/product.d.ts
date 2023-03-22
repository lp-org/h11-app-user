import { LanguageString } from "./i18n";

export type ProductResponse = {
  prd_code: string;
  prd_name: LanguageString;
  prd_flavour: LanguageString;
  prd_ingredients: LanguageString;
  prd_category: LanguageString;
  prd_type: LanguageString;
  prd_storage_instructions: LanguageString;
  prd_keep_it_fresh: LanguageString;
  prd_expiry_period: number | null;
  prd_nutrition_json: LanguageString;
  prd_image: string | null;
  prd_archived: number;
};

export type Product = {
  prd_code: string;
  prd_name: string;
  prd_flavour: string;
  prd_ingredients: string;
  prd_category: string;
  prd_type: string;
  prd_storage_instructions: string;
  prd_keep_it_fresh: string;
  prd_expiry_period: number | null;
  prd_nutrition_json: any | null;
  prd_image?: string | null;
  prd_archived: number;
};

export type AddProductRequestProps = {
  prd_code: string;
  prd_name: LanguageString;
  prd_flavour: LanguageString;
  prd_ingredients: LanguageString;
  prd_category: LanguageString;
  prd_type: LanguageString;
  prd_storage_instructions: LanguageString;
  prd_keep_it_fresh: LanguageString;
  prd_expiry_period: number | null;
  prd_nutrition_json: LanguageString;
  prd_image?: string | null;
  prd_archived: number;
};

export type AddProductProps = {
  prd_code: string;
  prd_name: string;
  prd_flavour: string;
  prd_ingredients: string;
  prd_category: string;
  prd_type: string;
  prd_storage_instructions: string;
  prd_keep_it_fresh: string;
  prd_expiry_period: number | null;
  prd_nutrition_json: any | null;
  prd_image?: string | null;
  prd_archived: number;
};

export interface PaginationProps {
  totalPages: number;
  totalElements: number;
  nextCursor: boolean;
}
