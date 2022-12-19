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
  IonNote,
  IonIcon,
} from "@ionic/react";
import Toolbar from "components/Toolbar.tsx";
import { useFormik } from "formik";
import { useProductList } from "hooks/useProduct";
import { useGetProducBatchCodeByProductId } from "hooks/useProductBatch";
import { FC } from "react";
import { useHistory } from "react-router";
import { AddProductBatchProps } from "types/productBatch";
import dayjs from "dayjs";
import { ProductBatchAddSchema } from "utils/validation";
import "./index.css";
import { calendar } from "ionicons/icons";
const SetupProductBatchStep1: FC = () => {
  const history = useHistory();

  const handleDateChange = (e: any) => {
    formik.setFieldValue(
      e.target.name,
      dayjs(e.target.value).format("YYYY-MM-DD")
    );
  };
  const formik = useFormik<AddProductBatchProps>({
    initialValues: {
      pbth_prd_name: "",
      pbth_code: "",
      pbth_expiry_date: "",
      pbth_manufactured_date: "",
      pbth_prd_code: "",
    },
    enableReinitialize: true,
    validationSchema: ProductBatchAddSchema,
    onSubmit: (values) => {
      history.push({
        pathname: "/productBatch/add-2",
        state: { values },
      });
    },
  });

  const { data: productList } = useProductList();

  const { data: selectedProductBatch } = useGetProducBatchCodeByProductId(
    formik.values.pbth_prd_code
  );

  return (
    <IonPage>
      <Toolbar title="Product Batch Setup" defaultHref="/productBatch" />
      <IonContent fullscreen className="ion-padding">
        <IonRow>
          <IonCol size="12" className="ion-margin-bottom">
            <IonLabel>
              <b>Product Batch Information Setup</b>
            </IonLabel>
          </IonCol>
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <IonCol size="12">
              <IonSelect
                hidden
                name="pbth_prd_name"
                onBlur={() => formik.setFieldTouched("pbth_name", true)}
              ></IonSelect>
              <IonItem className="ion-no-padding ion-invalid" lines="none">
                <IonLabel position="stacked">Select Product:</IonLabel>
                <IonSelect
                  placeholder="Select Product"
                  className="custom ion-no-margin"
                  onIonChange={(e) => {
                    formik.setFieldValue("pbth_prd_code", e.target.value);
                    formik.setFieldValue(
                      "pbth_prd_name",
                      productList?.find((el) => el.prd_code === e.target.value)
                        ?.prd_name
                    );
                  }}
                >
                  {productList?.map((product) => (
                    <IonSelectOption
                      key={product.prd_code}
                      value={product.prd_code}
                      aria-label={product.prd_name}
                    >
                      {product.prd_name}
                    </IonSelectOption>
                  ))}
                  <>{formik.values.pbth_prd_name}</>
                </IonSelect>
                <IonNote slot="error">
                  {formik.errors.pbth_prd_code
                    ? formik.errors.pbth_prd_code
                    : ""}
                </IonNote>
              </IonItem>
            </IonCol>
            <IonCol size="12">
              <IonItem className="ion-no-padding" lines="none">
                <IonLabel position="stacked">Product ID:</IonLabel>
                <IonInput
                  className="custom"
                  disabled
                  placeholder="Product ID will be auto filled once product is selected"
                  name="pbth_prd_code"
                  onIonChange={formik.handleChange}
                  value={formik.values.pbth_prd_code}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol size="12">
              <IonItem className="ion-no-padding" lines="none">
                <IonLabel position="stacked">Product Batch ID:</IonLabel>
                <IonInput
                  className="custom"
                  disabled
                  name="pbth_code"
                  placeholder="Batch ID will be auto generated"
                  onIonChange={formik.handleChange}
                  value={selectedProductBatch?.pbth_code}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol size="12">
              <IonItem className="ion-no-padding" lines="none">
                <IonLabel position="stacked">Manufactured Date:</IonLabel>
                <IonItem
                  lines="none"
                  style={{ width: "100%" }}
                  color="gray"
                  class="ion-no-padding"
                >
                  <IonDatetimeButton datetime="pbth_manufactured_date"></IonDatetimeButton>
                  <IonModal keepContentsMounted={true}>
                    <IonDatetime
                      id="pbth_manufactured_date"
                      name="pbth_manufactured_date"
                      presentation="date"
                      value={dayjs(
                        selectedProductBatch?.pbth_manufactured_date
                      ).format("YYYY-MM-DDTHH:mmZ")}
                      max={dayjs().add(100, "years").year().toString()}
                      onIonChange={handleDateChange}
                    ></IonDatetime>
                  </IonModal>

                  <IonIcon
                    slot="end"
                    icon={calendar}
                    color="dark"
                    className="ion-margin-end"
                  />
                </IonItem>
              </IonItem>
            </IonCol>
            <IonCol size="12">
              <IonItem
                className="ion-no-padding ion-margin-bottom"
                lines="none"
              >
                <IonLabel position="stacked">Expiry Date:</IonLabel>
                <IonItem
                  style={{ width: "100%" }}
                  color="gray"
                  class="ion-no-padding"
                  lines="none"
                >
                  <IonDatetimeButton datetime="pbth_expiry_date"></IonDatetimeButton>

                  <IonModal keepContentsMounted={true}>
                    <IonDatetime
                      id="pbth_expiry_date"
                      name="pbth_expiry_date"
                      presentation="date"
                      value={dayjs(
                        selectedProductBatch?.pbth_expiry_date
                      ).format("YYYY-MM-DDTHH:mmZ")}
                      max={dayjs().add(100, "years").year().toString()}
                      onIonChange={handleDateChange}
                    ></IonDatetime>
                  </IonModal>

                  <IonIcon
                    slot="end"
                    icon={calendar}
                    className="ion-margin-end"
                    color="dark"
                  />
                </IonItem>
              </IonItem>
            </IonCol>
            <IonButton
              type="submit"
              expand="block"
              class="ion-margin-top text-white"
            >
              Next
            </IonButton>
          </form>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default SetupProductBatchStep1;
