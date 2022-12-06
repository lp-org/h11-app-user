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
  IonCheckbox,
  IonItem,
} from "@ionic/react";
import ProductBox from "components/ProductBox";

import Toolbar from "components/Toolbar.tsx";
import { scanCircle, personCircle } from "ionicons/icons";
import { useProductList } from "hooks/useProduct";
import { useHistory } from "react-router";
import { useProductBatchList } from "hooks/useProductBatch";
import ProductBatchBox from "components/ProductBatchBox";
import { useScanHistoryStore } from "store/useScanHistoryStore";
import Image from "components/Image";

const QuickAccessList = [
  { title: "Scan QR Code", path: "/scan", icon: scanCircle },
  { title: "My Profile", path: "/profile", icon: personCircle },
];

const Home: React.FC = () => {
  const historyList = useScanHistoryStore((state) => state.scanHistoryList);
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
              <h2>Recently Scanned Products</h2>
            </IonText>

            <IonButton
              onClick={() => history.push("/scan")}
              style={{ marginLeft: "auto" }}
              fill="clear"
              size="small"
            >
              View all
            </IonButton>
          </IonRow>
          {historyList &&
            historyList
              .sort((el, elj) => (el.key < elj.key ? 1 : -1))
              ?.map((product) => (
                <IonItem key={product.key}>
                  <Image src={product.bc_prd_image} width={80} />
                  <IonLabel
                    onClick={() => {
                      history.push(`/scanProductHistory/${product.key}`);
                    }}
                  >
                    <b className="wrap-text">{product.bc_prd_name}</b>
                    <div className="wrap-text">
                      Product ID: {product.bc_prd_code}
                    </div>
                    <div className="wrap-text">
                      Batch ID: {product.bc_pbth_code}
                    </div>
                    <div className="wrap-text">
                      Unique ID: {product.bc_qr_code}
                    </div>
                    <div>
                      Manufactured Date: {product.bc_pbth_manufactured_date}
                    </div>
                    <div>Expiry Date: {product.bc_pbth_expiry_date} </div>
                  </IonLabel>
                </IonItem>
              ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
