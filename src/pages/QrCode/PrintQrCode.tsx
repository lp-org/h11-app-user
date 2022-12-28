import { IonButton, IonCol, IonContent, IonPage, IonRow } from "@ionic/react";

import ShowQrInfo from "components/ShowQrInfo";
import Toolbar from "components/Toolbar.tsx";

import { useAddBlockchainInfo, useGetQrInfoByBatchId } from "hooks/useQrCode";

import { useRouteMatch } from "react-router";
import { useAppState } from "store";

interface paramsProps {
  batchCode: string;
}

const PrintQrCode: React.FC = () => {
  const match = useRouteMatch<paramsProps>();

  const { batchCode } = match.params;
  const addBlockchainInfo = useAddBlockchainInfo();
  const { data } = useGetQrInfoByBatchId(batchCode);
  const setLoading = useAppState((state) => state.setLoading);

  return (
    <IonPage>
      <Toolbar title="Print QR Code" defaultHref="/qrcode" />

      <IonContent fullscreen className="ion-padding">
        <div style={{ display: "flex", flexFlow: "column", height: "100%" }}>
          <div style={{ flex: "0 1 auto" }}>
            <ShowQrInfo item={data!} />
          </div>
          <div
            style={{ flex: "1 1 auto", display: "flex", flexFlow: "column" }}
          >
            <IonButton
              expand="block"
              className="text-white"
              style={{ marginTop: "auto" }}
              onClick={() => {
                setLoading(true);
                addBlockchainInfo.mutate(data!, {
                  onSuccess: () => setLoading(false),
                });
              }}
            >
              Print QR Code
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PrintQrCode;
