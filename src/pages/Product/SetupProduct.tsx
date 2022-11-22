import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import Toolbar from "components/Toolbar.tsx";

import { useFormik } from "formik";
import { useAddProduct } from "mock";
import { AddProductProps } from "types/product";
const AddProduct: React.FC = () => {
  const mutateProduct = useAddProduct();
  const formik = useFormik<AddProductProps>({
    initialValues: {
      prd_expiry_period: 0,
      prd_flavour: "",
      prd_ingredients: "",
      prd_name: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      mutateProduct.mutate(values);
    },
  });
  return (
    <IonPage>
      <Toolbar title="Setup Product" defaultHref="/product" />
      <IonContent fullscreen>
        <form onSubmit={formik.handleSubmit}>
          <IonList class="ion-margin">
            <IonItem>
              <IonLabel position="stacked">Name</IonLabel>
              <IonInput
                required
                placeholder="Enter Name"
                name="prd_name"
                onIonChange={formik.handleChange}
                value={formik.values.prd_name}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Flavour</IonLabel>
              <IonInput
                required
                placeholder="Enter Flavour"
                name="prd_flavour"
                onIonChange={formik.handleChange}
                value={formik.values.prd_flavour}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Ingredients</IonLabel>
              <IonInput
                required
                placeholder="Enter Ingredients"
                name="prd_ingredients"
                onIonChange={formik.handleChange}
                value={formik.values.prd_ingredients}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Expiry Period</IonLabel>
              <IonInput
                required
                type="number"
                placeholder="Enter Period"
                name="prd_expiry_period"
                onIonChange={formik.handleChange}
                value={formik.values.prd_expiry_period}
              ></IonInput>
            </IonItem>

            <IonButton type="submit" expand="block" class="ion-margin-top">
              Add
            </IonButton>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddProduct;
