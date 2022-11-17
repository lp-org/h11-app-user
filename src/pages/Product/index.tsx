import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCardContent,
  IonButton,
  useIonRouter,
} from "@ionic/react";
import ProductCard from "components/ProductCard.tsx";
import { useProductList } from "mock";

const Tab1: React.FC = () => {
  const { data: products } = useProductList();
  const history = useIonRouter();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Products</IonTitle>
          <IonButton
            slot="end"
            class="ion-margin-end"
            onClick={() => history.push("/product/add")}
          >
            Add Product
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Product </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCardContent>
          {products?.map((product) => (
            <ProductCard key={product.prd_code} item={product} />
          ))}
        </IonCardContent>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
