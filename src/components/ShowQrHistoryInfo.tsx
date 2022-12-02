import { IonButton, IonCol, IonGrid, IonLabel, IonRow } from "@ionic/react";
import { BlockchainQrInfo } from "hooks/useQrCode";
import { Fragment } from "react";
import NutritionFacts from "./NutritionFacts";

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
          <IonCol size="12">
            <small>Print Count: 1</small>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="5" class="ion-text-right">
            <IonLabel>Batch ID:</IonLabel>
          </IonCol>
          <IonCol className="ion-margin-start ion-margin-bottom">
            {item?.bc_pbth_code}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="5" class="ion-text-right">
            <IonLabel>Manufactured Date:</IonLabel>
          </IonCol>
          <IonCol className="ion-margin-start ion-margin-bottom">
            {item?.bc_pbth_manufactured_date}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="5" class="ion-text-right">
            <IonLabel>Expiry Date:</IonLabel>
          </IonCol>
          <IonCol className="ion-margin-start ion-margin-bottom">
            {item?.bc_pbth_expiry_date}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="5" class="ion-text-right">
            <IonLabel>Unique ID </IonLabel>
          </IonCol>

          <IonCol className="ion-margin-start ion-margin-bottom">
            {item?.bc_qr_code}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="5" class="ion-text-right">
            <IonLabel>Product ID:</IonLabel>
          </IonCol>
          <IonCol className="ion-margin-start">{item?.bc_prd_code}</IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="5" class="ion-text-right">
            <IonLabel>Product Name:</IonLabel>
          </IonCol>
          <IonCol className="ion-margin-start">{item?.bc_prd_name}</IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="5" class="ion-text-right">
            <IonLabel>Food Category:</IonLabel>
          </IonCol>
          <IonCol className="ion-margin-start">{item?.bc_prd_category}</IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="5" class="ion-text-right">
            <IonLabel>Food Type:</IonLabel>
          </IonCol>
          <IonCol className="ion-margin-start">{item?.bc_prd_type}</IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="5" class="ion-text-right">
            <IonLabel>Flavour:</IonLabel>
          </IonCol>
          <IonCol className="ion-margin-start">{item?.bc_prd_flavour}</IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="5" class="ion-text-right">
            <IonLabel>Ingredients:</IonLabel>
          </IonCol>
          <IonCol className="ion-margin-start">
            {item?.bc_prd_ingredients}
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="5" class="ion-text-right">
            <IonLabel>Instruction: </IonLabel>
          </IonCol>
          <IonCol className="ion-margin-start">
            {item?.bc_prd_storage_instructions}
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="5" class="ion-text-right">
            <IonLabel>How to keep fresh:</IonLabel>
          </IonCol>
          <IonCol className="ion-margin-start">
            {item?.bc_prd_keep_it_fresh}
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="5" class="ion-text-right">
            <IonLabel>Nutritional Facts:</IonLabel>
          </IonCol>
        </IonRow>
        <IonRow>
          <NutritionFacts json={item?.bc_prd_nutrition_json} />
        </IonRow>
      </IonGrid>
    </Fragment>
  );
};

export default ShowQrHistoryInfo;
