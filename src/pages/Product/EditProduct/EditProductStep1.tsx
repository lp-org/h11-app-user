import {
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
} from "@ionic/react";
import { FormikProps, useFormik } from "formik";
import { useGetProductById, useGetProductId } from "hooks";
import { FC, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { useProductStore, useProductWithoutLsStore } from "store";
import { AddProductProps } from "types/product";
import SetupProduct from ".";

interface paramsProps {
  code: string;
}
const EditProductStep1: FC = () => {
  const match = useRouteMatch<paramsProps>();
  const { code } = match.params;
  const history = useHistory();

  const { data } = useGetProductById(code);
  const tempProductEdit = useProductWithoutLsStore(
    (state) => state.tempProductEdit
  );

  const formik = useFormik<AddProductProps>({
    initialValues: tempProductEdit?.prd_code ? tempProductEdit : data!,
    enableReinitialize: true,
    onSubmit: (values) => {
      history.push(`/product/edit-2/${code}`);
    },
  });

  const dispatchProductEdit = useProductWithoutLsStore(
    (state) => state.setTempProductEdit
  );
  useEffect(() => {
    dispatchProductEdit(formik.values);
  }, [formik.values]);
  console.log(tempProductEdit);
  if (!formik.values) return <></>;
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

export default EditProductStep1;
