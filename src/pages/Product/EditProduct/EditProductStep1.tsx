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
import { FC, Fragment, useMemo } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { useProductWithoutLsStore } from "store/useProductStore";
import { AddProductProps } from "types/product";
import { ProductAddSchema } from "utils/validation";
import EditSteppers from "./EditSteppers";

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
      <Toolbar
        title="Edit Product"
        defaultHref={`/product/${code}`}
        action={
          <IonButton
            onClick={() => history.push(`/product/${code}`)}
            color="dark"
          >
            <IonIcon src={"/assets/icon/manage.svg"} />
          </IonButton>
        }
      />
      <IonContent fullscreen className="ion-padding">
        <IonGrid fixed={true}>
          <div className="ion-no-padding">
            <b>Product Information Setup </b>
          </div>
          <EditSteppers step={1} code={code} />
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
                  <IonLabel position="stacked">Product Name</IonLabel>
                  <IonInput
                    className="custom"
                    required
                    placeholder="Enter Product Name"
                    name="prd_name"
                    onIonChange={formik.handleChange}
                    value={formik.values.prd_name}
                  ></IonInput>
                </IonItem>
              </IonCol>

              <IonCol size="12">
                <IonItem lines="none" className="ion-no-padding">
                  <IonLabel position="stacked">Product Category</IonLabel>
                  <IonInput
                    className="custom"
                    required
                    placeholder="Enter food category"
                    name="prd_category"
                    onIonChange={formik.handleChange}
                    value={formik.values.prd_category}
                  ></IonInput>
                </IonItem>
              </IonCol>

              <IonCol size="12">
                <IonItem lines="none" className="ion-no-padding">
                  <IonLabel position="stacked">Product Type</IonLabel>
                  <IonInput
                    className="custom"
                    required
                    placeholder="Enter food type"
                    name="prd_type"
                    onIonChange={formik.handleChange}
                    value={formik.values.prd_type}
                  ></IonInput>
                </IonItem>
              </IonCol>

              <IonCol size="12">
                <IonItem lines="none" className="ion-no-padding">
                  <IonLabel position="stacked">Flavour</IonLabel>
                  <IonInput
                    className="custom"
                    required
                    placeholder="Enter flavour"
                    name="prd_flavour"
                    onIonChange={formik.handleChange}
                    value={formik.values.prd_flavour}
                  ></IonInput>
                </IonItem>
              </IonCol>

              <IonCol size="12">
                <IonItem lines="none" className="ion-no-padding">
                  <IonLabel position="stacked">Storage Instructions: </IonLabel>
                  <IonInput
                    className="custom"
                    required
                    placeholder="Enter instructions"
                    name="prd_storage_instructions"
                    onIonChange={formik.handleChange}
                    value={formik.values.prd_storage_instructions}
                  ></IonInput>
                </IonItem>
              </IonCol>

              <IonCol size="12">
                <IonItem lines="none" className="ion-no-padding">
                  <IonLabel position="stacked">Ingredients</IonLabel>
                  <IonInput
                    className="custom"
                    required
                    placeholder="Enter ingredients in yoour food products"
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
                  <IonLabel position="stacked">Expiry Period</IonLabel>
                  <IonInput
                    className="custom"
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
                <IonItem lines="none" className="ion-no-padding">
                  <IonLabel position="stacked">
                    How to keep product fresh:
                  </IonLabel>
                  <IonTextarea
                    className="custom"
                    required
                    autoGrow
                    placeholder="Enter instructions for keeping the food product"
                    name="prd_keep_it_fresh"
                    onIonChange={formik.handleChange}
                    value={formik.values.prd_keep_it_fresh}
                  ></IonTextarea>
                </IonItem>
              </IonCol>

              <IonCol size="12">
                <IonItem lines="none" className="ion-no-padding">
                  <IonLabel position="stacked">Upload Product Photo</IonLabel>
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
                        Optional: Upload product photo to showcase the product
                      </small>
                    </Fragment>
                  ) : (
                    <Image
                      src={formik.values.prd_image}
                      onClick={() => takePicture()}
                      width={200}
                    />
                  )}
                </IonItem>
              </IonCol>

              <IonButton
                type="submit"
                expand="block"
                className="ion-margin-top text-white"
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
