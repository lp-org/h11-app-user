import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";

import Toolbar from "components/Toolbar.tsx";
import { chevronForward } from "ionicons/icons";
import { useHistory } from "react-router";

const Manage: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <Toolbar title="Product" defaultHref="/" />
      <IonContent fullscreen>
        <IonList lines="full">
          <IonItem>
            <IonLabel onClick={() => history.push("/product")}>
              Product List
            </IonLabel>
            <IonIcon icon={chevronForward} />
          </IonItem>
          <IonItem>
            <IonLabel onClick={() => history.push("/productBatch")}>
              Product Batch
            </IonLabel>
            <IonIcon icon={chevronForward} />
          </IonItem>
          <IonItem>
            <IonLabel onClick={() => history.push("/qrcode")}>QR Code</IonLabel>
            <IonIcon icon={chevronForward} />
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Manage;
