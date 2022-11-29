import { IonButton } from "@ionic/react";
import ShowProduct from "components/ShowProduct";
import { useEditProduct } from "hooks/useProduct";
import { FC } from "react";
import { useProductWithoutLsStore } from "store";
import { processNutritionInfoPayload } from "utils";
import SetupProduct from ".";

const EditProductStep3: FC = () => {
  const productPreview = useProductWithoutLsStore(
    (state) => state.tempProductEdit
  );
  const productAdd = useEditProduct();
  return (
    <SetupProduct>
      {productPreview && <ShowProduct item={productPreview} />}

      <IonButton
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
    </SetupProduct>
  );
};

export default EditProductStep3;
