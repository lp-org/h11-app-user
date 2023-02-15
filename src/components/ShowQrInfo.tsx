import { IonCol, IonGrid, IonLabel, IonRow } from "@ionic/react";
import { Trans } from "@lingui/macro";
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
              <IonLabel>
                <Trans>Product Name</Trans>:
              </IonLabel>
            </IonCol>
            <IonCol>{item?.bc_prd_name}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <IonLabel>
                <Trans>Product ID</Trans>:{" "}
              </IonLabel>
            </IonCol>

            <IonCol>{item?.bc_prd_code}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <IonLabel>
                <Trans>Product Batch ID</Trans>:
              </IonLabel>
            </IonCol>
            <IonCol size="5">{item?.bc_pbth_code}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <IonLabel>
                <Trans>Manufactured Date</Trans>:
              </IonLabel>
            </IonCol>
            <IonCol>{item?.bc_pbth_manufactured_date}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <IonLabel>
                <Trans>Expiry Date</Trans>:
              </IonLabel>
            </IonCol>
            <IonCol>{item?.bc_pbth_expiry_date}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="5">
              <Trans>Print Count</Trans>:
            </IonCol>
            <IonCol>111</IonCol>
          </IonRow>
        </IonGrid>
      )}
    </Fragment>
  );
};

export default ShowQrInfo;
