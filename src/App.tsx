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

import { home, person, scan } from "ionicons/icons";

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

/**
 * Load messages for requested locale and activate it.
 * This function isn't part of the LinguiJS library because there are
 * many ways how to load messages — from REST API, from file, from cache, etc.
 */

setupIonicReact({ rippleEffect: true, mode: "ios" });

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

                  <Route exact path="/product/:code" component={ViewProduct} />

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

                  <Route exact path="/">
                    <Redirect to="/home" />
                  </Route>
                </IonRouterOutlet>

                <IonTabBar slot={showTab ? "bottom" : undefined}>
                  <IonTabButton tab="tab1" href="/home">
                    <IonIcon icon={home} />
                  </IonTabButton>

                  <IonTabButton tab="tab3" href="/scan">
                    <IonIcon icon={scan} />
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
