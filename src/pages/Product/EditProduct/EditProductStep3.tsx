import { IonButton, IonContent, IonGrid, IonIcon, IonPage } from "@ionic/react";
import ShowProduct from "components/ShowProduct";
import Toolbar from "components/Toolbar.tsx";
import { useEditProduct } from "hooks/useProduct";

import { FC } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { useProductWithoutLsStore } from "store/useProductStore";
import { processNutritionInfoPayload } from "utils";
import EditSteppers from "./EditSteppers";

interface paramsProps {
  code: string;
}
const EditProductStep3: FC = () => {
  const productPreview = useProductWithoutLsStore(
    (state) => state.tempProductEdit
  );
  const match = useRouteMatch<paramsProps>();
  const { code } = match.params;
  const productAdd = useEditProduct();
  const history = useHistory();
  return (
    <IonPage>
      <Toolbar
        title="Edit Product"
        defaultHref={`/product/${code}`}
        action={
          <IonButton
            onClick={() => history.push(`/product/${code}`)}
            color="dark"
          >
            <IonIcon src={"/assets/icon/manage.svg"} />
          </IonButton>
        }
      />
      <IonContent fullscreen className="ion-padding">
        <IonGrid fixed={true}>
          <div className="ion-margin-bottom">
            <b>Preview</b>
          </div>
          <EditSteppers step={3} code={code} />
          {productPreview && (
            <ShowProduct item={processNutritionInfoPayload(productPreview)} />
          )}

          <IonButton
            className="text-white ion-margin-top"
            expand="block"
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
