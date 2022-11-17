import { IonItem, IonLabel, IonList, IonPage } from "@ionic/react";

import { useGetProductById } from "mock";
import { useRouteMatch } from "react-router";

interface paramsProps {
  code: string;
}

const ViewProduct: React.FC = () => {
  const match = useRouteMatch<paramsProps>();
  const { code } = match.params;
  const { data } = useGetProductById(code);
  return (
    <IonPage>
      <IonList class="ion-margin">
        <IonItem>
          <IonLabel>Name: {data?.prd_name}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Flavour: {data?.prd_flavour}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Period: {data?.prd_expiry_period}</IonLabel>
        </IonItem>
      </IonList>
    </IonPage>
  );
};

export default ViewProduct;
