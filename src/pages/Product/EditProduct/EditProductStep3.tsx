import { IonButton, IonContent, IonGrid, IonPage } from "@ionic/react";
import ShowProduct from "components/ShowProduct";
import Toolbar from "components/Toolbar.tsx";
import { useEditProduct } from "hooks/useProduct";
import { code } from "ionicons/icons";
import { FC } from "react";
import { useProductWithoutLsStore } from "store";
import { processNutritionInfoPayload } from "utils";

const EditProductStep3: FC = () => {
  const productPreview = useProductWithoutLsStore(
    (state) => state.tempProductEdit
  );
  const productAdd = useEditProduct();
  return (
    <IonPage>
      <Toolbar title="Edit Product" defaultHref={`/product/${code}`} />
      <IonContent fullscreen className="ion-padding">
        <IonGrid fixed={true}>
          <div className="ion-margin-bottom">
            <b>Food Product Information ( 1 of 2 )</b>
          </div>
          {productPreview && (
            <ShowProduct item={processNutritionInfoPayload(productPreview)} />
          )}

          <IonButton
            shape="round"
            expand="full"
            onClick={() => {
              if (productPreview) {
                productAdd.mutate({
                  id: productPreview.prd_code,
                  payload: processNutritionInfoPayload(productPreview),
                });
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

export default EditProductStep3;
