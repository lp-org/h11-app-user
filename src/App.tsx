import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";

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
import AddProduct from "pages/Product/AddProduct";
import Tab2 from "pages/ProductBatch";
import Tab3 from "pages/Tab3";
import ViewProduct from "pages/Product/ViewProduct";
import EditProduct from "pages/Product/EditProduct";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/" render={() => <Redirect to="/product" />} />
          {/* Product  */}
          <Route exact path="/product" component={Product} />
          <Route path="/product/:code" component={ViewProduct} />
          <Route path="/product/add" component={AddProduct} />
          <Route path="/product/edit/:code" component={EditProduct} />
          {/* <Route path="/product/edit/:id">
            <AddProduct />
          </Route> */}

          {/* Product Batch */}
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/product">
            <IonIcon icon={triangle} />
            <IonLabel>Product</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={ellipse} />
            <IonLabel>Product Batch</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={square} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
