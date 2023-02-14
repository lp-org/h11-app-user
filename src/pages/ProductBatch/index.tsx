import {
  IonButton,
  IonContent,
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
import { t } from "@lingui/macro";

const ProductBatch: React.FC = () => {
  const { data: products } = useProductBatchList();
  const history = useHistory();

  return (
    <IonPage>
      <Toolbar
        title={t({ id: "Product Batch" })}
        defaultHref="/"
        action={
          <IonButton
            fill="solid"
            onClick={() => history.push("/productBatch/add")}
          >
            <IonIcon icon={add} style={{ color: "#fff" }} />
          </IonButton>
        }
      />

      <IonContent fullscreen className="ion-padding">
        <IonList lines="full" style={{ background: "transparent" }}>
          <IonSearchbar />
          {products?.map((product) => (
            <IonItem key={product.pbth_code}>
              <IonLabel
                onClick={() =>
                  history.push(`/productBatch/${product.pbth_code}`)
                }
              >
                <b>Batch ID: {product.pbth_code} </b>
                <div>
                  <small>Product Name: {product.pbth_prd_name} </small>
                </div>
                <div>
                  <small>Product ID: {product.pbth_prd_code} </small>
                </div>
                <div>
                  <small>
                    Manufactured Date: {product.pbth_manufactured_date}
                  </small>
                </div>
                <div>
                  <small>Expiry Date: {product.pbth_expiry_date} </small>
                </div>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ProductBatch;
