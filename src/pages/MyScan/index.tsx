import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSearchbar,
} from "@ionic/react";
import Image from "components/Image";
import Toolbar from "components/Toolbar.tsx";

import { scan } from "ionicons/icons";
import { useState } from "react";

import { useHistory } from "react-router";
import { useScanHistoryStore } from "store/useScanHistoryStore";
const MyScan: React.FC = () => {
  const history = useHistory();
  const historyList = useScanHistoryStore((state) => state.scanHistoryList);
  const dispatchDeleteHistoryById = useScanHistoryStore(
    (state) => state.removeScanHistoryById
  );
  const [isSelection, setIsSelection] = useState(false);

  const [selectRows, setSelectRows] = useState<number[]>([]);

  return (
    <IonPage>
      <Toolbar title="My Scans" defaultHref="/" />

      <IonContent fullscreen>
        <IonSearchbar placeholder="Search Product Name" />
        <IonGrid fixed={true} style={{ marginLeft: 0 }}>
          <IonRow>
            <IonCol size="6" className="ion-text-left">
              <IonRow>
                {isSelection && (
                  <IonCol size="3" style={{ paddingLeft: 0 }}>
                    <IonItem lines="none">
                      <IonCheckbox
                        indeterminate={selectRows.length > 0}
                        slot="start"
                        style={{ margin: 0 }}
                        onIonChange={(e) =>
                          e.target.checked
                            ? setSelectRows(historyList.map((el) => el.key))
                            : setSelectRows([])
                        }
                      ></IonCheckbox>
                    </IonItem>
                  </IonCol>
                )}
                <IonCol>
                  <IonItem lines="none">
                    <IonButton
                      color={!isSelection ? "" : "danger"}
                      onClick={() => {
                        setIsSelection((prev) => !prev);
                        setSelectRows([]);
                      }}
                      fill="clear"
                    >
                      <small>{!isSelection ? "Select Items" : "Cancel"}</small>
                    </IonButton>
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonCol>
            <IonCol size="6" className="ion-text-right">
              {isSelection && (
                <IonButton
                  color={isSelection ? "" : "danger"}
                  onClick={() => {
                    dispatchDeleteHistoryById(selectRows);
                    setIsSelection(false);
                    setSelectRows([]);
                  }}
                  fill="clear"
                >
                  <small>Delete</small>
                </IonButton>
              )}
            </IonCol>
          </IonRow>
          {historyList &&
            historyList
              .sort((el, elj) => (el.key < elj.key ? 1 : -1))
              ?.map((product) => (
                <IonItem key={product.key}>
                  {isSelection && (
                    <IonCheckbox
                      slot="start"
                      style={{ margin: 0 }}
                      checked={selectRows.includes(product.key)}
                      onIonChange={(e) => {
                        if (e.target.checked) {
                          setSelectRows((prev) => [...prev, product.key]);
                        } else {
                          setSelectRows((prev) =>
                            prev.filter((el) => el !== product.key)
                          );
                        }
                      }}
                    ></IonCheckbox>
                  )}
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
      <IonFab
        slot="fixed"
        vertical="bottom"
        horizontal="end"
        onClick={() => history.push("/scanProductInformation")}
      >
        <IonFabButton>
          <IonIcon icon={scan}></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default MyScan;
