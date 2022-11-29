import { IonButton, IonCol, IonContent, IonPage, IonRow } from "@ionic/react";
import ShowQrHistoryInfo from "components/ShowQrHistoryInfo";

import ShowQrInfo from "components/ShowQrInfo";
import Toolbar from "components/Toolbar.tsx";

import {
  useAddBlockchainInfo,
  useGetBlockchainInfo,
  useGetQrInfoByBatchId,
} from "hooks/useQrCode";

import { useRouteMatch } from "react-router";

interface paramsProps {
  code: string;
}

const ViewQrCodeHistory: React.FC = () => {
  const match = useRouteMatch<paramsProps>();

  const { code } = match.params;
  const addBlockchainInfo = useAddBlockchainInfo();
  const { data } = useGetBlockchainInfo(code);
  return (
    <IonPage>
      <Toolbar title="View Product" defaultHref="/qrcode" />

      <IonContent fullscreen className="ion-padding">
        {data && <ShowQrHistoryInfo item={data} />}
        <IonRow>
          <IonCol size="12">Print Count</IonCol>
          <IonCol className="ion-margin-start ion-margin-bottom">111</IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default ViewQrCodeHistory;
