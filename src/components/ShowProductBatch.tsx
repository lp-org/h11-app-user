import { IonCol, IonGrid, IonLabel, IonRow } from "@ionic/react";
import { Trans } from "@lingui/macro";
import { Fragment } from "react";
import { ProductBatch } from "types/productBatch";

interface ShowProductBatchProps {
  item: ProductBatch | undefined;
}

const ShowProductBatch: React.FC<ShowProductBatchProps> = ({ item }) => {
  return (
    <Fragment>
      <IonGrid style={{ fontSize: 14 }}>
        <IonRow>
          <IonCol size="5">
            <IonLabel>
              <Trans>Product Name</Trans>:
            </IonLabel>
          </IonCol>
          <IonCol className="ion-margin-start ion-margin-bottom">
            {item?.pbth_prd_name}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="5">
            <IonLabel>
              <Trans>Product ID</Trans>:{" "}
            </IonLabel>
          </IonCol>

          <IonCol className="ion-margin-start ion-margin-bottom">
            {item?.pbth_prd_code}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="5">
            <IonLabel>
              <Trans>Product Batch ID</Trans>:
            </IonLabel>
          </IonCol>
          <IonCol className="ion-margin-start ion-margin-bottom">
            {item?.pbth_code}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="5">
            <IonLabel>
              <Trans>Manufactured Date</Trans>:
            </IonLabel>
          </IonCol>
          <IonCol className="ion-margin-start ion-margin-bottom">
            {item?.pbth_manufactured_date}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="5">
            <IonLabel>
              <Trans>Expiry Date</Trans>:
            </IonLabel>
          </IonCol>
          <IonCol className="ion-margin-start ion-margin-bottom">
            {item?.pbth_expiry_date}
          </IonCol>
        </IonRow>
      </IonGrid>
    </Fragment>
  );
};

export default ShowProductBatch;
