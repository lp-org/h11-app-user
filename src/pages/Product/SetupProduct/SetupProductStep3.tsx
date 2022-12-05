import { IonButton, IonContent, IonGrid, IonPage } from "@ionic/react";
import ShowProduct from "components/ShowProduct";
import Toolbar from "components/Toolbar.tsx";
import { useAddProduct } from "hooks/useProduct";
import { FC } from "react";
import { useProductStore } from "store";
import { processNutritionInfoPayload } from "utils";

const SetupProductStep3: FC = () => {
  const productPreview = useProductStore((state) => state.tempProductSetup);
  const productAdd = useAddProduct();

  return (
    <IonPage>
      <Toolbar title="Setup Product" defaultHref="/product" />
      <IonContent fullscreen className="ion-padding">
        <IonGrid fixed={true}>
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
