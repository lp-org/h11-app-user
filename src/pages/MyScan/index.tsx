import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonRow,
  IonSearchbar,
} from "@ionic/react";
import Image from "components/Image";
import Toolbar from "components/Toolbar.tsx";

import { checkmarkOutline, closeCircleOutline, filter } from "ionicons/icons";
import dayjs from "dayjs";
import { useMemo, useRef, useState } from "react";

import { useHistory } from "react-router";
import { useScanHistoryStore } from "store/useScanHistoryStore";
import "./index.css";
import { t, Trans } from "@lingui/macro";
const MyScan: React.FC = () => {
  const history = useHistory();
  const [queryName, setQueryName] = useState("");
  const historyList = useScanHistoryStore((state) => state.scanHistoryList);
  const [dateList, setDateList] = useState<string[]>([]);

  const historyFilteredList = useMemo(() => {
    return historyList.filter((el) => {
      let nameValid = true;
      let dateValid = true;
      if (queryName) {
        nameValid =
          el.bc_prd_name.toLowerCase().search(queryName.toLowerCase()) >= 0;
      }
      if (dateList && dateList.length > 0) {
        dateValid = dateList.some((elj) => {
          return dayjs(elj).isSame(
            dayjs.unix(el.timestamp).format("YYYY-MM-DD"),
            "day"
          );
        });
      }
      return nameValid && dateValid;
    });
  }, [historyList, queryName, dateList]);
  const dispatchDeleteHistoryById = useScanHistoryStore(
    (state) => state.removeScanHistoryById
  );
  const [isSelection, setIsSelection] = useState(false);

  const [selectRows, setSelectRows] = useState<number[]>([]);

  const modal = useRef<HTMLIonModalElement>(null);
  const datetime = useRef<null | HTMLIonDatetimeElement>(null);

  return (
    <IonPage>
      <Toolbar
        title={t({ id: "My Scan" })}
        defaultHref="/"
        action={
          <IonButton onClick={() => history.push("/scanProductInformation")}>
            <IonIcon src="/assets/icon/scan.svg" color="primary" />
          </IonButton>
        }
      />

      <IonContent fullscreen>
        <IonGrid className="ion-no-margin ion-no-padding">
          <IonRow class="ion-align-items-center">
            <IonCol>
              <IonSearchbar
                placeholder={t({ id: "Search Product Name" })}
                value={queryName}
                onIonChange={(e) => setQueryName(e.target.value!)}
              />
            </IonCol>
            <IonCol size="auto" className="ion-padding-end">
              <IonIcon icon={filter} id="scanned_date" />
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonModal
          ref={modal}
          keepContentsMounted={true}
          className="ion-datetime-button-overlay"
          trigger="scanned_date"
        >
          <IonDatetime
            id="scanned_date"
            name="scanned_date"
            presentation="date"
            max={dayjs().year().toString()}
            multiple
            showDefaultButtons
            onIonChange={(e: any) => {
              if (e.target.value) setDateList(e.target.value);
            }}
            ref={datetime}
          >
            <IonButtons slot="buttons">
              <IonButton
                color="primary"
                fill="solid"
                style={{ marginLeft: "auto", marginRight: "auto" }}
                onClick={() => {
                  datetime.current?.confirm(true);
                }}
              >
                <IonIcon icon={checkmarkOutline} className="text-white" />
              </IonButton>
            </IonButtons>
          </IonDatetime>
        </IonModal>
        <IonGrid>
          <IonRow class="ion-align-items-center">
            {dateList.length > 0 && "Filter:"}
            {dateList.map((date) => (
              <div color="light" className="border-primary" key={date}>
                {dayjs(date).format("DD MMM YYYY")}{" "}
                <IonIcon
                  style={{ verticalAlign: "top" }}
                  icon={closeCircleOutline}
                  onClick={() => {
                    setDateList((prev) => prev.filter((el) => el !== date));
                  }}
                />
              </div>
            ))}
          </IonRow>
        </IonGrid>
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
                  <IonCol
                    style={{
                      paddingLeft: 0,
                    }}
                  >
                    <IonItem lines="none" className="ion-no-margin">
                      <IonButton
                        style={{
                          margin: 0,
                        }}
                        color="secondary"
                        onClick={() => {
                          setIsSelection((prev) => !prev);
                          setSelectRows([]);
                        }}
                        fill="clear"
                      >
                        {!isSelection ? "Select Items" : "Cancel"}
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
                    <small>
                      <Trans>Delete</Trans>
                    </small>
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
                        <small>
                          <Trans>Unique ID</Trans>: {product.bc_qr_code}
                        </small>
                      </div>
                      <div className="wrap-text">
                        <small>
                          <Trans>Product ID</Trans>: {product.bc_prd_code}
                        </small>
                      </div>
                      <div className="wrap-text">
                        <small>
                          <Trans>Product Batch ID</Trans>:{" "}
                          {product.bc_pbth_code}{" "}
                        </small>
                      </div>

                      <div>
                        <small>
                          <Trans>Manufactured Date</Trans>:
                          {product.bc_pbth_manufactured_date}
                        </small>
                      </div>
                      <div>
                        <small>
                          <Trans>Expiry Date</Trans>:{" "}
                          {product.bc_pbth_expiry_date}{" "}
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
