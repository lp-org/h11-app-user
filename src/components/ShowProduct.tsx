import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { Fragment } from "react";
import { useHistory } from "react-router";
import { Product } from "../types/product";

interface ShowProductProps {
  item: Product | undefined;
}

const ShowProduct: React.FC<ShowProductProps> = ({ item }) => {
  return (
    <Fragment>
      <IonGrid>
        <IonRow style={{ justifyContent: "center" }}>
          <img alt="Food" src={"/assets/products/chip.png"} />
        </IonRow>
        <IonRow>
          <IonCol size="4">Product ID:</IonCol>
          <IonCol>{item?.prd_code}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="4">Product Name:</IonCol>
          <IonCol>{item?.prd_name}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="4">Product Category:</IonCol>
          <IonCol>{item?.prd_category}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="4">Product Type:</IonCol>
          <IonCol>{item?.prd_type}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="4">Flavour:</IonCol>
          <IonCol>{item?.prd_flavour}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="4">Ingredients:</IonCol>
          <IonCol>{item?.prd_ingredients}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="4">Instruction: </IonCol>
          <IonCol>{item?.prd_storage_instructions}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="4">How to keep fresh:</IonCol>
          <IonCol>{item?.prd_keep_it_fresh}</IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="4">Nutritional Facts:</IonCol>
        </IonRow>

        <IonRow>
          <div>
            {" "}
            <pre>{JSON.stringify(item?.prd_nutrition_json, null, 2)}</pre>
          </div>
          <hr />
        </IonRow>
      </IonGrid>
    </Fragment>
  );
};

export default ShowProduct;
