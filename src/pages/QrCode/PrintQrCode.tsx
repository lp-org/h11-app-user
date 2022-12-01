import {
  IonButton,
  IonCol,
  IonContent,
  IonLoading,
  IonPage,
  IonRow,
} from "@ionic/react";

import ShowQrInfo from "components/ShowQrInfo";
import Toolbar from "components/Toolbar.tsx";

import { useAddBlockchainInfo, useGetQrInfoByBatchId } from "hooks/useQrCode";
import { useState } from "react";

import { useRouteMatch } from "react-router";

interface paramsProps {
  batchCode: string;
}

const PrintQrCode: React.FC = () => {
  const match = useRouteMatch<paramsProps>();

  const { batchCode } = match.params;
  const addBlockchainInfo = useAddBlockchainInfo();
  const { data } = useGetQrInfoByBatchId(batchCode);

  const [showLoading, setShowLoading] = useState(false);
  return (
    <IonPage>
      <Toolbar title="View Product" defaultHref="/qrcode" />

      <IonContent fullscreen className="ion-padding">
        <ShowQrInfo item={data!} />
        <IonRow>
          <IonCol size="12">Print Count</IonCol>
          <IonCol className="ion-margin-start ion-margin-bottom">111</IonCol>
        </IonRow>
        <IonButton
          expand="full"
          onClick={() => {
            setShowLoading(true);
            addBlockchainInfo.mutate(data!, {
              onSuccess: () => setShowLoading(false),
            });
          }}
        >
          Print QR Code
        </IonButton>
        <IonLoading
          cssClass="my-custom-class"
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Please wait..."}
          duration={5000}
        />
      </IonContent>
    </IonPage>
  );
};

export default PrintQrCode;
