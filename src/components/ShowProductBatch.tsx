import { IonCol, IonGrid, IonLabel, IonRow } from "@ionic/react";
import { Fragment } from "react";
import { ProductBatch } from "types/productBatch";

interface ShowProductBatchProps {
  item: ProductBatch | undefined;
}

const ShowProductBatch: React.FC<ShowProductBatchProps> = ({ item }) => {
  return (
    <Fragment>
      <IonGrid>
        <IonRow>
          <IonCol size="12">
            <IonLabel>Product Name:</IonLabel>
          </IonCol>
          <IonCol className="ion-margin-start ion-margin-bottom">
            {item?.pbth_prd_name}
          </IonCol>
          <IonCol size="12">
            <IonLabel>Product ID: </IonLabel>
          </IonCol>

          <IonCol className="ion-margin-start ion-margin-bottom">
            {item?.pbth_prd_code}
          </IonCol>
          <IonCol size="12">
            <IonLabel>Product Batch ID:</IonLabel>
          </IonCol>
          <IonCol size="12" className="ion-margin-start">
            {item?.pbth_code}
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
            {item?.pbth_manufactured_date}
          </IonCol>
          <IonCol size="12">
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
