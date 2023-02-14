import {
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonIcon,
  IonContent,
  IonGrid,
  IonPage,
  IonNote,
} from "@ionic/react";
import { useFormik } from "formik";
import { useGetProductId } from "hooks/useProduct";
import { cloudUpload } from "ionicons/icons";
import { FC, Fragment, useEffect, useMemo } from "react";
import { useHistory } from "react-router";
import { useProductStore } from "store/useProductStore";
import { AddProductProps } from "types/product";

import Image from "components/Image";
import Toolbar from "components/Toolbar.tsx";

import { useTakePicture } from "hooks/useTakePicture";
import { ProductAddSchema } from "utils/validation";
import SteupSteppers from "./SteupSteppers";
import { t, Trans } from "@lingui/macro";

const initialValues = {
  prd_code: "",
  prd_expiry_period: 0,
  prd_flavour: "",
  prd_ingredients: "",
  prd_name: "",
  prd_keep_it_fresh: "",
  prd_nutrition_json: null,
  prd_storage_instructions: "",
  prd_category: "",
  prd_type: "",
  prd_image: "",
};

const SetupProductStep1: FC = () => {
  const history = useHistory();
  const { data: productId } = useGetProductId();
  const tempProductSetup = useProductStore((state) => state.tempProductSetup);

  const formik = useFormik<AddProductProps>({
    initialValues,
    enableReinitialize: true,
    validationSchema: ProductAddSchema,

    onSubmit: (values) => {
      history.push("/product/add-2");
    },
  });
  useEffect(() => {
    if (tempProductSetup && tempProductSetup?.prd_code) {
      formik.setValues(tempProductSetup);
    } else {
      formik.setValues(initialValues);
    }
    formik.setFieldValue("prd_code", productId);
  }, [productId, tempProductSetup?.prd_code]);
  const { takePicture, blob, photo } = useTakePicture();
  useMemo(() => {
    var imageUrl = photo?.webPath;
    if (imageUrl) {
      formik.setFieldValue("prd_image", photo?.webPath);
    }
  }, [photo]);

  const dispatchProductSetup = useProductStore(
    (state) => state.setTempProductSetup
  );
  useEffect(() => {
    if (formik.values.prd_code) dispatchProductSetup(formik.values);
  }, [formik.values]);
  return (
    <IonPage>
      <Toolbar
        title={t({ id: "Setup Product" })}
        defaultHref="/product"
        action={
          <IonButton onClick={() => history.push("/product")} color="dark">
            <IonIcon src={"/assets/icon/manage.svg"} />
          </IonButton>
        }
      />
      <IonContent fullscreen className="ion-padding">
        <IonGrid fixed={true}>
          <div>
            <b>
              <Trans>Product Information Setup</Trans>
            </b>
          </div>
          <SteupSteppers step={1} />
          <IonRow>
            <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
              <IonCol size="12">
                <IonItem lines="none" className="ion-no-padding">
                  <IonLabel position="stacked">Product ID</IonLabel>
                  <IonInput
                    className="custom"
                    disabled
                    name="prd_code"
                    onIonChange={formik.handleChange}
                    value={formik.values.prd_code}
                  ></IonInput>
                </IonItem>
              </IonCol>
              <IonCol size="12">
                <IonItem lines="none" className="ion-no-padding">
                  <IonLabel position="stacked">
                    <Trans>Product Name</Trans>
                  </IonLabel>
                  <IonInput
                    className="custom"
                    required
                    placeholder={t({ id: "Enter Product Name" })}
                    name="prd_name"
                    onIonChange={formik.handleChange}
                    value={formik.values.prd_name}
                  ></IonInput>
                </IonItem>
              </IonCol>

              <IonCol size="12">
                <IonItem lines="none" className="ion-no-padding">
                  <IonLabel position="stacked">
                    <Trans>Product Category</Trans>
                  </IonLabel>
                  <IonInput
                    required
                    className="custom"
                    placeholder={t({ id: "Enter food category" })}
                    name="prd_category"
                    onIonChange={formik.handleChange}
                    value={formik.values.prd_category}
                  ></IonInput>
                </IonItem>
              </IonCol>

              <IonCol size="12">
                <IonItem lines="none" className="ion-no-padding">
                  <IonLabel position="stacked">
                    <Trans>Product Type</Trans>
                  </IonLabel>
                  <IonInput
                    required
                    className="custom"
                    placeholder={t({ id: "Enter food type" })}
                    name="prd_type"
                    onIonChange={formik.handleChange}
                    value={formik.values.prd_type}
                  ></IonInput>
                </IonItem>
              </IonCol>

              <IonCol size="12">
                <IonItem lines="none" className="ion-no-padding">
                  <IonLabel position="stacked">
                    <Trans>Flavour</Trans>
                  </IonLabel>
                  <IonInput
                    required
                    className="custom"
                    placeholder={t({ id: "Enter flavour" })}
                    name="prd_flavour"
                    onIonChange={formik.handleChange}
                    value={formik.values.prd_flavour}
                  ></IonInput>
                </IonItem>
              </IonCol>

              <IonCol size="12">
                <IonItem lines="none" className="ion-no-padding">
                  <IonLabel position="stacked">
                    <Trans>Storage Instructions</Trans>{" "}
                  </IonLabel>
                  <IonInput
                    required
                    className="custom"
                    placeholder={t({ id: "Enter instructions" })}
                    name="prd_storage_instructions"
                    onIonChange={formik.handleChange}
                    value={formik.values.prd_storage_instructions}
                  ></IonInput>
                </IonItem>
              </IonCol>

              <IonCol size="12">
                <IonItem lines="none" className="ion-no-padding">
                  <IonLabel position="stacked">
                    <Trans>Ingredients</Trans>
                  </IonLabel>
                  <IonInput
                    required
                    className="custom"
                    placeholder={t({
                      id: "Enter ingredients in yoour food products",
                    })}
                    name="prd_ingredients"
                    onIonChange={formik.handleChange}
                    value={formik.values.prd_ingredients}
                  ></IonInput>
                </IonItem>
              </IonCol>

              <IonCol size="12">
                <IonItem
                  lines="none"
                  className={`ion-no-padding ${
                    formik.errors.prd_expiry_period && "ion-invalid"
                  }`}
                >
                  <IonLabel position="stacked">
                    <Trans>Expiry Period</Trans>
                  </IonLabel>
                  <IonInput
                    required
                    className="custom"
                    type="number"
                    placeholder={t({ id: "Enter Period" })}
                    name="prd_expiry_period"
                    onIonChange={formik.handleChange}
                    value={formik.values.prd_expiry_period}
                  ></IonInput>
                  <IonNote slot="error">
                    {formik.errors.prd_expiry_period}
                  </IonNote>
                </IonItem>
              </IonCol>

              <IonCol size="12">
                <IonItem lines="none" className="ion-no-padding">
                  <IonLabel position="stacked">
                    <Trans>How to keep product fresh</Trans>
                  </IonLabel>
                  <IonTextarea
                    className="custom"
                    required
                    placeholder={t({
                      id: "Enter instructions for keeping the food product",
                    })}
                    name="prd_keep_it_fresh"
                    onIonChange={formik.handleChange}
                    autoGrow
                    value={formik.values.prd_keep_it_fresh}
                  ></IonTextarea>
                </IonItem>
              </IonCol>

              <IonCol size="12">
                <IonItem lines="none" className="ion-no-padding">
                  <IonLabel position="stacked">
                    <Trans>Upload Product Photo</Trans>
                  </IonLabel>

                  {!formik.values.prd_image ? (
                    <Fragment>
                      <IonButton
                        onClick={() => takePicture()}
                        color="light"
                        style={{ height: "160px", width: "160px" }}
                      >
                        <IonIcon
                          icon={cloudUpload}
                          className="ion-margin-end"
                          style={{
                            fontSize: "100px",

                            margin: "auto",
                            color: "gray",
                          }}
                        />
                        {/* <small style={{ color: "gray" }}>
                      Max Size: {environment.fileLimit / 1_000_000} mb
                    </small> */}
                      </IonButton>
                      <small style={{ color: "#999999" }}>
                        <Trans>
                          Optional: Upload product photo to showcase the product
                        </Trans>
                      </small>
                    </Fragment>
                  ) : (
                    <Image
                      imgSrc={formik.values.prd_image}
                      onClick={() => takePicture()}
                      width={200}
                    />
                  )}
                </IonItem>
              </IonCol>

              <IonButton
                type="submit"
                expand="block"
                class="ion-margin-top text-white"
              >
                <Trans>Next</Trans>
              </IonButton>
            </form>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SetupProductStep1;
