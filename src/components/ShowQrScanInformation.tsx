import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { QrInfo } from "hooks/useQrCode";
import { Fragment } from "react";
import Image from "./Image";
import NutritionFacts from "./NutritionFacts";

interface ShowQrScanInformationProps {
  item: QrInfo | undefined;
}

const ShowQrScanInformation: React.FC<ShowQrScanInformationProps> = ({
  item,
}) => {
  return (
    <Fragment>
      {item && (
        <Fragment>
          <IonGrid style={{ background: "#F8F8F8", padding: 10, margin: 10 }}>
            <IonRow style={{ justifyContent: "center" }}>
              <Image src={item?.bc_prd_image} width={200} />
            </IonRow>
            <div style={{ background: "#FFFFFF", fontSize: 12, margin: 8 }}>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  Batch ID:
                </IonCol>
                <IonCol>{item?.bc_pbth_code}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  Unique ID:
                </IonCol>
                <IonCol>{item?.bc_qr_code}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  Manufactured Date:
                </IonCol>
                <IonCol>{item?.bc_pbth_manufactured_date}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  Expiry Date:
                </IonCol>
                <IonCol>{item?.bc_pbth_expiry_date}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  Product ID:
                </IonCol>
                <IonCol>{item?.bc_prd_code}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  Product Name:
                </IonCol>
                <IonCol>{item?.bc_prd_name}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  Food Category:
                </IonCol>
                <IonCol>{item?.bc_prd_category}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  Food Type:
                </IonCol>
                <IonCol>{item?.bc_prd_type}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  Flavour:
                </IonCol>
                <IonCol>{item?.bc_prd_flavour}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  Ingredients:
                </IonCol>
                <IonCol>{item?.bc_prd_ingredients}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  Instruction:
                </IonCol>
                <IonCol>{item?.bc_prd_storage_instructions}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  How to keep fresh:
                </IonCol>
                <IonCol>{item?.bc_prd_keep_it_fresh}</IonCol>
              </IonRow>
            </div>
          </IonGrid>
          <IonRow>
            <IonCol
              size="4"
              className="ion-text-right"
              style={{ fontSize: 12 }}
            >
              Nutritional Facts:
            </IonCol>
          </IonRow>

          <IonRow className="ion-margin-bottom">
            <NutritionFacts json={item?.bc_prd_nutrition_json} />
          </IonRow>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ShowQrScanInformation;
