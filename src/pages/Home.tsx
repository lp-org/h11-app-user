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
} from "@ionic/react";
import ProductBox from "components/ProductBox";

import Toolbar from "components/Toolbar.tsx";
import { addCircle, scanCircle, personCircle } from "ionicons/icons";
import { useProductList } from "hooks/useProduct";
import { useHistory } from "react-router";

const QuickAccessList = [
  { title: "Add New Product", path: "/product/add", icon: addCircle },
  { title: "Scan QR Code", path: "/scan", icon: scanCircle },
  { title: "My Profile", path: "", icon: personCircle },
];

const Home: React.FC = () => {
  const { data: products } = useProductList();
  const history = useHistory();

  return (
    <IonPage>
      <Toolbar title="My Home" />

      <IonContent fullscreen className="ion-padding">
        {/* Quick Access */}
        <IonGrid fixed={true} style={{ marginLeft: 0 }}>
          <IonText>
            <h2>Quick Access</h2>
          </IonText>
          <IonRow>
            {QuickAccessList.map((el, i) => (
              <IonCol key={i}>
                <div
                  style={{
                    borderColor: "#999999",
                    border: "solid 1px",
                    borderRadius: 10,
                    padding: 8,
                    textAlign: "center",

                    height: "100%",
                  }}
                  onClick={() => history.push(el.path)}
                >
                  <IonRow>
                    <IonCol size="12">
                      <IonIcon
                        icon={el.icon}
                        style={{ fontSize: "70px" }}
                        color="primary"
                      />
                    </IonCol>
                    <IonCol size="12">
                      <IonLabel>
                        <small>{el.title}</small>
                      </IonLabel>
                    </IonCol>
                  </IonRow>
                </div>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        {/* Products */}
        <IonGrid fixed={true} style={{ marginLeft: 0 }}>
          <IonRow style={{ alignItems: "baseline" }}>
            <IonText>
              <h2>My Products</h2>
            </IonText>

            <IonButton
              onClick={() => history.push("/product")}
              style={{ marginLeft: "auto" }}
              fill="clear"
              size="small"
            >
              View all
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
        <IonGrid fixed={true} style={{ marginLeft: 0 }}>
          <IonRow style={{ alignItems: "baseline" }}>
            <IonText>
              <h2>Product Batch</h2>
            </IonText>

            <IonButton
              onClick={() => history.push("/productBatch")}
              style={{ marginLeft: "auto" }}
              fill="clear"
              size="small"
            >
              View all
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
      </IonContent>
    </IonPage>
  );
};

export default Home;
