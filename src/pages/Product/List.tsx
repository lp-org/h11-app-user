import {
  IonContent,
  IonFab,
  IonFabButton,
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
      <Toolbar title="Product" defaultHref="/" />

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonSegment value="default">
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
              <Image
                src={product.prd_image}
                width={80}
                className="ion-margin-end"
              />
              <IonLabel
                onClick={() => history.push(`/product/${product.prd_code}`)}
              >
                <b>{product.prd_name}</b>
                <div>Product ID: {product.prd_code} </div>
                <div>Category: {product.prd_category} </div>
                <div>Type: {product.prd_type} </div>
                <div>Flavour: {product.prd_flavour} </div>
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
