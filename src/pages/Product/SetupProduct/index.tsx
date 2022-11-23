import { IonContent, IonGrid, IonPage } from "@ionic/react";
import Toolbar from "components/Toolbar.tsx";

import { useState } from "react";
import { useRouteMatch } from "react-router";

const SetupProduct: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { path } = useRouteMatch();

  const [step, setStep] = useState(path === "/product/add" ? 1 : 2);

  return (
    <IonPage>
      <Toolbar title="Setup Product" defaultHref="/product" />
      <IonContent fullscreen className="ion-padding">
        <IonGrid fixed={true}>
          <div className="ion-margin-bottom">
            <b>
              {step === 1 ? "Food Product Information" : "Nutrition Facts"}
              Setup ( {step} of 2 )
            </b>
          </div>

          <></>
          {children}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SetupProduct;
