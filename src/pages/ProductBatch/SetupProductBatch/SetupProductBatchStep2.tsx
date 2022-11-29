import {
  IonRow,
  IonContent,
  IonPage,
  IonCol,
  IonLabel,
  IonButton,
} from "@ionic/react";
import ShowProductBatch from "components/ShowProductBatch";
import Toolbar from "components/Toolbar.tsx";

import { useAddProductBatch } from "hooks/useProductBatch";
import { FC, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { AddProductBatchProps } from "../../../types/productBatch";

interface StateProps {
  values: AddProductBatchProps | undefined;
  formikReset: () => void;
}

const SetupProductBatchStep2: FC = () => {
  const { state } = useLocation<StateProps | undefined>();

  const history = useHistory();

  useEffect(() => {
    if (!state?.values) {
      history.push("/productBatch/add");
    }
  }, []);
  const addProductBatch = useAddProductBatch();

  const handleSubmit = () => {
    if (state?.values) addProductBatch.mutate(state?.values);
  };
  return (
    <IonPage>
      <Toolbar title="Product Batch Setup" defaultHref="/productBatch" />
      <IonContent fullscreen className="ion-padding">
        <IonCol size="12" className="ion-margin-bottom">
          <IonLabel>
            <b>Previw Product Batch Information Setup</b>
          </IonLabel>
        </IonCol>
        <ShowProductBatch item={state?.values} />
        <IonButton type="submit" expand="full" onClick={() => handleSubmit()}>
          Confirm
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SetupProductBatchStep2;
