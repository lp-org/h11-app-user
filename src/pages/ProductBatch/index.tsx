import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
} from "@ionic/react";

import Toolbar from "components/Toolbar.tsx";
import { add } from "ionicons/icons";

import { useProductBatchList } from "hooks/useProductBatch";
import { useHistory } from "react-router";

const ProductBatch: React.FC = () => {
  const { data: products } = useProductBatchList();
  const history = useHistory();

  return (
    <IonPage>
      <Toolbar title="Product Batch" defaultHref="/" />

      <IonContent fullscreen>
        <IonList lines="full" className="ion-padding">
          <IonSearchbar />
          {products?.map((product) => (
            <IonItem key={product.pbth_code}>
              <IonLabel
                onClick={() =>
                  history.push(`/productBatch/${product.pbth_code}`)
                }
              >
                <b>Batch ID: {product.pbth_code} </b>
                <div>Product ID: {product.pbth_prd_code} </div>
                <div>Product Name: {product.pbth_prd_name} </div>
                <div>Manufactured Date: {product.pbth_manufactured_date} </div>
                <div>Expiry Date: {product.pbth_expiry_date} </div>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      <IonFab
        slot="fixed"
        vertical="bottom"
        horizontal="end"
        onClick={() => history.push("/productBatch/add")}
      >
        <IonFabButton>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default ProductBatch;
