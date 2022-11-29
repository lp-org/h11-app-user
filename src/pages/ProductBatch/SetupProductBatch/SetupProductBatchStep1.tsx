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
      pbth_name: "",
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
              <IonLabel position="fixed" className="required">
                Select Product:
              </IonLabel>
              <IonSelect
                hidden
                name="pbth_name"
                onBlur={() => formik.setFieldTouched("pbth_name", true)}
              ></IonSelect>
              <IonItem fill="outline" className="ion-margin-bottom ion-invalid">
                <IonSelect
                  onIonChange={(e) => {
                    formik.setFieldValue("pbth_prd_code", e.target.value);
                    formik.setFieldValue(
                      "pbth_name",
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
                  <>{formik.values.pbth_name}</>
                </IonSelect>
                <IonNote slot="error">
                  {formik.errors.pbth_prd_code
                    ? formik.errors.pbth_prd_code
                    : ""}
                </IonNote>
              </IonItem>
            </IonCol>
            <IonCol size="12">
              <IonLabel position="fixed">Product ID:</IonLabel>
              <IonItem fill="outline" className="ion-margin-bottom">
                <IonInput
                  disabled
                  placeholder="Product ID will be auto filled once product is selected"
                  name="pbth_prd_code"
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
                  name="pbth_code"
                  placeholder="Batch ID will be auto generated"
                  onIonChange={formik.handleChange}
                  value={selectedProductBatch?.pbth_code}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol size="12">
              <IonLabel position="stacked" className="required">
                Manufactured Date:
              </IonLabel>
              <IonItem fill="outline" className="ion-margin-bottom">
                <IonDatetimeButton
                  datetime="pbth_manufactured_date"
                  color={"dark"}
                ></IonDatetimeButton>

                <IonModal keepContentsMounted={true}>
                  <IonDatetime
                    id="pbth_manufactured_date"
                    name="pbth_manufactured_date"
                    presentation="date"
                    value={
                      formik.values.pbth_manufactured_date ||
                      dayjs(
                        selectedProductBatch?.pbth_manufactured_date
                      ).format("YYYY-MM-DDTHH:mmZ")
                    }
                    max={dayjs().add(100, "years").year().toString()}
                    onIonChange={handleDateChange}
                  ></IonDatetime>
                </IonModal>
              </IonItem>
            </IonCol>
            <IonCol size="12">
              <IonLabel position="stacked" className="required">
                Expiry Date:
              </IonLabel>
              <IonItem fill="outline" className="ion-margin-bottom">
                <IonDatetimeButton datetime="pbth_expiry_date"></IonDatetimeButton>

                <IonModal keepContentsMounted={true}>
                  <IonDatetime
                    id="pbth_expiry_date"
                    name="pbth_expiry_date"
                    presentation="date"
                    value={
                      formik.values.pbth_expiry_date ||
                      dayjs(selectedProductBatch?.pbth_expiry_date).format(
                        "YYYY-MM-DDTHH:mmZ"
                      )
                    }
                    max={dayjs().add(100, "years").year().toString()}
                    onIonChange={handleDateChange}
                  ></IonDatetime>
                </IonModal>
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
