export type Product = {
  prd_code: string;
  prd_name: string;
  prd_flavour: string;
  prd_ingredients: string;
  prd_category: string;
  prd_storage_instructions: string;
  prd_keep_it_fresh: string;
  prd_expiry_period: number | null;
  prd_nutrition_json: any | null;
};

export type AddProductProps = {
  prd_code: string;
  prd_name: string;
  prd_flavour: string;
  prd_ingredients: string;
  prd_category: string;
  prd_storage_instructions: string;
  prd_keep_it_fresh: string;
  prd_expiry_period: number | null;
  prd_nutrition_json: any | null;
};
