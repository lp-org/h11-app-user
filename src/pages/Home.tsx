import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonIcon,
  IonButton,
  IonLabel,
  IonCard,
} from "@ionic/react";
import ProductBox from "components/ProductBox";

import Toolbar from "components/Toolbar.tsx";
import { addCircle } from "ionicons/icons";
import { useProductList } from "hooks/useProduct";
import { useHistory } from "react-router";
import { useProductBatchList } from "hooks/useProductBatch";
import ProductBatchBox from "components/ProductBatchBox";
import { t, Trans } from "@lingui/macro";

const Home: React.FC = () => {
  const { data: products } = useProductList();
  const { data: productBatch } = useProductBatchList();
  const history = useHistory();

  return (
    <IonPage>
      <Toolbar title={t({ id: "Home" })} />
      <IonContent fullscreen className="ion-padding">
        {/* Quick Access */}
        <IonGrid fixed={true} style={{ marginLeft: 0 }}>
          <IonText>
            <h2>
              <Trans>Quick Access</Trans>
            </h2>
          </IonText>
          <IonRow>
            <IonCol size="8">
              <IonRow>
                <IonCol size="12">
                  <IonCard
                    style={{
                      borderRadius: 10,

                      padding: 8,
                      margin: 0,
                    }}
                    onClick={() => history.push("/product/add")}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IonIcon
                        icon={addCircle}
                        style={{ fontSize: "30px" }}
                        color="primary"
                      />

                      <IonLabel class="ion-margin-start">
                        <Trans>Add New Product List</Trans>
                      </IonLabel>
                    </div>
                  </IonCard>
                </IonCol>
                <IonCol size="12">
                  <IonCard
                    style={{
                      borderRadius: 10,

                      height: "100%",
                      padding: 8,
                      margin: 0,
                    }}
                    onClick={() => history.push("/productBatch/add")}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IonIcon
                        icon={addCircle}
                        style={{ fontSize: "30px" }}
                        color="primary"
                      />

                      <IonLabel class="ion-margin-start">
                        <Trans>Add New Product Batch</Trans>
                      </IonLabel>
                    </div>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonCol>
            <IonCol size="4">
              <IonRow style={{ height: "100%" }}>
                <IonCol size="12">
                  <IonCard
                    style={{
                      borderRadius: 10,

                      textAlign: "center",
                      height: "100%",
                      margin: 0,
                    }}
                    onClick={() => history.push("/scanProductInformation")}
                  >
                    <IonRow>
                      <IonCol size="12">
                        <IonIcon
                          src="/assets/icon/scan.svg"
                          style={{ fontSize: "40px", marginTop: 8 }}
                          color="primary"
                        />
                      </IonCol>
                      <IonCol size="12">
                        <IonLabel>
                          <Trans>Scan QR code</Trans>
                        </IonLabel>
                      </IonCol>
                    </IonRow>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
        {/* Products */}
        <IonGrid fixed={true} style={{ marginLeft: 0 }}>
          <IonRow style={{ alignItems: "baseline" }}>
            <IonText>
              <h2>
                <Trans>My Products List</Trans>
              </h2>
            </IonText>

            <IonButton
              onClick={() => history.push("/product")}
              style={{ marginLeft: "auto" }}
              fill="clear"
              size="small"
              color="secondary"
            >
              <Trans> View all</Trans>
            </IonButton>
          </IonRow>
          <IonRow
            style={{
              flexWrap: "nowrap",
              overflowX: "scroll!important",
              overflowY: "hidden",
            }}
          >
            {products?.map((product, i) => (
              <IonCol key={i}>
                <ProductBox item={product} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        {/* Product Batch */}
        <IonGrid fixed={true} style={{ marginLeft: 0 }}>
          <IonRow style={{ alignItems: "baseline" }}>
            <IonText>
              <h2>
                <Trans>My Products Batch</Trans>
              </h2>
            </IonText>

            <IonButton
              onClick={() => history.push("/productBatch")}
              style={{ marginLeft: "auto" }}
              fill="clear"
              size="small"
              color="secondary"
            >
              <Trans>View all</Trans>
            </IonButton>
          </IonRow>
          <IonRow
            style={{
              flexWrap: "nowrap",
              overflowX: "scroll!important",
              overflowY: "hidden",
            }}
          >
            {productBatch?.map((productBatch, i) => (
              <IonCol key={i}>
                <ProductBatchBox item={productBatch} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
