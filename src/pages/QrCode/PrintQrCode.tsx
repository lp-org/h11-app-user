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
      <Toolbar title="View Product Information" defaultHref="/qrcode" />

      <IonContent fullscreen className="ion-padding">
        <ShowQrInfo item={data!} />
        <IonRow>
          <IonCol size="12">Print Count</IonCol>
          <IonCol className="ion-margin-start ion-margin-bottom">111</IonCol>
        </IonRow>
        <IonButton
          expand="full"
          onClick={() => {
            setLoading(true);
            addBlockchainInfo.mutate(data!, {
              onSuccess: () => setLoading(false),
            });
          }}
        >
          Print QR Code
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default PrintQrCode;
