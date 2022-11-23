import { Route } from "react-router-dom";
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

import Tab2 from "pages/ProductBatch";
import Tab3 from "pages/Tab3";
import ViewProduct from "pages/Product/ViewProduct";
import EditProduct from "pages/Product/EditProduct";
import Home from "pages/Home";
import ProductList from "pages/Product/List";
import SetupProductStep1 from "pages/Product/SetupProduct/SetupProductStep1";
import SetupProductStep2 from "pages/Product/SetupProduct/SetupProductStep2";

setupIonicReact({ rippleEffect: true, mode: "md" });

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/" component={Home} />
            {/* Product  */}
            <Route exact path="/manageProduct" component={Product} />
            <Route exact path="/product" component={ProductList} />
            <Route path="/product/:code" component={ViewProduct} />
            <Route path="/product/add" component={SetupProductStep1} />
            <Route path="/product/add-2" component={SetupProductStep2} />
            <Route path="/product/edit/:code" component={EditProduct} />
            {/* <Route path="/product/edit/:id">
         
          </Route> */}

            {/* Product Batch */}
            <Route exact path="/tab2">
              <Tab2 />
            </Route>
            <Route path="/tab3">
              <Tab3 />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom" color="primary">
            <IonTabButton tab="tab1" href="/">
              <IonIcon src="/assets/icon/home.svg" />
            </IonTabButton>
            <IonTabButton tab="tab2" href="/manageProduct">
              <IonIcon src="/assets/icon/food.svg" />
              {/* <img alt="food" src="/assets/icon/healthy-food 1.svg" /> */}
            </IonTabButton>
            <IonTabButton tab="tab3" href="/history">
              <IonIcon src="/assets/icon/history.svg" />
            </IonTabButton>
            <IonTabButton tab="tab3" href="/profile">
              <IonIcon src="/assets/icon/union.svg" />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
