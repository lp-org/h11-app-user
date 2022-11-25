import { IonContent, IonGrid, IonPage } from "@ionic/react";
import Toolbar from "components/Toolbar.tsx";

import { useState } from "react";
import { useRouteMatch } from "react-router";

const SetupProduct: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { path } = useRouteMatch();

  const [step] = useState(
    path === "/product/edit/:code"
      ? 1
      : path === "/product/edit-2/:code"
      ? 2
      : 3
  );
  let title = null;
  if (step === 1 || step === 2) {
    title = `${
      step === 1 ? "Food Product Information" : "Nutrition Facts"
    } Edit ( ${step} of 2 )`;
  }

  return (
    <IonPage>
      <Toolbar title="Edit Product" defaultHref={`/product`} />
      <IonContent fullscreen className="ion-padding">
        <IonGrid fixed={true}>
          <div className="ion-margin-bottom">
            <b>{title}</b>
          </div>

          <></>
          {children}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SetupProduct;
