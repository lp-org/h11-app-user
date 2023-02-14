import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import { t, Trans } from "@lingui/macro";

import Toolbar from "components/Toolbar.tsx";
import { chevronForward } from "ionicons/icons";
import { useHistory } from "react-router";

const Manage: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <Toolbar title={t({ id: "Product" })} defaultHref="/" />
      <IonContent fullscreen>
        <IonList>
          <IonItem class="ion-margin">
            <IonLabel onClick={() => history.push("/product")}>
              <Trans>Product List</Trans>
            </IonLabel>
            <IonIcon icon={chevronForward} />
          </IonItem>
          <IonItem class="ion-margin">
            <IonLabel onClick={() => history.push("/productBatch")}>
              <Trans>Product Batch</Trans>
            </IonLabel>
            <IonIcon icon={chevronForward} />
          </IonItem>
          <IonItem class="ion-margin">
            <IonLabel onClick={() => history.push("/qrcode")}>
              <Trans>QR Code</Trans>
            </IonLabel>
            <IonIcon icon={chevronForward} />
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Manage;
