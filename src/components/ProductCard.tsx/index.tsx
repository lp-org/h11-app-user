import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
} from "@ionic/react";
import { useHistory } from "react-router";
import { Product } from "../../types/product";

interface ProductCardProps {
  item: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const history = useHistory();
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{item.prd_name}</IonCardTitle>
        <IonCardSubtitle>{item.prd_flavour}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>{item.prd_code}</IonCardContent>
      <div style={{ display: "flex", justifyContent: "end", padding: 4 }}>
        <IonButton
          fill="outline"
          onClick={() => history.push(`/product/${item.prd_code}`)}
        >
          View
        </IonButton>
        <IonButton
          fill="outline"
          onClick={() => history.push(`/product/edit/${item.prd_code}`)}
        >
          Edit
        </IonButton>
      </div>
    </IonCard>
  );
};

export default ProductCard;
