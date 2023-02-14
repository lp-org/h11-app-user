import {
  IonContent,
  IonPage,
  IonCol,
  IonLabel,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { t } from "@lingui/macro";
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
        <div style={{ display: "flex", flexFlow: "column", height: "100%" }}>
          <div style={{ flex: "0 1 auto" }}>
            <IonCol size="12">
              <IonLabel className="ion-padding-bottom">
                <b>Preview</b>
              </IonLabel>
            </IonCol>
            <ShowProductBatch item={state?.values} />
          </div>
          <div
            style={{ flex: "1 1 auto", display: "flex", flexFlow: "column" }}
          >
            <IonButton
              type="submit"
              expand="block"
              className="text-white"
              style={{ marginTop: "auto" }}
              onClick={() => handleSubmit()}
            >
              Confirm
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SetupProductBatchStep2;
