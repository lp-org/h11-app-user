import * as Yup from "yup";

export const ProductBatchAddSchema = Yup.object().shape({
  pbth_prd_code: Yup.string().required("Please Select Product"),
});

const DisplayingErrorMessagesSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});
