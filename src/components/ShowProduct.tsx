import { IonCol, IonGrid, IonRow } from "@ionic/react";
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
            <div style={{ background: "#FFFFFF", fontSize: 12, margin: 8 }}>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  Product ID:
                </IonCol>
                <IonCol>{item?.prd_code}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  Product Name:
                </IonCol>
                <IonCol>{item?.prd_name}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  Product Category:
                </IonCol>
                <IonCol>{item?.prd_category}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  Product Type:
                </IonCol>
                <IonCol>{item?.prd_type}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  Flavour:
                </IonCol>
                <IonCol>{item?.prd_flavour}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  Ingredients:
                </IonCol>
                <IonCol>{item?.prd_ingredients}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  Instruction:
                </IonCol>
                <IonCol>{item?.prd_storage_instructions}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  Expiry Period:
                </IonCol>
                <IonCol>
                  {item?.prd_expiry_period}
                  {" day"}
                  {item?.prd_expiry_period && item?.prd_expiry_period > 1
                    ? "s"
                    : ""}
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4" className="ion-text-right">
                  How to keep fresh:
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
              Nutritional Facts:
            </IonCol>
          </IonRow>
          <NutritionFacts json={item?.prd_nutrition_json} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default ShowProduct;
