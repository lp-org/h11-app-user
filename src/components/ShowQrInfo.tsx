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
            <IonRow style={{ marginLeft: "auto", marginRight: "auto" }}>
              <Image src={item?.bc_prd_image} width={200} />
            </IonRow>
            <IonCol size="12">
              <IonLabel>Product Name:</IonLabel>
            </IonCol>
            <IonCol className="ion-margin-start ion-margin-bottom">
              {item?.bc_prd_name}
            </IonCol>
            <IonCol size="12">
              <IonLabel>Product ID: </IonLabel>
            </IonCol>

            <IonCol className="ion-margin-start ion-margin-bottom">
              {item?.bc_prd_code}
            </IonCol>
            <IonCol size="12">
              <IonLabel>Product Batch ID:</IonLabel>
            </IonCol>
            <IonCol size="12" className="ion-margin-start">
              {item?.bc_pbth_code}
            </IonCol>
            <IonCol size="12" className="ion-margin-bottom">
              <small style={{ opacity: 0.4 }}>
                The Product Batch ID is auto generated and cannot be changed.
              </small>
            </IonCol>
            <IonCol size="12">
              <IonLabel>Manufactured Date:</IonLabel>
            </IonCol>
            <IonCol className="ion-margin-start ion-margin-bottom">
              {item?.bc_pbth_manufactured_date}
            </IonCol>
            <IonCol size="12">
              <IonLabel>Expiry Date:</IonLabel>
            </IonCol>
            <IonCol className="ion-margin-start ion-margin-bottom">
              {item?.bc_pbth_expiry_date}
            </IonCol>
          </IonRow>
        </IonGrid>
      )}
    </Fragment>
  );
};

export default ShowQrInfo;
