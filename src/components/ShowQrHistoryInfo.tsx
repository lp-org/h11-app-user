import { IonButton, IonCol, IonGrid, IonLabel, IonRow } from "@ionic/react";
import { BlockchainQrInfo } from "hooks/useQrCode";
import { Fragment } from "react";

interface ShowQrHistoryInfoProps {
  item: BlockchainQrInfo | undefined;
}

const ShowQrHistoryInfo: React.FC<ShowQrHistoryInfoProps> = ({ item }) => {
  return (
    <Fragment>
      <IonGrid>
        <IonRow class="ion-text-center">
          <IonCol size="12">
            <img
              src={`data:image/png;base64, ${item?.bc_qr_code_image}`}
              alt="qrcode"
            />
          </IonCol>
          <IonCol size="12">
            <IonButton>Reprint QR Code</IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="4" class="ion-text-right">
            <IonLabel>Batch ID:</IonLabel>
          </IonCol>
          <IonCol className="ion-margin-start ion-margin-bottom">
            {item?.bc_prd_name}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="4" class="ion-text-right">
            <IonLabel>Unique ID </IonLabel>
          </IonCol>

          <IonCol className="ion-margin-start ion-margin-bottom">
            {item?.bc_prd_code}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="4" class="ion-text-right">
            <IonLabel>Product Batch ID:</IonLabel>
          </IonCol>
          <IonCol className="ion-margin-start">{item?.bc_pbth_code}</IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="4" class="ion-text-right">
            <IonLabel>Manufactured Date:</IonLabel>
          </IonCol>
          <IonCol className="ion-margin-start ion-margin-bottom">
            {item?.bc_pbth_manufactured_date}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="4" class="ion-text-right">
            <IonLabel>Expiry Date:</IonLabel>
          </IonCol>
          <IonCol className="ion-margin-start ion-margin-bottom">
            {item?.bc_pbth_expiry_date}
          </IonCol>
        </IonRow>
      </IonGrid>
    </Fragment>
  );
};

export default ShowQrHistoryInfo;
