import { IonCol, IonGrid, IonImg, IonRow } from "@ionic/react";
import { Fragment } from "react";
import { Product } from "../types/product";
import NutritionFacts from "./NutritionFacts";

interface ShowProductProps {
  item: Product | undefined;
}

const ShowProduct: React.FC<ShowProductProps> = ({ item }) => {
  return (
    <Fragment>
      <IonGrid>
        <IonRow style={{ justifyContent: "center" }}>
          {item?.prd_image && <IonImg alt="foodimage" src={item?.prd_image} />}
        </IonRow>
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
            Instruction:{" "}
          </IonCol>
          <IonCol>{item?.prd_storage_instructions}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="4" className="ion-text-right">
            How to keep fresh:
          </IonCol>
          <IonCol>{item?.prd_keep_it_fresh}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="4" className="ion-text-right">
            Nutritional Facts:
          </IonCol>
        </IonRow>

        <IonRow
          style={{
            maxWidth: "300px",
            margin: "auto",
          }}
        >
          {/* <pre>{item?.prd_nutrition_json}</pre> */}
          <NutritionFacts json={item?.prd_nutrition_json} />

          <hr />
        </IonRow>
      </IonGrid>
    </Fragment>
  );
};

export default ShowProduct;
