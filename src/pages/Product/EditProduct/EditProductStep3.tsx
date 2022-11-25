import { IonButton } from "@ionic/react";
import ShowProduct from "components/ShowProduct";
import { useAddProduct } from "hooks";
import { FC } from "react";
import { useProductWithoutLsStore } from "store";
import { processNutritionInfoPayload } from "utils";
import SetupProduct from ".";

const EditProductStep3: FC = () => {
  const productPreview = useProductWithoutLsStore(
    (state) => state.tempProductEdit
  );
  const productAdd = useAddProduct();
  return (
    <SetupProduct>
      {productPreview && <ShowProduct item={productPreview} />}

      <IonButton
        onClick={() => {
          if (productPreview) {
            productAdd.mutate(processNutritionInfoPayload(productPreview));
            console.log("success");
          }
        }}
      >
        Confirm
      </IonButton>
    </SetupProduct>
  );
};

export default EditProductStep3;
