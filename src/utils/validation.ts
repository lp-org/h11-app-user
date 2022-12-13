import * as Yup from "yup";

export const ProductAddSchema = Yup.object().shape({
  prd_expiry_period: Yup.number()
    .integer("Must be integer")
    .min(0, "Cannot be smaller than 0")
    .max(9999, "Cannot be larger than 9999"),
});

export const ProductJsonAddSchema = Yup.object().shape({
  Serving: Yup.array().test(
    "prd_nutrition_json",
    (d) => `${d.path} is duplicate`,
    (value) => {
      const names: string[] = [];
      let valid = true;
      value?.forEach((el) => {
        if (!names.includes(el.Nutrition_type)) {
          names.push(el.Nutrition_type);
        } else {
          valid = false;
        }
      });

      console.log(valid);
      return valid;
    }
  ),
});

export const ProductBatchAddSchema = Yup.object().shape({
  pbth_prd_code: Yup.string().required("Please Select Product"),
});
