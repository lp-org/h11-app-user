import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonContent,
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
import { useMemo, useState } from "react";

import { useHistory } from "react-router";
import { useScanHistoryStore } from "store/useScanHistoryStore";
const MyScan: React.FC = () => {
  const history = useHistory();
  const [queryName, setQueryName] = useState("");
  const historyList = useScanHistoryStore((state) => state.scanHistoryList);

  const historyFilteredList = useMemo(() => {
    return historyList.filter((el) => {
      if (queryName) {
        return (
          el.bc_prd_name.toLowerCase().search(queryName.toLowerCase()) >= 0
        );
      } else return true;
    });
  }, [historyList, queryName]);
  const dispatchDeleteHistoryById = useScanHistoryStore(
    (state) => state.removeScanHistoryById
  );
  const [isSelection, setIsSelection] = useState(false);

  const [selectRows, setSelectRows] = useState<number[]>([]);

  return (
    <IonPage>
      <Toolbar
        title="My Scans"
        defaultHref="/"
        action={
          <IonButton onClick={() => history.push("/scanProductInformation")}>
            <IonIcon src="/assets/icon/scan.svg" color="primary" />
          </IonButton>
        }
      />

      <IonContent fullscreen>
        <IonSearchbar
          placeholder="Search Product Name"
          value={queryName}
          onIonChange={(e) => setQueryName(e.target.value!)}
        />
        {historyFilteredList && historyFilteredList?.length > 0 && (
          <IonGrid fixed={true} style={{ marginLeft: 0 }}>
            <IonRow>
              <IonCol size="6" className="ion-text-left">
                <IonRow>
                  {isSelection && (
                    <IonCol size="4" style={{ paddingLeft: 0 }}>
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
                    <IonItem lines="none" className="ion-no-margin">
                      <IonButton
                        color="secondary"
                        onClick={() => {
                          setIsSelection((prev) => !prev);
                          setSelectRows([]);
                        }}
                        fill="clear"
                      >
                        <small>
                          {!isSelection ? "Select Items" : "Cancel"}
                        </small>
                      </IonButton>
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonCol>
              <IonCol size="6" className="ion-text-right">
                {isSelection && (
                  <IonButton
                    color={isSelection ? "danger" : "danger"}
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
            {historyFilteredList &&
              historyFilteredList
                .sort((el, elj) => (el.key < elj.key ? 1 : -1))
                ?.map((product) => (
                  <IonItem key={product.key}>
                    {isSelection && (
                      <IonCheckbox
                        slot="start"
                        style={{ margin: 0, marginRight: 8 }}
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
                    <Image
                      src={product.bc_prd_image}
                      width={80}
                      className="ion-margin-end"
                    />
                    <IonLabel
                      onClick={() => {
                        history.push(`/scanProductHistory/${product.key}`);
                      }}
                    >
                      <b className="wrap-text">{product.bc_prd_name}</b>
                      <div className="wrap-text">
                        <small> Unique ID: {product.bc_qr_code}</small>
                      </div>
                      <div className="wrap-text">
                        <small> Product ID: {product.bc_prd_code}</small>
                      </div>
                      <div className="wrap-text">
                        <small>Product Batch ID: {product.bc_pbth_code} </small>
                      </div>

                      <div>
                        <small>
                          Manufactured Date: {product.bc_pbth_manufactured_date}
                        </small>
                      </div>
                      <div>
                        <small>
                          Expiry Date: {product.bc_pbth_expiry_date}{" "}
                        </small>
                      </div>
                    </IonLabel>
                  </IonItem>
                ))}
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

export default MyScan;
