import { IonCol, IonGrid, IonLabel, IonRow } from "@ionic/react";
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
            <IonLabel>Product Name:</IonLabel>
          </IonCol>
          <IonCol className="ion-margin-start ion-margin-bottom">
            {item?.pbth_prd_name}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="5">
            <IonLabel>Product ID: </IonLabel>
          </IonCol>

          <IonCol className="ion-margin-start ion-margin-bottom">
            {item?.pbth_prd_code}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="5">
            <IonLabel>Product Batch ID:</IonLabel>
          </IonCol>
          <IonCol className="ion-margin-start ion-margin-bottom">
            {item?.pbth_code}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="5">
            <IonLabel>Manufactured Date:</IonLabel>
          </IonCol>
          <IonCol className="ion-margin-start ion-margin-bottom">
            {item?.pbth_manufactured_date}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="5">
            <IonLabel>Expiry Date:</IonLabel>
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
