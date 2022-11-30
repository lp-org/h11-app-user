import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  RefresherEventDetail,
} from "@ionic/react";
import Toolbar from "components/Toolbar.tsx";

import { useScanHistoryList } from "hooks/useScanHistory";
import { scan } from "ionicons/icons";
import { useEffect } from "react";

import { useHistory } from "react-router";
import { useScanHistoryStore } from "store/useScanHistoryStore";
const MyScan: React.FC = () => {
  const history = useHistory();
  const historyList = useScanHistoryStore((state) => state.scanHistoryList);

  return (
    <IonPage>
      <Toolbar title="My Scans" defaultHref="/" />

      <IonContent fullscreen>
        <IonSearchbar />

        {historyList &&
          historyList
            .sort((el, elj) => (el.key < elj.key ? 1 : -1))
            ?.map((product) => (
              <IonItem key={product.key}>
                <img
                  alt="Silhouette of mountains"
                  src={"/assets/products/chip.png"}
                />
                <IonLabel onClick={() => {}}>
                  <b>{product.bc_prd_name}</b>
                  <div>Product ID: {product.bc_prd_code} </div>
                  <div>Batch ID: {product.bc_pbth_code} </div>
                  <div>Unique ID: {product.bc_qr_code} </div>
                  <div>
                    Manufactured Date: {product.bc_pbth_manufactured_date}{" "}
                  </div>
                  <div>Expiry Date: {product.bc_pbth_expiry_date} </div>
                </IonLabel>
              </IonItem>
            ))}
      </IonContent>
      <IonFab
        slot="fixed"
        vertical="bottom"
        horizontal="end"
        onClick={() => history.push("/scanProductInformation")}
      >
        <IonFabButton>
          <IonIcon icon={scan}></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default MyScan;
