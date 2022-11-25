import {
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
} from "@ionic/react";
import { useFormik } from "formik";
import { useGetProductId } from "hooks/useProduct";
import { FC, useEffect } from "react";
import { useHistory } from "react-router";
import { useProductStore } from "store";
import { AddProductProps } from "types/product";
import SetupProduct from ".";

const SetupProductStep1: FC = () => {
  const history = useHistory();
  const { data: productId } = useGetProductId();
  const tempProductSetup = useProductStore((state) => state.tempProductSetup);

  const formik = useFormik<AddProductProps>({
    initialValues: tempProductSetup
      ? { ...tempProductSetup, prd_code: productId! }
      : {
          prd_code: productId!,
          prd_expiry_period: null,
          prd_flavour: "",
          prd_ingredients: "",
          prd_name: "",
          prd_keep_it_fresh: "",
          prd_nutrition_json: null,
          prd_storage_instructions: "",
          prd_category: "",
          prd_type: "",
        },
    enableReinitialize: true,
    onSubmit: (values) => {
      history.push("/product/add-2");
    },
  });

  const dispatchProductSetup = useProductStore(
    (state) => state.setTempProductSetup
  );
  useEffect(() => {
    dispatchProductSetup(formik.values);
  }, [formik.values]);
  return (
    <SetupProduct>
      <IonRow>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <IonCol size="12">
            <IonLabel position="fixed">Product ID</IonLabel>
            <IonItem fill="outline" className="ion-margin-bottom">
              <IonInput
                disabled
                name="prd_code"
                onIonChange={formik.handleChange}
                value={formik.values.prd_code}
              ></IonInput>
            </IonItem>
          </IonCol>
          <IonCol size="12">
            <IonLabel className="required" position="fixed">
              Product Name
            </IonLabel>
            <IonItem fill="outline" className="ion-margin-bottom">
              <IonInput
                required
                placeholder="Enter Product Name"
                name="prd_name"
                onIonChange={formik.handleChange}
                value={formik.values.prd_name}
              ></IonInput>
            </IonItem>
          </IonCol>

          <IonCol size="12">
            <IonLabel position="stacked" className="required">
              Product Category
            </IonLabel>
            <IonItem fill="outline" className="ion-margin-bottom">
              <IonInput
                required
                placeholder="Enter food category"
                name="prd_category"
                onIonChange={formik.handleChange}
                value={formik.values.prd_category}
              ></IonInput>
            </IonItem>
          </IonCol>

          <IonCol size="12">
            <IonLabel position="stacked" className="required">
              Flavour
            </IonLabel>
            <IonItem fill="outline" className="ion-margin-bottom">
              <IonInput
                required
                placeholder="Enter flavour"
                name="prd_flavour"
                onIonChange={formik.handleChange}
                value={formik.values.prd_flavour}
              ></IonInput>
            </IonItem>
          </IonCol>

          <IonCol size="12">
            <IonLabel position="stacked" className="required">
              Storage Instructions:{" "}
            </IonLabel>
            <IonItem fill="outline" className="ion-margin-bottom">
              <IonInput
                required
                placeholder="Enter instructions"
                name="prd_storage_instructions"
                onIonChange={formik.handleChange}
                value={formik.values.prd_storage_instructions}
              ></IonInput>
            </IonItem>
          </IonCol>

          <IonCol size="12">
            <IonLabel position="stacked" className="required">
              Ingredients
            </IonLabel>
            <IonItem fill="outline" className="ion-margin-bottom">
              <IonInput
                required
                placeholder="Enter ingredients in yoour food products"
                name="prd_ingredients"
                onIonChange={formik.handleChange}
                value={formik.values.prd_ingredients}
              ></IonInput>
            </IonItem>
          </IonCol>

          <IonCol size="12">
            <IonLabel position="stacked" className="required">
              Expiry Period
            </IonLabel>
            <IonItem fill="outline" className="ion-margin-bottom">
              <IonInput
                required
                type="number"
                placeholder="Enter Period"
                name="prd_expiry_period"
                onIonChange={formik.handleChange}
                value={formik.values.prd_expiry_period}
              ></IonInput>
            </IonItem>
          </IonCol>

          <IonCol size="12">
            <IonLabel position="stacked" className="required">
              How to keep product fresh:
            </IonLabel>
            <IonItem fill="outline" className="ion-margin-bottom">
              <IonTextarea
                required
                placeholder="Enter instructions for keeping the food product"
                name="prd_keep_it_fresh"
                onIonChange={formik.handleChange}
                value={formik.values.prd_keep_it_fresh}
              ></IonTextarea>
            </IonItem>
          </IonCol>
          <IonButton type="submit" expand="block" class="ion-margin-top">
            Next
          </IonButton>
        </form>
      </IonRow>
    </SetupProduct>
  );
};

export default SetupProductStep1;
