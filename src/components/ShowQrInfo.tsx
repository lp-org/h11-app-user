import { IonCol, IonGrid, IonLabel, IonRow } from "@ionic/react";
import { QrInfo } from "hooks/useQrCode";
import { Fragment } from "react";
import Image from "./Image";

interface ShowQrInfoProps {
  item: QrInfo | undefined;
}

const ShowQrInfo: React.FC<ShowQrInfoProps> = ({ item }) => {
  return (
    <Fragment>
      {item && (
        <IonGrid>
          <IonRow>
            <IonCol size="5">
              <IonLabel>Product Name:</IonLabel>
            </IonCol>
            <IonCol>{item?.bc_prd_name}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <IonLabel>Product ID: </IonLabel>
            </IonCol>

            <IonCol>{item?.bc_prd_code}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <IonLabel>Product Batch ID:</IonLabel>
            </IonCol>
            <IonCol size="5">{item?.bc_pbth_code}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <IonLabel>Manufactured Date:</IonLabel>
            </IonCol>
            <IonCol>{item?.bc_pbth_manufactured_date}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <IonLabel>Expiry Date:</IonLabel>
            </IonCol>
            <IonCol>{item?.bc_pbth_expiry_date}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">Print Count:</IonCol>
            <IonCol>111</IonCol>
          </IonRow>
        </IonGrid>
      )}
    </Fragment>
  );
};

export default ShowQrInfo;
