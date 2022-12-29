import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
  IonSpinner,
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
    const data = await BarcodeScanner.scan({
      formats: "QR_CODE",
      showTorchButton: true,
      prompt: "Align QR within the frame to scan",
    });

    if (data && data.text) {
      // temp because no fix url
      var verifyValue = data.text.match(/verify\/([\s\S]*)$/);
      if (verifyValue) {
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

      <IonContent fullscreen className="ion-padding">
        {isLoading ? (
          <div className="fullheight xc">
            <IonSpinner name="circles" className="ion-text-center"></IonSpinner>
          </div>
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
          <IonIcon src="/assets/icon/scan.svg"></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default ScanProductInformation;
