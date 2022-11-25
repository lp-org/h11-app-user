import {
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonContent,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
} from "@ionic/react";
import Toolbar from "components/Toolbar.tsx";
import { useFormik } from "formik";
import { useProductList } from "hooks/useProduct";
import { useGetProducBatchCodeByProductId } from "hooks/useProductBatch";
import { FC } from "react";
import { useHistory } from "react-router";
import { AddProductBatchProps } from "types/productBatch";

const SetupProductBatchStep1: FC = () => {
  const history = useHistory();

  const formik = useFormik<AddProductBatchProps>({
    initialValues: {
      pbth_code: "",
      pbth_expiry_date: "",
      pbth_manufactured_date: "",
      pbth_prd_code: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      history.push("/product/add-2");
    },
  });
  const { data: productList } = useProductList();
  const { data: batchId } = useGetProducBatchCodeByProductId(
    formik.values.pbth_prd_code
  );

  return (
    <IonPage>
      <Toolbar title="Product Batch Setup" defaultHref="/product" />
      <IonContent fullscreen className="ion-padding">
        <IonRow>
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <IonCol size="12">
              <IonLabel position="fixed" className="required">
                Select Product:
              </IonLabel>
              <IonItem fill="outline" className="ion-margin-bottom">
                <IonSelect name="prd_code" onIonChange={formik.handleChange}>
                  {productList?.map((product) => (
                    <IonSelectOption value={product.prd_code}>
                      {product.prd_name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonCol>
            <IonCol size="12">
              <IonLabel position="fixed">Product ID:</IonLabel>
              <IonItem fill="outline" className="ion-margin-bottom">
                <IonInput
                  disabled
                  placeholder="Product ID will be auto filled once product is selected"
                  name="prd_name"
                  onIonChange={formik.handleChange}
                  value={formik.values.pbth_prd_code}
                ></IonInput>
              </IonItem>
            </IonCol>

            <IonCol size="12">
              <IonLabel position="stacked">Product Batch ID:</IonLabel>
              <IonItem fill="outline" className="ion-margin-bottom">
                <IonInput
                  disabled
                  placeholder="Batch ID will be auto generated"
                  name="prd_category"
                  onIonChange={formik.handleChange}
                  value={formik.values.pbth_code}
                ></IonInput>
              </IonItem>
            </IonCol>

            <IonCol size="12">
              <IonLabel position="stacked" className="required">
                Manufactured Date:
              </IonLabel>
              <IonItem fill="outline" className="ion-margin-bottom">
                <IonDatetimeButton></IonDatetimeButton>

                <IonModal keepContentsMounted={true}>
                  <IonDatetime id="datetime"></IonDatetime>
                </IonModal>
              </IonItem>
            </IonCol>

            <IonCol size="12">
              <IonLabel position="stacked" className="required">
                Expiry Date:
              </IonLabel>
              <IonItem fill="outline" className="ion-margin-bottom">
                <IonDatetimeButton datetime="date"></IonDatetimeButton>

                {/* <IonModal keepContentsMounted={true}>
                  <IonDatetime id="expi"></IonDatetime>
                </IonModal> */}
              </IonItem>
            </IonCol>

            <IonButton type="submit" expand="block" class="ion-margin-top">
              Next
            </IonButton>
          </form>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default SetupProductBatchStep1;
