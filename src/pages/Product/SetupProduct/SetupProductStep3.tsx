import { IonButton, IonContent, IonGrid, IonIcon, IonPage } from "@ionic/react";
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
        title="Setup Product"
        defaultHref="/product"
        action={
          <IonButton onClick={() => history.push("/product")}>
            <IonIcon src={"/assets/icon/manage.svg"} />
          </IonButton>
        }
      />
      <IonContent fullscreen className="ion-padding">
        <SteupSteppers step={3} />
        <IonGrid fixed={true}>
          <div className="ion-margin-bottom">
            <b>Preview</b>
          </div>
          {productPreview && (
            <ShowProduct item={processNutritionInfoPayload(productPreview)} />
          )}

          <IonButton
            shape="round"
            expand="full"
            onClick={() => {
              if (productPreview) {
                productAdd.mutate(processNutritionInfoPayload(productPreview));
              }
            }}
          >
            Confirm
          </IonButton>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SetupProductStep3;
