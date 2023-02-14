import { IonContent, IonPage } from "@ionic/react";
import { t } from "@lingui/macro";
import ShowQrHistoryInfo from "components/ShowQrHistoryInfo";

import Toolbar from "components/Toolbar.tsx";

import { useGetBlockchainInfo } from "hooks/useQrCode";

import { useRouteMatch } from "react-router";

interface paramsProps {
  code: string;
}

const ViewQrCodeHistory: React.FC = () => {
  const match = useRouteMatch<paramsProps>();

  const { code } = match.params;

  const { data } = useGetBlockchainInfo(code);
  return (
    <IonPage>
      <Toolbar title={t({ id: "View QR Code" })} defaultHref="/qrcode" />

      <IonContent fullscreen className="ion-padding">
        {data && <ShowQrHistoryInfo item={data} />}
      </IonContent>
    </IonPage>
  );
};

export default ViewQrCodeHistory;
