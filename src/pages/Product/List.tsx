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
import { t, Trans } from "@lingui/macro";

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
        title={t({ id: "Product List" })}
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
            <IonLabel className="ion-text-capitalize">
              <Trans>Active Products</Trans>
            </IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="segment">
            <IonLabel className="ion-text-capitalize">
              <Trans>Archived Products</Trans>
            </IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <IonList lines="full" className="ion-padding">
          <IonSearchbar placeholder={t({ id: "Search" })} />
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
                  <small>
                    <Trans>Product ID</Trans>: {product.prd_code}{" "}
                  </small>
                </div>
                <div>
                  <small>
                    <Trans>Category</Trans>: {product.prd_category}{" "}
                  </small>
                </div>
                <div>
                  <small>
                    <Trans>Type</Trans>: {product.prd_type}{" "}
                  </small>
                </div>
                <div>
                  <small>
                    <Trans>Flavour</Trans>: {product.prd_flavour}{" "}
                  </small>
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
