import {
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";

import Toolbar from "components/Toolbar.tsx";

import { useProductBatchList } from "hooks/useProductBatch";
import { useHistory } from "react-router";
import { useState } from "react";
import { useAddBlockchainInfo, useBlockchainList } from "hooks/useQrCode";
import { useAppState } from "store";
import { print } from "ionicons/icons";
import { t, Trans } from "@lingui/macro";

const QrCode: React.FC = () => {
  const { data: products } = useProductBatchList();
  const { data: blockchainList } = useBlockchainList();
  const history = useHistory();
  const [tab, setTab] = useState("1");
  const setLoading = useAppState((state) => state.setLoading);
  const addBlockchainInfo = useAddBlockchainInfo();
  return (
    <IonPage>
      <Toolbar title={t({ id: "QR Code" })} defaultHref="/" />

      <IonContent fullscreen>
        <IonItem lines="none">
          <b>
            <Trans>Select The Batch to Print</Trans>
          </b>
        </IonItem>

        <IonSegment value={tab} onIonChange={(e) => setTab(e.target.value!)}>
          <IonSegmentButton value="1">
            <IonLabel className="ion-text-capitalize">
              <Trans>Generate QR Code</Trans>
            </IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="2">
            <IonLabel className="ion-text-capitalize">
              <Trans>History</Trans>
            </IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* Tab 1 */}
        {tab === "1" ? (
          <IonList lines="full" className="ion-padding">
            <IonSearchbar />
            {products?.map((product) => (
              <IonItem
                key={product.pbth_code}
                className="ion-no-padding ion-no-margin"
              >
                <IonGrid>
                  <IonRow>
                    <IonCol
                      size="11"
                      onClick={() =>
                        history.push(`/qrcode/${product.pbth_code}`)
                      }
                    >
                      <b>
                        <Trans>Batch ID</Trans>: {product.pbth_code}{" "}
                      </b>
                      <div>
                        <small>
                          <Trans>Product Name</Trans>: {product.pbth_prd_name}{" "}
                        </small>
                      </div>
                      <div>
                        <small>
                          <Trans>Product ID</Trans>: {product.pbth_prd_code}{" "}
                        </small>
                      </div>
                      <div>
                        <small>
                          <Trans>Manufactured Date</Trans>:{" "}
                          {product.pbth_manufactured_date}{" "}
                        </small>
                      </div>
                      <div>
                        <small>
                          <Trans>Expiry Date</Trans>: {product.pbth_expiry_date}{" "}
                        </small>
                      </div>
                      <div>
                        <small>
                          <Trans>Print Count</Trans>: 11{" "}
                        </small>
                      </div>
                    </IonCol>
                    <IonCol size="1">
                      <IonIcon
                        icon={print}
                        onClick={() => {
                          setLoading(true);
                          addBlockchainInfo.mutate(
                            { bc_pbth_code: product.pbth_code },
                            {
                              onSuccess: () => setLoading(false),
                            }
                          );
                        }}
                      />
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
            ))}
          </IonList>
        ) : (
          <IonList lines="full" className="ion-padding">
            <IonSearchbar />
            {blockchainList?.map((bc) => (
              <IonItem
                key={bc.bc_qr_code}
                className="ion-no-padding ion-no-margin"
              >
                <IonGrid fixed={true}>
                  <IonRow>
                    <IonCol
                      size="11"
                      onClick={() =>
                        history.push(`/qrcodeHistory/${bc.bc_qr_code}`)
                      }
                    >
                      <div className="wrap-text">
                        <b>
                          <Trans>Unique ID</Trans>: {bc.bc_qr_code}{" "}
                        </b>
                      </div>
                      <div>
                        <small>
                          <Trans>Product Name</Trans>: {bc.bc_prd_name}{" "}
                        </small>
                      </div>
                      <div>
                        <small>
                          <Trans>Product ID</Trans>: {bc.bc_pbth_code}{" "}
                        </small>
                      </div>
                      <div>
                        <small>
                          <Trans>Manufactured Date</Trans>:{" "}
                          {bc.bc_pbth_manufactured_date}
                        </small>
                      </div>
                      <div>
                        <small>
                          <Trans>Expiry Date</Trans>: {bc.bc_pbth_expiry_date}{" "}
                        </small>
                      </div>
                    </IonCol>
                    <IonCol size="1">
                      <IonIcon icon={print} onClick={() => {}} />
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default QrCode;
