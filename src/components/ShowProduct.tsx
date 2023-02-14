import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { Trans } from "@lingui/macro";
import { Fragment } from "react";
import { Product } from "../types/product";
import Image from "./Image";
import NutritionFacts from "./NutritionFacts";

interface ShowProductProps {
  item: Product | undefined;
}

const ShowProduct: React.FC<ShowProductProps> = ({ item }) => {
  return (
    <Fragment>
      {item && (
        <Fragment>
          <IonGrid style={{ background: "#F8F8F8", marginBottom: 10 }}>
            <IonRow style={{ justifyContent: "center", marginTop: "10px" }}>
              {item.prd_image && <Image src={item.prd_image} width={200} />}
            </IonRow>
            <div style={{ background: "#FFFFFF", fontSize: 12, margin: 12 }}>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  <Trans>Product ID</Trans>:
                </IonCol>
                <IonCol>{item?.prd_code}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  <Trans>Product Name</Trans>:
                </IonCol>
                <IonCol>{item?.prd_name}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  <Trans>Product Category</Trans>:
                </IonCol>
                <IonCol>{item?.prd_category}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  <Trans>Product Type</Trans>:
                </IonCol>
                <IonCol>{item?.prd_type}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  <Trans>Flavour</Trans>:
                </IonCol>
                <IonCol>{item?.prd_flavour}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  <Trans>Ingredients</Trans>:
                </IonCol>
                <IonCol>{item?.prd_ingredients}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  <Trans>Instruction</Trans>:
                </IonCol>
                <IonCol>{item?.prd_storage_instructions}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  <Trans>Expiry Period</Trans>:
                </IonCol>
                <IonCol>
                  {item?.prd_expiry_period}
                  <Trans>{" day"}</Trans>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  <Trans>How to keep fresh</Trans>:
                </IonCol>
                <IonCol>{item?.prd_keep_it_fresh}</IonCol>
              </IonRow>
            </div>

            <IonRow>
              {/* <pre>{item?.prd_nutrition_json}</pre> */}

              <hr />
            </IonRow>
          </IonGrid>
          <IonRow style={{ fontSize: 12 }}>
            <IonCol size="4" className="ion-text-right">
              <Trans>Nutritional Facts</Trans>:
            </IonCol>
          </IonRow>
          <NutritionFacts json={item?.prd_nutrition_json} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default ShowProduct;
