import { IonButton, useIonToast } from "@ionic/react";
import ShowProduct from "components/ShowProduct";
import { useAddProduct } from "hooks/useProduct";
import { FC } from "react";
import { useProductStore } from "store";
import { processNutritionInfoPayload } from "utils";
import SetupProduct from ".";

const SetupProductStep3: FC = () => {
  const productPreview = useProductStore((state) => state.tempProductSetup);
  const productAdd = useAddProduct();
  const [present] = useIonToast();
  return (
    <SetupProduct>
      {productPreview && (
        <ShowProduct item={processNutritionInfoPayload(productPreview)} />
      )}

      <IonButton
        onClick={() => {
          if (productPreview) {
            productAdd.mutate(processNutritionInfoPayload(productPreview));
            present({
              message: "Product have been successfully created!",
              duration: 1500,
              position: "top",
            });
          }
        }}
      >
        Confirm
      </IonButton>
    </SetupProduct>
  );
};

export default SetupProductStep3;
