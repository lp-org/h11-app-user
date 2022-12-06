import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import Product from "pages/Product";

import ViewProduct from "pages/Product/ViewProduct";

import Home from "pages/Home";

import ProductBatch from "pages/ProductBatch";
import SetupProductBatchStep1 from "pages/ProductBatch/SetupProductBatch/SetupProductBatchStep1";
import SetupProductBatchStep2 from "pages/ProductBatch/SetupProductBatch/SetupProductBatchStep2";

import QrCode from "pages/QrCode";
import PrintQrCode from "pages/QrCode/PrintQrCode";
import ViewQrCodeHistory from "pages/QrCode/ViewQrCodeHistory";
import { homeOutline, personOutline, scanOutline } from "ionicons/icons";

import MyScan from "pages/MyScan";
import ScanProductInformation from "pages/MyScan/ScanProductInformation";
import MyScanProductDetail from "pages/MyScan/MyScanProductDetail";
import { App as CapApp } from "@capacitor/app";
import { Fragment, useEffect } from "react";
import Profile from "pages/Profile";
import Login from "pages/Auth/Login";
import Register from "pages/Auth/Register";
import { useSession } from "hooks/useAuth";
import Loading from "components/Loading";
setupIonicReact({ rippleEffect: true, mode: "md" });

const App: React.FC = () => {
  const { isAuthed } = useSession();
  useEffect(() => {
    CapApp.addListener("backButton", ({ canGoBack }) => {
      if (canGoBack) window.history.back();
      else CapApp.exitApp();
    });
    return () => {
      CapApp.removeAllListeners();
    };
  }, []);
  return (
    <IonApp>
      <IonReactRouter>
        {isAuthed ? (
          <Fragment>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/" component={Home} />
                {/* Product  */}
                <Route exact path="/manageProduct" component={Product} />

                <Route exact path="/product/:code" component={ViewProduct} />

                {/* Product Batch */}
                <Route exact path="/productBatch" component={ProductBatch} />
                <Route
                  path="/productBatch/add"
                  component={SetupProductBatchStep1}
                />
                <Route
                  path="/productBatch/add-2"
                  component={SetupProductBatchStep2}
                />

                {/* QR code */}
                <Route exact path="/qrcode" component={QrCode} />
                <Route
                  exact
                  path="/qrcode/:batchCode"
                  component={PrintQrCode}
                />
                <Route
                  exact
                  path="/qrcodeHistory/:code"
                  component={ViewQrCodeHistory}
                />
                {/* My Scan  */}
                <Route path="/scan" component={MyScan} />
                <Route
                  path="/scanProductInformation"
                  component={ScanProductInformation}
                />
                <Route
                  path="/scanProductHistory/:key"
                  component={MyScanProductDetail}
                />

                {/* Profile  */}
                <Route path="/profile" component={Profile} />
              </IonRouterOutlet>

              <IonTabBar slot="bottom" color="primary">
                <IonTabButton tab="tab1" href="/">
                  <IonIcon icon={homeOutline} />
                </IonTabButton>
                <IonTabButton tab="tab3" href="/scan">
                  <IonIcon icon={scanOutline} />
                </IonTabButton>
                <IonTabButton tab="tab4" href="/profile">
                  <IonIcon src={personOutline} />
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </Fragment>
        ) : (
          <IonRouterOutlet>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route render={() => <Redirect to="/" />} />
          </IonRouterOutlet>
        )}
        <Loading />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
