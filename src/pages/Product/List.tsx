import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  RefresherEventDetail,
} from "@ionic/react";

import Toolbar from "components/Toolbar.tsx";
import { add } from "ionicons/icons";

import { useProductList } from "hooks/useProduct";
import { useHistory } from "react-router";
import Image from "components/Image";

const ProductList: React.FC = () => {
  const { data: products, refetch } = useProductList();
  const history = useHistory();

  async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    await refetch();
    event.detail.complete();
  }
  return (
    <IonPage>
      <Toolbar
        title="Product List"
        defaultHref="/"
        action={
          <IonButton fill="solid" onClick={() => history.push("/product/add")}>
            <IonIcon icon={add} style={{ color: "#fff" }} />
          </IonButton>
        }
      />

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonSegment value="default" color="primary">
          <IonSegmentButton value="default">
            <IonLabel className="ion-text-capitalize">Active Products</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="segment">
            <IonLabel className="ion-text-capitalize">
              Archived Products
            </IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <IonList lines="full" className="ion-padding">
          <IonSearchbar />
          {products?.map((product) => (
            <IonItem key={product.prd_code}>
              <div className="ion-margin-end">
                <Image imgSrc={product.prd_image} width={80} />
              </div>

              <IonLabel
                onClick={() => history.push(`/product/${product.prd_code}`)}
              >
                <b>{product.prd_name}</b>
                <div>
                  <small>Product ID: {product.prd_code} </small>
                </div>
                <div>
                  <small>Category: {product.prd_category} </small>
                </div>
                <div>
                  <small>Type: {product.prd_type} </small>
                </div>
                <div>
                  <small>Flavour: {product.prd_flavour} </small>
                </div>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ProductList;
