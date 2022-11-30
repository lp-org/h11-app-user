import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";

import Toolbar from "components/Toolbar.tsx";

import { useProductBatchList } from "hooks/useProductBatch";
import { useHistory } from "react-router";
import { useState } from "react";
import { useBlockchainList } from "hooks/useQrCode";

const QrCode: React.FC = () => {
  const { data: products } = useProductBatchList();
  const { data: blockchainList } = useBlockchainList();
  const history = useHistory();
  const [tab, setTab] = useState("1");
  return (
    <IonPage>
      <Toolbar title="QR Code" defaultHref="/" />

      <IonContent fullscreen>
        <IonItem lines="none">
          <b>Select The Batch to Print</b>
        </IonItem>

        <IonSegment value={tab} onIonChange={(e) => setTab(e.target.value!)}>
          <IonSegmentButton value="1">
            <IonLabel className="ion-text-capitalize">
              Generate QR Code
            </IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="2">
            <IonLabel className="ion-text-capitalize">History</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* Tab 1 */}
        {tab === "1" ? (
          <IonList lines="full" className="ion-padding">
            <IonSearchbar />
            {products?.map((product) => (
              <IonItem key={product.pbth_code}>
                <IonLabel
                  onClick={() => history.push(`/qrcode/${product.pbth_code}`)}
                >
                  <b>Batch ID: {product.pbth_code} </b>
                  <div>Product ID: {product.pbth_prd_code} </div>
                  <div>Product Name: {product.pbth_prd_code} </div>
                  <div>
                    Manufactured Date: {product.pbth_manufactured_date}{" "}
                  </div>
                  <div>Expiry Date: {product.pbth_expiry_date} </div>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        ) : (
          <IonList lines="full" className="ion-padding">
            <IonSearchbar />
            {blockchainList?.map((bc) => (
              <IonItem key={bc.bc_qr_code}>
                <IonLabel
                  onClick={() =>
                    history.push(`/qrcodeHistory/${bc.bc_qr_code}`)
                  }
                >
                  <b>Unique ID: {bc.bc_qr_code} </b>
                  <div>Product Item: {bc.bc_prd_name} </div>
                  <div>Batch ID: {bc.bc_pbth_code} </div>
                  <div>Manufactured Date: {bc.bc_pbth_manufactured_date} </div>
                  <div>Expiry Date: {bc.bc_pbth_expiry_date} </div>
                  <div>Print Count: 11 </div>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default QrCode;
