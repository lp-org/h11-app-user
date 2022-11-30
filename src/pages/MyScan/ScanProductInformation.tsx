import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Toolbar from "components/Toolbar.tsx";
import { scan } from "ionicons/icons";
import { BarcodeScanner } from "@awesome-cordova-plugins/barcode-scanner";
import { useEffect, useState } from "react";
import { useScanResult } from "hooks/useQrCode";

import ShowQrScanInformation from "components/ShowQrScanInformation";
import { useHistory } from "react-router";
const ScanProductInformation: React.FC = () => {
  const [url, setUrl] = useState("");
  const history = useHistory();
  useEffect(() => {
    openScanner();
  }, []);
  const openScanner = async () => {
    const data = await BarcodeScanner.scan({ formats: "QR_CODE" });

    if (data && data.text) {
      // temp because no fix url
      var verifyValue = data.text.match(/verify\/([\s\S]*)$/);
      if (verifyValue) {
        console.log(verifyValue[1]);
        setUrl(verifyValue[1]);
      }
    } else {
      history.replace("/scan");
    }
  };
  const { data, isLoading } = useScanResult(url);
  return (
    <IonPage>
      <Toolbar title="Product Information" defaultHref="/scan" />

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        {isLoading ? (
          <IonSpinner name="circles"></IonSpinner>
        ) : (
          data && <ShowQrScanInformation item={data} />
        )}
      </IonContent>
      <IonFab
        slot="fixed"
        vertical="bottom"
        horizontal="end"
        onClick={openScanner}
      >
        <IonFabButton>
          <IonIcon icon={scan}></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default ScanProductInformation;
