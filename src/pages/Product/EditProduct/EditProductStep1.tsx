import {
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonPage,
  IonContent,
  IonGrid,
  IonIcon,
  IonNote,
} from "@ionic/react";
import Image from "components/Image";
import Toolbar from "components/Toolbar.tsx";
import { environment } from "environment/environment";
import { useFormik } from "formik";
import { useGetProductById } from "hooks/useProduct";
import { useTakePicture } from "hooks/useTakePicture";
import { cloudUpload } from "ionicons/icons";
import { FC, useMemo } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { useProductWithoutLsStore } from "store/useProductStore";
import { AddProductProps } from "types/product";
import { ProductAddSchema } from "utils/validation";

interface paramsProps {
  code: string;
}
const EditProductStep1: FC = () => {
  const match = useRouteMatch<paramsProps>();
  const { code } = match.params;
  const history = useHistory();

  const { data } = useGetProductById(code);
  const dispatchProductEdit = useProductWithoutLsStore(
    (state) => state.setTempProductEdit
  );

  const formik = useFormik<AddProductProps>({
    initialValues: { ...data! },
    enableReinitialize: true,
    validationSchema: ProductAddSchema,
    onSubmit: (values) => {
      history.push(`/product/edit-2/${code}`);
      dispatchProductEdit(values);
    },
  });
  const { takePicture, blob, photo } = useTakePicture();
  useMemo(() => {
    var imageUrl = photo?.webPath;
    if (imageUrl) {
      formik.setFieldValue("prd_image", photo?.webPath);
    }
  }, [photo]);
  if (!formik.values) return <></>;
  return (
    <IonPage>
      <Toolbar title="Edit Product" defaultHref={`/product/${code}`} />
      <IonContent fullscreen className="ion-padding">
        <IonGrid fixed={true}>
          <div className="ion-margin-bottom">
            <b>Food Product Information ( 1 of 2 )</b>
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

export default EditProductStep1;
