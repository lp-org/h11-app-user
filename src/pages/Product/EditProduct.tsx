import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";

import { useFormik } from "formik";
import { useGetProductById } from "mock";
import { useRouteMatch } from "react-router";
import { AddProductProps } from "types/product";
interface paramsProps {
  code: string;
}

const EditProduct: React.FC = () => {
  const match = useRouteMatch<paramsProps>();
  const { code } = match.params;
  const { data } = useGetProductById(code);
  const formik = useFormik<AddProductProps>({
    initialValues: {
      ...data!,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <IonPage>
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
            Update
          </IonButton>
        </IonList>
      </form>
    </IonPage>
  );
};

export default EditProduct;
