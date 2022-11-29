export type ProductBatch = {
  pbth_code: string;
  pbth_expiry_date: string;
  pbth_manufactured_date: string;
  pbth_prd_code: string;
  pbth_name: string;
};

export type AddProductBatchProps = {
  pbth_name: string;
  pbth_code: string;
  pbth_expiry_date: string;
  pbth_manufactured_date: string;
  pbth_prd_code: string;
};
