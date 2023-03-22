import { IonCol, IonGrid, IonLabel, IonRow } from "@ionic/react";
import { Trans } from "@lingui/macro";

import { Fragment } from "react";
import { QrInfo } from "types/qrCode";

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
            <IonCol>{item?.bc_count}</IonCol>
          </IonRow>
        </IonGrid>
      )}
    </Fragment>
  );
};

export default ShowQrInfo;
