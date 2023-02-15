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
  IonItem,
  IonCard,
} from "@ionic/react";

import Toolbar from "components/Toolbar.tsx";
import { personCircleOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { useScanHistoryStore } from "store/useScanHistoryStore";
import Image from "components/Image";
import ProductBatchBox from "components/ProductBatchBox";
import { t, Trans } from "@lingui/macro";

const Home: React.FC = () => {
  const historyList = useScanHistoryStore((state) => state.scanHistoryList);
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
            <IonCol size="6">
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
                          style={{ fontSize: "40px", marginTop: 14 }}
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
            <IonCol size="6">
              <IonRow style={{ height: "100%" }}>
                <IonCol size="12">
                  <IonCard
                    style={{
                      borderRadius: 10,

                      textAlign: "center",
                      height: "100%",
                      margin: 0,
                    }}
                    onClick={() => history.push("/profile")}
                  >
                    <IonRow>
                      <IonCol size="12">
                        <IonIcon
                          icon={personCircleOutline}
                          style={{ fontSize: "48px", marginTop: 8 }}
                          color="primary"
                        />
                      </IonCol>
                      <IonCol size="12">
                        <IonLabel>
                          <p>
                            <Trans>Profile</Trans>
                          </p>
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
                <Trans>Recently Scanned Products</Trans>
              </h2>
            </IonText>

            <IonButton
              onClick={() => history.push("/scan")}
              style={{ marginLeft: "auto" }}
              fill="clear"
              size="small"
              color="secondary"
            >
              <Trans> View all</Trans>
            </IonButton>
          </IonRow>
          {historyList &&
            historyList
              .sort((el, elj) => (el.key < elj.key ? 1 : -1))
              ?.map((product) => (
                <IonItem key={product.key}>
                  <div className="ion-margin-end">
                    <Image src={product.bc_prd_image} width={80} />
                  </div>

                  <IonLabel
                    onClick={() => {
                      history.push(`/scanProductHistory/${product.key}`);
                    }}
                  >
                    <b className="wrap-text">{product.bc_prd_name}</b>
                    <div className="wrap-text">
                      <Trans>Product ID</Trans>: {product.bc_prd_code}
                    </div>
                    <div className="wrap-text">
                      <Trans>Batch ID</Trans>: {product.bc_pbth_code}
                    </div>
                    <div className="wrap-text">
                      <Trans>Unique ID</Trans>: {product.bc_qr_code}
                    </div>
                    <div>
                      <Trans>Manufactured Date</Trans>:{" "}
                      {product.bc_pbth_manufactured_date}
                    </div>
                    <div>
                      <Trans>Expiry Date</Trans>: {product.bc_pbth_expiry_date}{" "}
                    </div>
                  </IonLabel>
                </IonItem>
              ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
