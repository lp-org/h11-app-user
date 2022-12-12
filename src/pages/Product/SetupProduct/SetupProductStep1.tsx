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
import { FC, useEffect, useMemo } from "react";
import { useHistory } from "react-router";
import { useProductStore } from "store/useProductStore";
import { AddProductProps } from "types/product";

import Image from "components/Image";
import Toolbar from "components/Toolbar.tsx";

import { useTakePicture } from "hooks/useTakePicture";
import { environment } from "environment/environment";
import { ProductAddSchema } from "utils/validation";

const SetupProductStep1: FC = () => {
  const history = useHistory();
  const { data: productId } = useGetProductId();
  const tempProductSetup = useProductStore((state) => state.tempProductSetup);

  const formik = useFormik<AddProductProps>({
    initialValues: {
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
    },
    enableReinitialize: true,
    validationSchema: ProductAddSchema,

    onSubmit: (values) => {
      history.push("/product/add-2");
    },
  });
  useEffect(() => {
    if (tempProductSetup) {
      formik.setValues(tempProductSetup);
    }
    formik.setFieldValue("prd_code", productId);
  }, [productId]);

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
    dispatchProductSetup(formik.values);
  }, [dispatchProductSetup, formik.values]);
  return (
    <IonPage>
      <Toolbar title="Setup Product" defaultHref="/product" />
      <IonContent fullscreen className="ion-padding">
        <IonGrid fixed={true}>
          <div className="ion-margin-bottom">
            <b>Food Product Information Setup ( 1 of 2 )</b>
          </div>

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
                <IonLabel position="fixed">Product Name</IonLabel>
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
                <IonLabel position="stacked">Product Category</IonLabel>
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
                <IonLabel position="stacked">Product Type</IonLabel>
                <IonItem fill="outline" className="ion-margin-bottom">
                  <IonInput
                    required
                    placeholder="Enter food type"
                    name="prd_type"
                    onIonChange={formik.handleChange}
                    value={formik.values.prd_type}
                  ></IonInput>
                </IonItem>
              </IonCol>

              <IonCol size="12">
                <IonLabel position="stacked">Flavour</IonLabel>
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
                <IonLabel position="stacked">Storage Instructions: </IonLabel>
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
                <IonLabel position="stacked">Ingredients</IonLabel>
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
                <IonLabel position="stacked">Expiry Period</IonLabel>
                <IonItem
                  fill="outline"
                  className={`ion-margin-bottom ${
                    formik.errors.prd_expiry_period && "ion-invalid"
                  }`}
                >
                  <IonInput
                    required
                    type="number"
                    placeholder="Enter Period"
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
                <IonLabel position="stacked">
                  How to keep product fresh:
                </IonLabel>
                <IonItem fill="outline" className="ion-margin-bottom">
                  <IonTextarea
                    required
                    placeholder="Enter instructions for keeping the food product"
                    name="prd_keep_it_fresh"
                    onIonChange={formik.handleChange}
                    autoGrow
                    value={formik.values.prd_keep_it_fresh}
                  ></IonTextarea>
                </IonItem>
              </IonCol>

              <IonCol size="12">
                <IonButton onClick={() => takePicture()} color="gray">
                  <IonIcon icon={cloudUpload} className="ion-margin-end" />
                  Upload Product Photo
                </IonButton>
                <IonItem>
                  <small>
                    Max Size: {environment.fileLimit / 1_000_000} mb
                  </small>
                </IonItem>
                {formik.values.prd_image && (
                  <Image src={formik.values.prd_image} />
                )}
              </IonCol>

              <IonButton
                shape="round"
                type="submit"
                expand="block"
                class="ion-margin-top"
              >
                Next
              </IonButton>
            </form>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SetupProductStep1;
