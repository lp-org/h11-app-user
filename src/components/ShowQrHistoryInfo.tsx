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
      <IonGrid style={{ background: "#F8F8F8", marginBottom: 10 }}>
        <IonRow class="ion-text-center" style={{ marginTop: "10px" }}>
          <IonCol size="12">
            <img
              src={`data:image/png;base64, ${item?.bc_qr_code_image}`}
              alt="qrcode"
            />
          </IonCol>
          <IonCol size="12">
            <IonButton shape="round" className="text-white">
              Reprint QR Code
            </IonButton>
          </IonCol>
          <IonCol size="12">
            <small>Print Count: 1</small>
          </IonCol>
        </IonRow>
        <div
          style={{ background: "#FFFFFF", fontSize: 12, margin: 8, padding: 8 }}
        >
          {" "}
          <IonRow>
            <IonCol size="4">
              <IonLabel>Batch ID:</IonLabel>
            </IonCol>
            <IonCol className="ion-margin-start ion-margin-bottom">
              {item?.bc_pbth_code}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="4">
              <IonLabel>Manufactured Date:</IonLabel>
            </IonCol>
            <IonCol className="ion-margin-start ion-margin-bottom">
              {item?.bc_pbth_manufactured_date}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="4">
              <IonLabel>Expiry Date:</IonLabel>
            </IonCol>
            <IonCol className="ion-margin-start ion-margin-bottom">
              {item?.bc_pbth_expiry_date}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="4">
              <IonLabel>Unique ID </IonLabel>
            </IonCol>

            <IonCol className="ion-margin-start ion-margin-bottom">
              {item?.bc_qr_code}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="4">
              <IonLabel>Product ID:</IonLabel>
            </IonCol>
            <IonCol className="ion-margin-start">{item?.bc_prd_code}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="4">
              <IonLabel>Product Name:</IonLabel>
            </IonCol>
            <IonCol className="ion-margin-start">{item?.bc_prd_name}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="4">
              <IonLabel>Food Category:</IonLabel>
            </IonCol>
            <IonCol className="ion-margin-start">
              {item?.bc_prd_category}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="4">
              <IonLabel>Food Type:</IonLabel>
            </IonCol>
            <IonCol className="ion-margin-start">{item?.bc_prd_type}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="4">
              <IonLabel>Flavour:</IonLabel>
            </IonCol>
            <IonCol className="ion-margin-start">{item?.bc_prd_flavour}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="4">
              <IonLabel>Ingredients:</IonLabel>
            </IonCol>
            <IonCol className="ion-margin-start">
              {item?.bc_prd_ingredients}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="4">
              <IonLabel>Instruction: </IonLabel>
            </IonCol>
            <IonCol className="ion-margin-start">
              {item?.bc_prd_storage_instructions}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="4">
              <IonLabel>How to keep fresh:</IonLabel>
            </IonCol>
            <IonCol className="ion-margin-start">
              {item?.bc_prd_keep_it_fresh}
            </IonCol>
          </IonRow>
        </div>
      </IonGrid>
      <IonRow style={{ fontSize: 12 }}>
        <IonCol size="4">
          <IonLabel>Nutritional Facts:</IonLabel>
        </IonCol>
      </IonRow>
      <IonRow>
        <NutritionFacts json={item?.bc_prd_nutrition_json} />
      </IonRow>
    </Fragment>
  );
};

export default ShowQrHistoryInfo;
