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
  IonGrid,
} from "@ionic/react";
import Toolbar from "components/Toolbar.tsx";
import { useFormik } from "formik";
import { useProductList } from "hooks/useProduct";
import { useGetProducBatchCodeByProductId } from "hooks/useProductBatch";
import { FC, useEffect } from "react";
import { useHistory } from "react-router";
import { AddProductBatchProps } from "types/productBatch";
import dayjs from "dayjs";
import { ProductBatchAddSchema } from "utils/validation";
import "./index.css";
import { calendar } from "ionicons/icons";
import { t, Trans } from "@lingui/macro";
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
    validateOnChange: false,
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

  useEffect(() => {
    formik.setFieldValue(
      "pbth_expiry_date",
      selectedProductBatch?.pbth_expiry_date
    );
    formik.setFieldValue(
      "pbth_manufactured_date",
      selectedProductBatch?.pbth_manufactured_date
    );
  }, [selectedProductBatch]);

  return (
    <IonPage>
      <Toolbar
        title={t({ id: "Product Batch Setup" })}
        defaultHref="/productBatch"
        action={
          <IonButton
            onClick={() => history.push(`/manageProduct`)}
            color="dark"
          >
            <IonIcon src={"/assets/icon/manage.svg"} />
          </IonButton>
        }
      />
      <IonContent fullscreen className="ion-padding">
        <IonGrid style={{ height: "100%" }}>
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexFlow: "column", height: "100%" }}
          >
            <div style={{ flex: "0 1 auto" }}>
              <IonRow className="ion-justify-content-center ">
                <IonCol size="12" className="ion-margin-bottom">
                  <IonLabel>
                    <b>Product Batch Information Setup</b>
                  </IonLabel>
                </IonCol>
                <IonCol size="12">
                  <IonSelect
                    hidden
                    name="pbth_prd_name"
                    onBlur={() => formik.setFieldTouched("pbth_name", true)}
                  ></IonSelect>
                  <IonItem
                    className={`ion-no-padding ${
                      formik.errors.pbth_prd_code && "ion-invalid"
                    }`}
                    lines="none"
                  >
                    <IonLabel position="stacked">
                      <Trans>Select Product</Trans>:
                    </IonLabel>
                    <IonSelect
                      placeholder={t({ id: "Select Product" })}
                      className="custom ion-no-margin"
                      onIonChange={(e) => {
                        formik.setFieldValue("pbth_prd_code", e.target.value);
                        formik.setFieldValue(
                          "pbth_prd_name",
                          productList?.result?.find(
                            (el) => el.prd_code === e.target.value
                          )?.prd_name
                        );
                      }}
                    >
                      {productList?.result?.map((product) => (
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
                    <IonNote slot="helper">
                      <Trans>
                        You will need to choose the available product from the
                        list. If not found, kindly create the product first.
                      </Trans>
                    </IonNote>
                  </IonItem>
                </IonCol>
                <IonCol size="12">
                  <IonItem className="ion-no-padding" lines="none">
                    <IonLabel position="stacked">
                      <Trans>Product ID</Trans>:
                    </IonLabel>
                    <IonInput
                      className="custom"
                      disabled
                      placeholder={t({
                        id: "Product ID will be auto filled once product is selected",
                      })}
                      name="pbth_prd_code"
                      onIonChange={formik.handleChange}
                      value={formik.values.pbth_prd_code}
                    ></IonInput>
                  </IonItem>
                </IonCol>
                <IonCol size="12">
                  <IonItem className="ion-no-padding" lines="none">
                    <IonLabel position="stacked">
                      <Trans>Product Batch ID</Trans>:
                    </IonLabel>
                    <IonInput
                      className="custom"
                      disabled
                      name="pbth_code"
                      placeholder={t({ id: "Batch ID will be auto generated" })}
                      onIonChange={formik.handleChange}
                      value={selectedProductBatch?.pbth_code}
                    ></IonInput>
                  </IonItem>
                </IonCol>
                <IonCol size="12">
                  <IonItem
                    className="ion-no-padding"
                    lines="none"
                    id="manufactured_date"
                  >
                    <IonLabel position="stacked">
                      <Trans>Manufactured Date</Trans>:
                    </IonLabel>
                    <IonItem
                      lines="none"
                      style={{ width: "100%" }}
                      color="gray"
                      class="ion-no-padding"
                    >
                      <IonDatetimeButton datetime="pbth_manufactured_date"></IonDatetimeButton>
                      <IonModal
                        keepContentsMounted={true}
                        trigger="manufactured_date"
                      >
                        <IonDatetime
                          id="pbth_manufactured_date"
                          name="pbth_manufactured_date"
                          presentation="date"
                          value={formik.values.pbth_manufactured_date}
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
                    id="expiry_date"
                  >
                    <IonLabel position="stacked">
                      <Trans>Expiry Date</Trans>:
                    </IonLabel>
                    <IonItem
                      style={{ width: "100%" }}
                      color="gray"
                      class="ion-no-padding"
                      lines="none"
                    >
                      <IonDatetimeButton datetime="pbth_expiry_date"></IonDatetimeButton>

                      <IonModal
                        keepContentsMounted={true}
                        trigger="expiry_date"
                      >
                        <IonDatetime
                          id="pbth_expiry_date"
                          name="pbth_expiry_date"
                          presentation="date"
                          value={formik.values.pbth_expiry_date}
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
              </IonRow>
            </div>
            <div
              style={{ flex: "1 1 auto", display: "flex", flexFlow: "column" }}
            >
              <IonButton
                type="submit"
                expand="block"
                style={{ marginTop: "auto" }}
                class="ion-margin-top text-white"
              >
                Preview
              </IonButton>
            </div>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SetupProductBatchStep1;
