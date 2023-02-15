import { IonContent, IonPage } from "@ionic/react";
import Toolbar from "components/Toolbar.tsx";

import ShowQrScanInformation from "components/ShowQrScanInformation";
import { useScanHistoryStore } from "store/useScanHistoryStore";
import { useRouteMatch } from "react-router";
import { t } from "@lingui/macro";

const MyScanProductDetail: React.FC = () => {
  const { params } = useRouteMatch<{ key: string }>();
  const { key } = params;
  const historyList = useScanHistoryStore((state) => state.scanHistoryList);
  const data = historyList.find((el) => el.key === parseInt(key));
  return (
    <IonPage>
      <Toolbar title={t({ id: "Product Information" })} defaultHref="/scan" />

      <IonContent fullscreen className="ion-padding">
        {data && <ShowQrScanInformation item={data} />}
      </IonContent>
    </IonPage>
  );
};

export default MyScanProductDetail;
