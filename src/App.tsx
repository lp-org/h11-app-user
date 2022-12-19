import { Redirect, Route, useLocation } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  useIonRouter,
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
import ProductList from "pages/Product/List";
import SetupProductStep1 from "pages/Product/SetupProduct/SetupProductStep1";
import SetupProductStep2 from "pages/Product/SetupProduct/SetupProductStep2";
import SetupProductStep3 from "pages/Product/SetupProduct/SetupProductStep3";
import EditProductStep1 from "pages/Product/EditProduct/EditProductStep1";
import EditProductStep2 from "pages/Product/EditProduct/EditProductStep2";
import EditProductStep3 from "pages/Product/EditProduct/EditProductStep3";
import ProductBatch from "pages/ProductBatch";
import SetupProductBatchStep1 from "pages/ProductBatch/SetupProductBatch/SetupProductBatchStep1";
import SetupProductBatchStep2 from "pages/ProductBatch/SetupProductBatch/SetupProductBatchStep2";
import ViewProductBatch from "pages/Product/ViewProductBatch";
import QrCode from "pages/QrCode";
import PrintQrCode from "pages/QrCode/PrintQrCode";
import ViewQrCodeHistory from "pages/QrCode/ViewQrCodeHistory";
import { fastFood, home, person, scan } from "ionicons/icons";

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
import { I18nProvider } from "components/i18n/I18nProvider";
import CheckRoute from "components/CheckRoute";
import { useAppState } from "store";
import EditProfile from "pages/Profile/EditProfile";

/**
 * Load messages for requested locale and activate it.
 * This function isn't part of the LinguiJS library because there are
 * many ways how to load messages — from REST API, from file, from cache, etc.
 */

setupIonicReact({ mode: "ios" });

const App: React.FC = () => {
  const { isAuthed } = useSession();
  const showTab = useAppState((state) => state.showTab);
  useEffect(() => {
    CapApp.addListener("backButton", ({ canGoBack }) => {
      if (!canGoBack) CapApp.exitApp();
    });
    return () => {
      CapApp.removeAllListeners();
    };
  }, []);
  return (
    <IonApp>
      <I18nProvider>
        <IonReactRouter>
          <CheckRoute />
          {isAuthed ? (
            <Fragment>
              <IonTabs>
                <IonRouterOutlet>
                  <Route exact path="/home" component={Home} />
                  {/* Product  */}
                  <Route exact path="/manageProduct" component={Product} />
                  <Route exact path="/product" component={ProductList} />
                  <Route exact path="/product/:code" component={ViewProduct} />
                  <Route path="/product/add" component={SetupProductStep1} />
                  <Route path="/product/add-2" component={SetupProductStep2} />
                  <Route path="/product/add-3" component={SetupProductStep3} />

                  {/* Edit Product */}
                  <Route
                    path="/product/edit/:code"
                    component={EditProductStep1}
                  />
                  <Route
                    path="/product/edit-2/:code"
                    component={EditProductStep2}
                  />
                  <Route
                    path="/product/edit-3/:code"
                    component={EditProductStep3}
                  />
                  <Route
                    path="/productBatch/:code"
                    component={ViewProductBatch}
                  />

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
                  <Route path="/editProfile" component={EditProfile} />

                  <Route exact path="/">
                    <Redirect to="/home" />
                  </Route>
                </IonRouterOutlet>

                <IonTabBar slot={showTab ? "bottom" : undefined}>
                  <IonTabButton tab="tab1" href="/home">
                    <IonIcon icon={home} />
                  </IonTabButton>
                  <IonTabButton tab="tab2" href="/manageProduct">
                    <IonIcon src="/assets/icon/manage.svg" />
                  </IonTabButton>
                  <IonTabButton tab="tab3" href="/scan">
                    <IonIcon src="/assets/icon/scan.svg" />
                  </IonTabButton>
                  <IonTabButton tab="tab4" href="/profile">
                    <IonIcon src={person} />
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
      </I18nProvider>
    </IonApp>
  );
};

export default App;
