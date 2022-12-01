import { IonButton } from "@ionic/react";
import ShowProduct from "components/ShowProduct";
import { useAddProduct } from "hooks/useProduct";
import { FC } from "react";
import { useProductStore } from "store";
import { processNutritionInfoPayload } from "utils";
import SetupProduct from ".";

const SetupProductStep3: FC = () => {
  const productPreview = useProductStore((state) => state.tempProductSetup);
  const productAdd = useAddProduct();

  return (
    <SetupProduct>
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
    </SetupProduct>
  );
};

export default SetupProductStep3;
