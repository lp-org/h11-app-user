import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";

import Toolbar from "components/Toolbar.tsx";
import { add } from "ionicons/icons";

import { useProductList } from "mock";
import { useHistory } from "react-router";

const ProductList: React.FC = () => {
  const { data: products } = useProductList();
  const history = useHistory();

  return (
    <IonPage>
      <Toolbar title="Product" defaultHref="/" />
      <IonContent fullscreen>
        <IonList lines="full">
          {products?.map((product) => (
            <IonItem>
              <img
                alt="Silhouette of mountains"
                src={"/assets/products/chip.png"}
              />
              <IonLabel onClick={() => history.push("/product")}>
                <b>{product.prd_name}</b>
                <div>Product ID: {product.prd_code} </div>
                <div>Category: {product.prd_nutrition_info} </div>
                <div>Type: {product.prd_nutrition_info} </div>
                <div>Flavour: {product.prd_flavour} </div>
                <div> Information: {product.prd_nutrition_info} </div>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      <IonFab
        slot="fixed"
        vertical="bottom"
        horizontal="end"
        onClick={() => history.push("/product/add")}
      >
        <IonFabButton>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default ProductList;
