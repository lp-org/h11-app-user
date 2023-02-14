import { IonButton, IonContent, IonGrid, IonIcon, IonPage } from "@ionic/react";
import { t, Trans } from "@lingui/macro";
import ShowProduct from "components/ShowProduct";
import Toolbar from "components/Toolbar.tsx";
import { useAddProduct } from "hooks/useProduct";
import { FC } from "react";
import { useHistory } from "react-router";
import { useProductStore } from "store/useProductStore";
import { processNutritionInfoPayload } from "utils";
import SteupSteppers from "./SteupSteppers";

const SetupProductStep3: FC = () => {
  const productPreview = useProductStore((state) => state.tempProductSetup);
  const productAdd = useAddProduct();
  const history = useHistory();
  return (
    <IonPage>
      <Toolbar
        title={t({ id: "Setup Product" })}
        defaultHref="/product"
        action={
          <IonButton onClick={() => history.push("/product")} color="dark">
            <IonIcon src={"/assets/icon/manage.svg"} />
          </IonButton>
        }
      />
      <IonContent fullscreen className="ion-padding">
        <IonGrid fixed={true}>
          <div className="ion-margin-bottom">
            <b>
              <Trans>Preview</Trans>
            </b>
          </div>
          <SteupSteppers step={3} />
          {productPreview && (
            <ShowProduct item={processNutritionInfoPayload(productPreview)} />
          )}

          <IonButton
            expand="block"
            className="text-white ion-margin-top"
            onClick={() => {
              if (productPreview) {
                productAdd.mutate(processNutritionInfoPayload(productPreview));
              }
            }}
          >
            <Trans>Confirm</Trans>
          </IonButton>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SetupProductStep3;
