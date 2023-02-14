import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { Trans } from "@lingui/macro";
import { VerifyQrInfo } from "hooks/useQrCode";
import { Fragment } from "react";
import Image from "./Image";
import NutritionFacts from "./NutritionFacts";

interface ShowQrScanInformationProps {
  item: VerifyQrInfo | undefined;
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
            <div style={{ background: "#FFFFFF", fontSize: 12, margin: 12 }}>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  <Trans>Batch ID</Trans>:
                </IonCol>
                <IonCol>{item?.bc_pbth_code}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  <Trans>Unique ID</Trans>:
                </IonCol>
                <IonCol>{item?.bc_qr_code}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  <Trans>Manufactured Date</Trans>:
                </IonCol>
                <IonCol>{item?.bc_pbth_manufactured_date}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  <Trans>Expiry Date</Trans>:
                </IonCol>
                <IonCol>{item?.bc_pbth_expiry_date}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  <Trans>Product ID</Trans>:
                </IonCol>
                <IonCol>{item?.bc_prd_code}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  <Trans>Product Name</Trans>:
                </IonCol>
                <IonCol>{item?.bc_prd_name}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  <Trans>Food Category</Trans>:
                </IonCol>
                <IonCol>{item?.bc_prd_category}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  <Trans>Food Type</Trans>:
                </IonCol>
                <IonCol>{item?.bc_prd_type}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  <Trans>Flavour</Trans>:
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
                  <Trans>Instruction</Trans>:
                </IonCol>
                <IonCol>{item?.bc_prd_storage_instructions}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  <Trans>How to keep fresh</Trans>:
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
              <Trans>Nutritional Facts</Trans>:
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
